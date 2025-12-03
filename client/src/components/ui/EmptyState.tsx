import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mb-6 max-w-md text-sm text-gray-500">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
