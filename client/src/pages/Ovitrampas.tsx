import { useQuery } from "@tanstack/react-query";
import { Bug, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCoordinate } from "@/lib/utils";
import type { Ovitrampa } from "@shared/schema";

export default function Ovitrampas() {
  const { data: ovitrampas = [], isLoading } = useQuery<Ovitrampa[]>({
    queryKey: ["/api/ovitrampas"],
  });

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
        <h2 className="text-2xl font-bold text-foreground">Ovitrampas</h2>
        <p className="text-muted-foreground">Gestão de armadilhas de oviposição instaladas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ovitrampas</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ovitrampas.length}</div>
            <p className="text-xs text-muted-foreground">armadilhas instaladas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ovitrampas.filter(o => o.ativo).length}
            </div>
            <p className="text-xs text-muted-foreground">em monitoramento</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instaladas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">novas instalações</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ovitrampas</CardTitle>
        </CardHeader>
        <CardContent>
          {ovitrampas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma ovitrampa cadastrada ainda.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Morador</TableHead>
                  <TableHead>Local de Instalação</TableHead>
                  <TableHead>Coordenadas</TableHead>
                  <TableHead>Data de Instalação</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ovitrampas.map((ovitrampa) => (
                  <TableRow key={ovitrampa.id}>
                    <TableCell className="font-medium">{ovitrampa.numero}</TableCell>
                    <TableCell>{ovitrampa.endereco}</TableCell>
                    <TableCell>{ovitrampa.nome_morador || "-"}</TableCell>
                    <TableCell>{ovitrampa.local_instalacao || "-"}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>Lat: {formatCoordinate(ovitrampa.latitude)}</div>
                        <div>Lng: {formatCoordinate(ovitrampa.longitude)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {ovitrampa.data_instalacao 
                        ? new Date(ovitrampa.data_instalacao).toLocaleDateString('pt-BR')
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={ovitrampa.ativo ? "default" : "secondary"}>
                        {ovitrampa.ativo ? 'Ativa' : 'Inativa'}
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
