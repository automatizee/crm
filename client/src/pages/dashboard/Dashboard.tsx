import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react'
import { Header } from '../../components/layout'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui'

export default function Dashboard() {
  return (
    <div>
      <Header
        title="Dashboard"
        description="Visão geral da clínica"
      />

      <div className="p-6">
        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Sessões Hoje
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
                  <p className="mt-1 text-xs text-gray-500">
                    2 confirmadas
                  </p>
                </div>
                <div className="rounded-full bg-primary-100 p-3">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Clientes Ativos
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">42</p>
                  <p className="mt-1 text-xs text-green-600">
                    +5 este mês
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Receita do Mês
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    R$ 12.450
                  </p>
                  <p className="mt-1 text-xs text-green-600">
                    +12% vs. mês anterior
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Taxa de Comparecimento
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">92%</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Últimos 30 dias
                  </p>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Próximas sessões */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Sessões de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="font-medium text-gray-900">Maria Silva</p>
                    <p className="text-sm text-gray-500">Terapia Individual</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">10:00</p>
                    <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Confirmado
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <p className="font-medium text-gray-900">João Santos</p>
                    <p className="text-sm text-gray-500">Coaching</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">14:00</p>
                    <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                      Agendado
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Ana Costa</p>
                    <p className="text-sm text-gray-500">Primeira Consulta</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">16:00</p>
                    <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Novo cliente
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
