'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const hasVariants = product.variants.length > 0
  const isSoldOut = product.badge === 'sold-out'
  const isComingSoon = product.badge === 'coming-soon'
  const canQuickAdd = !hasVariants && !isSoldOut && !isComingSoon

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary mb-0 border border-border group-hover:border-primary/30 transition-colors duration-300">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
              <Leaf className="w-10 h-10" />
            </div>
          )}

          {/* Gold top accent bar on hover */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <ProductBadgeComponent badge={product.badge} />
            </div>
          )}

          {/* Quick add overlay */}
          {canQuickAdd && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleQuickAdd}
                className="w-full bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-semibold py-3.5 hover:bg-primary/90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-4 space-y-1.5">
          <h3 className="font-serif text-base text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-semibold text-foreground">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-muted-foreground/50 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            {hasVariants && !isSoldOut && !isComingSoon && (
              <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/40">
                Options
              </span>
            )}
          </div>
        </div>
      </Link>

      {hasVariants && !isSoldOut && !isComingSoon && (
        <Button asChild variant="outline" size="sm" className="w-full mt-3">
          <Link href={`/products/${product.slug}`}>Select Options</Link>
        </Button>
      )}
      {isSoldOut && (
        <p className="w-full mt-3 text-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40">
          Sold Out
        </p>
      )}
      {isComingSoon && (
        <Button asChild variant="outline" size="sm" className="w-full mt-3">
          <Link href={`/products/${product.slug}`}>Join Waitlist</Link>
        </Button>
      )}
    </motion.div>
  )
}
