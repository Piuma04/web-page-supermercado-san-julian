import { fetchProducts } from "../lib/data";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";


export default async function ProductTable({
    query,
    currentPage,
    }: {
    query: string;
    currentPage: number;
    }){

     const products = await fetchProducts();

     const prods= products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          };
     });

    
    return (
     <ProductGrid products={prods} />
    );
}