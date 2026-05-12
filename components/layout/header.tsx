'use client'
import Link from 'next/link'
import { Moon, Sun, Search } from 'lucide-react'
import { useTheme } from 'next-themes'
export function Header() {
  const { setTheme, resolvedTheme } = useTheme()
  return <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between p-4"><Link href="/" className="font-bold">DSAEasy</Link><div className="flex items-center gap-3"><button className='rounded border p-2'><Search size={16} /></button><button onClick={()=>setTheme(resolvedTheme==='dark'?'light':'dark')} className="rounded border p-2">{resolvedTheme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button></div></div></header>
}
