'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Metadata } from 'next'

export default function AboutPage() {
  const milestones = [
    {
      year: 'The Beginning',
      text: 'Legaseedz was born in St. Louis — not in a boardroom, but in a grow room. A small group of local cultivators who had spent years preserving genetics decided it was time to share them properly.',
    },
    {
      year: 'The Mission',
      text: 'Before legalization made everything shiny and corporate, the people who kept these strains alive did it quietly, carefully, and with respect for the plants. We exist to honor that work and extend it.',
    },
    {
      year: 'The Standard',
      text: 'We verify every cut before we carry it. We work exclusively with the original growers. We release in limited batches because real genetics can\'t be mass produced without losing what makes them worth preserving.',
    },
    {
      year: 'The Future',
      text: 'Legaseedz will always be grower-first. As we grow, the mission stays fixed: keep the record straight, support local cultivators, and make sure the people who built this culture still have a place in it.',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 30%, hsla(42,88%,42%,0.06) 0%, transparent 65%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-foreground leading-tight mb-6"
          >
            Built on legacy.{' '}
            <span className="text-primary">Grown with intention.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Legaseedz is a St. Louis-rooted genetics and lifestyle brand built to preserve,
            share, and honor the work of legacy cannabis cultivators. We carry verified genetics
            direct from the growers who built them — no middlemen, no compromises.
          </motion.p>
        </div>
      </section>

      {/* Story sections */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-16">
          {milestones.map(({ year, text }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid grid-cols-[80px_1fr] gap-8"
            >
              <div className="pt-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary/70 font-semibold">
                  {year}
                </p>
              </div>
              <div>
                <p className="text-base text-foreground/80 leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl text-foreground">
            Ready to grow with the real thing?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link href="/shop">
                Shop Genetics <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
