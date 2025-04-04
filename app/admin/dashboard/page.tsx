"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Users, Edit, Trash2, Search, Plus, Upload, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface Property {
  id: number;
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

export default function AdminDashboard() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
    priceRange: "all",
    offerType: "all"
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Apartamento Luxuoso",
      status: "active",
      type: "apartment",
      isLaunch: false,
      price: 1200000,
      address: "Rua das Flores, 123",
      description: "Lindo apartamento com vista para o mar",
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
        "Salão de Festas"
      ],
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
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
      id: 2,
      title: "Casa com Piscina",
      status: "inactive",
      type: "house",
      isLaunch: true,
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
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de envio
    toast.success("Imóvel cadastrado com sucesso!");
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setProperties(properties.filter(prop => prop.id !== id));
    toast.success("Imóvel removido com sucesso!");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      property.address.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === "all" || property.status === filters.status;
    const matchesType = filters.type === "all" || property.type === filters.type;
    
    let matchesPrice = true;
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      matchesPrice = property.price >= min && (max ? property.price <= max : true);
    }

    const matchesOfferType = filters.offerType === "all" || 
      (filters.offerType === "launch" ? property.isLaunch : !property.isLaunch);

    return matchesSearch && matchesStatus && matchesType && matchesPrice && matchesOfferType;
  });

  const stats = {
    activeProperties: properties.filter(p => p.status === "active").length,
    inactiveProperties: properties.filter(p => p.status === "inactive").length,
    realtors: 8
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Bem-vindo, {user?.name}
          </p>
        </div>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Imóveis Ativos
            </CardTitle>
            <Building2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Imóveis Inativos
            </CardTitle>
            <Building2 className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactiveProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Corretores
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.realtors}</div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Gerenciamento de Imóveis */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Gerenciamento de Imóveis</CardTitle>
              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Imóvel
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Imóvel</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePropertySubmit} className="space-y-6">
                    {/* Informações Básicas */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Informações Básicas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Título do Anúncio*</Label>
                          <Input id="title" required placeholder="Ex: Apartamento Moderno no Centro" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Tipo de Imóvel*</Label>
                          <Select defaultValue="apartment">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">Casa</SelectItem>
                              <SelectItem value="apartment">Apartamento</SelectItem>
                              <SelectItem value="commercial">Comercial</SelectItem>
                              <SelectItem value="land">Terreno</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Preço*</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                            <Input 
                              id="price" 
                              type="number" 
                              required 
                              className="pl-10"
                              placeholder="0,00"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status*</Label>
                          <Select defaultValue="active">
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Ativo</SelectItem>
                              <SelectItem value="inactive">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="isLaunch" 
                            checked={true}
                            onCheckedChange={(checked) => 
                              console.log(checked)
                            }
                          />
                          <Label htmlFor="isLaunch">Lançamento</Label>
                        </div>
                      </div>
                    </div>

                    {/* Características */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Características</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bedrooms">Quartos</Label>
                          <Input type="number" id="bedrooms" min="0" placeholder="Número de quartos" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bathrooms">Banheiros</Label>
                          <Input type="number" id="bathrooms" min="0" placeholder="Número de banheiros" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="area">Área (m²)</Label>
                          <Input type="number" id="area" min="0" placeholder="Área total" />
                        </div>
                      </div>
                    </div>

                    {/* Localização */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Localização</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço Completo*</Label>
                          <Input 
                            id="address" 
                            required 
                            placeholder="Rua, Número, Bairro, Cidade - Estado"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Descrição</h3>
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição Detalhada*</Label>
                        <Textarea 
                          id="description" 
                          required 
                          placeholder="Descreva o imóvel em detalhes..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>

                    {/* Fotos */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Fotos</h3>
                      <div className="space-y-2">
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <Upload className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm font-medium">Clique para fazer upload ou arraste as imagens</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Aceita JPG, PNG ou GIF (Máximo 10MB por imagem)
                            </p>
                          </Label>
                        </div>
                        {selectedImages.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Imagens Selecionadas:</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {selectedImages.map((image, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        Salvar Imóvel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filtros */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar por título ou endereço..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de Imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="house">Casa</SelectItem>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="commercial">Comercial</SelectItem>
                    <SelectItem value="land">Terreno</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Faixa de Preço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Faixas de Preço</SelectItem>
                    <SelectItem value="0-300000">Até R$ 300.000</SelectItem>
                    <SelectItem value="300000-600000">R$ 300.000 - R$ 600.000</SelectItem>
                    <SelectItem value="600000-1000000">R$ 600.000 - R$ 1.000.000</SelectItem>
                    <SelectItem value="1000000">Acima de R$ 1.000.000</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filters.offerType}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, offerType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de Oferta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="launch">Lançamentos</SelectItem>
                    <SelectItem value="regular">Regulares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tabela de Imóveis */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nenhum imóvel encontrado com os filtros selecionados
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>
                          <Badge variant={property.status === "active" ? "success" : "secondary"}>
                            {property.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{property.type}</TableCell>
                        <TableCell>{formatPrice(property.price)}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{property.address}</TableCell>
                        <TableCell>{property.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link href={`/imoveis/${property.id}`}>
                              <Button variant="outline" size="sm">
                                Ver Detalhes
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDelete(property.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}