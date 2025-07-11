import type { Metadata } from "next";
import "../styles/globals.css";

import Header from "../components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {CategoriesSidebar} from "../components/categoriesSidebar/CategoriesSidebar";
import { SessionProvider } from "next-auth/react";
import { Footer } from "../components/Footer";
import { Suspense } from "react";



export const metadata: Metadata = {
  title: "Supermercado San Julian",
  description: "Supermercado San Julián, tu supermercado de confianza",
  keywords: [
    "supermercado",
    "San Julián",
    "compras",
    "alimentos",
    "ofertas",
    "descuentos",
  ],
  //authors: [{ name: "Supermercado San Julián", url: "https://san-julian.com" }],
  openGraph: {
    title: "Supermercado San Julian",
    description: "Supermercado San Julián, tu supermercado de confianza",
    //url: "https://san-julian.com",
    siteName: "Supermercado San Julián",
    /* images: [
      {
        url: "https://san-julian.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Supermercado San Julián"
      }
    ], */
    locale: "es_AR",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <SessionProvider>
        <SidebarProvider defaultOpen={false}>
        
         
            <Suspense>
              <CategoriesSidebar />
            </Suspense>
            
            <SidebarInset >
              <Header />
		            <main className="flex-1 pt-4">{children}</main>
              <Footer />
            </SidebarInset>
        
        </SidebarProvider>
      </SessionProvider>
    
  );
}
