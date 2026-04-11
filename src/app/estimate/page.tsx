import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import EstimateWizard from '@/components/EstimateWizard'
import TrustBadges from '@/components/TrustBadges'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  title: 'Free HVAC Estimate in NJ | Go Pro Heating & Cooling | 973-938-2217',
  description:
    'Get a free HVAC estimate in Northern NJ in under 2 minutes. AC repair, furnace installation, tune-ups & more. Go Pro Heating & Cooling serves Clifton, Paterson, Wayne & beyond.',
  alternates: { canonical: '/estimate' },
}

export default function EstimatePage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Free Estimate', url: `${siteUrl}/estimate` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Get Your Free HVAC Estimate</h1>
          <p className="text-blue-200 text-lg mb-3">
            Tell us about your project in under 2 minutes. We&apos;ll give you an instant price range
            and call you within 2 hours to confirm your appointment.
          </p>
          <p className="text-blue-300 text-sm">
            Serving Clifton, Paterson, Wayne, Nutley, Hackensack &amp; all of Northern NJ
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Wizard */}
      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <EstimateWizard />

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm mb-2">Prefer to speak with someone right now?</p>
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center gap-2 text-brand-orange font-black text-xl hover:text-orange-600 transition-colors"
            >
              <Phone size={22} />
              Call {COMPANY.phone}
            </a>
            <p className="text-slate-400 text-xs mt-1">Available 24/7 · No overtime charges</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark text-center mb-10">How Our Estimate Process Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Fill Out the Form', desc: 'Answer 4 quick questions about your service, home size, and system age.' },
              { step: '2', title: 'Get Instant Range', desc: 'See an estimated price range based on typical NJ market pricing.' },
              { step: '3', title: 'We Call You', desc: 'A Go Pro technician calls within 2 hours to confirm and schedule your appointment.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
