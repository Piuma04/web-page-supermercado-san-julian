import { Suspense } from "react";
import { fetchDisplayedBanners, fetchFilteredProducts } from "../../lib/data";
import FeaturedPromosCarousel from "./FeaturedPromosCarousel";
import FeaturedProductsCarousel from "./FeaturedProductsCarrousel";
import PromosCarouselSkeleton from "./PromosCarouselSkeleton";
import ProductsCarouselSkeleton from "./ProductsCarouselSkeleton";

// Componente que carga datos para el carrusel de promociones
async function PromosCarouselWithData() {
  const featuredPromos = await fetchDisplayedBanners();
  return <FeaturedPromosCarousel featuredPromos={featuredPromos} />;
}

// Componente que carga datos para el carrusel de productos
async function ProductsCarouselWithData() {
  const featuredProducts = await fetchFilteredProducts("", 1);
  return <FeaturedProductsCarousel featuredProducts={featuredProducts} />;
}

// Componente principal que utiliza Suspense para cargar ambos carruseles
export default function HomeCarousels() {
  return (
    <div className="w-full max-w-full overflow-hidden">
      
      
      

      <Suspense fallback={<PromosCarouselSkeleton />}>
        <PromosCarouselWithData />
      </Suspense>
 
      <Suspense fallback={<ProductsCarouselSkeleton />}>
        <ProductsCarouselWithData />
      </Suspense>
    </div>
  );
}