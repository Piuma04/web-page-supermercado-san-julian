import { CreateProduct } from "@/app/components/admin/AdminButtons";
import AdminProductTable from "@/app/components/admin/AdminProductTable";
import Pagination from "@/app/components/admin/Pagination";
import Search from "@/app/components/admin/Search";
import { fetchFilteredProductsPages } from "@/app/lib/data";

import { Suspense } from "react";


export default async function PageCrudProducts(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchFilteredProductsPages(query,currentPage);
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Productos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Productos..." />
        <CreateProduct />
      </div>
      <Suspense key={query + currentPage} >
        <AdminProductTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}