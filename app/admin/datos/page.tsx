import AdminDataTable from "@/app/components/admin/AdminDataTable";
import Pagination from "@/app/components/admin/Pagination";
import Search from "@/app/components/admin/Search";
import { fetchFilteredPurchases, fetchFilteredPurchasesPages, getTotalRevenue } from "@/app/lib/data";
import { Card } from "@/components/ui/card";



export default async function PageDatos(props: {
        searchParams?: Promise<{
        query?: string;
        page?: string;
        sort?: string;
        order?: string;
        }>;
    }
    ) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const sort = searchParams?.sort || null;
    const order: "asc" | "desc" = searchParams?.order === 'asc' ? 'asc' : 'desc'; 

    const orderBy = sort === 'total' ? { total: order } : undefined;

    const totalPages = await fetchFilteredPurchasesPages(query);
   
    const totalRevenue = await getTotalRevenue();
    const purchases = await fetchFilteredPurchases(query, currentPage, orderBy)

    const mappedPurchases = purchases.map((purchase) => ({
        id: purchase.id,
        email: purchase.user.email,
        total: purchase.total,
        description: purchase.description,
        date: purchase.createdAt,
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    Panel de Administración
                </h1>
                <div className="bg-red-100 border border-red-300 p-4 rounded-lg inline-block shadow-sm">
                    <p className="text-lg font-medium text-red-800">
                        Ganancias totales: <span className="font-bold">${totalRevenue}</span>
                    </p>
                </div>
            </div>
            
            <Card className="border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <div className="max-w-md p-4">
                        <Search placeholder="Buscar nombre de cliente" />
                    </div>
                
                <div className="bg-white p-0 sm:p-2">
                    <AdminDataTable purchases={mappedPurchases} />
                </div>
                
                <div className="bg-gray-50 px-4 py-6 flex justify-center border-t border-gray-200">
                    <Pagination totalPages={totalPages} />
                </div>
            </Card>
        </div>
    );
}