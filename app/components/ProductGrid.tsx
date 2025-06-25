import ProductCard from "./ProductCard";

interface ProductGridProps{
    products: {
        id: number;
        name: string;
        price: number;
        imageUrl: string | null;
    }[];
}

export default function ProductGrid({products}: ProductGridProps) {
    
    return(
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        
        <ProductCard
            key ={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
        />
      ))}
    </div>
    );
}