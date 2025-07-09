import FeaturedPromosCarousel from "../components/carousel/FeaturedPromosCarousel";
import FeaturedProductsCarousel from "../components/carousel/FeaturedProductsCarrousel";

export default function Page() {
  return (
    <main className="p-2 flex justify-center">
      <div className="w-full">
        <FeaturedPromosCarousel />
        <FeaturedProductsCarousel />
      </div>
    </main>
  );
}

