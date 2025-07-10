import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Home } from "lucide-react";

export default function ProductFullViewSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Home size={16} />
        <span>Inicio</span>
        <ChevronRight size={14} />
        <Skeleton className="h-4 w-24" />
        <ChevronRight size={14} />
        <Skeleton className="h-4 w-32" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image skeleton */}
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          <Skeleton className="aspect-square w-full" />
        </div>
        
        {/* Product info skeleton */}
        <div className="space-y-6">
          {/* Name */}
          <Skeleton className="h-10 w-3/4" />
          
          {/* Price */}
          <Skeleton className="h-8 w-36" />
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>
          
          {/* Description title */}
          <Skeleton className="h-6 w-32" />
          
          {/* Description paragraphs */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          {/* Quantity controls */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded-md">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-12" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
          
          {/* Add to cart button */}
          <Skeleton className="h-10 w-full max-w-xs" />
        </div>
      </div>
    </div>
  );
}