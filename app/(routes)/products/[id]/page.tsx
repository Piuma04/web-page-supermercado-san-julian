import { fetchProduct } from "@/app/lib/data";
import ProductFullView from "@/app/components/ProductFullView";
import { Suspense } from "react";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const {id} =  await params
    const product = await fetchProduct(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return (
        <ProductFullView
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl ?? ""}
            category={product.category.name}
        />
    )
}