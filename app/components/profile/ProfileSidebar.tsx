import { User, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { signOut } from "@/auth";
import { userRole } from "@prisma/client";
import PushNotificationConfig from "./PushNotificationConfig";

interface User {
  email: string;
  role: userRole;
  createdAt: Date;
}

export default function ProfileSidebar({ user }: { user: User }) {
  return (
    <div className="md:col-span-1">
      <Card className="mb-6">
        <CardHeader className="flex flex-col items-center pb-2">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-bold text-center w-full truncate">{user?.email || "Usuario"}</CardTitle>
          
          <div>
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
            <div className="flex items-center text-sm text-gray-600 w-full">
              <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="truncate">Se unió {user?.createdAt.toLocaleDateString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })}</span>
            </div>
            
            <hr className="my-4" />
              
            <nav className="space-y-2">  
              {/* PWA */}
              <PushNotificationConfig />
              {user?.role === userRole.ADMIN && (
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-purple-50"
                  >
                    <User className="mr-2 h-4 w-4 text-purple-600 flex-shrink-0" />
                    <span className="truncate">Panel de Administración</span>
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
                  <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Cerrar sesión</span>
                </Button>
              </form>
            </nav>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}