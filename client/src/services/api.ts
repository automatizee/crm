import { useAuthStore } from '../stores/authStore'

const API_URL = '/api'

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requiresAuth = true, ...fetchOptions } = options

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    }

    // Add auth token if required
    if (requiresAuth) {
      const { accessToken } = useAuthStore.getState()
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`
      }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    })

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && requiresAuth) {
      const refreshed = await this.refreshAccessToken()
      if (refreshed) {
        // Retry the original request
        return this.request<T>(endpoint, options)
      } else {
        // Logout if refresh failed
        useAuthStore.getState().logout()
        window.location.href = '/login'
        throw new Error('Sessão expirada')
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Erro desconhecido',
      }))
      throw new Error(error.error || 'Erro na requisição')
    }

    return response.json()
  }

  private async refreshAccessToken(): Promise<boolean> {
    try {
      const { refreshToken } = useAuthStore.getState()

      if (!refreshToken) {
        return false
      }

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        return false
      }

      const data = await response.json()
      useAuthStore.getState().setAccessToken(data.accessToken)

      return true
    } catch {
      return false
    }
  }

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const api = new ApiClient()
