'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, hsla(42,88%,42%,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Ready to grow
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight text-balance">
            Something worth keeping starts{' '}
            <span className="text-primary">with the right genetics.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Browse the full lineup — verified legacy genetics, limited apparel drops, and
            accessories built for the craft.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="gold" size="xl" asChild>
            <Link href="/shop">
              Browse the Full Lineup <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="xl" asChild>
            <Link href="/about">Our Story</Link>
          </Button>
        </motion.div>

        {/* Brand mark */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/30 pt-4"
        >
          Legaseedz &nbsp;·&nbsp; St. Louis &nbsp;·&nbsp; Est. Legacy
        </motion.p>
      </div>
    </section>
  )
}
