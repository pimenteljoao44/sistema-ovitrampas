import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Plus, Download, Map, FolderSync, Save, FileText, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import StatsCards from "@/components/ovitrap/StatsCards";
import TrapDataForm from "@/components/ovitrap/TrapDataForm";
import TrapDataTable from "@/components/ovitrap/TrapDataTable";
import ObservationLegend from "@/components/ovitrap/ObservationLegend";

export default function Dashboard() {
  const { toast } = useToast();

  const exportPdfMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/export/pdf", {});
    },
    onSuccess: () => {
      toast({
        title: "Exportação PDF",
        description: "Relatório exportado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao exportar PDF",
        variant: "destructive",
      });
    },
  });

  const exportWordMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/export/word", {});
    },
    onSuccess: () => {
      toast({
        title: "Exportação Word",
        description: "Relatório exportado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao exportar Word",
        variant: "destructive",
      });
    },
  });

  const syncContaOvosMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/sync/conta-ovos", {});
    },
    onSuccess: () => {
      toast({
        title: "Sincronização",
        description: "Dados sincronizados com Conta Ovos",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao sincronizar com Conta Ovos",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Dashboard - Monitoramento de Ovitrampas</h2>
        <p className="text-muted-foreground">Controle de Endemias - Aedes aegypti e Aedes albopictus</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nova Coleta
              </Button>
              <Button 
                onClick={() => exportPdfMutation.mutate()}
                disabled={exportPdfMutation.isPending}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar Dados
              </Button>
              <Button variant="outline">
                <Map className="mr-2 h-4 w-4" />
                Ver Mapa
              </Button>
              <Button 
                variant="outline"
                onClick={() => syncContaOvosMutation.mutate()}
                disabled={syncContaOvosMutation.isPending}
              >
                <FolderSync className="mr-2 h-4 w-4" />
                Sincronizar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Condições Ambientais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Temperatura</span>
                <span className="text-sm font-medium text-foreground">24°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Umidade</span>
                <span className="text-sm font-medium text-foreground">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Precipitação (24h)</span>
                <span className="text-sm font-medium text-foreground">12mm</span>
              </div>
              <div className="mt-4 p-3 bg-warning/10 rounded-md">
                <p className="text-xs text-warning-foreground">
                  ⚠️ Condições favoráveis para reprodução do Aedes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <TrapDataForm />
        
        <Card>
          <CardHeader>
            <CardTitle>Registro de Armadilhas</CardTitle>
          </CardHeader>
          <CardContent>
            <TrapDataTable />
            <ObservationLegend />
            
            <div className="bg-primary/10 p-4 rounded-lg mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">Resumo da Análise de Paletas</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total de Armadilhas:</span>
                  <span className="font-medium text-foreground ml-2">0</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Paletas Negativas:</span>
                  <span className="font-medium text-success ml-2">0</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Paletas Positivas:</span>
                  <span className="font-medium text-destructive ml-2">0</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total de Ovos:</span>
                  <span className="font-medium text-foreground ml-2">0</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                Salvar Dados
              </Button>
              
              <Button 
                onClick={() => syncContaOvosMutation.mutate()}
                disabled={syncContaOvosMutation.isPending}
                className="bg-secondary hover:bg-secondary/90"
              >
                <FolderSync className="mr-2 h-4 w-4" />
                Sincronizar com Conta Ovos
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => exportPdfMutation.mutate()}
                  disabled={exportPdfMutation.isPending}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => exportWordMutation.mutate()}
                  disabled={exportWordMutation.isPending}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Exportar Word
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma atividade registrada ainda.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
