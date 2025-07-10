import Pagination from "@/app/components/Pagination";
import ProductGrid from "@/app/components/products/ProductGrid";
import ProductGridSkeleton from "@/app/components/products/ProductGridSkeleton";
import { Suspense } from "react";
import { fetchFilteredProductsPages } from "@/app/lib/data";
import OrderByBar from "@/app/components/products/OrderByBar";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
      sort?: string;
    }>
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const sort = searchParams?.sort;
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchFilteredProductsPages(query);

  return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        {totalPages >= 1 && (
          <OrderByBar />
        )}
        <Suspense fallback={<ProductGridSkeleton/>}>
          <ProductGrid query={query} currentPage={currentPage} sort={sort}/>
        </Suspense>
        <div className="mt-6">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
  );
}
