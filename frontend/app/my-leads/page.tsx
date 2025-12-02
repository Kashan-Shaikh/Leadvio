'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { LoadingSpinner } from '@/components/layout/loading-spinner'
import { PageTransition } from '@/components/layout/page-transition'

interface User {
  name: string
  email: string
}

interface SavedLead {
  id: string
  company: string
  contact: string
  role: string
  email: string
  savedAt: string
  status: 'contacted' | 'interested' | 'saved'
}

export default function MyLeadsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/sign-in')
      return
    }
    setUser(JSON.parse(userData))
    setIsLoading(false)
  }, [router])

  const mockSavedLeads: SavedLead[] = [
    {
      id: '1',
      company: 'TechVenture Inc',
      contact: 'Sarah Johnson',
      role: 'VP of Sales',
      email: 'sarah.johnson@techventure.com',
      savedAt: '2025-01-10',
      status: 'interested',
    },
    {
      id: '2',
      company: 'Growth Analytics',
      contact: 'Michael Chen',
      role: 'Marketing Manager',
      email: 'mchen@growthanalytics.com',
      savedAt: '2025-01-08',
      status: 'contacted',
    },
    {
      id: '3',
      company: 'Enterprise Solutions',
      contact: 'Jennifer Davis',
      role: 'Operations Manager',
      email: 'jdavis@enterprisesol.com',
      savedAt: '2025-01-05',
      status: 'saved',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interested':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'contacted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  if (isLoading || !user) {
    return <LoadingSpinner />
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader user={user} />
          
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
              {/* Header */}
              <div className="space-y-2 md:space-y-3">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">My Leads</h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Track and manage all your saved leads in one place
                </p>
              </div>

              {mockSavedLeads.length > 0 ? (
                <div className="grid gap-3 md:gap-4">
                  {mockSavedLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="glass-sm p-4 md:p-6 hover:border-white/40 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="flex-1 space-y-3 w-full">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                            <div>
                              <h3 className="text-base md:text-lg font-semibold text-foreground">{lead.company}</h3>
                              <p className="text-xs md:text-sm text-muted-foreground">{lead.contact} • {lead.role}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColor(lead.status)}`}>
                              {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                            <div>
                              <div className="text-muted-foreground text-xs mb-1">Email</div>
                              <div className="text-foreground font-medium truncate">{lead.email}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground text-xs mb-1">Saved Date</div>
                              <div className="text-foreground font-medium">{lead.savedAt}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-row md:flex-col gap-2 w-full md:w-auto">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg glass-sm hover:border-primary/50 transition-all duration-200 text-xs md:text-sm font-medium"
                          >
                            <span>Email</span>
                          </a>
                          <button className="flex-1 md:flex-none px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass p-8 md:p-12 text-center space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">No saved leads yet</h2>
                  <p className="text-xs md:text-base text-muted-foreground max-w-md mx-auto">
                    Start generating leads and save the ones you're interested in
                  </p>
                  <a href="/get-leads">
                    <button className="px-6 py-2 md:py-3 bg-gradient-to-r from-primary to-accent text-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm md:text-base">
                      Generate Leads
                    </button>
                  </a>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
