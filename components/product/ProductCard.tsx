'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-4">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
              <ShoppingBag className="w-12 h-12" />
            </div>
          )}

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
                className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-semibold py-3 hover:bg-primary/90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-base text-foreground leading-snug">{product.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{product.shortDescription}</p>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-sm font-medium text-foreground">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* CTA for variant products */}
      {hasVariants && !isSoldOut && !isComingSoon && (
        <Button asChild variant="outline" size="sm" className="w-full mt-3">
          <Link href={`/products/${product.slug}`}>Select Options</Link>
        </Button>
      )}
      {isSoldOut && (
        <Button variant="ghost" size="sm" className="w-full mt-3 cursor-default opacity-50" disabled>
          Sold Out
        </Button>
      )}
      {isComingSoon && (
        <Button asChild variant="outline" size="sm" className="w-full mt-3">
          <Link href={`/products/${product.slug}`}>Join Waitlist</Link>
        </Button>
      )}
    </motion.div>
  )
}
