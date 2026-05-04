import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia' as const,
})

export const FREE_SHIPPING_THRESHOLD = 75
export const SHIPPING_RATE = 12.95

export function getShippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE
}

export function formatAmountForStripe(dollars: number): number {
  return Math.round(dollars * 100)
}

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder'
  )
}
