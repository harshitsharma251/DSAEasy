import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { dsaCategories } from '@/lib/site'
import { AdSlot } from '@/components/ads/ad-slot'

export default function HomePage() {
  const posts = getAllPosts()
  const latest = posts.slice(0, 6)
  return <main className="mx-auto max-w-7xl p-4 md:p-8"><section className="rounded-2xl border bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-8"><h1 className="text-4xl font-bold">Master Data Structures & Algorithms</h1><p className="mt-3 text-muted-foreground">Interview-grade guides with code, complexity analysis, and visual explainers.</p></section><AdSlot label="Below Hero"/><section className="mt-10"><h2 className="mb-4 text-2xl font-semibold">Featured DSA Topics</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{dsaCategories.map((c)=><Link key={c} href={`/categories/${encodeURIComponent(c.toLowerCase().replace(/\s+/g,'-'))}`} className="rounded border p-3 hover:bg-muted">{c}</Link>)}</div></section><section className="mt-10"><h2 className="mb-4 text-2xl font-semibold">Latest Articles</h2><div className="grid gap-4 md:grid-cols-2">{latest.map((p)=><Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-xl border p-4 hover:bg-muted"><p className='text-xs text-muted-foreground'>{p.category}</p><h3 className='font-semibold'>{p.title}</h3><p className='text-sm text-muted-foreground'>{p.description}</p></Link>)}</div></section></main>
}
