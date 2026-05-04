import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret || !sig) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment succeeded:', paymentIntent.id)
      // TODO: fulfill order — send confirmation email, update inventory, etc.
      break
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.error('Payment failed:', paymentIntent.id, paymentIntent.last_payment_error?.message)
      // TODO: notify customer of failed payment
      break
    }
    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge
      console.log('Charge refunded:', charge.id)
      // TODO: handle refund logic
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
