import ProductGrid from "@/app/components/ProductGrid";
import { fetchFilteredProductsPages, fetchCategory } from "@/app/lib/data";
import { Suspense } from "react";
import Pagination from "@/app/components/Pagination";
import ProductGridSkeleton from "@/app/components/ProductGridSkeleton";

export default async function Page(props: {
    searchParams?: Promise<{
    query?: string;
    page?: string;
    }>,
    params: Promise<{
    id: string;
    }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  const {id} = await props.params;
  const categoryId = Number(id);
  
  const category = await fetchCategory(id);
  const totalPages = await fetchFilteredProductsPages(query, categoryId);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {category?.name}
      </h1>
      <Suspense fallback={<ProductGridSkeleton/>}>
        <ProductGrid query={query} categoryId={categoryId} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </main>
  );
}
