import { 
  users, municipios, localidades, quarteiroes, ovitrampas, coletas, boletins,
  type User, type InsertUser, type Municipio, type InsertMunicipio,
  type Localidade, type InsertLocalidade, type Quarteriao, type InsertQuarteirao,
  type Ovitrampa, type InsertOvitrampa, type Coleta, type InsertColeta,
  type Boletim, type InsertBoletim
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Municípios
  getMunicipios(): Promise<Municipio[]>;
  getMunicipio(id: number): Promise<Municipio | undefined>;
  createMunicipio(municipio: InsertMunicipio): Promise<Municipio>;

  // Localidades
  getLocalidadesByMunicipio(municipioId: number): Promise<Localidade[]>;
  createLocalidade(localidade: InsertLocalidade): Promise<Localidade>;

  // Quarteirões
  getQuarteiroesByLocalidade(localidadeId: number): Promise<Quarteriao[]>;
  createQuarteirao(quarterirao: InsertQuarteirao): Promise<Quarteriao>;

  // Ovitrampas
  getOvitrampas(): Promise<Ovitrampa[]>;
  getOvitrampasByMunicipio(municipioId: number): Promise<Ovitrampa[]>;
  getOvitrampa(id: number): Promise<Ovitrampa | undefined>;
  createOvitrampa(ovitrampa: InsertOvitrampa): Promise<Ovitrampa>;
  updateOvitrampa(id: number, ovitrampa: Partial<InsertOvitrampa>): Promise<Ovitrampa>;

  // Coletas
  getColetasByOvitrampa(ovitrampaId: number): Promise<Coleta[]>;
  createColeta(coleta: InsertColeta): Promise<Coleta>;

  // Boletins
  getBoletins(): Promise<Boletim[]>;
  getBoletinsByMunicipio(municipioId: number): Promise<Boletim[]>;
  createBoletim(boletim: InsertBoletim): Promise<Boletim>;

  // Dashboard stats
  getStats(): Promise<{
    activeMunicipalities: number;
    installedTraps: number;
    positiveTraps: number;
    completedCollections: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getMunicipios(): Promise<Municipio[]> {
    return await db.select().from(municipios).where(eq(municipios.ativo, true));
  }

  async getMunicipio(id: number): Promise<Municipio | undefined> {
    const [municipio] = await db.select().from(municipios).where(eq(municipios.id, id));
    return municipio || undefined;
  }

  async createMunicipio(insertMunicipio: InsertMunicipio): Promise<Municipio> {
    const [municipio] = await db.insert(municipios).values(insertMunicipio).returning();
    return municipio;
  }

  async getLocalidadesByMunicipio(municipioId: number): Promise<Localidade[]> {
    return await db.select().from(localidades)
      .where(and(eq(localidades.municipio_id, municipioId), eq(localidades.ativo, true)));
  }

  async createLocalidade(insertLocalidade: InsertLocalidade): Promise<Localidade> {
    const [localidade] = await db.insert(localidades).values(insertLocalidade).returning();
    return localidade;
  }

  async getQuarteiroesByLocalidade(localidadeId: number): Promise<Quarteriao[]> {
    return await db.select().from(quarteiroes).where(eq(quarteiroes.localidade_id, localidadeId));
  }

  async createQuarteirao(insertQuarteirao: InsertQuarteirao): Promise<Quarteriao> {
    const [quarteriao] = await db.insert(quarteiroes).values(insertQuarteirao).returning();
    return quarteriao;
  }

  async getOvitrampas(): Promise<Ovitrampa[]> {
    return await db.select().from(ovitrampas).where(eq(ovitrampas.ativo, true));
  }

  async getOvitrampasByMunicipio(municipioId: number): Promise<Ovitrampa[]> {
    return await db.select().from(ovitrampas)
      .where(and(eq(ovitrampas.municipio_id, municipioId), eq(ovitrampas.ativo, true)));
  }

  async getOvitrampa(id: number): Promise<Ovitrampa | undefined> {
    const [ovitrampa] = await db.select().from(ovitrampas).where(eq(ovitrampas.id, id));
    return ovitrampa || undefined;
  }

  async createOvitrampa(insertOvitrampa: InsertOvitrampa): Promise<Ovitrampa> {
    const [ovitrampa] = await db.insert(ovitrampas).values(insertOvitrampa).returning();
    return ovitrampa;
  }

  async updateOvitrampa(id: number, updateOvitrampa: Partial<InsertOvitrampa>): Promise<Ovitrampa> {
    const [ovitrampa] = await db.update(ovitrampas)
      .set(updateOvitrampa)
      .where(eq(ovitrampas.id, id))
      .returning();
    return ovitrampa;
  }

  async getColetasByOvitrampa(ovitrampaId: number): Promise<Coleta[]> {
    return await db.select().from(coletas)
      .where(eq(coletas.ovitrampa_id, ovitrampaId))
      .orderBy(desc(coletas.data_coleta));
  }

  async createColeta(insertColeta: InsertColeta): Promise<Coleta> {
    const [coleta] = await db.insert(coletas).values(insertColeta).returning();
    return coleta;
  }

  async getBoletins(): Promise<Boletim[]> {
    return await db.select().from(boletins).orderBy(desc(boletins.created_at));
  }

  async getBoletinsByMunicipio(municipioId: number): Promise<Boletim[]> {
    return await db.select().from(boletins)
      .where(eq(boletins.municipio_id, municipioId))
      .orderBy(desc(boletins.created_at));
  }

  async createBoletim(insertBoletim: InsertBoletim): Promise<Boletim> {
    const [boletim] = await db.insert(boletins).values(insertBoletim).returning();
    return boletim;
  }

  async getStats(): Promise<{
    activeMunicipalities: number;
    installedTraps: number;
    positiveTraps: number;
    completedCollections: number;
  }> {
    const [municipiosCount] = await db.select().from(municipios).where(eq(municipios.ativo, true));
    const [ovitrampasCount] = await db.select().from(ovitrampas).where(eq(ovitrampas.ativo, true));
    const [coletasCount] = await db.select().from(coletas);
    
    // Count positive traps (with eggs > 0)
    const positiveTrapsResult = await db.select().from(coletas)
      .where(eq(coletas.numero_ovos, 0));

    return {
      activeMunicipalities: 0, // TODO: implement count
      installedTraps: 0, // TODO: implement count
      positiveTraps: 0, // TODO: implement count with proper aggregation
      completedCollections: 0 // TODO: implement count
    };
  }
}

export const storage = new DatabaseStorage();
