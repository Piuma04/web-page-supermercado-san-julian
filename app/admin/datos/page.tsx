import Pagination from "@/app/components/admin/Pagination";
import Search from "@/app/components/admin/Search";
import { fetchFilteredPurchasesPages, getTotalRevenue } from "@/app/lib/data";


export default async function PageDatos(props: {
        searchParams?: Promise<{
        query?: string;
        page?: string;
        }>;
    }
    ) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchFilteredPurchasesPages(query);
    const totalRevenue = await getTotalRevenue();


    return(
        <div>


            <h1>Ganacias totales hasta la fecha: {totalRevenue}</h1>

            <Search placeholder="Buscar nombre de cliente"/>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>  

        </div>

        
    );
}