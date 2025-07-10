import { Skeleton } from "@/components/ui/skeleton";
import { CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export default function SimilarProductsCarouselSkeleton() {
  // Generar los items del carrusel
  const generateSkeletonItems = () => {
    return Array(5).fill(0).map((_, index) => (
      <div 
        key={index} 
        className="pl-4 basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
      >
        <div className="h-full">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse h-full">
            {/* Imagen del producto */}
            <div className="aspect-square w-full relative">
              <Skeleton className="absolute inset-0" />
            </div>
            
            {/* Información del producto */}
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              
              {/* Botones */}
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="w-full mb-8 animate-pulse">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-3/4 max-w-md" />
      </div>
      
      {/* Contenido del carrusel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex -ml-4">
            {generateSkeletonItems()}
          </div>
        </div>
        
        {/* Controles de navegación en móvil */}
        <div className="sm:hidden mt-4 flex justify-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </section>
  );
}