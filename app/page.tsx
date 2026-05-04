import { Hero } from '@/components/sections/Hero'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { BrandValues } from '@/components/sections/BrandValues'
import { BrandStatement } from '@/components/sections/BrandStatement'
import { BestSellers } from '@/components/sections/BestSellers'
import { EducationSection } from '@/components/sections/EducationSection'
import { Newsletter } from '@/components/sections/Newsletter'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <FeaturedProducts />
      <BrandValues />
      <BrandStatement />
      <BestSellers />
      <EducationSection />
      <Newsletter />
      <FinalCTA />
    </>
  )
}
