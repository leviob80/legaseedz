'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-destructive mb-4">Error</p>
      <h1 className="font-serif text-5xl text-foreground mb-4 leading-tight">
        Something went wrong.
      </h1>
      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        An unexpected error occurred. Please try reloading the page.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="gold" size="lg" onClick={reset}>
          Try Again
        </Button>
        <Button variant="outline" size="lg" onClick={() => (window.location.href = '/')}>
          Go Home
        </Button>
      </div>
    </main>
  )
}
