"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { PageTransition } from "@/components/layout/page-transition"

interface User {
  name: string
  email: string
}

interface Lead {
  id: string
  company: string
  contact: string
  role: string
  email: string
  industry: string
  size: string
  fit: number
}

export default function ResultsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/sign-in")
      return
    }
    setUser(JSON.parse(userData))
    setIsLoading(false)
  }, [router])

  const mockLeads: Lead[] = [
    {
      id: "1",
      company: "TechVenture Inc",
      contact: "Sarah Johnson",
      role: "VP of Sales",
      email: "sarah.johnson@techventure.com",
      industry: "SaaS",
      size: "250-1000",
      fit: 95,
    },
    {
      id: "2",
      company: "Growth Analytics",
      contact: "Michael Chen",
      role: "Marketing Manager",
      email: "mchen@growthanalytics.com",
      industry: "Analytics",
      size: "50-250",
      fit: 88,
    },
    {
      id: "3",
      company: "Enterprise Solutions",
      contact: "Jennifer Davis",
      role: "Operations Manager",
      email: "jdavis@enterprisesol.com",
      industry: "Technology",
      size: "1000+",
      fit: 92,
    },
    {
      id: "4",
      company: "Digital Minds Co",
      contact: "Alex Rodriguez",
      role: "CEO",
      email: "alex@digitalminds.com",
      industry: "Consulting",
      size: "50-250",
      fit: 85,
    },
    {
      id: "5",
      company: "Cloud Dynamics",
      contact: "Emma Wilson",
      role: "VP of Sales",
      email: "emma@clouddynamics.com",
      industry: "Cloud Services",
      size: "250-1000",
      fit: 93,
    },
    {
      id: "6",
      company: "Market Innovators",
      contact: "David Kumar",
      role: "Finance Manager",
      email: "dkumar@marketinnovators.com",
      industry: "FinTech",
      size: "250-1000",
      fit: 87,
    },
  ]

  const handleEmailLeads = () => {
    setIsPremium(true)
  }

  const handleDownloadLeads = () => {
    alert("Leads downloaded! Check your downloads folder.")
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
                <h1 className="text-2xl md:text-4xl font-bold text-foreground">Your Perfect Leads</h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Here are {mockLeads.length} highly qualified leads that match your criteria
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={handleDownloadLeads}
                  className="px-4 md:px-6 py-2 md:py-3 rounded-lg border border-foreground/20 text-foreground hover:border-foreground/40 transition-all duration-300 text-sm md:text-base"
                >
                  View Leads Here
                </button>
                <button
                  onClick={handleEmailLeads}
                  className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary to-accent text-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm md:text-base flex items-center gap-2 justify-center"
                >
                  <span>Email Me Leads</span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-primary-foreground/20 rounded-full">
                    Premium
                  </span>
                </button>
              </div>

              {isPremium && (
                <div className="glass p-4 md:p-6 border border-primary/20">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary text-sm md:text-base">Premium Feature Selected</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      All {mockLeads.length} leads will be sent to <span className="font-medium">{user.email}</span> as
                      a detailed report.
                    </p>
                  </div>
                </div>
              )}

              {/* Leads Grid */}
              <div className="grid gap-3 md:gap-4">
                {mockLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="glass-sm p-4 md:p-6 hover:border-white/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                      {/* Left Content */}
                      <div className="flex-1 space-y-3 w-full">
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-foreground">{lead.company}</h3>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {lead.contact} • {lead.role}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">Email</div>
                            <div className="text-foreground font-medium truncate text-xs md:text-sm">{lead.email}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">Industry</div>
                            <div className="text-foreground font-medium text-xs md:text-sm">{lead.industry}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">Company Size</div>
                            <div className="text-foreground font-medium text-xs md:text-sm">{lead.size}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">Match Score</div>
                            <div className="inline-flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-accent"
                                  style={{ width: `${lead.fit}%` }}
                                />
                              </div>
                              <span className="text-foreground font-semibold text-xs md:text-sm">{lead.fit}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0 w-full md:w-auto">
                        <a
                          href={`mailto:${lead.email}`}
                          className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg glass-sm hover:border-primary/50 transition-all duration-200 text-xs md:text-sm font-medium w-full md:w-auto justify-center"
                        >
                          <span>Contact</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="glass p-6 md:p-8 text-center space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Want more leads?</h3>
                <p className="text-xs md:text-base text-muted-foreground max-w-md mx-auto">
                  Upgrade to premium to get monthly lead updates, advanced filtering, and direct outreach support.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/dashboard" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-2 md:py-3 rounded-lg border border-foreground/20 text-foreground hover:border-foreground/40 transition-all duration-300 text-sm md:text-base">
                      Back to Dashboard
                    </button>
                  </a>
                  <a href="/pricing" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-2 md:py-3 bg-gradient-to-r from-primary to-accent text-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm md:text-base">
                      Upgrade to Premium
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
