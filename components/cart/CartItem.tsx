'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag } from 'lucide-react'
import { QuantitySelector } from '@/components/product/QuantitySelector'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types'

export function CartItem({ item }: { item: CartItemType }) {
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      {/* Image */}
      <Link
        href={`/products/${item.product.slug}`}
        className="relative w-20 h-20 shrink-0 bg-secondary rounded overflow-hidden"
      >
        {item.product.images[0] ? (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.product.slug}`}
            className="font-serif text-sm text-foreground hover:text-primary transition-colors leading-tight line-clamp-2"
          >
            {item.product.name}
          </Link>
          <button
            onClick={() => removeItem(item.key)}
            aria-label="Remove item"
            className="shrink-0 p-0.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected variants */}
        {Object.keys(item.selectedVariants).length > 0 && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.1em]">
            {Object.values(item.selectedVariants).join(' / ')}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => updateQuantity(item.key, qty)}
          />
          <span className="text-sm font-medium text-foreground">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
