import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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