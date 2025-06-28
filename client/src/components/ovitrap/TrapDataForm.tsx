import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Municipio, Localidade } from "@shared/schema";

const trapFormSchema = z.object({
  municipio_id: z.number().min(1, "Selecione um município"),
  localidade_nome: z.string().min(1, "Informe a localidade/bairro"),
  agente_responsavel: z.string().min(1, "Informe o agente responsável"),
  data_instalacao: z.string().min(1, "Selecione a data de instalação"),
  data_leitura: z.string().min(1, "Selecione a data de leitura"),
});

type TrapFormData = z.infer<typeof trapFormSchema>;

export default function TrapDataForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMunicipio, setSelectedMunicipio] = useState<number | null>(null);

  const { data: municipios = [] } = useQuery<Municipio[]>({
    queryKey: ["/api/municipios"],
  });

  const { data: localidades = [] } = useQuery<Localidade[]>({
    queryKey: ["/api/municipios", selectedMunicipio, "localidades"],
    enabled: !!selectedMunicipio,
  });

  const form = useForm<TrapFormData>({
    resolver: zodResolver(trapFormSchema),
    defaultValues: {
      agente_responsavel: "Dr. Carlos Silva",
      data_leitura: new Date().toISOString().split('T')[0],
    },
  });

  const createBoletimMutation = useMutation({
    mutationFn: async (data: TrapFormData) => {
      return await apiRequest("POST", "/api/boletins", {
        municipio_id: data.municipio_id,
        agente_responsavel: data.agente_responsavel,
        data_instalacao: new Date(data.data_instalacao),
        data_leitura: new Date(data.data_leitura),
        user_id: 1, // TODO: Get from auth context
      });
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Boletim criado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/boletins"] });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar boletim",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TrapFormData) => {
    createBoletimMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Paletas Negativas - Ovitrampas</CardTitle>
        <p className="text-sm text-muted-foreground">
          Conforme Boletim de Amostragem - Ministério da Saúde
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="municipio">Município</Label>
              <Select 
                onValueChange={(value) => {
                  const municipioId = parseInt(value);
                  setSelectedMunicipio(municipioId);
                  form.setValue("municipio_id", municipioId);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o município..." />
                </SelectTrigger>
                <SelectContent>
                  {municipios.map((municipio) => (
                    <SelectItem key={municipio.id} value={municipio.id.toString()}>
                      {municipio.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="localidade">Localidade/Bairro</Label>
              <Input 
                {...form.register("localidade_nome")}
                placeholder="Ex: Centro, Petrópolis..."
              />
            </div>
            
            <div>
              <Label htmlFor="agente">Agente Responsável</Label>
              <Input 
                {...form.register("agente_responsavel")}
                placeholder="Nome do agente"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="data_instalacao">Data da Instalação</Label>
              <Input 
                type="date"
                {...form.register("data_instalacao")}
              />
            </div>
            
            <div>
              <Label htmlFor="data_leitura">Data da Leitura</Label>
              <Input 
                type="date"
                {...form.register("data_leitura")}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={createBoletimMutation.isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {createBoletimMutation.isPending ? "Salvando..." : "Salvar Dados"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
