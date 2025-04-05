"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Building, LogOut, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

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

export default function AdminDashboard() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [novoImovel, setNovoImovel] = useState<Partial<Imovel>>({});
  const [showForm, setShowForm] = useState(false);

  // Simulando dados - em produção, isso viria da API
  useEffect(() => {
    setImoveis([
      {
        id: "1",
        titulo: "Apartamento Moderno",
        descricao: "Lindo apartamento com 3 quartos",
        preco: 500000,
        tipo: "Apartamento",
        status: "Disponível",
        imagens: [],
        dataLancamento: new Date(),
        local: "Rua, Bairro, Cidade",
        banheiros: 2,
        quartos: 3,
        suites: 1,
        area: 120,
        isLancamento: false,
      }
    ]);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Em produção, aqui você faria o upload para um serviço de armazenamento
      console.log("Imagens selecionadas:", files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em produção, aqui você enviaria para a API
    const novoId = (imoveis.length + 1).toString();
    setImoveis([...imoveis, { ...novoImovel, id: novoId, dataLancamento: new Date() } as Imovel]);
    setShowForm(false);
    setNovoImovel({});
    toast.success("Imóvel cadastrado com sucesso!");
  };

  const handleDelete = (id: string) => {
    setImoveis(imoveis.filter(imovel => imovel.id !== id));
    toast.success("Imóvel removido com sucesso!");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Imóveis
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imoveis.length}</div>
            <p className="text-xs text-muted-foreground">
              Total de imóveis cadastrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              Usuários ativos no sistema
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Imóveis Lançamentos
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {imoveis.filter(i => {
                const umMesAtras = new Date();
                umMesAtras.setMonth(umMesAtras.getMonth() - 1);
                return new Date(i.dataLancamento) > umMesAtras;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Lançados no último mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Imóveis Cadastrados</h2>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Imóvel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={novoImovel.titulo || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, titulo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="local">Localização</Label>
                  <Input
                    id="local"
                    value={novoImovel.local || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, local: e.target.value })}
                    required
                    placeholder="Ex: Rua, Bairro, Cidade"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço</Label>
                  <Input
                    id="preco"
                    type="number"
                    value={novoImovel.preco || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, preco: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Área (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={novoImovel.area || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, area: Number(e.target.value) })}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quartos">Quartos</Label>
                  <Input
                    id="quartos"
                    type="number"
                    value={novoImovel.quartos || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, quartos: Number(e.target.value) })}
                    required
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="suites">Suítes</Label>
                  <Input
                    id="suites"
                    type="number"
                    value={novoImovel.suites || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, suites: Number(e.target.value) })}
                    required
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banheiros">Banheiros</Label>
                  <Input
                    id="banheiros"
                    type="number"
                    value={novoImovel.banheiros || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, banheiros: Number(e.target.value) })}
                    required
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select
                    value={novoImovel.tipo}
                    onValueChange={value => setNovoImovel({ ...novoImovel, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartamento">Apartamento</SelectItem>
                      <SelectItem value="Casa">Casa</SelectItem>
                      <SelectItem value="Terreno">Terreno</SelectItem>
                      <SelectItem value="Cobertura">Cobertura</SelectItem>
                      <SelectItem value="Sala Comercial">Sala Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={novoImovel.status}
                    onValueChange={value => setNovoImovel({ ...novoImovel, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponível">Disponível</SelectItem>
                      <SelectItem value="Vendido">Vendido</SelectItem>
                      <SelectItem value="Reservado">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      checked={novoImovel.isLancamento || false}
                      onChange={e => setNovoImovel({ ...novoImovel, isLancamento: e.target.checked })}
                    />
                    Lançamento
                  </Label>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={novoImovel.descricao || ""}
                    onChange={e => setNovoImovel({ ...novoImovel, descricao: e.target.value })}
                    required
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="imagens">Imagens</Label>
                  <Input
                    id="imagens"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Quartos</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {imoveis.map((imovel) => (
              <TableRow key={imovel.id}>
                <TableCell>{imovel.titulo}</TableCell>
                <TableCell>{imovel.local}</TableCell>
                <TableCell>{imovel.tipo}</TableCell>
                <TableCell>{imovel.area} m²</TableCell>
                <TableCell>{imovel.quartos} ({imovel.suites} suítes)</TableCell>
                <TableCell>R$ {imovel.preco.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/imoveis/${imovel.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setNovoImovel(imovel)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(imovel.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}