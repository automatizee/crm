import { Response } from 'express'
import { AuthService } from '../services/auth.service'
import { loginSchema, registerSchema, refreshTokenSchema } from '../validators/auth.validators'
import { AuthRequest } from '../middlewares/auth'

const authService = new AuthService()

export class AuthController {
  async login(req: AuthRequest, res: Response) {
    const data = loginSchema.parse(req.body)
    const result = await authService.login(data)
    res.json(result)
  }

  async register(req: AuthRequest, res: Response) {
    const data = registerSchema.parse(req.body)
    const result = await authService.register(data)
    res.status(201).json(result)
  }

  async refreshToken(req: AuthRequest, res: Response) {
    const { refreshToken } = refreshTokenSchema.parse(req.body)
    const result = await authService.refreshToken(refreshToken)
    res.json(result)
  }

  async logout(req: AuthRequest, res: Response) {
    const userId = req.user!.userId
    await authService.logout(userId)
    res.json({ message: 'Logout realizado com sucesso' })
  }

  async me(req: AuthRequest, res: Response) {
    res.json({ user: req.user })
  }
}
