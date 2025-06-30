'use server'

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchCategories() {
    const categories = await prisma.category.findMany({
    include: {
        products: true
    }});
    return categories
}

export async function fetchCategory(id: String) {
    const category = await prisma.category.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            products: true
        }
    })
        
    return category
}

export async function fetchProducts() {
    const products = await prisma.product.findMany({
        include: {
            category: true
        }
    });
    return products
}

export async function fetchProduct(id: String) {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            category: true
        }
    })
    return product
}



export async function fetchCartByUserID(email:string){
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user?.id
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
    return cart
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

export async function addToCart(email: string, productId: number, quantity: number) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("User not found.");
    }

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user?.id
        },
        include: {
            items: {
            }
        }
    })

    if (cart?.id === undefined) {
            throw new Error("Cart not found for user.");
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

export async function fetchUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user;
}







/*

El or da los campos que devuelve si hayuna coincidencia

*/


const PAGE_SIZE = 12;



export async function getFilteredProducts(query: string, page: number) {
  return prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
}







