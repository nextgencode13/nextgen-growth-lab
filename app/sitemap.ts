import type { MetadataRoute } from 'next'
import { books } from '@/lib/data/books'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nextgen-wisdom.vercel.app'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/dashboard`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/compare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const bookRoutes: MetadataRoute.Sitemap = books.map(book => ({
    url: `${base}/books/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...bookRoutes]
}
