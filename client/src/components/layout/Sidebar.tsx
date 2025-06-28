import { Link, useLocation } from "wouter";
import { 
  BarChart3, 
  MapPin, 
  Bug, 
  ClipboardList, 
  TrendingUp, 
  Download, 
  Settings,
  Smartphone,
  Satellite
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Municípios", href: "/municipios", icon: MapPin },
  { name: "Ovitrampas", href: "/ovitrampas", icon: Bug },
  { name: "Coletas", href: "/coletas", icon: ClipboardList },
  { name: "Análises", href: "/analises", icon: TrendingUp },
  { name: "Relatórios", href: "/relatorios", icon: Download },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
];

const integrations = [
  { name: "Conta Ovos", href: "/conta-ovos", icon: Smartphone },
  { name: "GPS Coordenadas", href: "/gps", icon: Satellite },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-card shadow-sm">
      <nav className="mt-8">
        <div className="px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={cn(
                  location === item.href ? "nav-link-active" : "nav-link"
                )}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 px-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Integrações
          </h3>
          <ul className="mt-4 space-y-2">
            {integrations.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="nav-link">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
