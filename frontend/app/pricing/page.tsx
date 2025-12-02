"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { PageTransition } from "@/components/layout/page-transition"
import { Pricing } from "@/components/ui/pricing"

interface User {
  name: string
  email: string
}

const pricingPlans = [
  {
    name: "STARTER",
    price: "49",
    yearlyPrice: "39",
    period: "per month",
    features: [
      "Up to 100 leads per month",
      "Basic lead quality filters",
      "Email delivery",
      "CSV export",
      "Basic analytics",
      "Email support",
    ],
    description: "Perfect for freelancers and small teams",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "129",
    yearlyPrice: "103",
    period: "per month",
    features: [
      "Unlimited leads per month",
      "Advanced filtering & customization",
      "Real-time lead delivery",
      "CSV + CRM integration",
      "Advanced analytics & reporting",
      "Priority email support",
      "API access",
      "Lead verification",
    ],
    description: "Ideal for growing sales teams",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "499",
    yearlyPrice: "399",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom lead criteria",
      "Dedicated account manager",
      "Phone & priority support",
      "Custom integrations",
      "White-label options",
      "Advanced security & compliance",
      "SLA agreement",
      "Custom training",
    ],
    description: "For large-scale operations",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
]

export default function PricingPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (user) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
          <div className="hidden md:block">
            <DashboardSidebar />
          </div>

          <div className="flex-1 flex flex-col">
            <DashboardHeader user={user} />

            <main className="flex-1 overflow-auto">
              <Pricing
                plans={pricingPlans}
                title="Upgrade Your Lead Generation"
                description="Choose the perfect plan to scale your business\nUnlock unlimited leads with advanced filtering and prioritized support."
              />
            </main>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Pricing
          plans={pricingPlans}
          title="Upgrade Your Lead Generation"
          description="Choose the perfect plan to scale your business\nUnlock unlimited leads with advanced filtering and prioritized support."
        />
      </div>
    </PageTransition>
  )
}
