import type { MetadataRoute } from 'next'
import { products } from '@/lib/data/products'
import { collections } from '@/lib/data/collections'

const BASE_URL = 'https://legaseedz.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const collectionUrls = collections.map((c) => ({
    url: `${BASE_URL}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/shop/seeds`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/shop/apparel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE_URL}/shop/accessories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    ...productUrls,
    ...collectionUrls,
  ]
}
