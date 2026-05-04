import { NextResponse } from 'next/server'
import { stripe, formatAmountForStripe, getShippingCost, isStripeConfigured } from '@/lib/stripe'
import type { CartItem } from '@/types'

interface CheckoutBody {
  items: CartItem[]
  email: string
  shipping: {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local.' },
      { status: 503 }
    )
  }

  try {
    const body: CheckoutBody = await req.json()
    const { items, email, shipping } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
    const shippingCost = getShippingCost(subtotal)
    const total = subtotal + shippingCost

    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(total),
      currency: 'usd',
      receipt_email: email,
      metadata: {
        site: 'legaseedz',
        items: JSON.stringify(
          items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.quantity }))
        ),
      },
      shipping: {
        name: shipping.name,
        address: {
          line1: shipping.line1,
          line2: shipping.line2,
          city: shipping.city,
          state: shipping.state,
          postal_code: shipping.zip,
          country: shipping.country,
        },
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create payment session' }, { status: 500 })
  }
}
