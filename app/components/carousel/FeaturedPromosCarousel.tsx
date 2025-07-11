'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

interface featuredPromos {
    id: number;
    imageUrl: string;
}

export default function FeaturedPromosCarousel({featuredPromos} : {featuredPromos: featuredPromos[]} = {featuredPromos: []}){
    
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[Autoplay(
                {
                    delay: 5000, // Tiempo en milisegundos entre transiciones
                    stopOnInteraction: true, // Detiene el autoplay al interactuar con el carrusel
                }
            )]}
            className="w-full my-2  "
        >
            <CarouselContent className="">
                {featuredPromos.map((fp) => (
                    <CarouselItem
                        key={fp.id}
                        className="
                flex items-center justify-center
                h-40 
                sm:h-56 
                md:h-72 
                lg:h-96 
            "
                    >
                        <div className="relative w-full h-full">
                        <Image
                            src={fp.imageUrl}
                            alt="Promoción destacada"
                            className="w-auto h-auto object-contain select-none"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            priority
                            draggable={false}
                        />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant="ghost" className="left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext variant="ghost" className="right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
    );
}