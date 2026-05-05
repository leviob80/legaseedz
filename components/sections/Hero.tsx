'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {/* Gold radial glow — center top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 55% at 50% 35%, hsla(42,88%,42%,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Green ambient — lower left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 40% at 15% 80%, hsla(115,47%,24%,0.06) 0%, transparent 55%)',
          }}
        />
        {/* Subtle horizontal divider bottom */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Eyebrow — mirrors the logo tagline */}
        <motion.p
          {...fadeUp(0)}
          className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground"
        >
          Legacy Genetics&nbsp;&nbsp;·&nbsp;&nbsp;Seeds&nbsp;&nbsp;·&nbsp;&nbsp;Apparel&nbsp;&nbsp;·&nbsp;&nbsp;St. Louis
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[96px] text-foreground leading-none tracking-tight text-balance"
        >
          From the growers{' '}
          <span className="text-primary">who built it.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Verified legacy genetics, premium seeds, and lifestyle apparel — sourced from the
          cultivators who preserved these strains before they had names worth stealing.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Button variant="gold" size="xl" asChild>
            <Link href="/shop/seeds">
              Shop Genetics <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/about">Our Story</Link>
          </Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6"
        >
          {[
            'Legacy Verified',
            'Small Batch Only',
            'Grower-Direct',
            'St. Louis Rooted',
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50"
            >
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground/30">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
      </motion.div>
    </section>
  )
}
