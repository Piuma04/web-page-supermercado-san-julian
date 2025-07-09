import { Skeleton } from "@/components/ui/skeleton";

export default function PromosCarouselSkeleton() {
  return (
    <div className="w-full my-2 rounded-lg overflow-hidden">
      <div className="relative w-full h-40 sm:h-56 md:h-72 lg:h-96 bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>
        
        {/* Controles del carrusel */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}