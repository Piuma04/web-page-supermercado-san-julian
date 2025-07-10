import { Skeleton } from "@/components/ui/skeleton";

export default function ProductGridSkeleton() {
  
  const skeletonItems = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {skeletonItems.map((item) => (
        <ProductCardSkeleton key={item} />
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-3">
        {/* Product Image Skeleton */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Product Name Skeleton */}
        <Skeleton className="h-5 w-4/5" />

        {/* Product Cart Controls Skeleton */}
        <div className="flex flex-col space-y-3 items-center">
          <div className="flex items-center space-x-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>

        {/* Product Price Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}