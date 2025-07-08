import type { Metadata } from "next";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Iniciar sesión - Supermercado San Julian",
  description: "Pantalla de inicio de sesión del supermercado San Julian",
  keywords: [
    "login",
    "iniciar sesión",
    "supermercado",
    "San Julian",
    "acceso",
    "usuario",
    "contraseña",
    "compras online",
    "panel de usuario"
  ],
  //authors: [{ name: "Supermercado San Julian", url: "https://sanjulian.com" }],
  openGraph: {
    title: "Iniciar sesión - Supermercado San Julian",
    description: "Accede a tu cuenta en el supermercado San Julian.",
    url: "https://sanjulian.com/login",
    siteName: "Supermercado San Julian",
    type: "website",
    locale: "es_AR",
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
        <main>{children}</main>
      
  );
}