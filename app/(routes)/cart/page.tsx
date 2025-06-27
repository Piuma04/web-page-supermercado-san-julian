import CartItems from "@/app/components/cart/CartItems";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
export default function Page(){
    
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Carrito(requiere haber hecho log in)</h1>
            <Suspense>
                <CartItems/>
            </Suspense>
        </main>
    )
}