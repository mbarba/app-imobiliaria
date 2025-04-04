"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PropertyCarouselProps {
  images: string[];
  title: string;
}

export function PropertyCarousel({ images, title }: PropertyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbClick = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="space-y-4">
      {/* Container com largura máxima e centralizado */}
      <div className="max-w-3xl mx-auto">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video">
                  <Image
                    src={image}
                    alt={`${title} - Imagem ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Thumbnails também com largura máxima e centralizado */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-4 gap-2">
          {images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => handleThumbClick(index)}
              className={cn(
                "relative aspect-video rounded-md overflow-hidden",
                "hover:ring-2 hover:ring-primary transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary",
                currentIndex === index && "ring-2 ring-primary"
              )}
            >
              <Image
                src={image}
                alt={`${title} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
