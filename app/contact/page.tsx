'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Instagram, Twitter } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl text-foreground"
          >
            Get in Touch
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">We&apos;d love to hear from you.</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you have questions about our genetics, want to collaborate, or are a
                legacy grower interested in working with us — reach out.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Email
                </p>
                <a
                  href="mailto:hello@legaseedz.com"
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  hello@legaseedz.com
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  Based In
                </p>
                <p className="text-sm text-foreground">St. Louis, Missouri</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com/legaseedz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/legaseedz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-start gap-4 pt-8">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h3 className="font-serif text-2xl text-foreground">Message received.</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll get back to you within 1–2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                    className="w-full bg-secondary border border-input rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background resize-none transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}
