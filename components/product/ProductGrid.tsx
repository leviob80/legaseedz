import { cn } from '@/lib/utils'

interface ProductGridProps {
  children: React.ReactNode
  className?: string
  columns?: 2 | 3 | 4
}

export function ProductGrid({ children, className, columns = 3 }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid gap-x-6 gap-y-10',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  )
}
