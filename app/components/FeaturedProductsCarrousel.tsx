import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { fetchProducts } from "../lib/data";
import ProductCard from "./ProductCard";

export default async function FeaturedProductsCarousel() {
    const featuredProducts = await fetchProducts();

    return (
        <section className="w-full mt-7 ">
            <h2 className="text-xl font-bold mb-2 text-center">Productos Destacados</h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {featuredProducts.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="
                                basis-full
                                sm:basis-1/2
                                md:basis-1/3
                                lg:basis-1/4
                                xl:basis-1/5
                                h-72
                                sm:h-72
                                md:h-80
                                lg:h-96
                                flex items-center justify-center
                                px-2
                            "
                        >
                            <div className="h-full w-full flex items-center justify-center overflow-hidden">
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description ?? ""}
                                    price={product.price}
                                    imageUrl={product.imageUrl ?? ""}
                                    layout="horizontal"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant="ghost" className="left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext variant="ghost" className="right-2 top-1/2 -translate-y-1/2" />
            </Carousel>
        </section>
    );
}