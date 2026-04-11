import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Shield, Award, Users, CheckCircle, Star } from 'lucide-react'
import TrustBadges from '@/components/TrustBadges'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  title: `About Go Pro Heating & Cooling | Licensed NJ HVAC Contractor | ${COMPANY.phone}`,
  description: `Learn about Go Pro Heating & Cooling — Clifton NJ's trusted HVAC company. ${COMPANY.yearsInBusiness} years of experience, NJ License ${COMPANY.license}. Serving all of Northern NJ.`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'About Us', url: `${siteUrl}/about` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            About Go Pro Heating &amp; Cooling
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Clifton, NJ&apos;s trusted HVAC contractor. {COMPANY.yearsInBusiness} years of honest service,
            fair prices, and technical expertise throughout Northern New Jersey.
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Story */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-5">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Go Pro Heating &amp; Cooling was founded with a simple mission: provide Northern NJ
                  homeowners with the same level of HVAC expertise and service that professionals expect
                  — at prices that are fair and transparent.
                </p>
                <p>
                  Based in Clifton, NJ, we&apos;ve grown from a small local operation into one of Northern
                  New Jersey&apos;s most trusted HVAC companies. We serve homeowners across Passaic, Bergen,
                  and Essex counties, handling everything from emergency repairs to complete system installations.
                </p>
                <p>
                  Every technician on our team is licensed, trained, and committed to doing the job right
                  the first time. We don&apos;t cut corners, we don&apos;t recommend unnecessary repairs, and we
                  always explain exactly what we&apos;re doing and why.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'Licensed & Insured', value: COMPANY.license, color: 'bg-blue-50 text-blue-600' },
                { icon: Award, title: 'Years Experience', value: COMPANY.yearsInBusiness, color: 'bg-orange-50 text-orange-600' },
                { icon: Users, title: 'Customers Served', value: '2,500+', color: 'bg-green-50 text-green-600' },
                { icon: Star, title: 'Google Rating', value: '5.0 ★', color: 'bg-yellow-50 text-yellow-600' },
              ].map((stat) => (
                <div key={stat.title} className={`${stat.color} rounded-xl p-5 text-center`}>
                  <stat.icon size={28} className="mx-auto mb-2" />
                  <p className="text-2xl font-black text-brand-dark">{stat.value}</p>
                  <p className="text-sm font-medium mt-1">{stat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark text-center mb-10">
            Our Credentials &amp; Commitments
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'NJ HVAC Contractor License', desc: `Licensed by the State of New Jersey — License ${COMPANY.license}. Fully authorized to perform HVAC installation, repair, and maintenance throughout NJ.` },
              { title: 'Fully Insured', desc: 'We carry comprehensive liability insurance and workers\' compensation to protect you and your property on every job.' },
              { title: 'All Major Brands', desc: 'Certified to work on Carrier, Trane, Lennox, Rheem, York, Goodman, Bryant, American Standard, and all other major HVAC brands.' },
              { title: '24/7 Emergency Service', desc: 'Real people answer our phones around the clock. No answering services — when you have an HVAC emergency, you reach us directly.' },
              { title: 'Upfront Pricing', desc: 'We provide written estimates before starting any work. Your final invoice will never exceed the quoted price without your approval.' },
              { title: 'Satisfaction Guarantee', desc: 'If you\'re not satisfied with our work, we\'ll make it right. Our reputation in Northern NJ depends on every customer leaving happy.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-brand-dark mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue py-14 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Ready to Work With Us?</h2>
          <p className="text-blue-200 mb-8">
            Call for same-day service or get a free estimate online. We serve all of Northern NJ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors"
            >
              <Phone size={22} />
              {COMPANY.phone}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center bg-white text-brand-blue font-bold text-xl px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
