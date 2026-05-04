import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AgeGate } from '@/components/layout/AgeGate'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Legaseedz | Premium Cannabis Genetics & Lifestyle',
    template: '%s | Legaseedz',
  },
  description:
    'Legacy cannabis genetics, premium seeds, and lifestyle apparel from growers who respect the craft.',
  keywords: [
    'cannabis seeds',
    'legacy genetics',
    'feminized seeds',
    'cannabis apparel',
    'grower genetics',
    'local grower seeds',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Legaseedz',
    description:
      'Legacy cannabis genetics, premium seeds, and lifestyle apparel from growers who respect the craft.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legaseedz | Premium Cannabis Genetics & Lifestyle',
    description: 'Legacy genetics. Premium seeds. Apparel built for the craft.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        <AgeGate />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <CartDrawer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
