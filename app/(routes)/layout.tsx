import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import HeaderServer from "../components/HeaderServer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/sidebar/AppSidebar";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={false}>
            <AppSidebar/>
            <HeaderServer/>
            {children}

        </SidebarProvider>
        
        
      </body>
    </html>
  );
}
