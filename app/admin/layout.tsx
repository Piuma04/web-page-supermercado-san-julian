// app/login/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import AdminPanelSidenav from "../components/admin/adminSidenav/AdminPanelSidenav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pagina de Administración - Supermercado San Julian",
  description: "Administra tu supermercado con facilidad",
};

export default  function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  

  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <AdminPanelSidenav />
          </div>
          <div className="flex-grow md:overflow-y-auto ">{children}</div>
        </div>
      </body>
    </html>
  );
}