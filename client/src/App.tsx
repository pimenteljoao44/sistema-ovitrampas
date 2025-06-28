import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import Municipios from "@/pages/Municipios";
import Ovitrampas from "@/pages/Ovitrampas";
import Coletas from "@/pages/Coletas";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

function Router() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/municipios" component={Municipios} />
          <Route path="/ovitrampas" component={Ovitrampas} />
          <Route path="/coletas" component={Coletas} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
