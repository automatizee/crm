import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      icon,
      fullWidth = false,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'w-full rounded-lg border border-gray-300 px-3 py-2 text-base transition-colors',
              'placeholder:text-gray-400',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
