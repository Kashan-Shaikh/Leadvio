'use client'

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-xl animate-pulse" />
        <div className="absolute inset-2 rounded-full border-2 border-foreground/10" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-primary border-r-accent animate-spin-loader" />
      </div>
    </div>
  )
}
