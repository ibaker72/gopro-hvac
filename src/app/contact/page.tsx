import type { Metadata } from 'next'
import HeroMedia from '@/components/HeroMedia'
import ContactForm from '@/components/ContactForm'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  title: `Contact Us | Go Pro Heating & Cooling | ${COMPANY.phone}`,
  description: `Contact Go Pro Heating & Cooling in Clifton, NJ. Call ${COMPANY.phone} for AC repair, furnace installation & 24/7 emergency HVAC service throughout Northern NJ.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact Go Pro Heating & Cooling | ${COMPANY.phone}`,
    description: `Reach our licensed NJ HVAC team. Call ${COMPANY.phone} or send a message — we respond within a few hours.`,
    url: `${siteUrl}/contact`,
  },
}

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Contact', url: `${siteUrl}/contact` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <HeroMedia
        mode="image"
        imageUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Contact Go Pro Heating and Cooling in Clifton NJ"
        overlayOpacity={65}
        gradientClass="bg-gradient-to-br from-brand-blue to-blue-900"
        className="py-14 px-4 min-h-[320px]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Go Pro Heating &amp; Cooling</h1>
          <p className="text-blue-200 text-lg">
            Ready to schedule service or have a question? We&apos;re here to help — 24/7 for emergencies.
          </p>
        </div>
      </HeroMedia>

      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
