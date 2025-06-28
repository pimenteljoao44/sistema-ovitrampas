# Deploy na Vercel + Supabase (100% Gratuito)

## Passo 1: Configurar Supabase (Banco de Dados)

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma conta (gratuita)
4. Clique em "New project"
5. Configure:
   - **Organization**: Sua conta
   - **Name**: `sistema-ovitrampas`
   - **Database Password**: Crie uma senha segura
   - **Region**: Escolha a mais próxima (ex: South America)
6. Clique em "Create new project"

## Passo 2: Obter String de Conexão

1. No painel do Supabase, vá em **Settings** → **Database**
2. Na seção **Connection string**, copie a **URI**
3. Substitua `[YOUR-PASSWORD]` pela senha que você criou
4. Guarde esta string, será sua `DATABASE_URL`

## Passo 3: Executar Schema no Supabase

1. No Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Cole o seguinte SQL:

```sql
-- Criar tabelas do sistema de ovitrampas
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'agente',
  municipio_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE municipios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'RS',
  codigo_ibge TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE localidades (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  municipio_id INTEGER NOT NULL,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quarteiroes (
  id SERIAL PRIMARY KEY,
  numero TEXT NOT NULL,
  localidade_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ovitrampas (
  id SERIAL PRIMARY KEY,
  numero TEXT NOT NULL,
  endereco TEXT NOT NULL,
  nome_morador TEXT,
  local_instalacao TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  data_instalacao TIMESTAMP,
  quarteriao_id INTEGER NOT NULL,
  municipio_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE coletas (
  id SERIAL PRIMARY KEY,
  ovitrampa_id INTEGER NOT NULL,
  data_coleta TIMESTAMP NOT NULL,
  numero_ovos INTEGER DEFAULT 0,
  observacao_codigo TEXT,
  observacao_texto TEXT,
  tipo_coleta TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  sincronizado_conta_ovos BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE boletins (
  id SERIAL PRIMARY KEY,
  municipio_id INTEGER NOT NULL,
  localidade_id INTEGER,
  agente_responsavel TEXT NOT NULL,
  data_leitura TIMESTAMP NOT NULL,
  data_instalacao TIMESTAMP NOT NULL,
  total_armadilhas INTEGER DEFAULT 0,
  paletas_negativas INTEGER DEFAULT 0,
  paletas_positivas INTEGER DEFAULT 0,
  total_ovos INTEGER DEFAULT 0,
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Clique em "Run" para executar

## Passo 4: Preparar Código para Vercel

1. Faça fork deste repositório para seu GitHub
2. Clone para sua máquina:
```bash
git clone https://github.com/SEU-USUARIO/sistema-ovitrampas.git
cd sistema-ovitrampas
```

## Passo 5: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Continue with GitHub"
3. Autorize a Vercel no GitHub
4. Clique em "Import Project"
5. Selecione o repositório `sistema-ovitrampas`
6. Configure:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Passo 6: Configurar Variáveis de Ambiente

1. Na Vercel, vá em **Settings** → **Environment Variables**
2. Adicione a variável:
   - **Name**: `DATABASE_URL`
   - **Value**: A string de conexão do Supabase
   - **Environment**: Production, Preview, Development

## Passo 7: Deploy Final

1. Clique em "Deploy"
2. Aguarde o build (2-3 minutos)
3. Sua aplicação estará disponível em: `https://sistema-ovitrampas.vercel.app`

## ✅ Pronto!

Seu sistema de ovitrampas estará rodando gratuitamente com:
- Frontend na Vercel (gratuito)
- Banco PostgreSQL no Supabase (gratuito)
- SSL automático
- Domínio personalizado disponível

## Dicas Importantes

- **Limites gratuitos Supabase**: 500MB storage, 2GB transferência/mês
- **Limites gratuitos Vercel**: 100GB bandwidth/mês
- **Domínio personalizado**: Configure em Settings → Domains na Vercel
- **Monitoramento**: Use o painel do Supabase para ver logs do banco

Precisa de ajuda com algum passo?