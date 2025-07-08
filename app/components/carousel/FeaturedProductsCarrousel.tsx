import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchFilteredProducts} from "../../lib/data";
import ProductCard from "../ProductCard";

export default async function FeaturedProductsCarousel() {
    const featuredProducts = await fetchFilteredProducts("",1);

    return (
        <section className="w-full">
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