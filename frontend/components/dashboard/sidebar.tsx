'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function DashboardSidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/get-leads', label: 'Get Leads' },
    { href: '/my-leads', label: 'My Leads' },
    { href: '/settings', label: 'Settings' },
  ]

  return (
    <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col p-4 md:p-6">
      <div className="flex items-center gap-2 mb-6 md:mb-8">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
        <span className="text-lg font-bold text-foreground">LeadVio</span>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 text-xs md:text-sm font-medium',
              pathname === link.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <span className="w-5 h-5 rounded-full" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2025 LeadVio
        </p>
      </div>
    </aside>
  )
}
