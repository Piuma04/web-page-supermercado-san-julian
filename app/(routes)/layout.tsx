import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import HeaderServer from "../components/HeaderServer";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {CategoriesSidebar} from "../components/categoriesSidebar/CategoriesSidebar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "../components/Footer";
import { Suspense } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supermercado San Julian",
  keywords: ["supermercado", "productos", "compras", "tienda online"],
  description: "Supermercado San Julian, mercado que venede distintos tipos de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <link rel="icon" href="/images/favicon.ico" />
      <body className="flex flex-col min-h-screen">
    
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
  
      </body>

    </html>
  );
}
