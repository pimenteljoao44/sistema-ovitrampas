import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware para servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../dist/public')));

// Rotas API
app.get('/api/data', (req, res) => {
  res.json({ message: 'Dados do backend' });
});

// Todas outras rotas servem o index.html do frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});