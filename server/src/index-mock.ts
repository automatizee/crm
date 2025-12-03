import express from 'express'
import cors from 'cors'
import { env } from './config/env'

const app = express()

// Middlewares
app.use(cors({
  origin: env.clientUrl,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mock data
const mockUser = {
  id: '1',
  email: 'admin@clinica.com',
  name: 'Administrador',
  role: 'ADMIN',
}

const mockTokens = {
  accessToken: 'mock-access-token-123456',
  refreshToken: 'mock-refresh-token-123456',
}

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  if (email === 'admin@clinica.com' && password === 'admin123') {
    res.json({
      ...mockTokens,
      user: mockUser,
    })
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' })
  }
})

app.post('/api/auth/refresh', (req, res) => {
  res.json(mockTokens)
})

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logout realizado com sucesso' })
})

app.get('/api/auth/me', (req, res) => {
  res.json({ user: mockUser })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), mode: 'MOCK' })
})

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message,
  })
})

// Start server
app.listen(env.port, () => {
  console.log(`🚀 Mock Server running on http://localhost:${env.port}`)
  console.log(`📝 Environment: ${env.nodeEnv}`)
  console.log(`🌐 Client URL: ${env.clientUrl}`)
  console.log(`⚠️  MODO MOCK - Usando dados simulados (sem banco de dados)`)
})
