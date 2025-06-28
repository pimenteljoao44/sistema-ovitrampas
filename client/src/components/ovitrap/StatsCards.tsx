import { MapPin, Bug, AlertTriangle, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Stats {
  activeMunicipalities: number;
  installedTraps: number;
  positiveTraps: number;
  completedCollections: number;
}

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="stats-card animate-pulse">
            <div className="flex items-center">
              <div className="stats-icon bg-gray-200 rounded-full w-12 h-12" />
              <div className="ml-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Erro ao carregar estatísticas
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="stats-card">
        <div className="flex items-center">
          <div className="stats-icon stats-icon-primary">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Municípios Ativos</p>
            <p className="text-2xl font-bold text-foreground">{stats.activeMunicipalities}</p>
          </div>
        </div>
      </div>
      
      <div className="stats-card">
        <div className="flex items-center">
          <div className="stats-icon stats-icon-secondary">
            <Bug className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Ovitrampas Instaladas</p>
            <p className="text-2xl font-bold text-foreground">{stats.installedTraps}</p>
          </div>
        </div>
      </div>
      
      <div className="stats-card">
        <div className="flex items-center">
          <div className="stats-icon stats-icon-warning">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Paletas Positivas</p>
            <p className="text-2xl font-bold text-foreground">{stats.positiveTraps}</p>
          </div>
        </div>
      </div>
      
      <div className="stats-card">
        <div className="flex items-center">
          <div className="stats-icon stats-icon-success">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">Coletas Realizadas</p>
            <p className="text-2xl font-bold text-foreground">{stats.completedCollections}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
