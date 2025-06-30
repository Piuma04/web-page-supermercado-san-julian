import { Skeleton } from "@/components/ui/skeleton";

export default function ProductContentSkeleton() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-white py-8 px-2">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Skeleton */}
          <div className="flex-1 flex flex-col items-center">
            <Skeleton className="relative w-full aspect-square max-w-xs rounded-lg" />
          </div>
          
          {/* Info Skeleton */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Title */}
              <Skeleton className="h-8 w-3/4 mb-2" />
              
              {/* Price */}
              <Skeleton className="h-6 w-24 mb-2" />
              
              {/* Category */}
              <Skeleton className="h-5 w-32 mb-4" />
              
              {/* Description - multiple lines */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            
            {/* Quantity & Add to cart controls */}
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 items-center">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0 sm:mr-4">
                  {/* Quantity controls */}
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-7 w-6 rounded-md" />
                  <Skeleton className="h-7 w-7 rounded-md" />
                </div>
                
                {/* Add to cart button */}
                <Skeleton className="h-10 w-28 rounded-md" />
              </div>
              
              {/* Total price */}
              <Skeleton className="h-5 w-32 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}