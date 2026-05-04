'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Leaf, ArrowLeft, Lock, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD, getShippingCost } from '@/lib/stripe'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

interface FormState {
  email: string
  firstName: string
  lastName: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
}

// ── Inner payment form ─────────────────────────────────────────────────────
function PaymentForm({
  form,
  subtotal,
  shippingCost,
  onBack,
}: {
  form: FormState
  subtotal: number
  shippingCost: number
  onBack: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        payment_method_data: {
          billing_details: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            address: {
              line1: form.address1,
              line2: form.address2 || undefined,
              city: form.city,
              state: form.state,
              postal_code: form.zip,
              country: form.country,
            },
          },
        },
      },
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-border/40 bg-secondary/10 p-5 space-y-4">
        <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
          Payment
        </p>
        <PaymentElement
          options={{
            layout: 'tabs',
            fields: { billingDetails: 'never' },
          }}
        />
      </div>

      {error && (
        <div className="border border-destructive/40 bg-destructive/5 px-4 py-3 rounded-sm">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Shipping
        </button>
        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={!stripe || !elements || submitting}
          className="flex-1 gap-2"
        >
          <Lock className="w-3.5 h-3.5" />
          {submitting ? 'Processing…' : `Place Order — ${formatPrice(subtotal + shippingCost)}`}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground/40 text-center">
        Payments secured by Stripe · 256-bit SSL encryption
      </p>
    </form>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, getTotal } = useCartStore()
  const subtotal = getTotal()
  const shippingCost = getShippingCost(subtotal)
  const [summaryOpen, setSummaryOpen] = useState(false)

  const [form, setForm] = useState<FormState>({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const requiredFields = ['email', 'firstName', 'lastName', 'address1', 'city', 'state', 'zip'] as const
  const shippingComplete = requiredFields.every((f) => form[f].trim().length > 0)

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (!shippingComplete) return
    setApiLoading(true)
    setApiError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email: form.email,
          shipping: {
            name: `${form.firstName} ${form.lastName}`,
            line1: form.address1,
            line2: form.address2 || undefined,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
          },
        }),
      })
      const data = await res.json()
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
        setStep('payment')
      } else {
        setApiError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setApiError('Network error. Please check your connection.')
    } finally {
      setApiLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4">
        <Leaf className="w-12 h-12 text-muted-foreground/15" />
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button variant="default" size="lg" asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border/40 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Cart
          </Link>
          <span className="font-serif text-lg text-foreground">Legaseedz</span>
          <Lock className="w-4 h-4 text-muted-foreground/40" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 items-start">

        {/* Left — form */}
        <div className="space-y-8">
          {/* Step indicator */}
          <div className="flex items-center gap-3 text-xs tracking-[0.12em] uppercase">
            <span className={step === 'shipping' ? 'text-primary font-medium' : 'text-muted-foreground/40'}>
              Shipping
            </span>
            <div className="flex-1 h-px bg-border/40" />
            <span className={step === 'payment' ? 'text-primary font-medium' : 'text-muted-foreground/40'}>
              Payment
            </span>
          </div>

          {step === 'shipping' && (
            <form onSubmit={handleContinue} className="space-y-6">
              {/* Contact */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl text-foreground">Contact</h2>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>

              {/* Shipping */}
              <div className="space-y-4">
                <h2 className="font-serif text-xl text-foreground">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleFormChange}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                  <Input
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleFormChange}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <Input
                  name="address1"
                  placeholder="Address"
                  value={form.address1}
                  onChange={handleFormChange}
                  required
                  className="border-border/50 focus:border-primary"
                />
                <Input
                  name="address2"
                  placeholder="Apartment, suite, unit (optional)"
                  value={form.address2}
                  onChange={handleFormChange}
                  className="border-border/50 focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleFormChange}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                  <Input
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleFormChange}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="zip"
                    placeholder="ZIP code"
                    value={form.zip}
                    onChange={handleFormChange}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleFormChange}
                    className="h-10 w-full border border-border/50 bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>

              {apiError && (
                <div className="border border-destructive/40 bg-destructive/5 px-4 py-3">
                  <p className="text-sm text-destructive">{apiError}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={!shippingComplete || apiLoading}
                className="w-full"
              >
                {apiLoading ? 'Loading…' : 'Continue to Payment'}
              </Button>
            </form>
          )}

          {step === 'payment' && clientSecret && (
            <>
              {/* Shipping summary */}
              <div className="border border-border/40 bg-secondary/10 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-1">Shipping to</p>
                  <p className="text-sm text-foreground">
                    {form.firstName} {form.lastName} · {form.address1}, {form.city}, {form.state} {form.zip}
                  </p>
                </div>
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs tracking-[0.08em] uppercase text-primary hover:text-primary/70 transition-colors ml-4 shrink-0"
                >
                  Edit
                </button>
              </div>

              {stripePromise ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'night',
                      variables: {
                        colorPrimary: '#C9920A',
                        colorBackground: '#0D0C08',
                        colorText: '#F2EDE0',
                        colorDanger: '#ef4444',
                        fontFamily: 'serif',
                        borderRadius: '2px',
                      },
                    },
                  }}
                >
                  <PaymentForm
                    form={form}
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    onBack={() => setStep('shipping')}
                  />
                </Elements>
              ) : (
                <div className="border border-border/40 p-6 text-center space-y-2">
                  <Lock className="w-6 h-6 text-muted-foreground/30 mx-auto" />
                  <p className="text-muted-foreground">Payment not configured.</p>
                  <p className="text-xs text-muted-foreground/50">
                    Add <code className="font-mono bg-secondary px-1 py-0.5">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to .env.local
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right — order summary */}
        <div className="lg:sticky lg:top-8">
          {/* Mobile toggle */}
          <button
            onClick={() => setSummaryOpen((o) => !o)}
            className="flex lg:hidden w-full items-center justify-between border border-border/40 bg-secondary/10 px-4 py-3 mb-0"
          >
            <span className="text-xs tracking-[0.1em] uppercase text-muted-foreground">
              Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm">{formatPrice(subtotal + shippingCost)}</span>
              {summaryOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </button>

          <div className={`border border-border/40 divide-y divide-border/30 ${!summaryOpen ? 'hidden lg:block' : ''}`}>
            {/* Items */}
            <div className="p-5 space-y-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3">
                  <div className="relative w-14 h-14 shrink-0 bg-secondary/20 border border-border/30 overflow-hidden">
                    {item.product.images[0] ? (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-muted-foreground/15" />
                      </div>
                    )}
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-mono flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight truncate">{item.product.name}</p>
                    {Object.keys(item.selectedVariants).length > 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {Object.values(item.selectedVariants).join(' / ')}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-foreground shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Shipping {subtotal < FREE_SHIPPING_THRESHOLD && `(free over ${formatPrice(FREE_SHIPPING_THRESHOLD)})`}
                </span>
                <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-border/30">
                <span className="text-sm font-medium">Total</span>
                <span className="font-serif text-2xl text-foreground">{formatPrice(subtotal + shippingCost)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
