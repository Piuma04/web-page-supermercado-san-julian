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
    <main className="flex flex-col min-h-screen">
      <SessionProvider>
        <SidebarProvider defaultOpen={false}>
          {/* Make these direct siblings wrapped in a flex container */}
          <div className="flex flex-1 overflow-hidden">
            <Suspense>
              <CategoriesSidebar />
            </Suspense>
            
            <SidebarInset className="overflow-x-hidden">
              <HeaderServer />
              <div className="flex-1 pt-4">{children}</div>
              <Footer />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </main>
  );
}
