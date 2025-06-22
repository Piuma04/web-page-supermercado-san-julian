import ProductCard from "./ProductCard";


export default function ProductTable({
    query,
    currentPage,
    }: {
    query: string;
    currentPage: number;
    }){

     const products = [
        { id: 1, name: "Manzana", imageUrl: "", price: 1.5 },
        { id: 2, name: "Banana",  imageUrl: "", price: 1.2 },
        { id: 3, name: "Leche",  imageUrl: "", price: 2.8 },
        { id: 4, name: "Pan",  imageUrl: "", price: 3.1 },
        { id: 5, name: "Queso",  imageUrl: "", price: 4.0 },
        { id: 6, name: "Huevos",  imageUrl: "", price: 2.3 },
        ]; 
    
    return(
     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        
        <ProductCard 
            key ={product.id}
            id={product.id}
            name={product.name}
            description={ "Descripción no disponible"}
            price={product.price}
            imageUrl={product.imageUrl}

        />
      ))}
    </div>
    );
}