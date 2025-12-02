'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, LogOut, Settings } from 'lucide-react'

interface DashboardHeaderProps {
  user: {
    name: string
    email: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-md">
      <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="text-base md:text-lg font-semibold text-foreground">LeadVio Dashboard</div>
        
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-lg glass hover:border-white/30 transition-all duration-200"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-foreground text-xs md:text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <div className="text-xs md:text-sm font-semibold text-foreground">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" style={{
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 md:w-56 glass border border-white/10 rounded-lg shadow-lg z-50">
              <div className="p-3 md:p-4 border-b border-white/10">
                <div className="text-xs md:text-sm font-semibold text-foreground">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    router.push('/settings')
                    setIsDropdownOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs md:text-sm text-foreground rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs md:text-sm text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
