import jwt from 'jsonwebtoken'
import { env } from '../config/env'

interface TokenPayload {
  userId: string
  email: string
  role: string
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  })
}

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn,
  })
}

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.jwt.secret) as TokenPayload
}

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.jwt.refreshSecret) as TokenPayload
}
