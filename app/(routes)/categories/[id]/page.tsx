import ProductGrid from "@/app/components/ProductGrid";
import { fetchFilteredProductsPages, fetchCategory } from "@/app/lib/data";
import { Suspense } from "react";
import Pagination from "@/app/components/Pagination";
import ProductGridSkeleton from "@/app/components/ProductGridSkeleton";
import OrderByBar from "@/app/components/OrderByBar";
import NotFound from "./not-found";

export default async function Page(props: {
    searchParams?: Promise<{
    query?: string;
    page?: string;
    sort?: string;
    }>,
    params: Promise<{
    id: string;
    }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const sort = searchParams?.sort;
  const currentPage = Number(searchParams?.page) || 1;
  const {id} = await props.params;
  const categoryId = Number(id);

  const [category, totalPages] = await Promise.all([
    fetchCategory(id),
    fetchFilteredProductsPages(query, categoryId)
  ]);


  if(!category) {
    NotFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {category?.name}
      </h1>
      {totalPages >= 1 && (
        <OrderByBar/>
        )}
      <Suspense fallback={<ProductGridSkeleton/>}>
        <ProductGrid query={query} categoryId={categoryId} currentPage={currentPage} sort={sort}/>
      </Suspense>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
