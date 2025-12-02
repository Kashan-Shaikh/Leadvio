"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, X } from "lucide-react"
import { PageTransition } from "@/components/layout/page-transition"
import { InteractiveNebulaShader } from "@/components/ui/liquid-shader"
import { AnimatedTextCycle } from "@/components/ui/animated-text-cycle"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showAuthModal, setShowAuthModal] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      id: 1,
      subtitle: "AI-POWERED INTELLIGENCE",
      title: "QUALIFY YOUR LEADS",
      description:
        "Advanced AI algorithms analyze thousands of prospects to identify your perfect customers. Get detailed insights on decision-makers, company fit, and buying intent.",
      cta: "See It In Action",
    },
    {
      id: 2,
      subtitle: "SEAMLESS INTEGRATION",
      title: "CONNECT YOUR STACK",
      description:
        "Integrate with CRM, email, and sales tools. Sync leads automatically, trigger workflows, and maintain a unified view of your entire pipeline.",
      cta: "Learn More",
    },
    {
      id: 3,
      subtitle: "REAL-TIME INSIGHTS",
      title: "TRACK ENGAGEMENT",
      description:
        "Monitor prospect engagement, track email opens, website visits, and interactions. Get alerts when leads show buying signals.",
      cta: "Explore Features",
    },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        setMousePosition({ x, y })
        cardRef.current.style.setProperty("--mouse-x", `${x}%`)
        cardRef.current.style.setProperty("--mouse-y", `${y}%`)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const current = slides[currentSlide]

  return (
    <PageTransition>
      <div className="fixed inset-0 z-0">
        <InteractiveNebulaShader disableCenterDimming={false} />
      </div>

      <div className="min-h-screen bg-gradient-to-b from-background/95 via-background to-background overflow-hidden relative z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full opacity-15 bg-gradient-to-br from-primary/50 to-secondary/20 blur-3xl animate-float-up" />
        <div
          className="absolute bottom-20 right-1/3 w-80 h-80 rounded-full opacity-12 bg-gradient-to-tl from-accent/40 to-primary/10 blur-3xl animate-float-up"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-10 w-72 h-72 rounded-full opacity-10 bg-gradient-to-l from-secondary/25 to-accent/10 blur-3xl animate-float-up"
          style={{ animationDelay: "2s" }}
        />

        {/* Vertical accent line */}
        <div className="absolute right-1/3 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/0 pointer-events-none" />

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-16 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="mb-6 md:mb-8 relative">
                  <div className="absolute -top-20 -left-32 w-64 h-64 bg-gradient-to-br from-primary/30 to-accent/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

                  <p className="text-primary/80 text-xs md:text-sm font-bold tracking-widest uppercase mb-3 relative z-10">
                    Welcome to the future of sales
                  </p>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground leading-[0.9] mb-4 relative z-10">
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-flow bg-300% inline-block">
                      LEAD
                    </span>
                  </h1>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] -mt-3 relative z-10">
                    <span className="text-foreground">GEN</span>
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-flow bg-300%">
                      <AnimatedTextCycle words={["ERATION", "OPTIMIZATION", "QUALIFICATION"]} interval={3000} />
                    </span>
                  </h2>
                </div>

                <div className="space-y-4 md:space-y-5 mb-10 md:mb-12">
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-md font-medium">
                    Discover the power of AI-driven lead qualification. Turn prospects into customers with intelligent
                    targeting and real-time engagement insights.
                  </p>

                  <div className="space-y-3 pt-4">
                    {[
                      { icon: "⚡", text: "10,000+ qualified leads generated" },
                      { icon: "🎯", text: "94% accuracy rate with AI filtering" },
                      { icon: "🚀", text: "Results in 24-48 hours" },
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors duration-300"
                      >
                        <span className="text-lg">{feature.icon}</span>
                        <span className="font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowAuthModal(true)}
                  className="relative group w-full md:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-primary via-accent to-primary text-foreground font-bold text-base md:text-lg rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 animate-neon-glow"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Get Started
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>

                <div className="mt-12 md:mt-16">
                  <p className="text-foreground/60 text-xs font-semibold tracking-widest uppercase mb-4">
                    Trusted by modern sales teams
                  </p>
                  <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                    {[
                      { label: "AI", icon: "✨" },
                      { label: "CRM", icon: "📊" },
                      { label: "API", icon: "⚡" },
                      { label: "ML", icon: "🧠" },
                    ].map((tech, idx) => (
                      <div
                        key={tech.label}
                        className="group flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg glass hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <span className="text-base md:text-lg group-hover:scale-125 transition-transform duration-300">
                          {tech.icon}
                        </span>
                        <span className="text-foreground/70 text-xs md:text-sm font-semibold group-hover:text-primary transition-colors duration-300">
                          {tech.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/15 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                <div
                  ref={cardRef}
                  className="relative gradient-interactive glass p-6 md:p-10 overflow-hidden hover:border-white/40 transition-all duration-300 backdrop-blur-2xl animate-neon-glow"
                >
                  <div className="flex items-center justify-between mb-8 md:mb-10 gap-4">
                    <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary/60 to-accent/30 border border-primary/80 flex items-center justify-center animate-pulse">
                        <span className="text-foreground font-black text-sm md:text-base">LV</span>
                      </div>
                      <div>
                        <p className="text-foreground font-bold text-sm md:text-base">LeadVio</p>
                        <p className="text-foreground/50 text-xs">AI Lead Platform</p>
                      </div>
                    </div>
                    <nav className="hidden lg:flex items-center gap-6 text-sm">
                      {["Product", "Solutions", "Pricing", "Resources"].map((item, idx) => (
                        <Link
                          key={item}
                          href="#"
                          className="text-foreground/70 hover:text-primary transition-all duration-300 relative group font-medium"
                        >
                          {item}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="grid grid-cols-1 gap-8 mb-8 md:mb-10">
                    <div>
                      <div className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-4">
                        <p className="text-primary text-xs font-bold tracking-widest uppercase">{current.subtitle}</p>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                        {current.title}
                      </h2>
                      <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                        {current.description}
                      </p>
                      <button
                        onClick={() => setShowAuthModal(true)}
                        className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-all duration-300 text-sm md:text-base hover:gap-3 group"
                      >
                        {current.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>

                    <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden glass-sm flex items-center justify-center bg-gradient-to-br from-primary/25 to-accent/15 group hover:from-primary/35 hover:to-accent/25 transition-all duration-500">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/5 to-accent/5" />
                      <div className="relative z-10 text-center">
                        <div className="text-6xl md:text-7xl font-black text-primary/40 mb-3 animate-float-up">/</div>
                        <p className="text-foreground/60 text-sm font-semibold">Discover qualified prospects</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-foreground/10">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <span className="text-foreground/60 text-xs md:text-sm font-semibold">
                        {String(currentSlide + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 md:w-40 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
                          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-foreground/60 text-xs md:text-sm font-semibold">
                        {String(slides.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                      <button
                        onClick={prevSlide}
                        className="p-2.5 md:p-3 hover:bg-foreground/10 rounded-lg transition-all duration-300 border border-foreground/20 hover:border-primary/50 hover:scale-110 hover:-translate-x-0.5 group"
                      >
                        <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2.5 md:p-3 hover:bg-foreground/10 rounded-lg transition-all duration-300 border border-foreground/20 hover:border-primary/50 hover:scale-110 hover:translate-x-0.5 group"
                      >
                        <ArrowRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-foreground/50 text-xs mt-6 md:mt-8 text-center md:text-left hover:text-foreground/70 transition-colors duration-300 font-medium">
                  ✓ 10,000+ leads generated • 94% accuracy • 24/7 support
                </p>
              </div>
            </div>
          </div>
        </div>

        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="glass max-w-md w-full p-8 relative animate-fade-in">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-foreground/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-foreground/60" />
              </button>

              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">Welcome to LeadVio</h2>
              <p className="text-foreground/60 mb-8">Do you have an existing account?</p>

              <div className="space-y-3">
                <Link
                  href="/sign-in"
                  className="block w-full px-6 py-4 bg-foreground/10 hover:bg-foreground/20 text-foreground font-semibold rounded-lg transition-all duration-300 text-center border border-foreground/20 hover:border-foreground/40"
                >
                  Yes, Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full px-6 py-4 bg-gradient-to-r from-primary to-accent text-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-center"
                >
                  No, Create Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
