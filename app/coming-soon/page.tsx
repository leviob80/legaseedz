'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // fail silently
    } finally {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, hsla(42,88%,42%,0.06) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 15% 85%, hsla(115,47%,24%,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full space-y-10">

        {/* Logo */}
        <Image
          src="/images/brand/logo.png"
          alt="Legaseedz"
          width={90}
          height={90}
          priority
          className="object-contain"
        />

        {/* Divider */}
        <div className="w-12 h-px bg-primary/40" />

        {/* Copy */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
            Legacy Genetics &nbsp;·&nbsp; Seeds &nbsp;·&nbsp; Apparel
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
            Something worth<br />
            <span className="text-primary">waiting for.</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Legaseedz is launching soon. Verified legacy genetics, premium seeds, and lifestyle apparel — sourced from the growers who built it. Be first to know.
          </p>
        </div>

        {/* Email capture */}
        {submitted ? (
          <div className="flex items-center gap-3 text-primary py-2">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <p className="font-serif text-lg">You&apos;re on the list.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 h-12"
              aria-label="Email address"
            />
            <Button type="submit" variant="gold" size="lg" disabled={loading} className="shrink-0">
              {loading ? 'Joining…' : 'Notify Me'}
            </Button>
          </form>
        )}

        {/* Footer note */}
        <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/30">
          St. Louis, Missouri &nbsp;·&nbsp; Est. 2026
        </p>

      </div>
    </main>
  )
}
