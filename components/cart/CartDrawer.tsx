'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { CartItem } from '@/components/cart/CartItem'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, getTotal, getItemCount, clearCart } = useCartStore()
  const total = getTotal()
  const count = getItemCount()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-[70] bg-background border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-serif text-lg text-foreground">
                Your Cart {count > 0 && <span className="text-muted-foreground text-base">({count})</span>}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-16">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/20" />
                  <p className="font-serif text-lg text-muted-foreground">Your cart is empty.</p>
                  <Button variant="outline" size="sm" onClick={closeCart} asChild>
                    <Link href="/shop">Browse Products</Link>
                  </Button>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-lg text-foreground">{formatPrice(total)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Shipping & taxes calculated at checkout.
                </p>
                <Separator />
                <Button variant="gold" size="xl" className="w-full" asChild>
                  <Link href="/checkout" onClick={closeCart}>
                    Proceed to Checkout
                  </Link>
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-[0.1em] uppercase"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
