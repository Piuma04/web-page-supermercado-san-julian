import { fetchProducts } from "../lib/data";
import ProductCard from "./ProductCard";
import { Product } from "../lib/types";
import ProductGrid from "./ProductGrid";


export default async function ProductTable({
    query,
    currentPage,
    }: {
    query: string;
    currentPage: number;
    }){

     const products = await fetchProducts();

     const prods:Product[] = products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl ?? "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=2048x2048&w=is&k=20&c=pOl6SlMTFYgl2568V8ALEd7Gz7nE07ECPZOu2e7VHr4=",
            description: product.description ?? "",
          };
     });

    
    return (
     <ProductGrid products={prods} />
    );
}