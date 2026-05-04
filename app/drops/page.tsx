'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { collections } from '@/lib/data/collections'
import { Newsletter } from '@/components/sections/Newsletter'

export default function DropsPage() {
  const active = collections.filter((c) => c.isActive)
  const upcoming = collections.filter((c) => !c.isActive)

  return (
    <>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            Limited Releases
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-foreground max-w-xl"
          >
            Drops
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-md"
          >
            Every release is limited. When a batch is gone, it stays gone. Subscribe to the
            list to get first access before anything goes public.
          </motion.p>
        </div>
      </section>

      {/* Active drops */}
      {active.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl text-foreground mb-10">Active Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {active.map((col, i) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/collections/${col.slug}`} className="group block bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        {col.badge && <ProductBadgeComponent badge={col.badge} />}
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-primary/90 transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {col.shortDescription}
                    </p>
                    <p className="mt-4 text-[11px] tracking-[0.15em] uppercase text-primary/70">
                      {col.productIds.length} item{col.productIds.length !== 1 ? 's' : ''} →
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming drops */}
      {upcoming.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl text-foreground mb-10">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((col, i) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background border border-border rounded-lg p-8 opacity-70"
                >
                  <div className="flex items-start justify-between mb-6">
                    <ProductBadgeComponent badge="coming-soon" />
                    {col.dropDate && (
                      <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(col.dropDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">{col.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {col.shortDescription}
                  </p>
                  <div className="mt-6">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#newsletter">Join the Waitlist</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  )
}
