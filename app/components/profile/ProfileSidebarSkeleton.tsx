import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfileSidebarSkeleton() {
  return (
    <div className="md:col-span-1">
      <Card className="mb-6">
        <CardHeader className="flex flex-col items-center pb-2">
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
          <Skeleton className="h-7 w-40 mb-2" />
          <Skeleton className="h-4 w-60 mb-2" />
          <Skeleton className="h-5 w-24 rounded-full mt-2" />
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4 mt-4">
            <Skeleton className="h-5 w-full" />
            
            <hr className="my-4" />
              
            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              
              <hr className="my-4" />
              
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}