import type { Metadata } from 'next'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'
import { BLOG_POSTS as posts } from '@/lib/blog-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `HVAC Tips & Advice Blog | Go Pro Heating & Cooling | ${COMPANY.phone}`,
  description: 'HVAC tips, maintenance advice, and energy-saving guides for NJ homeowners from the experts at Go Pro Heating & Cooling in Clifton, NJ.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">HVAC Tips &amp; Advice for NJ Homeowners</h1>
          <p className="text-blue-200 text-lg">
            Expert guidance from Go Pro Heating &amp; Cooling to help you save money, prevent breakdowns,
            and get the most from your HVAC system.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-slate-500 mb-4">Have an HVAC question not covered here?</p>
            <Link href="/faq" className="inline-block bg-brand-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
              Browse Our Full FAQ →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
