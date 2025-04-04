import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  BedDouble, 
  Bath, 
  SquareStack, 
  MapPin, 
  Calendar,
  ArrowLeft,
  Phone,
  Mail
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropertyCarousel } from "@/components/property-carousel";

interface Property {
  id: string;
  title: string;
  status: "active" | "inactive";
  type: "apartment" | "house" | "commercial" | "land";
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

// Lista de propriedades para gerar páginas estáticas
const properties: Property[] = [
  {
    id: "1",
    title: "Apartamento Luxuoso",
    status: "active" as const,
    type: "apartment" as const,
    price: 1200000,
    address: "Rua das Flores, 123",
    description: "Lindo apartamento com vista para o mar, localizado em área nobre. Acabamento premium em todos os ambientes, piso em porcelanato, iluminação em LED. Cozinha planejada com ilha gourmet, área de serviço separada. Suíte master com closet e banheira de hidromassagem. Varanda gourmet com churrasqueira. Prédio com infraestrutura completa de lazer, incluindo piscina, academia, sauna, salão de festas e playground. Segurança 24h, 2 vagas de garagem cobertas.",
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      parking: 2
    },
    amenities: [
      "Piscina",
      "Academia",
      "Sauna",
      "Salão de Festas",
      "Playground",
      "Segurança 24h",
      "Churrasqueira",
      "Elevador"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80"
    ],
    realtor: {
      name: "João Silva",
      phone: "(85) 98888-8888",
      email: "joao.silva@imobiliaria.com",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80"
    },
    createdAt: "2025-04-04"
  },
  {
    id: "2",
    title: "Casa com Piscina",
    status: "inactive" as const,
    type: "house" as const,
    price: 800000,
    address: "Av. Principal, 456",
    description: "Casa espaçosa com piscina e churrasqueira",
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      parking: 3
    },
    amenities: [
      "Piscina",
      "Churrasqueira",
      "Jardim",
      "Segurança 24h"
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    realtor: {
      name: "Maria Silva",
      phone: "(85) 97777-7777",
      email: "maria.silva@imobiliaria.com",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80"
    },
    createdAt: "2025-04-03"
  }
];

// Gera os parâmetros estáticos para as páginas
export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

// Função para buscar os dados do imóvel
async function getProperty(id: string): Promise<Property> {
  const property = properties.find(p => p.id === id);
  if (!property) throw new Error("Property not found");
  return property;
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header com Título, Preço e Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <Badge variant={property.status === "active" ? "success" : "secondary"}>
              {property.status === "active" ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            {property.address}
          </div>
          <p className="text-3xl font-bold text-primary">
            {formatPrice(property.price)}
          </p>
        </div>

        {/* Carrossel de Fotos */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-4">
              <PropertyCarousel images={property.images} title={property.title} />
            </CardContent>
          </Card>
        </div>

        {/* Características Principais */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <BedDouble className="w-8 h-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">{property.features.bedrooms}</span>
              <span className="text-muted-foreground">Quartos</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Bath className="w-8 h-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">{property.features.bathrooms}</span>
              <span className="text-muted-foreground">Banheiros</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <SquareStack className="w-8 h-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">{property.features.area}</span>
              <span className="text-muted-foreground">m²</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Building2 className="w-8 h-8 mb-2 text-primary" />
              <span className="text-2xl font-bold">{property.features.parking}</span>
              <span className="text-muted-foreground">Vagas</span>
            </CardContent>
          </Card>
        </div>

        {/* Descrição */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">
              {property.description}
            </p>
          </CardContent>
        </Card>

        {/* Comodidades */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Comodidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Corretor */}
        <Card>
          <CardHeader>
            <CardTitle>Corretor Responsável</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src={property.realtor.photo}
                  alt={property.realtor.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-semibold">{property.realtor.name}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    {property.realtor.phone}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    {property.realtor.email}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}