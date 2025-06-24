import { fetchProducts } from "../lib/data";
import ProductCard from "./ProductCard";


export default async function ProductTable({
    query,
    currentPage,
    }: {
    query: string;
    currentPage: number;
    }){

     const products = await fetchProducts();
    
    return(
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        
        <ProductCard 
            key ={product.id}
            id={product.id}
            name={product.name}
            description={ product.description ?? ""}
            price={product.price}
            imageUrl={product.imageUrl ?? ""}

        />
      ))}
    </div>
    );
}