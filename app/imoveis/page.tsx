"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ImoveisPage() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-8"
        >
          Nossos Imóveis
        </motion.h1>
        
        {/* Filters */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 p-6 bg-white rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Imóvel</label>
              <select 
                className="w-full border rounded-md p-2 bg-white hover:border-primary transition-colors"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Localização</label>
              <select 
                className="w-full border rounded-md p-2 bg-white hover:border-primary transition-colors"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Todas as localizações</option>
                <option value="jardins">Jardins</option>
                <option value="moema">Moema</option>
                <option value="alphaville">Alphaville</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Faixa de Preço</label>
              <select 
                className="w-full border rounded-md p-2 bg-white hover:border-primary transition-colors"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                <option value="">Todos os preços</option>
                <option value="0-300000">Até R$ 300.000</option>
                <option value="300000-600000">R$ 300.000 - R$ 600.000</option>
                <option value="600000-1000000">R$ 600.000 - R$ 1.000.000</option>
                <option value="1000000+">Acima de R$ 1.000.000</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full h-10">
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                  {property.isLaunch && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="destructive">
                        Lançamento
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building2 className="w-4 h-4 mr-1" />
                    {property.type}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <div className="flex gap-4">
                      <span>{property.area} m²</span>
                      {property.bedrooms > 0 && (
                        <span>{property.bedrooms} quartos</span>
                      )}
                      {property.suites > 0 && (
                        <span>{property.suites} suítes</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {property.price}
                    </span>
                    <Button asChild>
                      <Link href={`/imoveis/${property.id}`}>Ver Detalhes</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center gap-2"
        >
          <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">
            Anterior
          </Button>
          <Button className="bg-primary">1</Button>
          <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">
            2
          </Button>
          <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">
            3
          </Button>
          <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">
            Próxima
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

const properties = [
  {
    id: 1,
    title: "Apartamento de Luxo com Vista para o Mar",
    location: "Av. Beira Mar, 1000 - Praia do Canto, Vitória/ES",
    type: "Apartamento",
    price: "R$ 1.250.000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    bedrooms: 4,
    suites: 2,
    bathrooms: 3,
    area: 180,
    isLaunch: true,
    status: "Disponível",
    description: "Luxuoso apartamento com acabamento premium, varanda gourmet e vista privilegiada para o mar. Localizado em área nobre, próximo a restaurantes, shopping e praia."
  },
  {
    id: 2,
    title: "Casa com Piscina em Condomínio Fechado",
    location: "Alphaville, Barueri/SP",
    type: "Casa",
    price: "R$ 2.500.000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop",
    bedrooms: 5,
    suites: 3,
    bathrooms: 4,
    area: 350,
    isLaunch: false,
    status: "Disponível",
    description: "Ampla casa em condomínio fechado com piscina, área gourmet e jardim. Segurança 24h e infraestrutura completa de lazer."
  },
  {
    id: 3,
    title: "Cobertura Duplex com Terraço",
    location: "Moema, São Paulo/SP",
    type: "Cobertura",
    price: "R$ 3.800.000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
    bedrooms: 4,
    suites: 4,
    bathrooms: 5,
    area: 400,
    isLaunch: true,
    status: "Disponível",
    description: "Cobertura duplex com acabamento de alto padrão, terraço com piscina e vista panorâmica da cidade. Localização privilegiada."
  },
  {
    id: 4,
    title: "Casa Contemporânea em Condomínio",
    location: "Granja Viana, Cotia/SP",
    type: "Casa",
    price: "R$ 1.800.000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
    bedrooms: 3,
    suites: 1,
    bathrooms: 4,
    area: 250,
    isLaunch: false,
    status: "Disponível",
    description: "Casa moderna com projeto arquitetônico diferenciado, integração total com a área externa e muito verde."
  },
  {
    id: 5,
    title: "Apartamento Garden com Área Privativa",
    location: "Vila Nova Conceição, São Paulo/SP",
    type: "Apartamento",
    price: "R$ 2.900.000",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=500&fit=crop",
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    area: 280,
    isLaunch: true,
    status: "Disponível",
    description: "Apartamento garden com 280m² de área privativa, jardim e área gourmet. Prédio com lazer completo em localização nobre."
  },
  {
    id: 6,
    title: "Sala Comercial Premium",
    location: "Itaim Bibi, São Paulo/SP",
    type: "Comercial",
    price: "R$ 950.000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    bedrooms: 0,
    suites: 0,
    bathrooms: 2,
    area: 85,
    isLaunch: false,
    status: "Disponível",
    description: "Sala comercial com acabamento premium, pronta para uso. Localização estratégica com fácil acesso."
  }
];