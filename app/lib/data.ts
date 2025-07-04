'use server'

import prisma from "@/app/lib/prisma";
import { auth } from "@/auth";

const ITEMS_PER_PAGE = 10;
const PURCHASES_PER_PAGE = 3;
const CATEGORIES_PER_PAGE = 12;
export async function fetchFilteredProducts(
    query: string,
    currentPage: number,
    categoryId?: number,
    sort?: string
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const orderBy = () => {
        switch (sort) {
            case 'price_desc':
                return { price: 'desc' as const };
            case 'price_asc':
                return { price: 'asc' as const };
            default:
                return { createdAt: 'desc' as const}; // Por defecto, ordenar por mas nuevo
        }
    };
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
        orderBy: orderBy(),
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
    const categories = await prisma.category.findMany();
    return categories
}

export async function fetchCategory(id: String) {
    const category = await prisma.category.findUnique({
        where: {
            id: Number(id)
        },
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

export async function fetchUser() {
    const session = await auth();
    
    if (!session?.user?.email) {
        throw new Error("User not authenticated");
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    return user
}

export async function fetchPurchases(
    currentPage: number,
) {
    const session = await auth();
    
    if (!session?.user?.email) {
        throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    const offset = (currentPage - 1) * PURCHASES_PER_PAGE;
    const purchases = await prisma.purchase.findMany({
        where: {
            userId: user?.id ,
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip: offset,
        take: PURCHASES_PER_PAGE,
    });
    return purchases;
}

export async function fetchPurchasesPages() {
    const session = await auth();
    
    if (!session?.user?.email) {
        throw new Error("User not authenticated");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    const totalCount = await prisma.purchase.count({
        where: {
                userId: user?.id ,
        },
    });

    return Math.ceil(totalCount / PURCHASES_PER_PAGE);
}


export async function fetchAdminPageCategoriesPages() {

    const totalCount = await prisma.category.count();
    return Math.ceil(totalCount / CATEGORIES_PER_PAGE);

}

export async function fetchFilteredCategories(currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                take: 1 // Only fetch one product per category (if any)
            }
        },
        skip: offset,
        take: ITEMS_PER_PAGE,
    });

    return categories;
}







