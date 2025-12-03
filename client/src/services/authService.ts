import { api } from './api'
import { AuthResponse, LoginCredentials } from '../types'
import { useAuthStore } from '../stores/authStore'

export const authService = {
  async login(credentials: LoginCredentials): Promise<void> {
    const data = await api.post<AuthResponse>('/auth/login', credentials, {
      requiresAuth: false,
    })

    useAuthStore.getState().setAuth(data.user, data.accessToken, data.refreshToken)
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      useAuthStore.getState().logout()
    }
  },

  async getMe() {
    return api.get('/auth/me')
  },
}
