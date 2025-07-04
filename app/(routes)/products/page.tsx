import Pagination from "@/app/components/Pagination";
import ProductGrid from "@/app/components/ProductGrid";
import ProductGridSkeleton from "@/app/components/ProductGridSkeleton";
import { Suspense } from "react";
import { fetchFilteredProductsPages } from "@/app/lib/data";
import OrderByBar from "@/app/components/OrderByBar";

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
    <Suspense fallback={<div>Loading products page...</div>}>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        {totalPages >= 1 && (
          <Suspense fallback={<div>Loading filters...</div>}> 
            <OrderByBar />
          </Suspense>
        )}
        <Suspense fallback={<ProductGridSkeleton/>}>
          <ProductGrid query={query} currentPage={currentPage} sort={sort}/>
        </Suspense>
        {totalPages >= 1 && (
          <div className="mt-6">
            <Suspense fallback={<div>Loading pagination...</div>}>
              <Pagination totalPages={totalPages} />
            </Suspense>
          </div>
        )}
      </main>
    </Suspense>
  );
}
