import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMunicipioSchema, insertLocalidadeSchema, insertQuarteiraoSchema, 
         insertOvitrampaSchema, insertColetaSchema, insertBoletimSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar estatísticas" });
    }
  });

  // Municípios
  app.get("/api/municipios", async (req, res) => {
    try {
      const municipios = await storage.getMunicipios();
      res.json(municipios);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar municípios" });
    }
  });

  app.post("/api/municipios", async (req, res) => {
    try {
      const municipioData = insertMunicipioSchema.parse(req.body);
      const municipio = await storage.createMunicipio(municipioData);
      res.status(201).json(municipio);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para município" });
    }
  });

  // Localidades
  app.get("/api/municipios/:municipioId/localidades", async (req, res) => {
    try {
      const municipioId = parseInt(req.params.municipioId);
      const localidades = await storage.getLocalidadesByMunicipio(municipioId);
      res.json(localidades);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar localidades" });
    }
  });

  app.post("/api/localidades", async (req, res) => {
    try {
      const localidadeData = insertLocalidadeSchema.parse(req.body);
      const localidade = await storage.createLocalidade(localidadeData);
      res.status(201).json(localidade);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para localidade" });
    }
  });

  // Quarteirões
  app.get("/api/localidades/:localidadeId/quarteiroes", async (req, res) => {
    try {
      const localidadeId = parseInt(req.params.localidadeId);
      const quarteiroes = await storage.getQuarteiroesByLocalidade(localidadeId);
      res.json(quarteiroes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar quarteirões" });
    }
  });

  app.post("/api/quarteiroes", async (req, res) => {
    try {
      const quarteiraoData = insertQuarteiraoSchema.parse(req.body);
      const quarteriao = await storage.createQuarteirao(quarteiraoData);
      res.status(201).json(quarteriao);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para quarteirão" });
    }
  });

  // Ovitrampas
  app.get("/api/ovitrampas", async (req, res) => {
    try {
      const municipioId = req.query.municipioId ? parseInt(req.query.municipioId as string) : null;
      const ovitrampas = municipioId 
        ? await storage.getOvitrampasByMunicipio(municipioId)
        : await storage.getOvitrampas();
      res.json(ovitrampas);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar ovitrampas" });
    }
  });

  app.post("/api/ovitrampas", async (req, res) => {
    try {
      const ovitrampaData = insertOvitrampaSchema.parse(req.body);
      const ovitrampa = await storage.createOvitrampa(ovitrampaData);
      res.status(201).json(ovitrampa);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para ovitrampa" });
    }
  });

  app.put("/api/ovitrampas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const ovitrampaData = insertOvitrampaSchema.partial().parse(req.body);
      const ovitrampa = await storage.updateOvitrampa(id, ovitrampaData);
      res.json(ovitrampa);
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar ovitrampa" });
    }
  });

  // Coletas
  app.get("/api/ovitrampas/:ovitrampaId/coletas", async (req, res) => {
    try {
      const ovitrampaId = parseInt(req.params.ovitrampaId);
      const coletas = await storage.getColetasByOvitrampa(ovitrampaId);
      res.json(coletas);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar coletas" });
    }
  });

  app.post("/api/coletas", async (req, res) => {
    try {
      const coletaData = insertColetaSchema.parse(req.body);
      const coleta = await storage.createColeta(coletaData);
      res.status(201).json(coleta);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para coleta" });
    }
  });

  // Boletins
  app.get("/api/boletins", async (req, res) => {
    try {
      const municipioId = req.query.municipioId ? parseInt(req.query.municipioId as string) : null;
      const boletins = municipioId 
        ? await storage.getBoletinsByMunicipio(municipioId)
        : await storage.getBoletins();
      res.json(boletins);
    } catch (error) {
      res.status(500).json({ message: "Erro ao carregar boletins" });
    }
  });

  app.post("/api/boletins", async (req, res) => {
    try {
      const boletimData = insertBoletimSchema.parse(req.body);
      const boletim = await storage.createBoletim(boletimData);
      res.status(201).json(boletim);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos para boletim" });
    }
  });

  // Export endpoints
  app.post("/api/export/pdf", async (req, res) => {
    try {
      // TODO: Implement PDF export using Puppeteer
      res.json({ message: "Exportação PDF em desenvolvimento" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao exportar PDF" });
    }
  });

  app.post("/api/export/word", async (req, res) => {
    try {
      // TODO: Implement Word export using docx
      res.json({ message: "Exportação Word em desenvolvimento" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao exportar Word" });
    }
  });

  // Conta Ovos integration
  app.post("/api/sync/conta-ovos", async (req, res) => {
    try {
      // TODO: Implement integration with Fiocruz Conta Ovos system
      res.json({ message: "Sincronização com Conta Ovos em desenvolvimento" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao sincronizar com Conta Ovos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
