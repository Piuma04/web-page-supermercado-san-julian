import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchPurchases } from "@/app/lib/data";
import clsx from "clsx";

export default async function PurchasesList({ currentPage }: { currentPage: number }) {
  const purchases = await fetchPurchases(currentPage);
  
  if (!purchases || purchases.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay compras</h3>
        <p className="mt-1 text-sm text-gray-500">Todavía no has realizado ninguna compra</p>
        <div className="mt-6">
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Explorar productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <div key={purchase.id} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-md">
              <ShoppingBag className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="font-medium">Pedido #{purchase.id}</p>
              <p className="text-sm text-gray-500">
                {purchase.createdAt.toLocaleDateString()} - {purchase.createdAt.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-red-600">${purchase.total?.toFixed(2) || "0.00"}</p>
            <p className={clsx('text-large', {
              'text-green-600': purchase.status === 'approved',
              'text-yellow-600': purchase.status === 'pending', 
              'text-red-600': purchase.status === 'canceled',
              'text-gray-600': !purchase.status || !['approved', 'pending', 'canceled'].includes(purchase.status)
            })}>
              {purchase.status === 'approved' ? 'Completado' : 
               purchase.status === 'pending' ? 'Pendiente' : 
               purchase.status === 'canceled' ? 'Cancelado' : purchase.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}