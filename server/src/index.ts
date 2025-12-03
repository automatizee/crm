import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { env } from './config/env'
import { errorHandler } from './middlewares/errorHandler'
import routes from './routes'

const app = express()

// Middlewares
app.use(cors({
  origin: env.clientUrl,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

// Error handler (must be last)
app.use(errorHandler)

// Start server
app.listen(env.port, () => {
  console.log(`🚀 Server running on http://localhost:${env.port}`)
  console.log(`📝 Environment: ${env.nodeEnv}`)
  console.log(`🌐 Client URL: ${env.clientUrl}`)
})
