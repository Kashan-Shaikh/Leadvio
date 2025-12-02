'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageTransition } from '@/components/layout/page-transition'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Email and password required')
      return
    }

    setIsLoading(true)
    
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }))
      router.push('/dashboard')
    }, 500)
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 bg-gradient-to-br from-primary to-transparent blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="glass p-6 md:p-8">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center">
                  <span className="text-primary font-black text-sm">LV</span>
                </div>
                <span className="text-foreground font-bold">LeadVio</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">Welcome Back</h1>
              <p className="text-foreground/60 text-sm">Sign in to generate quality leads</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              {error && (
                <div className="p-3 glass-sm border border-red-500/20 bg-red-500/10">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-foreground text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 glass-sm text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 glass-sm text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-foreground font-semibold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-foreground/60 text-sm">
                Don't have an account?{' '}
                <Link href="/sign-up" className="text-primary hover:text-primary/80 font-semibold transition">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
