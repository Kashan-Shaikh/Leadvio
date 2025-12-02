import React from 'react'
import { cn } from '@/lib/utils'

interface WarmCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const WarmCard = React.forwardRef<HTMLDivElement, WarmCardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bg-card text-card-foreground rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300', className)}
      {...props}
    >
      {children}
    </div>
  )
)

WarmCard.displayName = 'WarmCard'
