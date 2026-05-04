'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function BrandStatement() {
  return (
    <section className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background treatment */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, hsla(42,88%,42%,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-10">
        {/* Large quote mark */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-7xl text-primary/30 leading-none block -mb-4"
          aria-hidden
        >
          "
        </motion.span>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-snug text-balance"
        >
          Legacy isn&apos;t just a word. It&apos;s the genetics that survived when growing meant
          risk, the growers who kept the work alive, and the strains that built everything
          that came after.{' '}
          <span className="text-primary">
            We&apos;re just keeping the record straight.
          </span>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px w-12 bg-border" />
          <Link
            href="/about"
            className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            Our Story
          </Link>
          <div className="h-px w-12 bg-border" />
        </motion.div>
      </div>
    </section>
  )
}
