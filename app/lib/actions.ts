"use server"

import { createPreference } from "@/app/api/mercadopago";
import { Item } from "@/app/lib/types";
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { auth } from "@/auth";
import { z } from 'zod';
import webpush from 'web-push';

export async function checkout(){
  let preferenceUrl: string | undefined = undefined;
  const session = await auth();
  
  if(!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  try{
    const items: Item[] = await prisma.cartItem.findMany({
      where: {
        cart: {
          user: {
            email: session?.user?.email!
          }
        }
      },
      include: {
        product: true
      }
    }).then(items => items.map(item => ({
      id: item.product.id.toString(),
      title: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price/100,
    })));

    preferenceUrl = await createPreference(items);
  } catch (error) {
    console.error("Error creating payment preference:", error);
    throw new Error("Failed to create payment preference");
  }
  if (!preferenceUrl) {
    throw new Error("Failed to create payment url");
  }
  redirect(preferenceUrl);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const action = String(formData.get('action'));
    await signIn(action, formData)
    
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}




/*

PRODUCT CRUD ACTIONS

*/

const productFormSchema = z.object({
  name: z.string().min(1,"El nombre no debe ser vacío"),
  description: z.string().optional(),
  price: z.coerce.number().positive('El precio debe ser positivo'),
  categoryId: z.coerce.number().positive('Categoría es requerida'),
  image: z.string().optional(),
  notifyUsers: z.string().optional().transform(val => val === 'true'),
});


export type productState = {
  
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    categoryId?: string[];
    image?: string[];
  };

  message?: string | null;
};

export async function createProduct(prevState: productState, formData: FormData) {
  const validatedFields = productFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    categoryId: formData.get('categoryId'),
    image: formData.get('image'),
    notifyUsers: formData.get('notifyUsers'),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to create product",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, categoryId, image, notifyUsers } = validatedFields.data;
  const priceInCents = price*100; 

  try {
    await prisma.product.create({
      data: {
        name,
        description: description === '' ? null : description,
        price: priceInCents,
        categoryId,
        imageUrl: image === '' ? null: image,
      },
    });

    // Enviar notificación si está activada la opción
    if (notifyUsers) {
      try {
        // Obtener todas las suscripciones de la base de datos
        const subscriptions = await prisma.pushSubscription.findMany();
        
        // Preparar el mensaje
        const notificationPayload = JSON.stringify({
          title: '¡Nuevo producto disponible!',
          body: `Hemos agregado "${name}" a nuestro catálogo`,
          icon: '/images/icon.png',
        });
        
        // Enviar notificación a cada suscripción
        const notificationPromises = subscriptions.map(sub => {
          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          };
          
          return webpush.sendNotification(pushSubscription, notificationPayload)
            .catch(error => {
              // Si la suscripción ya no es válida, eliminarla
              if (error.statusCode === 410) {
                return prisma.pushSubscription.delete({
                  where: { endpoint: sub.endpoint }
                });
              }
              console.error(`Error enviando notificación a ${sub.endpoint}:`, error);
            });
        });
        
        // Esperar a que se envíen todas las notificaciones
        await Promise.allSettled(notificationPromises);
        console.log(`Notificaciones enviadas a ${subscriptions.length} suscripciones`);
      } catch (error) {
        console.error('Error al enviar notificaciones:', error);
        // No interrumpir el flujo si falla la notificación
      }
    }

    revalidatePath('/admin', 'layout');
    revalidatePath('/(routes)');
    
  } catch (error: any) {
    console.error(error);
    return {
      message: "Error al crear el producto: " + (error?.message || "Error desconocido"),
    };
  }

  redirect('/admin/crudProducts');
}

export async function updateProduct(id: number, prevState: productState, formData: FormData) {
  const validatedFields = productFormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    categoryId: formData.get('categoryId'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to update product",
      errors: validatedFields.error.flatten().fieldErrors,
    };


  }

  const { name, description, price, categoryId, image } = validatedFields.data;
  const priceInCents = price*100; 

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: { imageUrl: true }
    });

    await prisma.product.update({
      where: { id },
      data: {
        name,
        description: description === '' ? null : description,
        price:priceInCents,
        categoryId,
        imageUrl: image && image !== '' ? image : existingProduct?.imageUrl
      },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/(routes)');
   
  } catch (error: any) {
    console.error(error);
    return {
      message: "No se pudo actualizar el producto: " + (error?.message || "Error desconocido"),
    };
  }

   redirect('/admin/crudProducts');
}

