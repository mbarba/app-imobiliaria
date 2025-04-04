"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  price: number;
  image: string;
  isLaunch: boolean;
}

export default function ImoveisPage() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedOfferType, setSelectedOfferType] = useState("");

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

  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === "" || property.type === selectedType;
    const matchesOfferType = selectedOfferType === "" || 
      (selectedOfferType === "launch" ? property.isLaunch : !property.isLaunch);

    let matchesPrice = true;
    if (selectedPrice !== "") {
      const [minStr, maxStr] = selectedPrice.split("-");
      const min = parseFloat(minStr);
      const max = maxStr ? parseFloat(maxStr) : Infinity;
      matchesPrice = property.price >= min && property.price <= max;
    }

    return matchesType && matchesPrice && matchesOfferType;
  });

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
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Oferta</label>
              <select 
                className="w-full border rounded-md p-2 bg-white hover:border-primary transition-colors"
                value={selectedOfferType}
                onChange={(e) => setSelectedOfferType(e.target.value)}
              >
                <option value="">Todos os tipos de oferta</option>
                <option value="launch">Lançamentos</option>
                <option value="regular">Regulares</option>
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
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 group">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {property.isLaunch && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Lançamento
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Building2 className="w-4 h-4 mr-1" />
                    {property.type}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {property.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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

const properties: Property[] = [
  {
    id: 1,
    title: "Apartamento de Luxo",
    location: "Jardins, São Paulo",
    type: "Apartamento",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    isLaunch: true
  },
  {
    id: 2,
    title: "Casa com Piscina",
    location: "Alphaville, Barueri",
    type: "Casa",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    isLaunch: false
  },
  {
    id: 3,
    title: "Cobertura Duplex",
    location: "Moema, São Paulo",
    type: "Apartamento",
    price: 3800000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    isLaunch: true
  },
  {
    id: 4,
    title: "Casa em Condomínio",
    location: "Granja Viana, Cotia",
    type: "Casa",
    price: 1800000,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    isLaunch: false
  },
  {
    id: 5,
    title: "Apartamento Garden",
    location: "Vila Nova Conceição, São Paulo",
    type: "Apartamento",
    price: 2900000,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    isLaunch: true
  },
  {
    id: 6,
    title: "Sala Comercial",
    location: "Itaim Bibi, São Paulo",
    type: "Comercial",
    price: 950000,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    isLaunch: false
  },
];