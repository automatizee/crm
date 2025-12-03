# 🚀 Guia Rápido - CRM Clínica

## ✅ Sistema Rodando!

Os servidores estão ativos e prontos para uso:

- **Frontend**: http://localhost:3000/
- **Backend Mock**: http://localhost:5000/

## 🔐 Como Acessar

1. Abra seu navegador em: **http://localhost:3000**

2. Use as credenciais de teste:
   - **Email**: `admin@clinica.com`
   - **Senha**: `admin123`

3. Você será redirecionado para o **Dashboard**

## 📱 O que você pode testar

### Autenticação ✅
- [x] Tela de login
- [x] Validação de credenciais
- [x] Logout
- [x] Tela "Esqueci minha senha"
- [x] Persistência de sessão (recarregar página mantém login)

### Navegação ✅
- [x] **Dashboard** - Métricas e próximas sessões
- [x] **Clientes** - Página placeholder
- [x] **Agendamentos** - Página placeholder
- [x] **Financeiro** - Página placeholder
- [x] **Configurações** - Página placeholder

### Interface ✅
- [x] Sidebar com navegação
- [x] Design minimalista verde
- [x] Cards de métricas
- [x] Lista de sessões
- [x] Badges de status
- [x] Botões com estados (loading, hover)
- [x] Inputs com validação
- [x] Layout responsivo

## ⚠️ Modo MOCK

O backend está rodando em **modo MOCK** (simulado), o que significa:

- ✅ Autenticação funciona (login/logout)
- ✅ Interface completamente funcional
- ❌ Dados não são salvos (sem banco de dados)
- ❌ Apenas login com `admin@clinica.com` / `admin123` funciona

### Por que modo MOCK?

O ambiente tem restrições de rede que impedem o download dos binários do Prisma. O modo MOCK permite testar toda a interface sem banco de dados.

## 🛠️ Problemas Comuns

### Não consegue acessar?

**Verifique se os servidores estão rodando:**
```bash
# Ver processos
ps aux | grep node

# Verificar porta 3000
curl http://localhost:3000

# Verificar porta 5000
curl http://localhost:5000/api/health
```

**Reiniciar servidores:**
```bash
# Parar processos atuais
pkill -f "npm run dev:mock"

# Iniciar novamente
npm run dev:mock
```

### Erro ao fazer login?

- Verifique se está usando exatamente: `admin@clinica.com` / `admin123`
- Verifique o console do navegador (F12) para erros
- Verifique se o backend está respondendo: http://localhost:5000/api/health

### Frontend não carrega?

```bash
cd client
npm run dev
```

### Backend não responde?

```bash
cd server
npm run dev:mock
```

## 🎯 Teste Completo

### Passo 1: Login
1. Acesse http://localhost:3000
2. Digite `admin@clinica.com` e `admin123`
3. Clique em "Entrar"
4. ✅ Deve redirecionar para /dashboard

### Passo 2: Navegação
1. Clique em cada item da sidebar
2. ✅ Deve navegar sem erros
3. ✅ Item ativo deve ficar verde

### Passo 3: Dashboard
1. Veja os 4 cards de métricas
2. Veja a lista de "Próximas Sessões de Hoje"
3. ✅ Dados aparecem corretamente

### Passo 4: Logout
1. Role até o final da sidebar
2. Clique no botão "Sair"
3. ✅ Deve voltar para tela de login

### Passo 5: Persistência
1. Faça login novamente
2. Vá para /dashboard
3. Recarregue a página (F5)
4. ✅ Deve continuar logado

## 📊 Status de Implementação

### ✅ Fase 1 - Completa
- [x] Estrutura do projeto
- [x] Backend com autenticação
- [x] Frontend com componentes UI
- [x] Layout e navegação
- [x] Dashboard inicial
- [x] Modo MOCK para testes

### 🚧 Fase 2 - Próxima
- [ ] Módulo de Clientes completo
- [ ] CRUD de clientes
- [ ] Listagem com paginação
- [ ] Busca e filtros

## 🔧 Scripts Disponíveis

```bash
# Rodar com dados MOCK (recomendado para este ambiente)
npm run dev:mock

# Rodar com banco de dados real (requer PostgreSQL)
npm run dev

# Apenas frontend
npm run dev:client

# Apenas backend mock
cd server && npm run dev:mock
```

## 📝 Notas Técnicas

### Tecnologias
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Express + TypeScript
- **Estado**: Zustand
- **Validação**: Zod
- **Roteamento**: React Router v6

### Estrutura
```
client/src/
├── components/    # Componentes React
│   ├── ui/       # Button, Input, Card, Modal, etc
│   └── layout/   # Sidebar, Header, MainLayout
├── pages/        # Páginas da aplicação
├── services/     # API calls
├── stores/       # Estado global (Zustand)
├── types/        # TypeScript types
└── utils/        # Formatação e utilitários

server/src/
├── config/       # Configurações
├── controllers/  # Auth controller
├── middlewares/  # Auth, Error handling
├── routes/       # Rotas da API
├── services/     # Business logic
├── utils/        # JWT, etc
└── index-mock.ts # 🆕 Servidor mock
```

## 🎨 Design

- **Cor primária**: Verde #22c55e (calma e crescimento)
- **Fonte**: Inter
- **Estilo**: Minimalista com muito espaço em branco
- **Componentes**: Material Design inspirado

## 🐛 Reportar Problemas

Se encontrar algum problema:
1. Verifique os logs no terminal
2. Verifique o console do navegador (F12)
3. Teste com as credenciais corretas
4. Reinicie os servidores

## 🎉 Próximos Passos

Após testar e aprovar a Fase 1:
1. Implementar módulo de Clientes (CRUD completo)
2. Implementar calendário de Agendamentos
3. Implementar módulo Financeiro
4. Adicionar relatórios e gráficos

---

**Desenvolvido com ❤️ para clínicas de terapia e coaching**
