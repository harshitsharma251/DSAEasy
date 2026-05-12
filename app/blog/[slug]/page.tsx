import type { Metadata } from 'next'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { AdSlot } from '@/components/ads/ad-slot'

export function generateStaticParams() { return getAllPosts().map((p) => ({ slug: p.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { meta } = getPostBySlug(params.slug)
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: { title: meta.title, description: meta.description, type: 'article' },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description }
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { meta, content } = getPostBySlug(params.slug)
  const related = getAllPosts().filter(p=>p.category===meta.category && p.slug!==meta.slug).slice(0,3)
  return <main className="mx-auto grid max-w-7xl gap-8 p-4 md:grid-cols-[240px_1fr_240px]"><aside className="sticky top-24 hidden h-fit rounded border p-4 md:block">Sticky DSA Menu</aside><article className="prose prose-slate dark:prose-invert max-w-none"><nav className='text-sm text-muted-foreground'>Home / {meta.category} / {meta.title}</nav><h1>{meta.title}</h1><p>{meta.description}</p><AdSlot label='Between sections'/><pre className='overflow-x-auto rounded bg-muted p-3'><code>{content}</code></pre><h2>Key Takeaways</h2><ul><li>Pattern recognition is key.</li><li>Practice with constraints first.</li></ul></article><aside><AdSlot label='Sidebar'/><div className='rounded border p-4'><h3 className='font-semibold'>Related Posts</h3>{related.map(r=><p key={r.slug}><a href={`/blog/${r.slug}`}>{r.title}</a></p>)}</div></aside></main>
}
