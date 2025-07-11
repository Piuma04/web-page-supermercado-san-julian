import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import ProductCard from "../products/ProductCard";
import { fetchFilteredProducts } from "@/app/lib/data";

export default async function SimilarProductsCarousel({ categoryId, productId }: { categoryId: number, productId:number }) {
    // Actually fetch products from the same category instead of generic featured products
    const similarProducts = await fetchFilteredProducts("", 1,categoryId);
    
    // Handle empty results
    if (!similarProducts || similarProducts.length === 0) {
        return null;
    }

    return (
        <section className="w-full  mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Pensamos que podria interesarte estos productos...
                </h2>
               
            </div>
            
            <Carousel
                
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {similarProducts.filter((product) => product.id !== productId).map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="pl-4 basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pb-2"
                        >
                            <div className="h-full">
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    imageUrl={product.imageUrl}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="sm:hidden mt-4 flex justify-center gap-2">
                    <CarouselPrevious variant="outline" className="left-0 top-1/2 -translate-y-3" />
                    <CarouselNext variant="outline" className="right-0 top-1/2 -translate-y-3" />
                </div>
            </Carousel>
        </section>
    );
}