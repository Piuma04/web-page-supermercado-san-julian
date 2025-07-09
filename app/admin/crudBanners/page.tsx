import { CreateBanner } from "@/app/components/admin/AdminButtons";
import AdminBannerTable from "@/app/components/admin/Banner/AdminBannerTable";
import Search from "@/app/components/admin/Search";
import Pagination from "@/app/components/Pagination";
import { fetchBannersPages } from "@/app/lib/data";
import { Suspense } from "react";


export default async function  createBanner(
    props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
){

   

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchBannersPages(); 


    return(
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Categorias</h1>
                <Search placeholder="Buscar banner..."/>
            </div>
            <div className="my-4 flex items-center justify-between gap-2 md:mt-8">
                <CreateBanner />
            </div>
            <Suspense key={ currentPage} >
                <AdminBannerTable query = {query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
