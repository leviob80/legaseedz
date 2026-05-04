'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number, selectedVariants?: Record<string, string>) => void
  removeItem: (itemKey: string) => void
  updateQuantity: (itemKey: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

function buildItemKey(productId: string, selectedVariants?: Record<string, string>): string {
  if (!selectedVariants || Object.keys(selectedVariants).length === 0) return productId
  const variantStr = Object.entries(selectedVariants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|')
  return `${productId}__${variantStr}`
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, selectedVariants) => {
        const key = buildItemKey(product.id, selectedVariants)
        set((state) => {
          const existing = state.items.find((item) => item.key === key)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key ? { ...item, quantity: item.quantity + quantity } : item
              ),
            }
          }
          return {
            items: [
              ...state.items,
              { key, product, quantity, selectedVariants: selectedVariants ?? {} },
            ],
          }
        })
      },

      removeItem: (itemKey) =>
        set((state) => ({ items: state.items.filter((item) => item.key !== itemKey) })),

      updateQuantity: (itemKey, quantity) => {
        if (quantity <= 0) { get().removeItem(itemKey); return }
        set((state) => ({
          items: state.items.map((item) =>
            item.key === itemKey ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotal: () =>
        get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'legaseedz-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
