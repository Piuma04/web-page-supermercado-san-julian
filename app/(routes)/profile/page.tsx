import { fetchPurchasesPages, fetchUser } from "@/app/lib/data";
import { signOut } from "@/auth";
import { userRole } from "@prisma/client";
import { LogOut, User, ShoppingBag, Settings, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";
import PurchasesList from "@/app/components/profile/PurchasesList";
import PurchasesListSkeleton from "@/app/components/profile/PurchasesListSkeleton";

export default async function Profile(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>
  }) {  
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const [user, totalPages] = await Promise.all([
    fetchUser(),
    fetchPurchasesPages()
    ]);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mi Perfil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader className="flex flex-col items-center pb-2">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-bold text-center">{user?.email|| "Usuario"}</CardTitle>
              <CardDescription className="text-center">{user?.email}</CardDescription>
              
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user?.role === userRole.ADMIN 
                    ? "bg-purple-100 text-purple-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {user?.role === userRole.ADMIN ? "Administrador" : "Usuario"}
                </span>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4 mt-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  <span>Se unió {user?.createdAt.toLocaleDateString()}</span>
                </div>
                
                <hr className="my-4" />
                
                <nav className="space-y-2">
                  
                  <form
                    action={async () => {
                      'use server';
                      await signOut({ redirectTo: '/' });
                    }}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="w-full flex items-center px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </form>
                </nav>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Purchases Card */}

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
              
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination totalPages={totalPages} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}