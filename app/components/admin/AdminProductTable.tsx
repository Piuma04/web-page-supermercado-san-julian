// app/dashboard/products/ProductGrid.tsx

import { getFilteredProducts } from "@/app/lib/data";
import AdminProductCard from "./AdminProductCard";



type Props = {
  query: string;
  page: number;
};

export default async function ProductGrid({ query, currentPage }: {query:string, currentPage:number}) {
  const products = await getFilteredProducts(query, currentPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground">
          No se encontraron productos.
        </p>
      ) : (
        products.map((product) => (
          <AdminProductCard
            key={product.id}
            product={{
              ...product,
              description: product.description === null ? undefined : product.description,
              imageUrl: product.imageUrl === null ? undefined : product.imageUrl,
            }}
          />
        ))
      )}
    </div>
  );
}
