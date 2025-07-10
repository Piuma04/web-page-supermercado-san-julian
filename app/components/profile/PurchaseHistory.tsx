import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PurchasesList from "./PurchasesList";
import PurchasesListSkeleton from "./PurchasesListSkeleton";
import Pagination from "@/app/components/Pagination";

export default function PurchaseHistory({ 
  currentPage,
  totalPages
}: { 
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="md:col-span-2 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Historial de Compras</CardTitle>
            <CardDescription>Tus pedidos anteriores</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<PurchasesListSkeleton/>}>
            <PurchasesList currentPage={currentPage} />
          </Suspense>
          <div className="mt-6">
            <Pagination totalPages={totalPages} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}