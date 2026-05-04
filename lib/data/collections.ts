import type { Collection } from '@/types'

export const collections: Collection[] = [
  {
    id: 'col-001',
    name: 'Founding Genetics Drop',
    slug: 'founding-genetics',
    shortDescription: 'The strains that built the legacy. First drop. Limited packs.',
    description:
      'Our inaugural genetics release — six verified legacy cuts, sourced directly from the growers who built these strains before they had names. Every pack in this drop is the real thing. No reproductions, no recreations. The founding genetics.',
    coverImage: '/images/collections/founding-genetics.jpg',
    badge: 'limited',
    productIds: ['lgs-001', 'lgs-002'],
    isActive: true,
  },
  {
    id: 'col-002',
    name: 'Grower\'s Wardrobe — Season 1',
    slug: 'growers-wardrobe-s1',
    shortDescription: 'The first Legaseedz apparel drop. Built for the craft.',
    description:
      "Season 1 of the Legaseedz wardrobe. Every piece designed for the grower — not the dispensary tourist. Heavyweight fabrics, clean marks, nothing loud. You know what it means when you wear it.",
    coverImage: '/images/collections/growers-wardrobe-s1.jpg',
    badge: 'available',
    productIds: ['lgs-004', 'lgs-005', 'lgs-006'],
    isActive: true,
  },
  {
    id: 'col-003',
    name: 'Auto Drop — Vol. 1',
    slug: 'auto-drop-vol-1',
    shortDescription: 'First autoflower release. Fast finish, full expression.',
    description:
      'Our first autoflowering genetics drop. Selected for growers who need speed without sacrificing quality. Compact, fast, and built to perform indoors or out.',
    coverImage: '/images/collections/auto-drop-vol1.jpg',
    badge: 'coming-soon',
    productIds: ['lgs-003'],
    dropDate: '2026-06-15',
    isActive: false,
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getActiveCollections(): Collection[] {
  return collections.filter((c) => c.isActive)
}
