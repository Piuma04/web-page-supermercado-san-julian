import ProductCard from "@/app/components/ProductCard";
import ProductGrid from "@/app/components/ProductGrid";
import { fetchCategory } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const {id} =  await params
  const category = await fetchCategory(id);

  const products= (category?.products ?? []).map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    };
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category?.name}</h1>
      <ProductGrid products={products} />
    </main>
  );
}
