import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function AdminPage(){

    return(
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-red-700 mb-4 text-center">
        Página de Administración
      </h1>
      <p className="text-center text-gray-700 max-w-xl">
        Bienvenido al panel de administración del Supermercado San Julián.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 w-full max-w-lg">
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
          <Link href="/admin/crud" className="w-full text-center px-4 py-2">
            Hacer altas, bajas o modificaciones de productos
          </Link>
        </Button>
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto">
          <Link href="/admin/datos" className="w-full text-center px-4 py-2">
            Ver datos con respecto a las ventas
          </Link>
        </Button>
      </div>

      <div className="mt-10">
        <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
          <Link href="/" className="px-6 py-2">
            Ir a la pagina del supermercado para clientes
          </Link>
        </Button>
      </div>
    </div>


        
    );

}