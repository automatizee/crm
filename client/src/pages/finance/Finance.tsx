import { Plus } from 'lucide-react'
import { Header } from '../../components/layout'
import { Button } from '../../components/ui'

export default function Finance() {
  return (
    <div>
      <Header
        title="Financeiro"
        description="Receitas, despesas e relatórios"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Lançamento
          </Button>
        }
      />
      <div className="p-6">
        <p className="text-gray-600">
          Dashboard financeiro será implementado aqui...
        </p>
      </div>
    </div>
  )
}
