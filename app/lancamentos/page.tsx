"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Importar o mesmo tipo Property do dashboard
interface Property {
  id: string;
  title: string;
  status: "active" | "inactive";
  type: "apartment" | "house" | "commercial" | "land";
  isLaunch: boolean;
  price: number;
  address: string;
  description: string;
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
  };
  amenities: string[];
  images: string[];
  realtor: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  createdAt: string;
}

export default function LancamentosPage() {
  // Aqui você deve integrar com sua API para buscar apenas os lançamentos
  const properties: Property[] = [
    {
      id: "1",
      title: "Residencial Vista Mar",
      status: "active",
      type: "apartment",
      isLaunch: true,
      price: 850000,
      address: "Av. Beira Mar, 1000",
      description: "Apartamentos de alto padrão com vista para o mar",
      features: {
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        parking: 2
      },
      amenities: ["Piscina", "Academia", "Área Gourmet"],
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"],
      realtor: {
        name: "João Silva",
        phone: "(11) 99999-9999",
        email: "joao@imobprime.com.br",
        photo: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      createdAt: new Date().toISOString()
    },
    // Adicione mais lançamentos aqui
  ];

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Lançamentos ImobPrime</h1>
        <p className="text-xl text-muted-foreground">
          Conheça nossos mais novos empreendimentos e garanta sua unidade
        </p>
      </motion.div>

      {/* Grid de Lançamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Lançamento
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{property.title}</h3>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.address}
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Building2 className="w-4 h-4 mr-2" />
                  {property.type === "apartment" ? "Apartamento" : 
                   property.type === "house" ? "Casa" : 
                   property.type === "commercial" ? "Comercial" : "Terreno"}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(property.price)}
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

      {/* Seção de Contato */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Interessado em algum lançamento?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Entre em contato com nossos especialistas para mais informações
        </p>
        <Button size="lg" asChild>
          <Link href="/contato">Falar com um Corretor</Link>
        </Button>
      </motion.div>
    </div>
  );
}
