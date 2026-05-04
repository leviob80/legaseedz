'use client'

import { motion } from 'framer-motion'
import { Sprout, MapPin, Archive, Users } from 'lucide-react'

const values = [
  {
    Icon: Sprout,
    title: 'Verified Legacy Genetics',
    description:
      'Every strain we carry traces back to the original cut. We verify lineage before we list a single pack — no reproductions, no guesswork.',
  },
  {
    Icon: MapPin,
    title: 'Grower-Sourced, Local-First',
    description:
      'Direct from the St. Louis cultivators who bred these genetics. No middlemen, no seed-bank markups — just the real thing from the people who grew it.',
  },
  {
    Icon: Archive,
    title: 'Small Batch Only',
    description:
      'We release in limited quantities to preserve genetic integrity. Once a batch is gone, it stays gone until we can verify the next one.',
  },
  {
    Icon: Users,
    title: 'Community Rooted',
    description:
      'Built by the culture, for the culture. A percentage of every genetics sale supports legacy grower advocacy in our community.',
  },
]

export function BrandValues() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Why Legaseedz
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            The standard is the legacy.
          </h2>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {values.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="space-y-4"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-full border border-primary/25 flex items-center justify-center bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-lg text-foreground leading-snug">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
