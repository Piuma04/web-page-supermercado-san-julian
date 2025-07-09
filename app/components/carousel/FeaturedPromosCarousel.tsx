import { fetchDisplayedBanners } from "@/app/lib/data";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default async function FeaturedPromosCarousel() {
    
    const featuredPromos = await fetchDisplayedBanners();

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full my-2"
        >
            <CarouselContent>
                {featuredPromos.map((fp) => (
                    <CarouselItem
                        key={fp.id}
                        className="
                            relative 
                            w-full 
                            h-40 
                            sm:h-56 
                            md:h-72 
                            lg:h-96 
                            overflow-hidden 
                            shadow-lg
                            transition-all
                            duration-300
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Image
                            src={fp.imageUrl}
                            alt="Promoción destacada"
                            className="object-contain select-none"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                            width={800}
                            height={400}
                            priority
                            draggable={false}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant="ghost" className="left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext variant="ghost" className="right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
    );
}