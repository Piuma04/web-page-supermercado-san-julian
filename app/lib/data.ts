'use server'

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const ITEMS_PER_PAGE = 10;
export async function fetchFilteredProducts(
    query: string,
    currentPage: number,
    categoryId?: number,
) {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const products = await prisma.product.findMany({
                where: {
                AND: [
                        categoryId ? { categoryId } : {},
                        {
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
                        }
                ]
                },
                include: {
                category: true,
                },
                skip: offset,
                take: ITEMS_PER_PAGE,
        });
        return products;
}


export async function fetchFilteredProductsPages(
    query: string,
    categoryId?: number,
) {
    const totalCount = await prisma.product.count({
        where: {
            AND: [
                categoryId ? { categoryId } : {},
                {
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
                }
            ]
        },
    });
    return Math.ceil(totalCount / ITEMS_PER_PAGE);
}






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
  redirect('/admin/crud');
}