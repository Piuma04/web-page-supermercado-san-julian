import { Skeleton } from "@/components/ui/skeleton";
import ProfileSidebarSkeleton from "./ProfileSidebarSkeleton";
import PurchaseHistorySkeleton from "./PurchaseHistorySkeleton";

export default function ProfileSkeleton() {
  return (
    <main className="container mx-auto py-8 px-4 animate-pulse">
      <Skeleton className="h-8 w-36 mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileSidebarSkeleton />
        <PurchaseHistorySkeleton />
      </div>
    </main>
  );
}