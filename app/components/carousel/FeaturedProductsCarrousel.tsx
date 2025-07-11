
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "../products/ProductCard";
import Autoplay from "embla-carousel-autoplay";

interface featuredProducts {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
}

export default function FeaturedProductsCarousel({featuredProducts} : {featuredProducts: featuredProducts[]}) {

    return (
        <section className="w-full mt-10">
            <h2 className="text-xl font-bold mb-5 text-center">Productos Destacados</h2>
            <Carousel
                opts={{
                align: "start",
                loop: true,
            }}
            
            
               
            >
                <CarouselContent>
                    {featuredProducts.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="
                            
                                basis-1/2
                                sm:basis-1/3
                                md:basis-1/3
                                lg:basis-1/4
                                xl:basis-1/5
                                pb-2
                            "
                        >
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                imageUrl={product.imageUrl}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant="ghost" className="left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext variant="ghost" className="right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
        </section>
    );
}