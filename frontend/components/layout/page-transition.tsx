'use client'

import { ReactNode } from 'react'

export function PageTransition({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`animate-page-fade ${className}`}>
      {children}
    </div>
  )
}
