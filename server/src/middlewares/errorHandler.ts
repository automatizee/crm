import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error)

  // Zod validation errors
  if (error instanceof ZodError) {
    res.status(400).json({
      error: 'Erro de validação',
      details: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    })
    return
  }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      res.status(409).json({
        error: 'Registro duplicado',
        details: `O campo ${(error.meta?.target as string[])?.[0]} já está em uso`,
      })
      return
    }

    // Record not found
    if (error.code === 'P2025') {
      res.status(404).json({
        error: 'Registro não encontrado',
      })
      return
    }
  }

  // Custom app errors
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
    })
    return
  }

  // Default error
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  })
}
