'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProductsByCategory } from '@/lib/data/products'

const seeds = getProductsByCategory('seeds')

export function BestSellers() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Genetics Lab
            </p>
            <h2 className="font-serif text-4xl text-foreground">Seeds &amp; Genetics</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
              Every pack verified. Every strain sourced direct. Feminized, regular, and
              autoflower genetics from the cultivators who built them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/shop/seeds"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-primary hover:text-primary/70 transition-colors"
            >
              All Genetics <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <ProductGrid columns={3}>
          {seeds.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </ProductGrid>
      </div>
    </section>
  )
}
