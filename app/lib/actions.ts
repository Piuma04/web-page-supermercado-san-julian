"use server"

import { createPreference } from "@/app/api/mercadopago";
import { Item } from "@/app/lib/types";
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { auth } from "@/auth";

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

export async function createProduct(formData: FormData) {
      const name = formData.get('name') as string;
      const description = formData.get('description') as string | null;
      const price = Number(formData.get('price'));
      const categoryId = Number(formData.get('categoryId'));
      const imageUrl="";


      /*
        // Subida de imagen (opcional)
        if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
            // 👇 Si usás Cloudinary o similar, reemplazá por tu función
            // imageUrl = await uploadImage(imageFile);

            // TEMPORAL: por ahora tiramos error si querés subir imagen pero no está implementado
            throw new Error('Subida de imagen no implementada aún');
        }
    */


      await prisma.product.create({
        data: {
          name,
          description: description === '' ? null : description,
          price,
          categoryId,
          imageUrl,
        },
      });

      revalidatePath('/admin/crud')
      revalidatePath('/(routes)') 
      redirect('/admin/crud');
}


export async function updateProduct(id: number, formData: FormData){
      const name = formData.get('name') as string;
      const description = formData.get('description') as string | null;
      const price = Number(formData.get('price'));
      const categoryId = Number(formData.get('categoryId'));
      const imageFile = formData.get('image') as File;

      let imageUrl: string | null = null;

      
      /*
      if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
        // imageUrl = await uploadImage(imageFile);
        throw new Error('Subida de imagen no implementada todavía');
      }*/

      await prisma.product.update({
        where: { id },
        data: {
          name,
          description: description === '' ? null : description,
          price,
          categoryId,
          ...(imageUrl ? { imageUrl } : {}), // Solo actualiza image si se subió una nueva
        },
      });

      revalidatePath('/admin/crud')
      revalidatePath('/(routes)') 
      redirect('/admin/crud');
}



export async function deleteProduct(id: number){
  


      await prisma.product.delete({
        where: { id },
       
      });

      revalidatePath('/admin/crud')
      revalidatePath('/(routes)')
      redirect('/admin/crud');
}

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