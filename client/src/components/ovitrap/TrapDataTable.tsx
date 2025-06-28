import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { observationCodes } from "@/lib/utils";

interface TrapData {
  id: string;
  quarteriao: string;
  endereco: string;
  morador: string;
  numero_armadilha: string;
  local_instalacao: string;
  primeira_coleta: {
    data: string;
    ovos: number;
    observacao: string;
  };
  segunda_coleta: {
    data: string;
    ovos: number;
    observacao: string;
  };
  coordenadas: {
    latitude: string;
    longitude: string;
  };
}

export default function TrapDataTable() {
  const [trapData, setTrapData] = useState<TrapData[]>([]);
  
  const addNewTrap = () => {
    const newTrap: TrapData = {
      id: Date.now().toString(),
      quarteriao: "",
      endereco: "",
      morador: "",
      numero_armadilha: "",
      local_instalacao: "",
      primeira_coleta: { data: "", ovos: 0, observacao: "" },
      segunda_coleta: { data: "", ovos: 0, observacao: "" },
      coordenadas: { latitude: "", longitude: "" },
    };
    setTrapData([...trapData, newTrap]);
  };

  const removeTrap = (id: string) => {
    setTrapData(trapData.filter(trap => trap.id !== id));
  };

  const updateTrap = (id: string, field: string, value: any) => {
    setTrapData(trapData.map(trap => {
      if (trap.id === id) {
        const keys = field.split('.');
        const updated = { ...trap };
        let current: any = updated;
        
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        
        return updated;
      }
      return trap;
    }));
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-md font-medium text-foreground">Registro de Armadilhas</h4>
        <Button 
          onClick={addNewTrap}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Armadilha
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="form-table">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="table-header">Quarteirão</TableHead>
              <TableHead className="table-header">Endereço</TableHead>
              <TableHead className="table-header">Morador</TableHead>
              <TableHead className="table-header">Nº Armad.</TableHead>
              <TableHead className="table-header">Local Install.</TableHead>
              <TableHead className="table-header">1ª Coleta</TableHead>
              <TableHead className="table-header">2ª Coleta</TableHead>
              <TableHead className="table-header">Coordenadas</TableHead>
              <TableHead className="table-header">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-card divide-y divide-border">
            {trapData.map((trap) => (
              <TableRow key={trap.id}>
                <TableCell className="table-cell">
                  <Input
                    className="input-small w-20"
                    value={trap.quarteriao}
                    onChange={(e) => updateTrap(trap.id, 'quarteriao', e.target.value)}
                    placeholder="001"
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Input
                    className="input-small w-32"
                    value={trap.endereco}
                    onChange={(e) => updateTrap(trap.id, 'endereco', e.target.value)}
                    placeholder="Endereço"
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Input
                    className="input-small w-28"
                    value={trap.morador}
                    onChange={(e) => updateTrap(trap.id, 'morador', e.target.value)}
                    placeholder="Nome"
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Input
                    className="input-small w-20"
                    value={trap.numero_armadilha}
                    onChange={(e) => updateTrap(trap.id, 'numero_armadilha', e.target.value)}
                    placeholder="OV-001"
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <Input
                    className="input-small w-24"
                    value={trap.local_instalacao}
                    onChange={(e) => updateTrap(trap.id, 'local_instalacao', e.target.value)}
                    placeholder="Local"
                  />
                </TableCell>
                <TableCell className="table-cell">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="date"
                      className="input-small w-28"
                      value={trap.primeira_coleta.data}
                      onChange={(e) => updateTrap(trap.id, 'primeira_coleta.data', e.target.value)}
                    />
                    <Input
                      type="number"
                      className={`input-small w-16 ${trap.primeira_coleta.ovos > 0 ? 'positive-eggs' : ''}`}
                      value={trap.primeira_coleta.ovos}
                      onChange={(e) => updateTrap(trap.id, 'primeira_coleta.ovos', parseInt(e.target.value) || 0)}
                      placeholder="Ovos"
                    />
                    <Select
                      value={trap.primeira_coleta.observacao}
                      onValueChange={(value) => updateTrap(trap.id, 'primeira_coleta.observacao', value)}
                    >
                      <SelectTrigger className="input-small w-20">
                        <SelectValue placeholder="OBS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Nenhuma</SelectItem>
                        {Object.entries(observationCodes).map(([code, description]) => (
                          <SelectItem key={code} value={code}>
                            {code} - {description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell className="table-cell">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="date"
                      className="input-small w-28"
                      value={trap.segunda_coleta.data}
                      onChange={(e) => updateTrap(trap.id, 'segunda_coleta.data', e.target.value)}
                    />
                    <Input
                      type="number"
                      className={`input-small w-16 ${trap.segunda_coleta.ovos > 0 ? 'positive-eggs' : ''}`}
                      value={trap.segunda_coleta.ovos}
                      onChange={(e) => updateTrap(trap.id, 'segunda_coleta.ovos', parseInt(e.target.value) || 0)}
                      placeholder="Ovos"
                    />
                    <Select
                      value={trap.segunda_coleta.observacao}
                      onValueChange={(value) => updateTrap(trap.id, 'segunda_coleta.observacao', value)}
                    >
                      <SelectTrigger className="input-small w-20">
                        <SelectValue placeholder="OBS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Nenhuma</SelectItem>
                        {Object.entries(observationCodes).map(([code, description]) => (
                          <SelectItem key={code} value={code}>
                            {code} - {description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell className="table-cell">
                  <div className="text-xs space-y-1">
                    <Input
                      className="input-small w-24"
                      value={trap.coordenadas.latitude}
                      onChange={(e) => updateTrap(trap.id, 'coordenadas.latitude', e.target.value)}
                      placeholder="Latitude"
                    />
                    <Input
                      className="input-small w-24"
                      value={trap.coordenadas.longitude}
                      onChange={(e) => updateTrap(trap.id, 'coordenadas.longitude', e.target.value)}
                      placeholder="Longitude"
                    />
                  </div>
                </TableCell>
                <TableCell className="table-cell">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTrap(trap.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
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
