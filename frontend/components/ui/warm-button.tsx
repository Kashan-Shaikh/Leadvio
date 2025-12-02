import React from 'react'
import { cn } from '@/lib/utils'

interface WarmButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const WarmButton = React.forwardRef<HTMLButtonElement, WarmButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'font-sans font-medium transition-all duration-300 ease-out rounded-full inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:shadow-lg hover:scale-105 active:scale-95',
      secondary: 'bg-secondary text-secondary-foreground hover:shadow-md hover:scale-102 active:scale-95',
      ghost: 'text-foreground hover:bg-muted active:scale-95',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

WarmButton.displayName = 'WarmButton'
