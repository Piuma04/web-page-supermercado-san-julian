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
      unit_price: item.product.price,
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
  image: z.any().optional(),
});

const CreateInvoice = productFormSchema;

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
  });


  if (!validatedFields.success) {
    return {
      message: "Failed to create product",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, price, categoryId } = validatedFields.data;
  const imageUrl = ""; //poner lo de cloudinary aca

  try {
    await prisma.product.create({
      data: {
        name,
        description: description === '' ? null : description,
        price,
        categoryId,
        imageUrl,
      },
    });

    revalidatePath('/admin', 'layout');
    revalidatePath('/(routes)');
    redirect('/admin/crudProducts');
    
  } catch (error) {
    return {
      message: "Error al crear el producto",
      
    };
  }

  
 
}

export async function updateProduct(id: number,prevState: productState, formData: FormData){
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

      const { name, description, price, categoryId } = validatedFields.data;
      const imageUrl = ""; // poner lo de cloudinary aca

      try{
        await prisma.product.update({
          where: { id },
          data: {
            name,
            description: description === '' ? null : description,
            price,
            categoryId,
            ...(imageUrl ? { imageUrl } : {}), 
          },
        });

        revalidatePath('/admin', 'layout');
        revalidatePath('/(routes)') 
        redirect('/admin/crudProducts');
      }catch(error){
        return {
          message:"No se pudo actualizar el producto",
        };
      }

      
      
}



export async function deleteProduct(id: number){
  
      await prisma.product.delete({
        where: { id },
       
      });

      revalidatePath('/admin', 'layout');
      revalidatePath('/(routes)')
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


export const categoryFormSchema = z.object({
  name: z.string().min(1, "El nombre no debe ser vacío"),
});

export async function addCategory(prevState: categoryState, formData: FormData) {
  const validatedFields = categoryFormSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      message: "Failed to create category",
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
  } catch (error) {
    return {
      message: "Error al crear la categoría",
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
  } catch (error) {
    return {
      message: "No se pudo actualizar la categoría",
    };
  }

  redirect('/admin/crudCategories');
}

export async function deleteCategory(id: number) {
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