'use client'

import { motion } from 'framer-motion'

const values = [
  {
    num: '01',
    title: 'Verified Legacy Genetics',
    description:
      'Every strain we carry traces back to the original cut. We verify lineage before we list a single pack — no reproductions, no guesswork.',
  },
  {
    num: '02',
    title: 'Grower-Sourced, Local-First',
    description:
      'Direct from the St. Louis cultivators who bred these genetics. No middlemen, no seed-bank markups — just the real thing from the people who grew it.',
  },
  {
    num: '03',
    title: 'Small Batch Only',
    description:
      'We release in limited quantities to preserve genetic integrity. Once a batch is gone, it stays gone until we can verify the next one.',
  },
  {
    num: '04',
    title: 'Community Rooted',
    description:
      'Built by the culture, for the culture. A percentage of every genetics sale supports legacy grower advocacy in our community.',
  },
]

export function BrandValues() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-xl"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Why Legaseedz
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            The standard is<br />the legacy.
          </h2>
        </motion.div>

        {/* Values — horizontal rule layout */}
        <div className="divide-y divide-border">
          {values.map(({ num, title, description }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_1.6fr] gap-4 md:gap-12 py-8 group"
            >
              <span className="font-serif text-4xl text-primary/25 leading-none tabular-nums">
                {num}
              </span>
              <h3 className="font-serif text-xl text-foreground leading-snug self-center">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed self-center">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
