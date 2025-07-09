import { CreateCategory } from "@/app/components/admin/AdminButtons";
import AdminCategoryTable from "@/app/components/admin/AdminCategoryTable";
import Search from "@/app/components/admin/Search";
import Pagination from "@/app/components/Pagination";
import { fetchAdminPageCategoriesPages } from "@/app/lib/data";
import { Suspense } from "react";

export default async function PageCrudCategories(
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
    const totalPages = await fetchAdminPageCategoriesPages(); 


    return(
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl">Categorias</h1>
                <Search placeholder="Buscar banner..."/>
            </div>
            
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <CreateCategory />
            </div>
            <Suspense key={ currentPage} >
                <AdminCategoryTable currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}