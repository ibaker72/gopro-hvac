import type { Metadata } from 'next'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'
import type { BlogPost } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const revalidate = 3600

export const metadata: Metadata = {
  title: `HVAC Tips & Advice Blog | Go Pro Heating & Cooling | ${COMPANY.phone}`,
  description: 'HVAC tips, maintenance advice, and energy-saving guides for NJ homeowners from the experts at Go Pro Heating & Cooling in Clifton, NJ.',
  alternates: { canonical: '/blog' },
}

const posts: BlogPost[] = [
  {
    slug: 'how-to-prepare-hvac-for-nj-winter',
    title: 'How to Prepare Your HVAC System for a New Jersey Winter',
    excerpt: 'Winter in NJ can be brutal. Here\'s how to make sure your heating system is ready before the first cold snap hits — and what to watch for that signals a problem.',
    date: 'November 1, 2025',
    category: 'Maintenance',
  },
  {
    slug: 'signs-ac-needs-repair',
    title: '7 Warning Signs Your AC Needs Repair Before Summer',
    excerpt: 'Don\'t wait until the hottest day of the year to discover your AC is failing. These 7 warning signs tell you it\'s time to call an HVAC technician now.',
    date: 'April 15, 2025',
    category: 'AC Repair',
  },
  {
    slug: 'heat-pump-vs-furnace-nj',
    title: 'Heat Pump vs. Furnace: What\'s Right for Your NJ Home?',
    excerpt: 'Both heat pumps and gas furnaces can heat your NJ home effectively — but which one saves more money? We break down the pros, cons, and costs for Northern NJ homeowners.',
    date: 'October 10, 2025',
    category: 'Buying Advice',
  },
  {
    slug: 'energy-saving-hvac-tips',
    title: '10 Easy Ways to Reduce Your HVAC Energy Bills in NJ',
    excerpt: 'Small changes can add up to big savings on your heating and cooling bills. These 10 tips are easy to implement and can reduce your energy costs by 15–30%.',
    date: 'September 5, 2025',
    category: 'Energy Savings',
  },
  {
    slug: 'when-to-replace-hvac-system',
    title: 'When Should You Replace Your HVAC System? A Complete Guide',
    excerpt: 'Is it time to repair or replace? This guide walks through all the factors — age, efficiency, repair cost, and more — to help you make the right decision.',
    date: 'August 20, 2025',
    category: 'Buying Advice',
  },
  {
    slug: 'ductless-mini-split-benefits',
    title: 'Why Ductless Mini-Splits Are Perfect for NJ Older Homes',
    excerpt: 'Many NJ homes were built without central HVAC ductwork. Ductless mini-splits offer a modern, efficient solution that works perfectly in these situations.',
    date: 'July 12, 2025',
    category: 'Mini-Splits',
  },
]

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
