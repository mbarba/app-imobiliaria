import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyGallery } from "@/components/property-gallery";
import { formatCurrency } from "@/lib/utils";
import { 
  Bath, 
  Bed, 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  SquareIcon,
  Tag,
  CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Imovel {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  tipo: string;
  status: string;
  imagens: string[];
  dataLancamento: Date;
  local: string;
  banheiros: number;
  quartos: number;
  suites: number;
  area: number;
  isLancamento: boolean;
}

// Dados fictícios para demonstração
const imovelMock: Imovel = {
  id: "1",
  titulo: "Apartamento de Luxo com Vista para o Mar",
  descricao: "Luxuoso apartamento com acabamento premium, varanda gourmet e vista privilegiada para o mar. Localizado em área nobre, próximo a restaurantes, shopping e praia. Condomínio com infraestrutura completa incluindo piscina, academia, salão de festas e playground.",
  preco: 1250000,
  tipo: "Apartamento",
  status: "Disponível",
  imagens: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=500&fit=crop"
  ],
  dataLancamento: new Date(),
  local: "Av. Beira Mar, 1000 - Praia do Canto, Vitória/ES",
  banheiros: 3,
  quartos: 4,
  suites: 2,
  area: 180,
  isLancamento: true
};

// Lista de todos os imóveis para gerar as páginas estáticas
const imoveis = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" }
];

// Função necessária para gerar as páginas estáticas durante o build
export function generateStaticParams() {
  return imoveis.map((imovel) => ({
    id: imovel.id,
  }));
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  // Em produção, buscar dados do imóvel pelo ID
  const imovel = imovelMock;

  if (!imovel) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <PropertyGallery images={imovel.imagens} />
          
          <Tabs defaultValue="detalhes" className="w-full">
            <TabsList>
              <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
              <TabsTrigger value="localizacao">Localização</TabsTrigger>
            </TabsList>
            <TabsContent value="detalhes" className="space-y-4">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold">Descrição</h2>
                <p className="text-gray-600">{imovel.descricao}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Características</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span>{imovel.quartos} Quartos ({imovel.suites} suítes)</span>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span>{imovel.banheiros} Banheiros</span>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                      <SquareIcon className="h-5 w-5 text-muted-foreground" />
                      <span>{imovel.area} m²</span>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex items-center gap-2 p-4">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <span>{imovel.tipo}</span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="localizacao">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h3 className="font-semibold">Localização</h3>
                      <p className="text-gray-600">{imovel.local}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{imovel.titulo}</h1>
                <div className="flex gap-2">
                  <Badge variant={imovel.status === "Disponível" ? "default" : "secondary"}>
                    {imovel.status}
                  </Badge>
                  {imovel.isLancamento && (
                    <Badge variant="destructive">Lançamento</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{imovel.local}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag className="h-4 w-4" />
                  <span>R$ {formatCurrency(imovel.preco)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="h-4 w-4" />
                  <span>Publicado em {new Date(imovel.dataLancamento).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar para o corretor
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}