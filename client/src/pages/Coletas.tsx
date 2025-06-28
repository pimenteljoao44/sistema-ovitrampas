import { useQuery } from "@tanstack/react-query";
import { ClipboardList, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { observationCodes } from "@/lib/utils";
import type { Coleta } from "@shared/schema";

export default function Coletas() {
  const { data: coletas = [], isLoading } = useQuery<Coleta[]>({
    queryKey: ["/api/coletas"], // Note: This endpoint doesn't exist yet, needs implementation
  });

  const totalOvos = coletas.reduce((sum, coleta) => sum + (coleta.numero_ovos || 0), 0);
  const coletasPositivas = coletas.filter(coleta => (coleta.numero_ovos || 0) > 0).length;

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Coletas</h2>
        <p className="text-muted-foreground">Histórico de coletas e análise de paletas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Coletas</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coletas.length}</div>
            <p className="text-xs text-muted-foreground">coletas realizadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paletas Positivas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{coletasPositivas}</div>
            <p className="text-xs text-muted-foreground">com presença de ovos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paletas Negativas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {coletas.length - coletasPositivas}
            </div>
            <p className="text-xs text-muted-foreground">sem presença de ovos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ovos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOvos}</div>
            <p className="text-xs text-muted-foreground">ovos contabilizados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Coletas</CardTitle>
        </CardHeader>
        <CardContent>
          {coletas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma coleta registrada ainda.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data da Coleta</TableHead>
                  <TableHead>Ovitrampa</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nº de Ovos</TableHead>
                  <TableHead>Observações</TableHead>
                  <TableHead>Conta Ovos</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coletas.map((coleta) => (
                  <TableRow key={coleta.id}>
                    <TableCell>
                      {new Date(coleta.data_coleta).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>OV-{coleta.ovitrampa_id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {coleta.tipo_coleta === 'primeira' ? '1ª Coleta' : '2ª Coleta'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        (coleta.numero_ovos || 0) > 0 ? 'text-destructive' : 'text-success'
                      }`}>
                        {coleta.numero_ovos || 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      {coleta.observacao_codigo ? (
                        <div className="text-xs">
                          <div className="font-medium">{coleta.observacao_codigo}</div>
                          <div className="text-muted-foreground">
                            {observationCodes[coleta.observacao_codigo as keyof typeof observationCodes]}
                          </div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={coleta.sincronizado_conta_ovos ? "default" : "secondary"}>
                        {coleta.sincronizado_conta_ovos ? 'Sincronizado' : 'Pendente'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={(coleta.numero_ovos || 0) > 0 ? "destructive" : "default"}>
                        {(coleta.numero_ovos || 0) > 0 ? 'Positiva' : 'Negativa'}
                      </Badge>
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
