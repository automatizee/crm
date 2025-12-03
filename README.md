# CRM para Clínica de Terapia e Coaching

Sistema completo de gerenciamento de clientes, agendamentos e receitas para clínicas de terapia e coaching de desenvolvimento pessoal.

## 🚀 Tecnologias

### Frontend
- React 18+ com TypeScript
- Tailwind CSS para estilização
- React Router v6 para roteamento
- Zustand para gerenciamento de estado
- Zod para validação
- Lucide React para ícones
- Date-fns para manipulação de datas

### Backend
- Node.js com Express
- PostgreSQL com Prisma ORM
- JWT para autenticação
- Bcrypt para hash de senhas
- Zod para validação

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <repository-url>
cd crm-clinica
```

### 2. Instale as dependências

```bash
# Instalar dependências do workspace (client e server)
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados PostgreSQL:

```bash
createdb crm_clinica
```

Configure as variáveis de ambiente do servidor:

```bash
cd server
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do PostgreSQL.

### 4. Execute as migrations do Prisma

```bash
cd server
npm run prisma:generate
npm run prisma:migrate
```

### 5. Popule o banco com dados iniciais (opcional)

```bash
npm run prisma:seed
```

Isso criará:
- Um usuário admin (email: admin@clinica.com, senha: admin123)
- Configurações padrão
- Horários de trabalho (Segunda a Sexta, 9h-18h)
- Pacotes de sessões
- Clientes de exemplo
- Agendamentos de exemplo

## 🏃 Executando o projeto

### Desenvolvimento

Execute ambos (frontend e backend) simultaneamente:

```bash
npm run dev
```

Ou execute separadamente:

```bash
# Terminal 1 - Backend (porta 5000)
npm run dev:server

# Terminal 2 - Frontend (porta 3000)
npm run dev:client
```

### Acessando o sistema

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

**Credenciais de teste:**
- Email: admin@clinica.com
- Senha: admin123

## 📁 Estrutura do Projeto

```
/crm-clinica
├── /client                 # Frontend React
│   ├── /src
│   │   ├── /components     # Componentes React
│   │   │   ├── /ui        # Componentes base reutilizáveis
│   │   │   ├── /layout    # Header, Sidebar, etc
│   │   │   ├── /clients   # Componentes de clientes
│   │   │   ├── /appointments
│   │   │   └── /finance
│   │   ├── /pages         # Páginas da aplicação
│   │   ├── /hooks         # Custom hooks
│   │   ├── /services      # API calls
│   │   ├── /stores        # Estado global (Zustand)
│   │   ├── /types         # Tipos TypeScript
│   │   └── /utils         # Funções utilitárias
│   └── package.json
├── /server                # Backend Node.js
│   ├── /src
│   │   ├── /controllers   # Controladores
│   │   ├── /services      # Lógica de negócio
│   │   ├── /repositories  # Acesso a dados
│   │   ├── /middlewares   # Middlewares Express
│   │   ├── /routes        # Definição de rotas
│   │   ├── /validators    # Validadores Zod
│   │   ├── /utils         # Funções utilitárias
│   │   └── /config        # Configurações
│   ├── /prisma
│   │   ├── schema.prisma  # Schema do banco de dados
│   │   └── seed.ts        # Dados iniciais
│   └── package.json
└── package.json           # Root package.json (workspace)
```

## 🎯 Funcionalidades Implementadas (Fase 1)

- ✅ Estrutura completa do projeto (client e server)
- ✅ Banco de dados PostgreSQL com Prisma
- ✅ Autenticação JWT com refresh tokens
- ✅ Sistema de componentes UI base
- ✅ Layout responsivo com Sidebar e Header
- ✅ Telas de login e recuperação de senha
- ✅ Roteamento com proteção de rotas
- ✅ Dashboard com métricas resumidas

## 🚧 Próximas Fases

### Fase 2: Módulo de Clientes
- CRUD completo de clientes
- Listagem com busca e filtros
- Perfil detalhado do cliente
- Histórico de sessões

### Fase 3: Módulo de Agendamentos
- Calendário interativo
- Criação e edição de agendamentos
- Configuração de disponibilidade
- Sistema de lembretes

### Fase 4: Módulo Financeiro
- Dashboard financeiro
- Gestão de receitas e despesas
- Contas a receber
- Pacotes de sessões
- Relatórios

### Fase 5: Refinamentos
- Testes automatizados
- Responsividade mobile completa
- Exportação de dados
- Melhorias de UX

## 🛠️ Scripts Disponíveis

### Root
- `npm run dev` - Executa frontend e backend simultaneamente
- `npm run dev:client` - Executa apenas o frontend
- `npm run dev:server` - Executa apenas o backend
- `npm run build` - Build de produção

### Server
- `npm run dev` - Modo desenvolvimento com hot reload
- `npm run build` - Compilar TypeScript
- `npm run start` - Executar versão compilada
- `npm run prisma:generate` - Gerar Prisma Client
- `npm run prisma:migrate` - Executar migrations
- `npm run prisma:studio` - Abrir Prisma Studio
- `npm run prisma:seed` - Popular banco com dados iniciais

### Client
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview da build

## 📝 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Dados do usuário atual

### Health Check
- `GET /api/health` - Status da API

## 🎨 Design System

O projeto utiliza um design system minimalista com:

- **Cores primárias:** Verde (#22c55e) - transmite calma e crescimento
- **Fonte:** Inter (Google Fonts)
- **Componentes base:** Button, Input, Card, Modal, Badge, Spinner, EmptyState
- **Responsividade:** Desktop first com suporte mobile

## 📄 Licença

Este projeto foi desenvolvido para uso interno de clínicas de terapia e coaching.

## 👥 Suporte

Para dúvidas ou problemas, entre em contato com o desenvolvedor.
