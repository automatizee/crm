import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { useAuthStore } from '../../stores/authStore'
import { authService } from '../../services/authService'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clientes', href: '/clients', icon: Users },
  { name: 'Agendamentos', href: '/appointments', icon: Calendar },
  { name: 'Financeiro', href: '/finance', icon: DollarSign },
  { name: 'Configurações', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const { user } = useAuthStore()

  const handleLogout = async () => {
    await authService.logout()
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <h1 className="text-xl font-bold text-primary-600">
          Clínica CRM
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-medium">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {user?.name}
            </p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </div>
  )
}
