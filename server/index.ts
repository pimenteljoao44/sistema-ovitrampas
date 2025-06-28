import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerRoutes } from './routes'; // Importa as rotas da API

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json()); // Adiciona middleware para parsear JSON no corpo das requisições

// Middleware para servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../dist')));

// Registra as rotas da API
registerRoutes(app);

// Todas outras rotas servem o index.html do frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
