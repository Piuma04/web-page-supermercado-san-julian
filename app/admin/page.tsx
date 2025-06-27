import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function AdminPage(){

    return(
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Página de Administración</h1>
            <p className="text-lg text-gray-700">Bienvenido al panel de administración del Supermercado San Julián.</p>
            <div className="flex flex-row justify-between gap-5 mt-4">
                <Button>
                    <Link href="/admin/crud">Hacer altas, bajas o modificaciones de productos</Link>
                </Button>
                <Button>
                    <Link href="/admin/datos">Ver datos con respecto a las ventas</Link>
                </Button>
            </div>


        </div>


        
    );

}