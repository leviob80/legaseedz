'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Leaf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  images: string[]
  alt: string
  badge?: string
}

export function ProductImageGallery({ images, alt, badge }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square bg-secondary/20 border border-border/40 overflow-hidden">
        {images[active] ? (
          <Image
            src={images[active]}
            alt={`${alt} — image ${active + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Leaf className="w-10 h-10 text-muted-foreground/15" />
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground/30 font-medium">
              Photo Coming Soon
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && badge !== 'available' && (
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                'text-xs tracking-[0.1em] uppercase px-2.5 py-1 font-medium',
                badge === 'limited' && 'bg-primary/15 text-primary border border-primary/30',
                badge === 'sold-out' && 'bg-muted/40 text-muted-foreground border border-border',
                badge === 'coming-soon' && 'bg-accent/10 text-accent border border-accent/30'
              )}
            >
              {badge === 'limited' && 'Limited'}
              {badge === 'sold-out' && 'Sold Out'}
              {badge === 'coming-soon' && 'Coming Soon'}
            </span>
          </div>
        )}

        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/30 font-mono">
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'relative w-16 h-16 border shrink-0 overflow-hidden transition-colors',
                i === active ? 'border-primary' : 'border-border/40 hover:border-border'
              )}
              aria-label={`View image ${i + 1}`}
            >
              {src ? (
                <Image
                  src={src}
                  alt={`${alt} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-muted-foreground/20" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
