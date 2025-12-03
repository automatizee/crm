import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
    role: string
  }
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).json({ error: 'Token não fornecido' })
      return
    }

    const [, token] = authHeader.split(' ')

    if (!token) {
      res.status(401).json({ error: 'Token malformado' })
      return
    }

    const payload = verifyAccessToken(token)
    req.user = payload

    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Não autenticado' })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Sem permissão para acessar este recurso' })
      return
    }

    next()
  }
}
