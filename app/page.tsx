"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Search, Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
          alt="Imóvel de luxo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Encontre o Imóvel dos Seus Sonhos
              </h1>
              <p className="text-xl text-white mb-8">
                As melhores ofertas de imóveis em um só lugar
              </p>
            </motion.div>
            
            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 backdrop-blur-md bg-white/95">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Localização</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input 
                        placeholder="Digite a localização" 
                        className="pl-10 h-12 bg-white hover:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tipo de Imóvel</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select className="w-full pl-10 h-12 rounded-md border border-input bg-white hover:border-primary transition-colors">
                        <option value="">Selecione o tipo</option>
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="comercial">Comercial</option>
                        <option value="terreno">Terreno</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Faixa de Preço</label>
                    <select className="w-full h-12 rounded-md border border-input bg-white hover:border-primary transition-colors">
                      <option value="">Selecione o valor</option>
                      <option value="0-300000">Até R$ 300.000</option>
                      <option value="300000-600000">R$ 300.000 - R$ 600.000</option>
                      <option value="600000-1000000">R$ 600.000 - R$ 1.000.000</option>
                      <option value="1000000+">Acima de R$ 1.000.000</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button className="w-full h-12 text-base hover:scale-105 transition-transform">
                      <Search className="w-5 h-5 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Imóveis em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden group">
                    <div className="relative h-48">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{property.title}</h3>
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
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link href="/imoveis" className="gap-2">
                  Ver todos os imóveis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Por que escolher a ImobPrime?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {benefit.icon}
                  <h3 className="text-xl font-bold mt-4 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const featuredProperties = [
  {
    id: 1,
    title: "Apartamento de Luxo",
    location: "Jardins, São Paulo",
    type: "Apartamento",
    price: "R$ 1.200.000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    title: "Casa com Piscina",
    location: "Alphaville, Barueri",
    type: "Casa",
    price: "R$ 2.500.000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 3,
    title: "Cobertura Duplex",
    location: "Moema, São Paulo",
    type: "Apartamento",
    price: "R$ 3.800.000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const benefits = [
  {
    icon: <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
      <Building2 className="w-8 h-8 text-white" />
    </div>,
    title: "Amplo Portfólio",
    description: "Centenas de imóveis disponíveis para compra e aluguel em toda a região.",
  },
  {
    icon: <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
      <MapPin className="w-8 h-8 text-white" />
    </div>,
    title: "Localização Privilegiada",
    description: "Imóveis nas melhores localizações da cidade.",
  },
  {
    icon: <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
      <Phone className="w-8 h-8 text-white" />
    </div>,
    title: "Atendimento Personalizado",
    description: "Equipe especializada para ajudar você a encontrar o imóvel ideal.",
  },
];