import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import HeaderServer from "../components/HeaderServer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {CategoriesSidebar} from "../components/categoriesSidebar/CategoriesSidebar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "../components/Footer";
import { Suspense } from "react";



export const metadata: Metadata = {
  title: "Principal - Supermercado San Julian",
  description: "Pagina principal del supermercado San Julian",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
      <main className="flex flex-col min-h-screen">
        <SessionProvider>
          <SidebarProvider defaultOpen={false}>

            <Suspense>
              <CategoriesSidebar />
            </Suspense>
            
            <SidebarInset>
      

           
              <HeaderServer />
           
                <main className="flex-1 pt-4">{children}</main>

              <Footer />
                  
            </SidebarInset>
          </SidebarProvider>
        </SessionProvider>

      </main>
  
    
  );
}
