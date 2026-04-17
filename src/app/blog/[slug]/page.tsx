import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Tag, Phone, ArrowLeft } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema, blogPostingSchema } from '@/lib/schema'
import { BLOG_POSTS, BLOG_CONTENT } from '@/lib/blog-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | Go Pro Heating & Cooling`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const paragraphs = BLOG_CONTENT[slug] ?? [post.excerpt]

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: post.title, url: `${siteUrl}/blog/${slug}` },
  ])
  const article = blogPostingSchema(post)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4 text-sm text-blue-300">
            <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white px-3 py-1 rounded-full font-semibold">
              <Tag size={12} /> {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} /> {formattedDate}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">{post.title}</h1>
          <p className="text-blue-200 mt-4 text-lg leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-slate prose-lg max-w-none">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-slate-700 leading-relaxed mb-5">{para}</p>
            ))}
          </article>

          {/* Author / CTA */}
          <div className="mt-12 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-6">
            <p className="text-sm text-slate-500 mb-1">Written by</p>
            <p className="font-bold text-brand-dark mb-1">{COMPANY.name}</p>
            <p className="text-slate-600 text-sm mb-4">
              Licensed NJ HVAC contractors serving Clifton, Paterson, Wayne & all of Northern New Jersey.
              License {COMPANY.license}.
            </p>
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-5 py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Phone size={16} /> {COMPANY.phone}
            </a>
          </div>

          {/* Related posts */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-brand-dark mb-5">More HVAC Tips</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {BLOG_POSTS.filter((p) => p.slug !== slug)
                .slice(0, 4)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="block bg-brand-light border border-slate-200 rounded-xl p-4 hover:border-brand-orange transition-colors"
                  >
                    <span className="text-xs font-semibold text-brand-orange uppercase tracking-wide">
                      {related.category}
                    </span>
                    <h3 className="font-bold text-brand-dark mt-1 text-sm leading-snug">{related.title}</h3>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-12 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3">Need HVAC Service in Northern NJ?</h2>
          <p className="text-orange-100 mb-6">
            Go Pro Heating &amp; Cooling — licensed, local, and available 24/7 for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors"
            >
              <Phone size={22} /> {COMPANY.phone}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center bg-brand-blue text-white font-bold text-xl px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
