import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 animate-pulse">
      <div className="aspect-square w-full relative mb-4">
        <Skeleton className="absolute inset-0 rounded-md" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-5 w-1/2 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </div>
  );
}

export default function ProductsCarouselSkeleton() {
  return (
    <section className="w-full mt-10">
      <Skeleton className="h-8 w-64 mx-auto mb-5" />
      
      <div className="relative overflow-hidden">
        <div className="flex space-x-4 overflow-hidden py-2">
          {/* Mostrar múltiples skeletons de tarjetas de productos */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index} 
              className="flex-none w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 pb-2"
            >
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
        
        {/* Controles del carrusel */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </section>
  );
}