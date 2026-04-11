import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import FAQAccordion from '@/components/FAQAccordion'
import { COMPANY, HOME_FAQS } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'
import type { FAQ } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  title: `HVAC FAQ | Go Pro Heating & Cooling | ${COMPANY.phone}`,
  description: 'Common HVAC questions answered by Go Pro Heating & Cooling. AC repair, furnace maintenance, emergency service & more for Northern NJ homeowners.',
  alternates: { canonical: '/faq' },
}

const additionalFaqs: FAQ[] = [
  {
    q: 'What is the difference between a heat pump and a furnace?',
    a: 'A furnace generates heat by burning gas or using electricity. A heat pump moves heat — it pulls heat from outside air (even in cold weather) and moves it inside. Heat pumps are more energy-efficient but have a higher upfront cost. In NJ\'s climate, many homeowners use a heat pump with a gas furnace backup.',
  },
  {
    q: 'Why is my HVAC system making a loud noise?',
    a: 'Different noises indicate different problems. Banging or clanking can mean a loose part. Squealing often indicates a belt or bearing issue. Clicking can be a relay problem. Hissing usually means a refrigerant leak. Any unusual noise should be diagnosed promptly — call 973-938-2217.',
  },
  {
    q: 'How do I know what size HVAC system I need?',
    a: 'HVAC sizing requires a Manual J load calculation that factors in your home\'s square footage, insulation, window placement, ceiling height, local climate, and more. An improperly sized system — too big or too small — will be inefficient and unreliable. We perform proper sizing on every installation.',
  },
  {
    q: 'What is SEER rating and why does it matter?',
    a: 'SEER (Seasonal Energy Efficiency Ratio) measures AC efficiency. The higher the SEER, the more efficient the unit. Modern AC units range from 14–26 SEER. New NJ regulations require a minimum 15 SEER. Higher SEER units cost more upfront but save significantly on electricity bills.',
  },
  {
    q: 'Should I repair or replace my HVAC system?',
    a: 'A general rule: if repair cost × system age exceeds the cost of a new system, replacement is often better. For example, a $500 repair on a 12-year-old system = $6,000 — close to replacement cost. We always give honest advice and never push replacement when repair makes more sense.',
  },
  {
    q: 'Why is my energy bill suddenly much higher?',
    a: 'A sudden spike in your energy bill often means your HVAC system is working harder than it should. Common causes: dirty air filters, refrigerant leak, failing components, aging equipment, or duct leaks. A tune-up can often identify and fix the issue, saving you money every month.',
  },
  {
    q: 'How do I reset my thermostat?',
    a: 'Most digital thermostats can be reset by turning off the system, removing the thermostat from the wall, taking out the batteries for 30 seconds, and reinstalling. Smart thermostats typically have a reset option in their settings menu. If problems persist after a reset, the issue may be with the HVAC system itself.',
  },
  {
    q: 'What are the signs I need a new furnace?',
    a: 'Signs you may need a new furnace: age over 15–20 years, frequent repairs, uneven heating, yellow pilot light (should be blue), rising gas bills, unusual noises, or visible cracks. We offer free in-home assessments to help you decide whether to repair or replace.',
  },
]

const allFaqs = [...HOME_FAQS, ...additionalFaqs]

export default function FAQPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'FAQ', url: `${siteUrl}/faq` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">HVAC Frequently Asked Questions</h1>
          <p className="text-blue-200 text-lg">
            Answers to the most common HVAC questions from Northern NJ homeowners.
            Can&apos;t find what you need? Call us at{' '}
            <a href={COMPANY.phoneTel} className="text-brand-orange font-bold hover:underline">
              {COMPANY.phone}
            </a>
          </p>
        </div>
      </section>

      <FAQAccordion
        faqs={allFaqs}
        title="All HVAC Questions"
        subtitle="Browse our full FAQ library covering AC, heating, maintenance, emergencies, and more."
      />

      {/* CTA */}
      <section className="bg-brand-orange py-12 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3">Still Have Questions?</h2>
          <p className="text-orange-100 mb-6">
            Our HVAC experts are available 24/7 to answer your questions and schedule service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors">
              <Phone size={22} /> {COMPANY.phone}
            </a>
            <Link href="/estimate"
              className="inline-flex items-center justify-center bg-brand-blue text-white font-bold text-xl px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors">
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
