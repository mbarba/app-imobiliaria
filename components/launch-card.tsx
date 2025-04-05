"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bath, Bed, MapPin, SquareIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface LaunchCardProps {
  id: string | number;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  area: number;
  index: number;
}

export function LaunchCard({
  id,
  title,
  location,
  price,
  image,
  bedrooms,
  suites,
  bathrooms,
  area,
  index,
}: LaunchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[500px] overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <Badge className="mb-4 w-fit bg-primary text-primary-foreground">
          Lançamento
        </Badge>
        
        <h3 className="mb-2 text-2xl font-bold">{title}</h3>
        
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{bedrooms} quartos</span>
          </div>
          {suites > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{suites} suítes</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms} banhos</span>
          </div>
          <div className="flex items-center gap-1">
            <SquareIcon className="h-4 w-4" />
            <span>{area} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            R$ {formatCurrency(price)}
          </span>
          <Button asChild>
            <Link href={`/imoveis/${id}`}>Ver Detalhes</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
