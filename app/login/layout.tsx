// app/login/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Iniciar sesión - Supermercado San Julian",
  description: "Pantalla de inicio de sesión del supermercado San Julian",
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