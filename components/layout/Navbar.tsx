'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { useCartStore } from '@/lib/store/cart'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Drops', href: '/drops' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { getItemCount, openCart } = useCartStore()
  const itemCount = getItemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || mobileOpen
            ? 'bg-background/96 backdrop-blur-sm border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Logo size="sm" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[11px] tracking-[0.18em] uppercase font-sans transition-colors duration-150',
                  pathname.startsWith(link.href)
                    ? 'text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
              className="relative p-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/98 backdrop-blur-md border-b border-border overflow-hidden md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'py-4 text-[11px] tracking-[0.18em] uppercase font-sans border-b border-border/30 transition-colors',
                    pathname.startsWith(link.href) ? 'text-primary' : 'text-foreground/60'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="py-4 text-[11px] tracking-[0.18em] uppercase font-sans text-foreground/60"
              >
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
