import { pgTable, text, serial, integer, boolean, timestamp, decimal, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("agente"),
  municipio_id: integer("municipio_id"),
  created_at: timestamp("created_at").defaultNow(),
});

export const municipios = pgTable("municipios", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  estado: text("estado").notNull().default("RS"),
  codigo_ibge: text("codigo_ibge"),
  ativo: boolean("ativo").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

export const localidades = pgTable("localidades", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  municipio_id: integer("municipio_id").notNull(),
  ativo: boolean("ativo").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

export const quarteiroes = pgTable("quarteiroes", {
  id: serial("id").primaryKey(),
  numero: text("numero").notNull(),
  localidade_id: integer("localidade_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const ovitrampas = pgTable("ovitrampas", {
  id: serial("id").primaryKey(),
  numero: text("numero").notNull(),
  endereco: text("endereco").notNull(),
  nome_morador: text("nome_morador"),
  local_instalacao: text("local_instalacao"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  data_instalacao: timestamp("data_instalacao"),
  quarterirao_id: integer("quarteriao_id").notNull(),
  municipio_id: integer("municipio_id").notNull(),
  user_id: integer("user_id").notNull(),
  ativo: boolean("ativo").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

export const coletas = pgTable("coletas", {
  id: serial("id").primaryKey(),
  ovitrampa_id: integer("ovitrampa_id").notNull(),
  data_coleta: timestamp("data_coleta").notNull(),
  numero_ovos: integer("numero_ovos").default(0),
  observacao_codigo: text("observacao_codigo"), // códigos 1-8 conforme boletim
  observacao_texto: text("observacao_texto"),
  tipo_coleta: text("tipo_coleta").notNull(), // "primeira" ou "segunda"
  user_id: integer("user_id").notNull(),
  sincronizado_conta_ovos: boolean("sincronizado_conta_ovos").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

export const boletins = pgTable("boletins", {
  id: serial("id").primaryKey(),
  municipio_id: integer("municipio_id").notNull(),
  localidade_id: integer("localidade_id"),
  agente_responsavel: text("agente_responsavel").notNull(),
  data_leitura: timestamp("data_leitura").notNull(),
  data_instalacao: timestamp("data_instalacao").notNull(),
  total_armadilhas: integer("total_armadilhas").default(0),
  paletas_negativas: integer("paletas_negativas").default(0),
  paletas_positivas: integer("paletas_positivas").default(0),
  total_ovos: integer("total_ovos").default(0),
  user_id: integer("user_id").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  municipio: one(municipios, {
    fields: [users.municipio_id],
    references: [municipios.id],
  }),
  ovitrampas: many(ovitrampas),
  coletas: many(coletas),
  boletins: many(boletins),
}));

export const municipiosRelations = relations(municipios, ({ many }) => ({
  users: many(users),
  localidades: many(localidades),
  ovitrampas: many(ovitrampas),
  boletins: many(boletins),
}));

export const localidadesRelations = relations(localidades, ({ one, many }) => ({
  municipio: one(municipios, {
    fields: [localidades.municipio_id],
    references: [municipios.id],
  }),
  quarteiroes: many(quarteiroes),
}));

export const quarteiroesRelations = relations(quarteiroes, ({ one, many }) => ({
  localidade: one(localidades, {
    fields: [quarteiroes.localidade_id],
    references: [localidades.id],
  }),
  ovitrampas: many(ovitrampas),
}));

export const ovitrampasRelations = relations(ovitrampas, ({ one, many }) => ({
  quarteriao: one(quarteiroes, {
    fields: [ovitrampas.quarterirao_id],
    references: [quarteiroes.id],
  }),
  municipio: one(municipios, {
    fields: [ovitrampas.municipio_id],
    references: [municipios.id],
  }),
  user: one(users, {
    fields: [ovitrampas.user_id],
    references: [users.id],
  }),
  coletas: many(coletas),
}));

export const coletasRelations = relations(coletas, ({ one }) => ({
  ovitrampa: one(ovitrampas, {
    fields: [coletas.ovitrampa_id],
    references: [ovitrampas.id],
  }),
  user: one(users, {
    fields: [coletas.user_id],
    references: [users.id],
  }),
}));

export const boletinsRelations = relations(boletins, ({ one }) => ({
  municipio: one(municipios, {
    fields: [boletins.municipio_id],
    references: [municipios.id],
  }),
  localidade: one(localidades, {
    fields: [boletins.localidade_id],
    references: [localidades.id],
  }),
  user: one(users, {
    fields: [boletins.user_id],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
});

export const insertMunicipioSchema = createInsertSchema(municipios).omit({
  id: true,
  created_at: true,
});

export const insertLocalidadeSchema = createInsertSchema(localidades).omit({
  id: true,
  created_at: true,
});

export const insertQuarteiraoSchema = createInsertSchema(quarteiroes).omit({
  id: true,
  created_at: true,
});

export const insertOvitrampaSchema = createInsertSchema(ovitrampas).omit({
  id: true,
  created_at: true,
});

export const insertColetaSchema = createInsertSchema(coletas).omit({
  id: true,
  created_at: true,
});

export const insertBoletimSchema = createInsertSchema(boletins).omit({
  id: true,
  created_at: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Municipio = typeof municipios.$inferSelect;
export type InsertMunicipio = z.infer<typeof insertMunicipioSchema>;

export type Localidade = typeof localidades.$inferSelect;
export type InsertLocalidade = z.infer<typeof insertLocalidadeSchema>;

export type Quarteriao = typeof quarteiroes.$inferSelect;
export type InsertQuarteirao = z.infer<typeof insertQuarteiraoSchema>;

export type Ovitrampa = typeof ovitrampas.$inferSelect;
export type InsertOvitrampa = z.infer<typeof insertOvitrampaSchema>;

export type Coleta = typeof coletas.$inferSelect;
export type InsertColeta = z.infer<typeof insertColetaSchema>;

export type Boletim = typeof boletins.$inferSelect;
export type InsertBoletim = z.infer<typeof insertBoletimSchema>;
