'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn('inline-flex items-center border border-border', className)}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-10 h-10 flex items-center justify-center text-sm font-medium text-foreground select-none border-x border-border">
        {value}
      </span>

      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