export async function deleteProduct(id: number) {
  
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/(routes)');
    redirect('/admin/crudProducts');
 
}


/*

CATEGORY CRUD ACTIONS

*/


export type categoryState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};


const categoryFormSchema = z.object({
  name: z.string().min(1, "El nombre no debe ser vacío"),
});





export async function addCategory(prevState: categoryState, formData: FormData) {
  const validatedFields = categoryFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      message: "Non valid name",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.category.create({
      data: { name },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/(routes)');
    
  } catch (error: any) {
    console.error(error);
    return {
      message: "Error al crear la categoría: " + (error?.message || "Error desconocido"),
    };
  }

  redirect('/admin/crudCategories');
  
  
}

export async function updateCategory(
  id: number,
  prevState: categoryState,
  formData: FormData
) {
  const validatedFields = categoryFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to update category",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.category.update({
      where: { id },
      data: { name },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/(routes)');
    
  } catch (error: any) {
    console.error(error);
    return {
      message: "No se pudo actualizar la categoría: " + (error?.message || "Error desconocido"),
    };
  }

  redirect('/admin/crudCategories');
}

export async function deleteCategory(id: number) {
 
  const products = await prisma.product.findMany({ where: { categoryId: id } });
  if (products.length > 0) {
    throw new Error("No se puede eliminar la categoría porque tiene productos asociados.");
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath('/admin', 'layout');
  revalidatePath('/(routes)');
  redirect('/admin/crudCategories');
}


/*

CART RELATED ACTIONS

*/

export async function addToCart(productId:number, quantity: number) {

    const session = await auth();

    if(!session?.user?.email) {
    throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        },
        include: {
            items: {
            }
        }
    })

    if (!cart) {
        throw new Error("Cart not found");
    }
    
    const existingItem = cart?.items.find(item => item.productId === productId);
    if(existingItem)
    {
        // Update existing item quantity
        await prisma.cartItem.update({
            where: {
                id: existingItem.id
            },
            data: {
                quantity: existingItem.quantity + quantity
            }
        });
    }
    else {
        // Add new item to cart
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: productId,
                quantity: quantity
            }
        });
    }
}


export async function addItemToCart(cartItemId:number) {
    await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: { increment: 1 } },
    });
    revalidatePath("/(routes)/cart"); 
}

export async function substractItemFromCart(cartItemId:number) {
    await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: { decrement: 1 } },
    });
    revalidatePath("/(routes)/cart");
}

export async function deleteItemFromCart(cartItemId:number) {
    await prisma.cartItem.delete({
        where: { id: cartItemId },
    });
    revalidatePath("/(routes)/cart");
}


webpush.setVapidDetails(
  'mailto:baltasarschwerdt@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)
 
 
export async function subscribeUser(sub: webpush.PushSubscription) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Usuario no autenticado");
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  
  // Verificar si ya existe una suscripción con el mismo endpoint, sino se crea una nueva
  await prisma.pushSubscription.upsert({
    where: { endpoint: sub.endpoint },
    update: {
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth
    },
    create: {
      userId: user.id,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth
    }
  });
  
  return { success: true };
}
 
export async function unsubscribeUser(endpoint: string) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Usuario no autenticado");
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  
  try {
    // Eliminar la suscripcion con el endpoint proporcionado
      await prisma.pushSubscription.delete({
        where: { 
          endpoint: endpoint,
          userId: user.id 
        }
      });
    return { success: true };
  } catch (error) {
    console.error('Error al cancelar suscripción:', error);
    return { success: false, error: 'No se pudo cancelar la suscripción' };
  }
}



/*

BANNER CRUD ACTIONS

*/


export default async function createBanner(){

  return null;
}