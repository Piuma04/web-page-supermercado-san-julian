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
            className="w-full my-2  
                            "
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
                        <Image
                            src={fp.imageUrl}
                            alt="Promoción destacada"
                            className="object-contain select-none"
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