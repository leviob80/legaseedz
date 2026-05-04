import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductsByCategory } from '@/lib/data/products'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'

const VALID_CATEGORIES = ['seeds', 'apparel', 'accessories'] as const
type Category = (typeof VALID_CATEGORIES)[number]

const categoryLabels: Record<Category, string> = {
  seeds: 'Genetics & Seeds',
  apparel: 'Apparel',
  accessories: 'Accessories',
}

const categoryDescriptions: Record<Category, string> = {
  seeds: 'Verified legacy genetics — sourced directly from the growers who built them.',
  apparel: 'Built for the craft. Heavyweight fabrics, clean marks, nothing loud.',
  accessories: 'The finishing pieces. Everything else you need.',
}

interface Props {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category as Category)) return {}
  const label = categoryLabels[category as Category]
  return {
    title: `${label} — Legaseedz`,
    description: categoryDescriptions[category as Category],
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category as Category)) notFound()

  const label = categoryLabels[category as Category]
  const description = categoryDescriptions[category as Category]
  const categoryProducts = getProductsByCategory(category)
  const otherCategories = VALID_CATEGORIES.filter((c) => c !== category)

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-muted-foreground/50">
                <Link href="/shop" className="hover:text-muted-foreground transition-colors">Shop</Link>
                <span>/</span>
                <span className="text-muted-foreground">{label}</span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
                {label}
              </h1>
              <p className="text-muted-foreground text-sm max-w-lg">{description}</p>
            </div>

            <nav className="flex items-center gap-1 pb-1 shrink-0">
              <Link
                href="/shop"
                className="px-4 py-2 text-xs tracking-[0.1em] uppercase text-muted-foreground border border-border/40 hover:border-border hover:text-foreground transition-colors"
              >
                All
              </Link>
              {VALID_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/shop/${cat}`}
                  className={`px-4 py-2 text-xs tracking-[0.1em] uppercase border transition-colors ${
                    cat === category
                      ? 'border-primary text-primary bg-primary/10'
                      : 'border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {cat === 'seeds' ? 'Seeds' : categoryLabels[cat]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categoryProducts.length > 0 ? (
            <>
              <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground/50 mb-8">
                {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
              </p>
              <ProductGrid columns={3}>
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-border/30">
              <p className="text-sm text-muted-foreground/50">Nothing in this category yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      {otherCategories.length > 0 && (
        <section className="py-10 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground/40 shrink-0">
              Also browse
            </span>
            {otherCategories.map((cat) => (
              <Link
                key={cat}
                href={`/shop/${cat}`}
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {cat === 'seeds' ? 'Seeds' : categoryLabels[cat]} →
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
