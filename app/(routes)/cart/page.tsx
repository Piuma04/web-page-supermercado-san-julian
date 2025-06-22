import CartItems from "@/app/components/CartItems";
import { signOut } from "@/auth";
import { Suspense } from "react";
export default function Page(){
    
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Carrito(requiere haber hecho log in)</h1>
            
            
            <Suspense>
                <CartItems/>
            </Suspense>
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
            >
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Cerrar sesion
            </button>
            </form>
        </main>
    )
}