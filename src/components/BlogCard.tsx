import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import type { BlogPost } from '@/types'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden card-hover shadow-sm">
      <div className="bg-gradient-to-br from-brand-blue to-blue-700 h-40 flex items-center justify-center">
        <span className="text-5xl">🏠</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Tag size={12} />
            {post.category}
          </span>
        </div>
        <h3 className="font-bold text-brand-dark mb-2 leading-tight hover:text-brand-blue transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-brand-orange text-sm font-bold hover:text-orange-600 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </article>
  )
}
