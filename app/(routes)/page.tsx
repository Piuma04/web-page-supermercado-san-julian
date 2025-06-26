

import Link from "next/link";
import FeaturedPromosCarousel from "../components/carousel/FeaturedPromosCarousel";
import FeaturedProductsCarousel from "../components/carousel/FeaturedProductsCarrousel";


export default function Page() {
  return (
    
      <main className="p-2">
      
        

        <FeaturedPromosCarousel/>
        <FeaturedProductsCarousel/>


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

