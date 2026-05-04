'use client'

import { cn } from '@/lib/utils'
import type { Variant } from '@/types'

interface VariantSelectorProps {
  variants: Variant[]
  selected: Record<string, string>
  onChange: (variantId: string, optionId: string) => void
}

export function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  return (
    <div className="space-y-5">
      {variants.map((variant) => (
        <div key={variant.id}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
              {variant.name}
            </span>
            {selected[variant.id] && (
              <span className="text-xs text-foreground/60">
                {variant.options.find((o) => o.id === selected[variant.id])?.value}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selected[variant.id] === option.id
              const isOutOfStock = !option.inStock

              return (
                <button
                  key={option.id}
                  disabled={isOutOfStock}
                  onClick={() => onChange(variant.id, option.id)}
                  className={cn(
                    'relative px-4 py-2 text-xs border transition-all duration-150',
                    isSelected
                      ? 'border-primary text-primary bg-primary/10'
                      : 'border-border text-foreground/60 hover:border-foreground/40 hover:text-foreground',
                    isOutOfStock && 'opacity-35 cursor-not-allowed line-through'
                  )}
                  aria-pressed={isSelected}
                  aria-label={`${option.value}${isOutOfStock ? ' — Out of stock' : ''}`}
                >
                  {option.value}
                  {/* Out-of-stock diagonal line */}
                  {isOutOfStock && (
                    <span className="absolute inset-0 overflow-hidden pointer-events-none">
                      <span className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/40 -rotate-[20deg]" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
