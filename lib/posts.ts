import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDir = path.join(process.cwd(), 'content/posts')

export type PostMeta = { slug: string; title: string; description: string; category: string; tags: string[]; date: string; featured?: boolean; pdf?: boolean; }

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir)
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { data, content } = matter(raw)
    return { slug: file.replace(/\.mdx$/, ''), ...data, readingTime: readingTime(content).text } as PostMeta & { readingTime: string }
  }).sort((a,b)=> +new Date(b.date) - +new Date(a.date))
}

export function getPostBySlug(slug: string) {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), 'utf8')
  const { data, content } = matter(raw)
  return { meta: data as PostMeta, content }
}
