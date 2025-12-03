import bcrypt from 'bcryptjs'
import prisma from '../config/database'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { AppError } from '../middlewares/errorHandler'
import { LoginInput, RegisterInput } from '../validators/auth.validators'

export class AuthService {
  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password)

    if (!passwordMatch) {
      throw new AppError('Credenciais inválidas', 401)
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    // Salvar refresh token no banco
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    })

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  }

  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new AppError('Email já cadastrado', 409)
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role || 'THERAPIST',
      },
    })

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    // Salvar refresh token no banco
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    })

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  }

  async refreshToken(token: string) {
    try {
      const payload = verifyRefreshToken(token)

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      })

      if (!user || user.refreshToken !== token) {
        throw new AppError('Refresh token inválido', 401)
      }

      const newPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      }

      const accessToken = generateAccessToken(newPayload)
      const refreshToken = generateRefreshToken(newPayload)

      // Atualizar refresh token no banco
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
      })

      return {
        accessToken,
        refreshToken,
      }
    } catch (error) {
      throw new AppError('Refresh token inválido ou expirado', 401)
    }
  }

  async logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    })
  }
}
