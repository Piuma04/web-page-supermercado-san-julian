import prisma from "@/app/lib/prisma";

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