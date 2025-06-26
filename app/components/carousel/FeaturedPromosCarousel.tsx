import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";

export default async function FeaturedPromosCarousel() {
    type Example = {
        id: number
        url: string
    };

    const featuredPromos: Example[] = [
        { id: 1, url: "https://picsum.photos/id/17/2500/1667" },
        { id: 2, url: "https://picsum.photos/id/18/2500/1667" },
        { id: 3, url: "https://picsum.photos/id/22/4434/3729"},
        { id: 4, url: "https://picsum.photos/id/23/3887/4899"},
    ]; 

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
                        "
                    >
                        <Image
                            src={fp.url}
                            alt="Promoción destacada"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                            priority
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant="ghost" className="left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext variant="ghost" className="right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
    );
}