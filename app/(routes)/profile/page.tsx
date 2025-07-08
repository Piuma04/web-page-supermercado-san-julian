import { fetchPurchasesPages, fetchUser } from "@/app/lib/data";
import { auth, signOut } from "@/auth";
import { userRole } from "@prisma/client";
import { LogOut, User, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Pagination from "@/app/components/Pagination";
import { Suspense } from "react";
import PurchasesList from "@/app/components/profile/PurchasesList";
import PurchasesListSkeleton from "@/app/components/profile/PurchasesListSkeleton";
import Link from "next/link";
import PushNotificationConfig from "@/app/components/PushNotificationConfig";
import InstallPrompt from "@/app/components/InstallPrompt";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";


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

    const session = await auth();

  return (

    <Suspense fallback={<div>Loading profile...</div>}>
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
                      {/* PWA */}
                      <InstallPrompt />
                      <PushNotificationConfig />
                      {user?.role === userRole.ADMIN && (
                        <Link href="/admin">
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-purple-50 "
                          >
                            <User className="mr-2 h-4 w-4 text-purple-600" />
                            Panel de Administración
                          </Button>
                        </Link>
                      )}
                        <hr className="my-4" />

                        <form
                          action={async () => {
                          'use server';
                          await signOut({ redirectTo: '/' });
                          }}
                          className="w-full"
                        >
                          <Button
                          type="submit"
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-600"
                          >
                          <LogOut className="mr-2 h-4 w-4" />
                          Cerrar sesión
                          </Button>
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
                    <Suspense fallback={<div>Loading pagination...</div>}>
                      <Pagination totalPages={totalPages} />
                    </Suspense>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Suspense>
  );
}