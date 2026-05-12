import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map(p=>({ url: `https://example.com/blog/${p.slug}`, lastModified: p.date }))
  return [{ url: 'https://example.com', lastModified: new Date() }, ...posts]
}
