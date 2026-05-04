'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { CheckCircle, XCircle, Clock, ArrowRight, Sprout } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

type PaymentStatus = 'loading' | 'succeeded' | 'processing' | 'failed' | 'unconfigured'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const { clearCart } = useCartStore()
  const [status, setStatus] = useState<PaymentStatus>('loading')
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret')
    const redirectStatus = searchParams.get('redirect_status')
    const intentId = searchParams.get('payment_intent')

    if (intentId) setPaymentIntentId(intentId)

    if (!clientSecret) {
      setStatus(stripePromise ? 'failed' : 'unconfigured')
      return
    }

    if (redirectStatus === 'succeeded') {
      clearCart()
      setStatus('succeeded')
      return
    }

    if (!stripePromise) {
      setStatus('unconfigured')
      return
    }

    stripePromise.then((stripe) => {
      if (!stripe) return
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            clearCart()
            setStatus('succeeded')
            break
          case 'processing':
            setStatus('processing')
            break
          default:
            setStatus('failed')
        }
      })
    })
  }, [searchParams, clearCart])

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center space-y-8">

        {status === 'loading' && (
          <div className="space-y-4">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground text-sm">Confirming your order…</p>
          </div>
        )}

        {status === 'succeeded' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <Sprout className="w-14 h-14 text-accent mx-auto" />
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3 font-medium">
                Order Confirmed
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
                Your order is on its way.
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Thank you for supporting legacy genetics. A receipt has been sent to your email.
                Orders ship within 3–5 business days.
              </p>
            </div>
            {paymentIntentId && (
              <p className="text-xs text-muted-foreground/30 font-mono">
                Order ref: {paymentIntentId}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="gold" size="lg" asChild>
                <Link href="/shop">
                  Continue Shopping <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>
        )}

        {status === 'processing' && (
          <div className="space-y-6">
            <Clock className="w-14 h-14 text-primary mx-auto" />
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-primary mb-3 font-medium">
                Payment Processing
              </p>
              <h1 className="font-serif text-4xl text-foreground mb-4 leading-tight">
                Almost there.
              </h1>
              <p className="text-muted-foreground">
                Your payment is being processed. We'll send a confirmation email once it clears — usually within a few minutes.
              </p>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-6">
            <XCircle className="w-14 h-14 text-destructive mx-auto" />
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-destructive mb-3 font-medium">
                Payment Failed
              </p>
              <h1 className="font-serif text-4xl text-foreground mb-4 leading-tight">
                Something went wrong.
              </h1>
              <p className="text-muted-foreground">
                Your payment didn't go through and no charge was made. Please try again with a different payment method.
              </p>
            </div>
            <Button variant="gold" size="lg" asChild>
              <Link href="/checkout">Try Again</Link>
            </Button>
          </div>
        )}

        {status === 'unconfigured' && (
          <div className="space-y-6">
            <CheckCircle className="w-14 h-14 text-primary/40 mx-auto" />
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 font-medium">
                Development Mode
              </p>
              <h1 className="font-serif text-4xl text-foreground mb-4 leading-tight">
                Stripe not connected.
              </h1>
              <p className="text-muted-foreground">
                Add your Stripe keys to{' '}
                <code className="font-mono text-sm bg-secondary px-1 py-0.5">.env.local</code>{' '}
                to enable live payments.
              </p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        )}

      </div>
    </main>
  )
}
