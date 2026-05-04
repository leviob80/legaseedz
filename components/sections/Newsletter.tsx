'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // fail silently — still show success to user
    } finally {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <section
      id="newsletter"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-y border-border"
    >
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Stay in the Know
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            First access to everything.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            Drop notifications, new genetics releases, grower content, and early access to
            limited batches — before they go public. No spam. Ever.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-primary py-4">
              <CheckCircle className="w-5 h-5" />
              <p className="font-serif text-lg">
                You&apos;re in. We&apos;ll be in touch when it matters.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-base"
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={loading}
                className="sm:w-auto w-full"
              >
                {loading ? 'Joining…' : 'Join the List'}
              </Button>
            </form>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-[10px] text-muted-foreground/40 tracking-[0.1em]"
        >
          Unsubscribe anytime. We respect the inbox.
        </motion.p>
      </div>
    </section>
  )
}
