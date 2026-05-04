'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, X, ArrowRight, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { QuantitySelector } from '@/components/product/QuantitySelector'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATE, getShippingCost } from '@/lib/stripe'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const subtotal = getTotal()
  const shippingCost = getShippingCost(subtotal)
  const total = subtotal + shippingCost
  const freeShippingRemaining = FREE_SHIPPING_THRESHOLD - subtotal

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
        <Leaf className="w-14 h-14 text-muted-foreground/15" />
        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl text-foreground">Your cart is empty.</h1>
          <p className="text-muted-foreground text-sm">
            Find your genetics, gear, or both.
          </p>
        </div>
        <Button variant="default" size="lg" asChild>
          <Link href="/shop">Shop Now <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
              {items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'item' : 'items'}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
              Your Cart
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors pb-1"
          >
            ← Continue Shopping
          </Link>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* Items */}
          <div className="divide-y divide-border/30">
            {items.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-5 py-7"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative w-24 h-24 shrink-0 bg-secondary/20 border border-border/30 overflow-hidden"
                >
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-muted-foreground/15" />
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-serif text-xl text-foreground hover:text-primary transition-colors leading-tight"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label="Remove item"
                      className="shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {Object.keys(item.selectedVariants).length > 0 && (
                    <p className="text-xs text-muted-foreground tracking-[0.08em] uppercase">
                      {Object.values(item.selectedVariants).join(' · ')}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-1">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.key, qty)}
                    />
                    <span className="font-serif text-xl text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 border border-border/40 bg-secondary/10 p-6 space-y-5">
            <h2 className="font-serif text-xl text-foreground">Order Summary</h2>

            {/* Free shipping progress */}
            {freeShippingRemaining > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs tracking-[0.08em] uppercase">
                  <span className="text-muted-foreground">Free shipping in</span>
                  <span className="text-primary font-medium">{formatPrice(freeShippingRemaining)} more</span>
                </div>
                <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs tracking-[0.08em] uppercase text-primary font-medium">
                Free shipping unlocked
              </p>
            )}

            <div className="h-px bg-border/40" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div className="h-px bg-border/40" />
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium tracking-[0.05em] uppercase">Estimated Total</span>
                <span className="font-serif text-2xl text-foreground">{formatPrice(total)}</span>
              </div>
            </div>

            <Button variant="gold" size="lg" className="w-full gap-2" asChild>
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <p className="text-xs text-muted-foreground/40 text-center tracking-[0.05em]">
              Taxes calculated at checkout · Secure via Stripe
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}
