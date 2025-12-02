'use client'

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
          <span className="text-xl font-semibold text-foreground">LeadVio</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  )
}
