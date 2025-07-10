import { Suspense } from "react";
import ProfileSidebar from "./ProfileSidebar";
import PurchaseHistory from "./PurchaseHistory";
import ProfileSideSkeleton from "./ProfileSidebarSkeleton";
import PurchaseHistorySkeleton from "./PurchaseHistorySkeleton";
import { fetchUser, fetchPurchasesPages } from "@/app/lib/data";

export default async function ProfileLayout({
  currentPage
}: {
  currentPage: number
}) {
  const [user, totalPages] = await Promise.all([
    fetchUser(),
    fetchPurchasesPages()
  ]);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mi Perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar con información de usuario */}
        <Suspense fallback={<ProfileSideSkeleton />}>
          <ProfileSidebar user={user!} />
        </Suspense>
        
        {/* Historial de compras */}
        <Suspense fallback={<PurchaseHistorySkeleton />}>
          <PurchaseHistory currentPage={currentPage} totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}