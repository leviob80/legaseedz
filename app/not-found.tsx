import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">404</p>
      <h1 className="font-serif text-6xl sm:text-8xl text-foreground mb-4 leading-tight">
        Page not found.
      </h1>
      <div className="w-16 h-px bg-primary/40 mb-6" />
      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        This page doesn't exist. Head back to the shop — the genetics are still there.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="gold" size="lg" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/shop">Browse the Shop</Link>
        </Button>
      </div>
    </main>
  )
}
