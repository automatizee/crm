import { Plus } from 'lucide-react'
import { Header } from '../../components/layout'
import { Button } from '../../components/ui'

export default function Clients() {
  return (
    <div>
      <Header
        title="Clientes"
        description="Gerencie os clientes da clínica"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        }
      />
      <div className="p-6">
        <p className="text-gray-600">
          Lista de clientes será implementada aqui...
        </p>
      </div>
    </div>
  )
}
