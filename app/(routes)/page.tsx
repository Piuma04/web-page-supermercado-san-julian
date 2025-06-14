

import Link from "next/link";


export default function Page() {
  return (
    
      <main className="p-6">
      
        <h1 className="text-2xl font-bold mb-4">Bienvenido a tu tienda online</h1>
        <p className="text-md font-medium mb-4">
          En nuestra tienda online puedes encontrar una gran variedad de productos a precios competitivos.
        </p>
        <ul className="space-y-4">
          <li>
            <Link href="/products" className="text-blue-500 hover:text-blue-700 underline">
              Ver todos los productos
            </Link>
          </li>
        
          <li>
            <Link href="/login" className="text-blue-500 hover:text-blue-700 underline">
              Ingresar
            </Link>
          </li>
          <li>
            <Link href="/cart" className="text-blue-500 hover:text-blue-700 underline">
              Ver carrito de compras
            </Link>
          </li>
        </ul>
      </main>

  );
}

