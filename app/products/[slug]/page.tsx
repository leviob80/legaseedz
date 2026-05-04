import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, products, getProductsByCategory } from '@/lib/data/products'
import { ProductBadgeComponent } from '@/components/ui/badge'
import { ProductImageGallery } from '@/components/product/ProductImageGallery'
import { AddToCartForm } from '@/components/product/AddToCartForm'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGrid } from '@/components/product/ProductGrid'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — Legaseedz`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background">

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-muted-foreground/50">
          <Link href="/shop" className="hover:text-muted-foreground transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${product.category}`} className="hover:text-muted-foreground transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-muted-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* Left — gallery */}
            <div className="lg:sticky lg:top-24">
              <ProductImageGallery
                images={product.images}
                alt={product.name}
                badge={product.badge}
              />
            </div>

            {/* Right — info + form */}
            <div className="space-y-7">
              {/* Badge */}
              {product.badge && <ProductBadgeComponent badge={product.badge} />}

              {/* Category */}
              <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Short description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Divider */}
              <div className="h-px bg-border/40" />

              {/* Add to cart form */}
              <AddToCartForm product={product} />

              {/* Divider */}
              <div className="h-px bg-border/40" />

              {/* Full description */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">
                  About this product
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground/50 border border-border/30 px-2.5 py-1 tracking-[0.05em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Heritage note for seeds */}
              {product.category === 'seeds' && (
                <div className="border-l-2 border-primary/40 pl-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All genetics sourced directly from verified legacy growers. Every pack traced, tested, and packed with care.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/40">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-xl text-foreground">
                More {product.category === 'seeds' ? 'genetics' : product.category}
              </h2>
              <div className="flex-1 h-px bg-border/40" />
              <Link
                href={`/shop/${product.category}`}
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                View All →
              </Link>
            </div>
            <ProductGrid columns={4}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductGrid>
          </div>
        </section>
      )}

    </main>
  )
}
