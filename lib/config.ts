import type { SiteConfig, NavItem } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Legaseedz',
  description:
    'Legacy cannabis genetics, premium seeds, and lifestyle apparel from growers who respect the craft.',
  url: 'https://legaseedz.com',
  ogImage: 'https://legaseedz.com/og.jpg',
  links: {
    instagram: 'https://instagram.com/legaseedz',
    twitter: 'https://twitter.com/legaseedz',
  },
}

export const navItems: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
      { label: 'All Products', href: '/shop' },
      { label: 'Seeds & Genetics', href: '/shop/seeds' },
      { label: 'Apparel', href: '/shop/apparel' },
      { label: 'Accessories', href: '/shop/accessories' },
    ],
  },
  { label: 'Drops', href: '/drops' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
