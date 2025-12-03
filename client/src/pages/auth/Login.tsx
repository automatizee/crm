import { useState, FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { Button, Input } from '../../components/ui'
import { authService } from '../../services/authService'
import { useAuthStore } from '../../stores/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Se já estiver autenticado, redireciona para o dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary-600">Clínica CRM</h1>
          <p className="mt-2 text-sm text-gray-600">
            Faça login para acessar o sistema
          </p>
        </div>

        {/* Card de Login */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              icon={<Mail className="h-5 w-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="h-5 w-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />

            <Button type="submit" loading={loading} fullWidth size="lg">
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700"
              onClick={() => navigate('/forgot-password')}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </div>

        {/* Info para teste */}
        <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium mb-1">Credenciais para teste:</p>
          <p>Email: admin@clinica.com</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  )
}
