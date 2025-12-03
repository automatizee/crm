import { format as dateFnsFormat, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Format currency to BRL
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Format date
 */
export function formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return dateFnsFormat(dateObj, formatStr, { locale: ptBR })
}

/**
 * Format datetime
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, "dd/MM/yyyy 'às' HH:mm")
}

/**
 * Format time
 */
export function formatTime(date: string | Date): string {
  return formatDate(date, 'HH:mm')
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return phone
}

/**
 * Format CPF
 */
export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '')

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return cpf
}

/**
 * Format CEP
 */
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '')

  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  return cep
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
