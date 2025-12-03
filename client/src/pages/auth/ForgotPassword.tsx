import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button, Input } from '../../components/ui'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // TODO: Implementar chamada à API para recuperação de senha
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar email')
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
            Recuperação de senha
          </p>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          {success ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Email enviado!
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Enviamos um link de recuperação para <strong>{email}</strong>.
                Verifique sua caixa de entrada.
              </p>
              <Button onClick={() => navigate('/login')} fullWidth>
                Voltar para login
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-gray-600">
                Digite seu email e enviaremos um link para redefinir sua senha.
              </p>

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

                <Button type="submit" loading={loading} fullWidth size="lg">
                  Enviar link de recuperação
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => navigate('/login')}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
