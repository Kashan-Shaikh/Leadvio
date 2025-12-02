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

export default function DashboardPage() {
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

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user) return null

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col md:flex-row">
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader user={user} />
          
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              {/* Welcome Message */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">
                  Welcome back, <span className="text-primary">{user.name}</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">Let's find your perfect customers together</p>
              </div>

              {/* Empty State */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2 md:space-y-3">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">No leads yet</h2>
                    <p className="text-base md:text-lg text-muted-foreground">
                      Let's find some together. Answer a few simple questions about your ideal customer, and our AI will do the heavy lifting.
                    </p>
                  </div>

                  <div className="space-y-3 glass p-4 md:p-6">
                    <h3 className="font-semibold text-foreground text-sm md:text-base">How it works:</h3>
                    <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">1</span>
                        <span>Tell us about your business and ideal customer</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">2</span>
                        <span>Our AI analyzes millions of data points</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">3</span>
                        <span>Get personalized leads that feel right</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Decorative Element - hidden on mobile */}
                <div className="hidden lg:flex justify-center">
                  <div className="relative w-40 md:w-48 h-40 md:h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl glass opacity-60" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="glass p-6 md:p-8 text-center space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Ready to find your first lead?</h3>
                <p className="text-sm md:text-base text-muted-foreground">It takes just 5 minutes to answer our questionnaire</p>
                <a href="/get-leads" className="inline-block">
                  <button className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-primary to-accent text-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm md:text-base">
                    Get Leads
                  </button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {[
                  { label: 'Total Leads', value: '0' },
                  { label: 'This Month', value: '0' },
                  { label: 'Conversion Rate', value: '0%' },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-sm p-4 text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
