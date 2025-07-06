// app/login/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";
import AdminPanelSidenav from "../components/admin/adminSidenav/AdminPanelSidenav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "Pagina de Administración - Supermercado San Julian",
  description: "Administra tu supermercado con facilidad",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  const session = await auth()

if(!session?.user || session.user.role !== 'ADMIN'){
  redirect("/")
}
  

  return (
   
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <AdminPanelSidenav />
          </div>
          <div className="flex-grow md:overflow-y-auto ">{children}</div>
        </div>
   
  );
}