import ProductCard from "./ProductCard";
import { fetchFilteredProducts } from "../lib/data";


export default async function ProductGrid({
  query,
  categoryId,
  currentPage,
  sort
}: {
  query: string;
  categoryId?: number;
  currentPage: number;
  sort?: string;
}) {
  const products = await fetchFilteredProducts(query, currentPage, categoryId, sort);

  if (products.length > 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-500 text-center">
        No se encontraron productos
      </h1>
    </div>
  );
}