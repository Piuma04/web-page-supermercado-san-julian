import { fetchProduct } from "../lib/data";
import ProductFullView from "./ProductFullView";

export default async function ProductContent({ id }: { id: string }) {
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
            imageUrl={product.imageUrl}
            category={product.category.name}
        />
    );
}