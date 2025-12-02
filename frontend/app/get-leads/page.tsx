"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { PageTransition } from "@/components/layout/page-transition"
import { AnimatedTextHero } from "@/components/ui/animated-text-hero"

interface FormData {
  businessType: string
  mainGoal: string
  customerLocation: string
  monthlyReach: string
  contactMethod: string
  emailStyle: string
  dreamCustomer: string
  contactSpeed: string
  messagesPriority: string
  messageTone: string
}

interface User {
  name: string
  email: string
}

export default function GetLeadsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    mainGoal: "",
    customerLocation: "",
    monthlyReach: "",
    contactMethod: "",
    emailStyle: "",
    dreamCustomer: "",
    contactSpeed: "",
    messagesPriority: "",
    messageTone: "",
  })

  const animatedWords = ["Your Perfect Leads", "Dream Customers", "Qualified Prospects", "Business Growth"]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/sign-in")
      return
    }
    setUser(JSON.parse(userData))
    setIsLoading(false)
  }, [router])

  const steps = [
    {
      title: "What kind of business are you running?",
      description: "Tell us about your business",
      field: "businessType",
      options: [
        "Helping people stay healthy (Health Care)",
        "Helping people stay fit (Fitness)",
        "Teaching and learning (Education)",
        "Selling homes or spaces (Real Estate)",
        "Selling things online (E-commerce)",
        "Local services like cleaning or repairs (Local Services)",
        "Digital Marketing Agency",
        "B2B SaaS",
        "Web Design & Development Agency",
        "Consulting Agency",
        "Advertising & Creative Agency",
        "Something else",
      ],
    },
    {
      title: "What's your main goal right now?",
      description: "Pick your primary objective",
      field: "mainGoal",
      options: [
        "Get more people interested (More leads)",
        "Get more appointments booked",
        "Bring more visitors to your website",
        "Make more sales",
        "Get more messages and chats",
      ],
    },
    {
      title: "Where do you want to find customers?",
      description: "Select your target region",
      field: "customerLocation",
      options: ["Asia", "Middle East", "Europe", "North America", "South America", "Africa", "Australia"],
    },
    {
      title: "How many people do you want to reach each month?",
      description: "Choose your target reach",
      field: "monthlyReach",
      options: [
        "A small crowd (0–100)",
        "A decent group (100–500)",
        "Hundreds (500–1,000)",
        "Thousands (1,000–5,000)",
        "Mass audience (5,000+)",
      ],
    },
    {
      title: "How do you usually talk to your leads?",
      description: "Pick your preferred communication channel",
      field: "contactMethod",
      options: ["WhatsApp or chat apps", "Email", "Phone calls", "Website forms", "Social media inbox"],
    },
    {
      title: "Pick the style of email you like the most:",
      description: "Choose your messaging style",
      field: "emailStyle",
      options: [
        "Simple & Short – quick and easy",
        "Professional – clean and serious",
        "Friendly – warm and approachable",
        "Bold (Alex Hormozi style) – confident and attention-grabbing",
      ],
    },
    {
      title: "Who is your dream customer?",
      description: "Select your ideal customer profile",
      field: "dreamCustomer",
      options: [
        "Students",
        "Parents",
        "Business owners",
        "Working professionals",
        "Online shoppers",
        "Anyone who's interested",
      ],
    },
    {
      title: "How fast do you want your leads to be contacted?",
      description: "Choose your follow-up speed",
      field: "contactSpeed",
      options: ["Right away!", "Within 5 minutes", "Within 30 minutes", "Within an hour"],
    },
    {
      title: "What matters most to you in your messages?",
      description: "Pick your main priority",
      field: "messagesPriority",
      options: ["Get more replies", "Turn replies into sales", "Reach the right people", "Save money on ads"],
    },
    {
      title: "What tone should your messages have?",
      description: "Select your preferred tone",
      field: "messageTone",
      options: ["Friendly & casual", "Serious & professional", "Energetic & exciting", "Expert & confident"],
    },
  ]

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleOptionSelect = (value: string) => {
    setFormData({
      ...formData,
      [currentStepData.field]: value,
    })
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      localStorage.setItem("leadsQuery", JSON.stringify(formData))
      router.push("/results")
    }, 2000)
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

          <main className="flex-1 p-4 md:p-6 overflow-auto flex items-center justify-center">
            <div className="w-full max-w-2xl glass p-4 md:p-8">
              <div className="space-y-6 md:space-y-8">
                {/* Progress Bar */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    {!isProcessing ? (
                      <div className="text-lg md:text-2xl font-bold text-foreground">
                        Finding{" "}
                        <AnimatedTextHero
                          words={animatedWords}
                          className="md:pb-4 md:pt-1 text-lg md:text-2xl text-primary"
                        />
                      </div>
                    ) : (
                      <h2 className="text-lg md:text-2xl font-bold text-foreground">Finding Your Perfect Leads...</h2>
                    )}
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {currentStep + 1} of {steps.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Content */}
                {!isProcessing ? (
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-base md:text-lg font-semibold text-muted-foreground">
                        {currentStepData.description}
                      </h3>
                      <p className="text-2xl md:text-4xl font-black text-foreground">
                        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-flow bg-300%">
                          {currentStepData.title}
                        </span>
                      </p>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 gap-3 md:gap-4 pt-6">
                      {currentStepData.options.map((option, idx) => (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option)}
                          className={`p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-left font-medium text-sm md:text-base group hover:scale-102 ${
                            formData[currentStepData.field as keyof FormData] === option
                              ? "border-primary bg-gradient-to-r from-primary/20 to-accent/20 text-foreground shadow-lg shadow-primary/30 animate-neon-glow"
                              : "border-border hover:border-primary/50 text-foreground hover:bg-primary/5"
                          }`}
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <span className="flex items-center justify-between gap-4">
                            <span>{option}</span>
                            <span
                              className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                                formData[currentStepData.field as keyof FormData] === option
                                  ? "border-primary bg-gradient-to-br from-primary to-accent"
                                  : "border-foreground/30 group-hover:border-primary/50"
                              }`}
                            />
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2 md:gap-3 pt-4 md:pt-6">
                      <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg border border-foreground/20 text-foreground hover:border-foreground/40 disabled:opacity-50 transition-all duration-300 text-sm md:text-base"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!formData[currentStepData.field as keyof FormData]}
                        className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary to-accent text-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 transition-all duration-300 text-sm md:text-base"
                      >
                        {currentStep === steps.length - 1 ? "Generate Leads" : "Next"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 md:py-12 space-y-4 md:space-y-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full glass flex items-center justify-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-transparent border-t-primary border-r-accent animate-spin-loader" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-base md:text-lg font-semibold text-foreground">
                        Thinking about your perfect leads...
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Our AI is analyzing what matters most to your business
                      </p>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
