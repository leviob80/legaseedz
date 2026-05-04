import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { getCollectionBySlug, collections } from '@/lib/data/collections'
import { products } from '@/lib/data/products'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)
  if (!collection) return {}
  return {
    title: `${collection.name} — Legaseedz`,
    description: collection.shortDescription,
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)
  if (!collection) notFound()

  const collectionProducts = products.filter((p) => collection.productIds.includes(p.id))

  return (
    <main className="min-h-screen bg-background">

      {/* Header */}
      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 border-b border-border/40 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 items-end">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                {collection.badge && <ProductBadgeComponent badge={collection.badge} />}
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-tight">
                {collection.name}
              </h1>

              <p className="text-muted-foreground leading-relaxed max-w-xl">
                {collection.description}
              </p>

              {collection.dropDate && !collection.isActive && (
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm tracking-[0.1em]">
                    Dropping{' '}
                    {new Date(collection.dropDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {collection.isActive && (
                <div className="flex items-center gap-2 text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm tracking-[0.08em] uppercase">Drop Active</span>
                </div>
              )}
            </div>

            <div className="text-right">
              <Link
                href="/shop"
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                ← All Drops
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {collectionProducts.length > 0 ? (
            <>
              <p className="text-xs tracking-[0.1em] uppercase text-muted-foreground/50 mb-8">
                {collectionProducts.length} {collectionProducts.length === 1 ? 'item' : 'items'} in this drop
              </p>
              <ProductGrid columns={3}>
                {collectionProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            </>
          ) : (
            <div className="text-center py-20 border border-dashed border-border/30">
              <p className="text-sm text-muted-foreground/50">Products will appear when the drop goes live.</p>
            </div>
          )}
        </div>
      </section>

      {/* Coming soon signup */}
      {!collection.isActive && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/40 bg-secondary/10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-primary mb-2">
                Drop incoming
              </p>
              <h2 className="font-serif text-3xl text-foreground">
                Be first in line.
              </h2>
            </div>
            <Button variant="gold" size="lg" asChild>
              <Link href="/#newsletter">
                Join the Drop List <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

    </main>
  )
}
