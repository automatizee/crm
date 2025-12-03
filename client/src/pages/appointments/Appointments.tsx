import { Plus } from 'lucide-react'
import { Header } from '../../components/layout'
import { Button } from '../../components/ui'

export default function Appointments() {
  return (
    <div>
      <Header
        title="Agendamentos"
        description="Calendário e gestão de sessões"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        }
      />
      <div className="p-6">
        <p className="text-gray-600">
          Calendário de agendamentos será implementado aqui...
        </p>
      </div>
    </div>
  )
}
