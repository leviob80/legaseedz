import Link from 'next/link'
import { Logo } from '@/components/common/Logo'
import { Separator } from '@/components/ui/separator'
import { Instagram, Twitter } from 'lucide-react'

const shopLinks = [
  { label: 'Seeds & Genetics', href: '/shop/seeds' },
  { label: 'Apparel', href: '/shop/apparel' },
  { label: 'Accessories', href: '/shop/accessories' },
  { label: 'All Products', href: '/shop' },
  { label: 'Drops', href: '/drops' },
]

const infoLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-24">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="sm" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Legacy cannabis genetics, premium seeds, and lifestyle apparel from growers who
              respect the craft.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com/legaseedz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/legaseedz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Info
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter teaser */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Stay in the Know
            </h4>
            <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
              Drop notifications, first access to genetics releases, and grower content.
            </p>
            <Link
              href="/#newsletter"
              className="inline-block text-[11px] tracking-[0.15em] uppercase text-primary hover:text-primary/80 transition-colors"
            >
              Join the list →
            </Link>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Legaseedz. All rights reserved.
        </p>
        <p className="text-[11px] text-muted-foreground text-center">
          Must be 21 or older to purchase. For adults only. Know your local laws.
        </p>
      </div>
    </footer>
  )
}
