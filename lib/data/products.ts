import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'lgs-001',
    name: 'OG Kush Feminized',
    slug: 'og-kush-feminized',
    price: 65,
    compareAtPrice: 80,
    images: ['/images/products/og-kush-1.jpg', '/images/products/og-kush-2.jpg'],
    category: 'seeds',
    badge: 'available',
    featured: true,
    shortDescription: 'Pure legacy OG Kush genetics — feminized, stable, fire.',
    description:
      'The definitive legacy cut. Our OG Kush Feminized preserves the exact terpene profile and genetic stability that made this strain a cornerstone of cannabis culture. Earthy, pine-forward, with a fuel finish. Perfect structure, consistent yields. Every pack sourced directly from verified legacy growers.',
    tags: ['indica-dominant', 'legacy', 'feminized', 'bestseller'],
    variants: [
      {
        id: 'pack-size',
        name: 'Pack Size',
        options: [
          { id: '5-pack', value: '5 Seeds', inStock: true },
          { id: '10-pack', value: '10 Seeds', inStock: true },
          { id: '25-pack', value: '25 Seeds', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'lgs-002',
    name: 'Gelato #41 Regular',
    slug: 'gelato-41-regular',
    price: 75,
    images: ['/images/products/gelato-41-1.jpg', '/images/products/gelato-41-2.jpg'],
    category: 'seeds',
    badge: 'limited',
    featured: true,
    shortDescription: 'Verified legacy Gelato #41 — limited batch, limited time.',
    description:
      'Small-batch release from a verified legacy cut of Gelato #41. Sunset Sherbet × Thin Mint GSC. Expect vibrant purples, dense frost, and a dessert-forward profile that rewards patient growers. This batch is 50 packs total. When it\'s gone, it\'s gone.',
    tags: ['hybrid', 'legacy', 'regular', 'limited'],
    variants: [
      {
        id: 'pack-size',
        name: 'Pack Size',
        options: [
          { id: '5-pack', value: '5 Seeds', inStock: true },
          { id: '10-pack', value: '10 Seeds', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'lgs-003',
    name: 'Runtz Auto Feminized',
    slug: 'runtz-auto-feminized',
    price: 55,
    images: ['/images/products/runtz-auto-1.jpg'],
    category: 'seeds',
    badge: 'coming-soon',
    shortDescription: 'Auto Runtz genetics — dropping soon. Get on the list.',
    description:
      'Our upcoming autoflowering Runtz release — fast finish, heavy yield, full terpene expression. Join the drop waitlist and lock your pack before it goes live.',
    tags: ['hybrid', 'auto', 'feminized', 'upcoming'],
    variants: [
      {
        id: 'pack-size',
        name: 'Pack Size',
        options: [
          { id: '5-pack', value: '5 Seeds', inStock: false },
          { id: '10-pack', value: '10 Seeds', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'lgs-004',
    name: 'Legaseedz Heritage Hoodie',
    slug: 'legaseedz-heritage-hoodie',
    price: 88,
    images: ['/images/products/heritage-hoodie-1.jpg', '/images/products/heritage-hoodie-2.jpg'],
    category: 'apparel',
    badge: 'available',
    featured: true,
    shortDescription: 'Heavyweight hoodie. Embroidered crest. Built for the craft.',
    description:
      'Heavyweight 400gsm French terry. Forest green with embroidered Legaseedz crest on the chest and woven label at the hem. Relaxed fit. The hoodie for people who grow things that matter.',
    tags: ['apparel', 'hoodie', 'bestseller'],
    variants: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 'xs', value: 'XS', inStock: true },
          { id: 's', value: 'S', inStock: true },
          { id: 'm', value: 'M', inStock: true },
          { id: 'l', value: 'L', inStock: true },
          { id: 'xl', value: 'XL', inStock: true },
          { id: 'xxl', value: 'XXL', inStock: false },
        ],
      },
      {
        id: 'color',
        name: 'Color',
        options: [
          { id: 'forest', value: 'Forest Green', inStock: true },
          { id: 'black', value: 'Washed Black', inStock: true },
          { id: 'cream', value: 'Natural Cream', inStock: false },
        ],
      },
    ],
  },
  {
    id: 'lgs-005',
    name: 'Legaseedz Classic Tee',
    slug: 'legaseedz-classic-tee',
    price: 42,
    images: ['/images/products/classic-tee-1.jpg', '/images/products/classic-tee-2.jpg'],
    category: 'apparel',
    badge: 'available',
    shortDescription: 'Premium ringspun tee. Oversized fit. Built to last.',
    description:
      '220gsm ringspun cotton. Oversized cut. Legaseedz wordmark in gold on charcoal. Pre-washed so it fits right out the bag. Wears better every wash.',
    tags: ['apparel', 'tee', 'staple'],
    variants: [
      {
        id: 'size',
        name: 'Size',
        options: [
          { id: 's', value: 'S', inStock: true },
          { id: 'm', value: 'M', inStock: true },
          { id: 'l', value: 'L', inStock: true },
          { id: 'xl', value: 'XL', inStock: true },
          { id: 'xxl', value: 'XXL', inStock: true },
        ],
      },
    ],
  },
  {
    id: 'lgs-006',
    name: "Grower's Cap",
    slug: 'growers-cap',
    price: 38,
    images: ['/images/products/growers-cap-1.jpg'],
    category: 'accessories',
    badge: 'available',
    shortDescription: 'Structured cap with embroidered mark. One size, adjustable.',
    description:
      '6-panel structured cap. Embroidered Legaseedz leaf mark on the front panel. Woven strap, brass buckle. Made for the person who spends time in the garden.',
    tags: ['accessories', 'cap', 'staple'],
    variants: [],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
