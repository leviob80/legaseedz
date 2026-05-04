'use client'

import { useState } from 'react'
import { ShoppingBag, Bell } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { VariantSelector } from '@/components/product/VariantSelector'
import { QuantitySelector } from '@/components/product/QuantitySelector'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface Props {
  product: Product
}

export function AddToCartForm({ product }: Props) {
  const { addItem, openCart } = useCartStore()

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const isSoldOut = product.badge === 'sold-out'
  const isComingSoon = product.badge === 'coming-soon'

  const hasVariants = product.variants.length > 0
  const allVariantsSelected = product.variants.every((v) => selectedVariants[v.id])

  function isSelectedVariantInStock(): boolean {
    if (!hasVariants) return true
    return product.variants.every((variant) => {
      const selectedOptionId = selectedVariants[variant.id]
      if (!selectedOptionId) return false
      const option = variant.options.find((o) => o.id === selectedOptionId)
      return option?.inStock ?? false
    })
  }

  const canAddToCart =
    !isSoldOut && !isComingSoon && allVariantsSelected && isSelectedVariantInStock()

  function handleVariantChange(variantId: string, optionId: string) {
    setSelectedVariants((prev) => ({ ...prev, [variantId]: optionId }))
  }

  function handleAddToCart() {
    if (!canAddToCart) return
    addItem(product, quantity, hasVariants ? selectedVariants : undefined)
    openCart()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-3xl text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-muted-foreground/50 line-through text-sm">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      {/* Variants */}
      {hasVariants && !isSoldOut && !isComingSoon && (
        <VariantSelector
          variants={product.variants}
          selected={selectedVariants}
          onChange={handleVariantChange}
        />
      )}

      {/* Quantity */}
      {!isSoldOut && !isComingSoon && (
        <div className="space-y-2">
          <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
            Quantity
          </span>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>
      )}

      {/* CTA */}
      {isSoldOut ? (
        <div className="space-y-3">
          <Button variant="outline" size="lg" disabled className="w-full opacity-50">
            Sold Out
          </Button>
          <p className="text-xs text-muted-foreground/50 text-center">
            This item is unavailable. Check back for restocks.
          </p>
        </div>
      ) : isComingSoon ? (
        <div className="space-y-3">
          <Button variant="outline" size="lg" disabled className="w-full opacity-60">
            Coming Soon
          </Button>
          <Link href="/#newsletter" className="block">
            <Button variant="gold" size="lg" className="w-full gap-2">
              <Bell className="w-4 h-4" />
              Join the Drop List
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <Button
            variant="gold"
            size="lg"
            onClick={handleAddToCart}
            disabled={hasVariants && !canAddToCart}
            className="w-full gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {justAdded
              ? 'Added to Cart'
              : hasVariants && !allVariantsSelected
              ? 'Select Options'
              : hasVariants && !isSelectedVariantInStock()
              ? 'Out of Stock'
              : 'Add to Cart'}
          </Button>
          {product.badge === 'limited' && (
            <p className="text-xs text-primary text-center tracking-[0.08em]">
              Limited quantity available
            </p>
          )}
        </div>
      )}
    </div>
  )
}
