'use client';

import { useActionState } from "react";
import { checkout } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function CartForm() {
    const [errorMessage, formAction, isPending] = useActionState(checkout, undefined);
    return (
        <form action={formAction} className="text-center">
            <Button 
                type="submit" 
                disabled={isPending}
                aria-label="Finalizar compra"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto text-base flex items-center justify-center gap-2 shadow-md"
            >
                <>
                    <CreditCard size={18} />
                    {isPending ? "Procesando pago..." : "Finalizar compra"}
                </>
            </Button>
            {errorMessage && (
                <div className="text-red-600 mt-4">
                    {errorMessage}
                </div>
            )}
        </form>
    );
}