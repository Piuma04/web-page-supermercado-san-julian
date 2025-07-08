import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchPurchases } from "@/app/lib/data";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

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
        <div key={purchase.id} className="flex flex-col border-b pb-4">
          <div className="flex items-center justify-between">
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
              <p className="font-medium text-red-600">${(purchase.total/100).toFixed(2)}</p>
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
            <details className="w-full">
              <summary className="list-none cursor-pointer font-medium text-gray-900 hover:underline">
                Ver detalles de la compra <ChevronDown className="h-4 w-4 inline-block" />
              </summary>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Productos comprados:</h4>
                <div className="text-sm text-gray-700">
                  {purchase.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-1">{line}</p>
                  ))}
                </div>
              </div>
            </details>
        </div>
      ))}
    </div>
  );
}