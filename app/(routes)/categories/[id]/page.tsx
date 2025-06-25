import ProductCard from "@/app/components/ProductCard";
import ProductGrid from "@/app/components/ProductGrid";
import { fetchCategory } from "@/app/lib/data";
import { Product } from "@/app/lib/types";

export default async function Page({ params }: { params: { id: string } }) {
  const {id} =  await params
  const category = await fetchCategory(id);

  const products: Product[] = (category?.products ?? []).map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl ?? "https://media.istockphoto.com/id/1147544807/es/vector/no-imagen-en-miniatura-gr%C3%A1fico-vectorial.jpg?s=2048x2048&w=is&k=20&c=pOl6SlMTFYgl2568V8ALEd7Gz7nE07ECPZOu2e7VHr4=",
      description: product.description ?? "",
    };
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category?.name}</h1>
      <ProductGrid products={products} />
    </main>
  );
}
