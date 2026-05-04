import Link from 'next/link'
import type { Metadata } from 'next'
import { products } from '@/lib/data/products'
import { collections, getActiveCollections } from '@/lib/data/collections'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductBadgeComponent } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Shop — Legaseedz',
  description: 'Browse all Legaseedz products — verified genetics, seeds, apparel, and accessories.',
}

const categories = [
  { slug: 'seeds', label: 'Genetics & Seeds' },
  { slug: 'apparel', label: 'Apparel' },
  { slug: 'accessories', label: 'Accessories' },
]

export default function ShopPage() {
  const seeds = products.filter((p) => p.category === 'seeds')
  const apparel = products.filter((p) => p.category === 'apparel')
  const accessories = products.filter((p) => p.category === 'accessories')
  const activeCollections = getActiveCollections()

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Legaseedz
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
                Shop
              </h1>
            </div>
            <nav className="flex items-center gap-1 pb-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="px-4 py-2 text-xs tracking-[0.1em] uppercase text-muted-foreground border border-border/40 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Active collections strip */}
      {activeCollections.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-5 border-b border-border/30 bg-secondary/10">
          <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto pb-1">
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground/40 shrink-0">
              Active Drops
            </span>
            {activeCollections.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="flex items-center gap-2 shrink-0 group"
              >
                {col.badge && (
                  <span className="scale-90 origin-left">
                    <ProductBadgeComponent badge={col.badge} />
                  </span>
                )}
                <span className="text-xs tracking-[0.08em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                  {col.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Seeds */}
      {seeds.length > 0 && (
        <section className="py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-2xl text-foreground">Genetics &amp; Seeds</h2>
              <div className="flex-1 h-px bg-border/40" />
              <Link
                href="/shop/seeds"
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                See All →
              </Link>
            </div>
            <ProductGrid columns={3}>
              {seeds.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </div>
        </section>
      )}

      {/* Apparel */}
      {apparel.length > 0 && (
        <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-2xl text-foreground">Apparel</h2>
              <div className="flex-1 h-px bg-border/40" />
              <Link
                href="/shop/apparel"
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                See All →
              </Link>
            </div>
            <ProductGrid columns={3}>
              {apparel.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </div>
        </section>
      )}

      {/* Accessories */}
      {accessories.length > 0 && (
        <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-2xl text-foreground">Accessories</h2>
              <div className="flex-1 h-px bg-border/40" />
              <Link
                href="/shop/accessories"
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                See All →
              </Link>
            </div>
            <ProductGrid columns={4}>
              {accessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </div>
        </section>
      )}

    </main>
  )
}
