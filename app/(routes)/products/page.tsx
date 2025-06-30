
import Pagination from "@/app/components/Pagination";
import ProductGrid from "@/app/components/ProductGrid";
import ProductGridSkeleton from "@/app/components/ProductGridSkeleton";
import { Suspense } from "react";
import { fetchFilteredProductsPages } from "@/app/lib/data";


export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>
  }
) {
  
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchFilteredProductsPages(query);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <Suspense fallback={<ProductGridSkeleton/>}>
      <ProductGrid query={query} currentPage={currentPage}/>
      </Suspense>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
