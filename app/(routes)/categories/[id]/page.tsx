import ProductCard from "@/app/components/ProductCard";
import { fetchCategory } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const {id} =  await params
  const category = await fetchCategory(id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category?.name}</h1>
      <ul className="space-y-4">
        {category?.products.map((product) => (
          <ProductCard 
                      key ={product.id}
                      id={product.id}
                      name={product.name}
                      description={ "Descripción no disponible"}
                      price={product.price}
                      imageUrl={product.imageUrl ?? ""}
          
                  />
        ))}
      </ul>
    </main>
  );
}
