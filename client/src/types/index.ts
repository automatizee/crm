// Auth types
export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'THERAPIST' | 'ASSISTANT'
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

// Client types
export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'

export interface Client {
  id: string
  name: string
  email?: string
  phone: string
  birthDate?: string
  cpf?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  emergencyContact?: string
  emergencyPhone?: string
  notes?: string
  status: ClientStatus
  createdAt: string
  updatedAt: string
}

// Appointment types
export type SessionType =
  | 'INDIVIDUAL_THERAPY'
  | 'COACHING'
  | 'COUPLES_THERAPY'
  | 'GROUP_SESSION'
  | 'FIRST_CONSULTATION'
  | 'FOLLOW_UP'

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

export interface Appointment {
  id: string
  clientId: string
  client: Client
  date: string
  duration: number
  type: SessionType
  status: AppointmentStatus
  notes?: string
  sessionNotes?: string
  price: number
  isPaid: boolean
  createdAt: string
  updatedAt: string
}

// Transaction types
export type TransactionType = 'INCOME' | 'EXPENSE'

export type TransactionCategory =
  | 'SESSION'
  | 'PACKAGE'
  | 'PRODUCT'
  | 'RENT'
  | 'UTILITIES'
  | 'MARKETING'
  | 'SOFTWARE'
  | 'EQUIPMENT'
  | 'OTHER'

export type PaymentMethod =
  | 'CASH'
  | 'PIX'
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'BANK_TRANSFER'
  | 'HEALTH_INSURANCE'

export type TransactionStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED'

export interface Transaction {
  id: string
  clientId?: string
  client?: Client
  appointmentId?: string
  appointment?: Appointment
  type: TransactionType
  category: TransactionCategory
  description: string
  amount: number
  date: string
  paymentMethod?: PaymentMethod
  status: TransactionStatus
  dueDate?: string
  paidAt?: string
  createdAt: string
  updatedAt: string
}

// Package types
export type PackageStatus = 'ACTIVE' | 'EXPIRED' | 'COMPLETED'

export interface SessionPackage {
  id: string
  name: string
  sessions: number
  price: number
  validityDays: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ClientSessionPackage {
  id: string
  clientId: string
  client: Client
  packageId: string
  package: SessionPackage
  sessionsUsed: number
  purchaseDate: string
  expirationDate: string
  status: PackageStatus
}
