import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  linkDisabled?: boolean
}

const sizes = {
  sm: 56,
  md: 80,
  lg: 120,
}

export function Logo({ className, size = 'md', linkDisabled }: LogoProps) {
  const px = sizes[size]
  const img = (
    <Image
      src="/images/brand/logo.png"
      alt="Legaseedz"
      width={px}
      height={px}
      priority
      className="object-contain"
    />
  )

  if (linkDisabled) {
    return <div className={cn('flex items-center', className)}>{img}</div>
  }

  return (
    <Link href="/" className={cn('flex items-center', className)}>
      {img}
    </Link>
  )
}
