import AdminDataTable from "@/app/components/admin/AdminDataTable";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/admin/Search";
import { fetchFilteredPurchases, fetchFilteredPurchasesPages, getTotalRevenue } from "@/app/lib/data";
import { Card } from "@/components/ui/card";
import DateOptions from "@/app/components/admin/DateOptions";



export default async function PageDatos(props: {
        searchParams?: Promise<{
        query?: string;
        page?: string;
        sort?: string;
        order?: string;
        from?: string;
        to?: string;
        }>;
    }
    ) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const VALID_SORT_FIELDS = ['precio', 'producto', 'fecha', 'id'] as const;
    type SortField = typeof VALID_SORT_FIELDS[number];
    const sort = searchParams?.sort;
    const orderParam: "asc" | "desc" = searchParams?.order === 'asc' ? 'asc' : 'desc';
    const isValidSort = VALID_SORT_FIELDS.includes(sort as SortField);
    const orderBy = isValidSort ? { [sort!]: orderParam } : undefined;
    

    const from = searchParams?.from ? new Date(searchParams.from) : undefined;
    const to = searchParams?.to ? new Date(searchParams.to) : undefined;

    const totalPages = await fetchFilteredPurchasesPages(query,from,to);
    const totalRevenue = await getTotalRevenue();
    const purchases = await fetchFilteredPurchases({
      query,
      page: currentPage,
      orderBy,
      from,
      to,
    });

   

    const mappedPurchases = purchases.map((purchase) => ({
        id: purchase.id,
        email: purchase.user.email,
        total: purchase.total,
        description: purchase.description,
        date: purchase.createdAt,
    }));

    return (
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            <div className="mb-4 flex flex-col">
                <h1 className="text-xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    Panel de Administración
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="bg-red-100 border border-red-300 p-3 rounded-lg shadow-sm">
                        <p className="text-base sm:text-lg font-medium text-red-800">
                            Ganancias totales: <span className="font-bold">${totalRevenue}</span>
                        </p>
                    </div>
                   
                </div>
                 <DateOptions/>
                
            </div>
            
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                    <Search placeholder="Buscar nombre de cliente" />
                </div>
                
                <div className="bg-white">
                    <AdminDataTable purchases={mappedPurchases} />
                </div>
                
                <div className="bg-gray-50 px-2 py-4 sm:py-6 flex justify-center border-t border-gray-200">
                    <Pagination totalPages={totalPages} />
                </div>
            </Card>
        </div>
    );
}