import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="government-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64" 
              alt="Brasão da República" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-lg font-medium text-foreground">
                Sistema de Monitoramento de Ovitrampas
              </h1>
              <p className="text-sm text-muted-foreground">
                Ministério da Saúde - Secretaria de Vigilância em Saúde
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Dr. Carlos Silva</p>
              <p className="text-xs text-muted-foreground">Agente de Endemias - Porto Alegre/RS</p>
            </div>
            <button className="p-2 text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
