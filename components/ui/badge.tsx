import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ProductBadge } from '@/types'

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-[0.12em] uppercase',
  {
    variants: {
      variant: {
        default: 'bg-primary/20 text-primary border border-primary/30',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-current bg-transparent',
        available: 'bg-green-500/15 text-green-400 border border-green-500/25',
        limited: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
        'sold-out': 'bg-muted text-muted-foreground border border-border',
        'coming-soon': 'bg-primary/15 text-primary border border-primary/25',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

const badgeLabel: Record<ProductBadge, string> = {
  available: 'In Stock',
  limited: 'Limited',
  'sold-out': 'Sold Out',
  'coming-soon': 'Coming Soon',
}

function ProductBadgeComponent({ badge }: { badge: ProductBadge }) {
  return (
    <Badge variant={badge}>
      {badgeLabel[badge]}
    </Badge>
  )
}

export { Badge, badgeVariants, ProductBadgeComponent }
