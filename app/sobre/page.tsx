import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Building2, Clock, HandshakeIcon, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop"
          alt="Edifício corporativo moderno"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Nossa História
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Há mais de 20 anos construindo sonhos e realizando o desejo da casa própria
          </p>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <CardContent className="space-y-4 p-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Missão</h3>
              <p className="text-muted-foreground">
                Realizar sonhos através da intermediação imobiliária, proporcionando a melhor experiência na compra, venda ou locação de imóveis.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4 p-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Visão</h3>
              <p className="text-muted-foreground">
                Ser reconhecida como a imobiliária mais inovadora e confiável do mercado, referência em atendimento e satisfação do cliente.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4 p-0">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <HandshakeIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Valores</h3>
              <p className="text-muted-foreground">
                Ética, transparência, inovação, excelência no atendimento e compromisso com o resultado dos nossos clientes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+1000</div>
              <div className="text-sm text-muted-foreground">Imóveis vendidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+500</div>
              <div className="text-sm text-muted-foreground">Clientes satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20</div>
              <div className="text-sm text-muted-foreground">Anos de experiência</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">Prêmios recebidos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "João Silva",
              role: "Diretor Executivo",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
            },
            {
              name: "Maria Santos",
              role: "Gerente de Vendas",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
            },
            {
              name: "Pedro Oliveira",
              role: "Corretor Sênior",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
            },
            {
              name: "Ana Costa",
              role: "Arquiteta",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
            }
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Reconhecimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: "2023",
                title: "Melhor Imobiliária do Ano",
                org: "Prêmio Master Imobiliário"
              },
              {
                year: "2022",
                title: "Excelência em Atendimento",
                org: "Associação do Mercado Imobiliário"
              },
              {
                year: "2021",
                title: "Inovação Digital",
                org: "Real Estate Tech Awards"
              }
            ].map((award) => (
              <Card key={award.title} className="p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center gap-4">
                    <Award className="h-8 w-8 text-primary" />
                    <div className="text-sm text-muted-foreground">{award.year}</div>
                  </div>
                  <h3 className="text-lg font-bold">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.org}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Pronto para encontrar seu imóvel ideal?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a encontrar o imóvel dos seus sonhos
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
