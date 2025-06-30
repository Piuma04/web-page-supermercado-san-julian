"use server"

import { createPreference } from "@/app/api/mercadopago";
import { Item } from "@/app/lib/types";
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./prisma";

export async function checkout(formData: FormData){
  let preferenceUrl: string | undefined = undefined;
  try{
    const itemsJson = formData.get('items');
    if (!itemsJson || typeof itemsJson !== 'string') {
      throw new Error("Items not provided or invalid");
    }
    const items: Item[] = JSON.parse(itemsJson);
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
    const action = formData.get('action');
    switch (action) {
      case 'credentials':
        await signIn(action, formData);
      break;
      case 'google':
        await signIn(action, formData);
      break;
      default:
        return 'Invalid action.';
    }
    
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
      revalidatePath('/(routes)/products')
      revalidatePath('/(routes)/') 
      revalidatePath('/(routes)/categories')
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
      revalidatePath('/(routes)/products')
      revalidatePath('/(routes)/') 
      revalidatePath('/(routes)/categories')
      redirect('/admin/crud');
}



export async function deleteProduct(id: number){
  


      await prisma.product.delete({
        where: { id },
       
      });

      revalidatePath('/admin/crud')
      revalidatePath('/(routes)/products')
      revalidatePath('/(routes)/')
      revalidatePath('/(routes)/cart')  
      revalidatePath('/(routes)/categories')
      redirect('/admin/crud');
}

export async function addToCart(userEmail: string, productId:number, quantity: number) {

    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
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
    return cart;
}