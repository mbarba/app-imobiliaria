import { LaunchCard } from "@/components/launch-card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Usando os mesmos dados fictícios da página de imóveis
const launches = [
  {
    id: 1,
    title: "Apartamento de Luxo com Vista para o Mar",
    location: "Av. Beira Mar, 1000 - Praia do Canto, Vitória/ES",
    type: "Apartamento",
    price: 1250000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    bedrooms: 4,
    suites: 2,
    bathrooms: 3,
    area: 180,
    isLaunch: true,
  },
  {
    id: 3,
    title: "Cobertura Duplex com Terraço",
    location: "Moema, São Paulo/SP",
    type: "Cobertura",
    price: 3800000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
    bedrooms: 4,
    suites: 4,
    bathrooms: 5,
    area: 400,
    isLaunch: true,
  },
  {
    id: 5,
    title: "Apartamento Garden com Área Privativa",
    location: "Vila Nova Conceição, São Paulo/SP",
    type: "Apartamento",
    price: 2900000,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=500&fit=crop",
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    area: 280,
    isLaunch: true,
  }
].filter(property => property.isLaunch);

export default function LaunchesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/459389137.sd.mp4?s=956afd10865e06547e69d3150ce0b3c8e8385d3f" type="video/mp4" />
          </video>
        </div>
        <div className="container relative z-20 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Lançamentos Exclusivos
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            Descubra os mais novos empreendimentos com condições especiais de pré-lançamento
          </p>
        </div>
      </section>

      {/* Launches Grid */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Últimos Lançamentos</h2>
            <p className="text-muted-foreground">
              Conheça nossos empreendimentos mais recentes
            </p>
          </div>
          <Button variant="ghost" className="gap-2">
            Ver todos
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {launches.map((launch, index) => (
            <LaunchCard
              key={launch.id}
              id={launch.id}
              title={launch.title}
              location={launch.location}
              price={launch.price}
              image={launch.image}
              bedrooms={launch.bedrooms}
              suites={launch.suites}
              bathrooms={launch.bathrooms}
              area={launch.area}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="bg-primary rounded-xl p-8 md:p-12 text-primary-foreground text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quer ser o primeiro a saber dos novos lançamentos?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Cadastre-se para receber novidades e condições exclusivas de pré-lançamento
          </p>
          <Button size="lg" variant="secondary">
            Cadastrar Interesse
          </Button>
        </div>
      </section>
    </div>
  );
}
