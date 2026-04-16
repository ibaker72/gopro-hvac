import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, CheckCircle, Snowflake, Flame, Wrench, Wind, Settings, Zap } from 'lucide-react'
import TrustBadges from '@/components/TrustBadges'
import EmergencyBanner from '@/components/EmergencyBanner'
import EstimateWizard from '@/components/EstimateWizard'
import LeadMagnetSection from '@/components/LeadMagnetSection'
import ReviewCarousel from '@/components/ReviewCarousel'
import ServiceAreaGrid from '@/components/ServiceAreaGrid'
import FAQAccordion from '@/components/FAQAccordion'
import HeroMedia from '@/components/HeroMedia'
import { COMPANY, HOME_FAQS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Clifton NJ HVAC Repair & Installation | Go Pro Heating & Cooling | 973-938-2217',
  description:
    "Go Pro Heating & Cooling — NJ's most trusted HVAC team serving Clifton, Paterson, Wayne & beyond. AC repair, furnace installation, 24/7 emergency service. Call 973-938-2217.",
  alternates: { canonical: '/' },
}

const services = [
  { icon: Snowflake, title: 'AC Repair', desc: 'Fast diagnosis & same-day repair for all AC brands and models.', href: '/services/ac-repair', color: 'bg-blue-50 text-blue-600' },
  { icon: Flame, title: 'Heating Repair', desc: '24/7 heating repair for furnaces, boilers & heat pumps.', href: '/services/heating-repair', color: 'bg-orange-50 text-orange-600' },
  { icon: Wrench, title: 'Installations', desc: 'Full AC & furnace installs with proper load calculation.', href: '/services/ac-installation', color: 'bg-green-50 text-green-600' },
  { icon: Settings, title: 'Tune-Ups', desc: 'Annual maintenance starting at $89 to prevent breakdowns.', href: '/services/hvac-tune-up', color: 'bg-purple-50 text-purple-600' },
  { icon: Wind, title: 'Duct Cleaning', desc: 'Improve air quality & efficiency with professional duct cleaning.', href: '/services/duct-cleaning', color: 'bg-teal-50 text-teal-600' },
  { icon: Zap, title: 'Mini-Splits', desc: 'Ductless systems for any room — heating & cooling year-round.', href: '/services/ductless-mini-split', color: 'bg-yellow-50 text-yellow-600' },
]

const whyUs = [
  { title: 'Licensed & Insured', desc: `NJ License ${COMPANY.license}. Fully insured for your protection.` },
  { title: 'Honest Pricing', desc: 'Upfront quotes before any work. No surprises on your invoice.' },
  { title: '24/7 Availability', desc: 'Real technicians answer the phone — no answering services.' },
  { title: 'All Brands Serviced', desc: 'Carrier, Trane, Lennox, Rheem, York, Goodman & more.' },
  { title: 'Same-Day Service', desc: 'Most calls serviced the same day. Emergency dispatch available.' },
  { title: 'NJ Local Experts', desc: `${COMPANY.yearsInBusiness} years serving Northern NJ communities.` },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroMedia
        mode="image"
        imageUrl="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80"
        imageAlt="HVAC technician servicing an air conditioning unit in Northern NJ"
        imagePriority={true}
        overlayOpacity={60}
        className="py-16 md:py-24 px-4 min-h-[520px]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-4 py-1.5 rounded-full text-sm font-bold mb-5">
                🏆 Northern NJ's #1 Rated HVAC Company
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
                <span className="text-brand-orange">Clifton NJ HVAC</span> Experts
                <br />You Can Trust
              </h1>
              <p className="text-blue-200 text-lg mb-8 leading-relaxed">
                Go Pro Heating &amp; Cooling delivers fast, honest HVAC service throughout Northern New Jersey.
                AC repair, furnace installation, duct cleaning &amp; 24/7 emergency service — all backed by our
                satisfaction guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={COMPANY.phoneTel}
                  className="inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-black text-lg px-7 py-4 rounded-xl hover:bg-orange-500 transition-colors cta-pulse"
                >
                  <Phone size={22} />
                  Call {COMPANY.phone}
                </a>
                <Link
                  href="/estimate"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white text-white font-bold text-lg px-7 py-4 rounded-xl hover:bg-white hover:text-brand-blue transition-colors"
                >
                  Get Free Estimate
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {['Licensed & Insured', '24/7 Emergency', 'Same-Day Service', 'Free Estimates'].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 text-blue-200 text-sm">
                    <CheckCircle size={14} className="text-brand-orange" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>
            {/* Embedded mini estimate card */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center">
              <h2 className="text-xl font-black mb-2">Get Your Free Estimate</h2>
              <p className="text-blue-300 text-sm mb-5">Tell us about your project in 60 seconds</p>
              <Link
                href="/estimate"
                className="block w-full bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-orange-500 transition-colors text-lg mb-4"
              >
                Start Free Estimate →
              </Link>
              <p className="text-blue-300 text-xs">Or call us for immediate service:</p>
              <a href={COMPANY.phoneTel} className="text-white font-black text-2xl hover:text-brand-orange transition-colors">
                {COMPANY.phone}
              </a>
              <p className="text-blue-400 text-xs mt-1">Available 24/7 · No overtime charges</p>
            </div>
          </div>
        </div>
      </HeroMedia>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Services Grid */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">HVAC Services in Clifton &amp; Northern NJ</h2>
            <p className="section-subtitle mx-auto">
              From emergency repairs to full system replacements — we handle every aspect of your home comfort.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white border border-slate-200 rounded-xl p-6 card-hover shadow-sm"
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${service.color}`}>
                  <service.icon size={24} />
                </div>
                <h3 className="font-bold text-brand-dark text-lg mb-2 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-4 text-brand-orange text-sm font-bold group-hover:underline">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services/emergency-hvac"
              className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 font-bold px-6 py-3 rounded-lg hover:bg-red-100 transition-colors"
            >
              🚨 24/7 Emergency HVAC Service Available — Call Now
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Northern NJ Homeowners Choose Go Pro</h2>
            <p className="section-subtitle mx-auto">
              We&apos;ve built our reputation one satisfied customer at a time across Passaic, Bergen &amp; Essex counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-brand-dark">{item.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <EmergencyBanner />

      {/* Estimate Wizard */}
      <section className="bg-brand-light py-16 px-4" id="estimate">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Get Your Free HVAC Estimate</h2>
            <p className="section-subtitle mx-auto">
              Answer 4 quick questions and get an instant price range for your project.
            </p>
          </div>
          <EstimateWizard />
        </div>
      </section>

      {/* Lead Magnet */}
      <LeadMagnetSection />

      {/* Reviews */}
      <ReviewCarousel />

      {/* Service Area */}
      <ServiceAreaGrid />

      {/* FAQ */}
      <FAQAccordion
        faqs={HOME_FAQS}
        title="HVAC Questions? We Have Answers."
        subtitle="Common questions from Northern NJ homeowners about heating, cooling, and HVAC maintenance."
      />

      {/* Final CTA */}
      <section className="bg-brand-orange py-14 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Solve Your HVAC Problem?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Call now for same-day service or get a free estimate online. We serve Clifton, Paterson,
            Wayne, Hackensack &amp; all of Northern NJ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors"
            >
              <Phone size={24} />
              {COMPANY.phone}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center bg-brand-blue text-white font-bold text-xl px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Get Free Estimate Online
            </Link>
          </div>
          <p className="mt-6 text-orange-200 text-sm">
            NJ License {COMPANY.license} · {COMPANY.address}
          </p>
        </div>
      </section>
    </>
  )
}
