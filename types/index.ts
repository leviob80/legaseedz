export type ProductBadge = 'available' | 'limited' | 'sold-out' | 'coming-soon'
export type ProductCategory = 'seeds' | 'apparel' | 'accessories' | 'merch'

export interface VariantOption {
  id: string
  value: string
  inStock: boolean
}

export interface Variant {
  id: string
  name: string
  options: VariantOption[]
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: ProductCategory | string
  variants: Variant[]
  badge?: ProductBadge
  description: string
  shortDescription: string
  tags?: string[]
  featured?: boolean
}

export interface CartItem {
  key: string
  product: Product
  quantity: number
  selectedVariants: Record<string, string>
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  coverImage: string
  badge?: ProductBadge
  productIds: string[]
  dropDate?: string
  isActive: boolean
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    instagram?: string
    twitter?: string
    tiktok?: string
  }
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
