

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
        
        

        
        </ul>
      </main>

  );
}

