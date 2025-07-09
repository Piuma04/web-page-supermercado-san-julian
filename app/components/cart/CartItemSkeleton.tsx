import { Skeleton } from "@/components/ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-100 animate-pulse mb-4">
      {/* Skeleton para la imagen del producto */}
      <div className="w-24 h-24 flex-shrink-0">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      
      {/* Skeleton para la información del producto */}
      <div className="flex-grow text-center sm:text-left w-full">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
      </div>
      
      {/* Skeleton para los botones de cantidad */}
      <div className="flex-shrink-0 mt-4 sm:mt-0 flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-10 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}

export default function CartItemsSkeleton() {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {/* Título del carrito */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-40" />
      </div>
      
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Order Summary - Arriba en móvil, derecha en desktop */}
        <div className="bg-white p-5 rounded-lg shadow-md mb-6 w-full md:w-1/3 order-first md:order-last">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between py-2 border-b">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between py-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <div className="mt-4">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
        
        {/* Cart Items - Abajo en móvil, izquierda en desktop */}
        <div className="space-y-2 mb-8 w-full md:w-2/3 order-last md:order-first">
          {/* Mostrar 3 skeletons de productos */}
          {[1, 2, 3].map((index) => (
            <CartItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}