import ProductCard from "./ProductCard";
import { Product } from "../lib/types";


export default function ProductGrid({products}: {products:Product[]}) {
    
    return(
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        
        <ProductCard 
            key ={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl ?? "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=2048x2048&w=is&k=20&c=pOl6SlMTFYgl2568V8ALEd7Gz7nE07ECPZOu2e7VHr4="}
        />
      ))}
    </div>
    );
}