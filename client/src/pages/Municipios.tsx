import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertMunicipioSchema, type Municipio } from "@shared/schema";
import { z } from "zod";

type MunicipioFormData = z.infer<typeof insertMunicipioSchema>;

export default function Municipios() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: municipios = [], isLoading } = useQuery<Municipio[]>({
    queryKey: ["/api/municipios"],
  });

  const form = useForm<MunicipioFormData>({
    resolver: zodResolver(insertMunicipioSchema),
    defaultValues: {
      estado: "RS",
      ativo: true,
    },
  });

  const createMunicipioMutation = useMutation({
    mutationFn: async (data: MunicipioFormData) => {
      return await apiRequest("POST", "/api/municipios", data);
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Município cadastrado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/municipios"] });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar município",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: MunicipioFormData) => {
    createMunicipioMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Municípios</h2>
          <p className="text-muted-foreground">Gestão de municípios participantes do programa</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Novo Município
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Município</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome do Município</Label>
                <Input
                  {...form.register("nome")}
                  placeholder="Nome do município"
                />
              </div>
              
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  {...form.register("estado")}
                  placeholder="RS"
                />
              </div>
              
              <div>
                <Label htmlFor="codigo_ibge">Código IBGE (opcional)</Label>
                <Input
                  {...form.register("codigo_ibge")}
                  placeholder="Ex: 4314902"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={createMunicipioMutation.isPending}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {createMunicipioMutation.isPending ? "Cadastrando..." : "Cadastrar Município"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Municípios Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {municipios.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum município cadastrado ainda.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Código IBGE</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {municipios.map((municipio) => (
                  <TableRow key={municipio.id}>
                    <TableCell className="font-medium">{municipio.nome}</TableCell>
                    <TableCell>{municipio.estado}</TableCell>
                    <TableCell>{municipio.codigo_ibge || "-"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        municipio.ativo 
                          ? 'bg-success/10 text-success' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {municipio.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {municipio.created_at 
                        ? new Date(municipio.created_at).toLocaleDateString('pt-BR')
                        : '-'
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
