import { Skeleton } from "@/components/ui/skeleton";

export default function PurchasesListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Generar 3 filas de esqueletos de compras */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-3">
            {/* Esqueleto para el ícono */}
            <Skeleton className="h-10 w-10 rounded-md" />
            
            <div>
              {/* Esqueletos para título y fecha */}
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          
          <div className="text-right">
            {/* Esqueletos para precio y estado */}
            <Skeleton className="h-5 w-16 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}