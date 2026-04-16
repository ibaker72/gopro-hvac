import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, CheckCircle, Snowflake, Flame, Wrench, Wind, Settings, Zap, ArrowRight } from 'lucide-react'
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
  { icon: Snowflake, title: 'AC Repair', desc: 'Fast diagnosis & same-day repair for all AC brands and models.', href: '/services/ac-repair', color: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-200' },
  { icon: Flame, title: 'Heating Repair', desc: '24/7 heating repair for furnaces, boilers & heat pumps.', href: '/services/heating-repair', color: 'bg-orange-50 text-orange-600', border: 'hover:border-orange-200' },
  { icon: Wrench, title: 'Installations', desc: 'Full AC & furnace installs with proper load calculation.', href: '/services/ac-installation', color: 'bg-green-50 text-green-600', border: 'hover:border-green-200' },
  { icon: Settings, title: 'Tune-Ups', desc: 'Annual maintenance starting at $89 to prevent breakdowns.', href: '/services/hvac-tune-up', color: 'bg-purple-50 text-purple-600', border: 'hover:border-purple-200' },
  { icon: Wind, title: 'Duct Cleaning', desc: 'Improve air quality & efficiency with professional duct cleaning.', href: '/services/duct-cleaning', color: 'bg-teal-50 text-teal-600', border: 'hover:border-teal-200' },
  { icon: Zap, title: 'Mini-Splits', desc: 'Ductless systems for any room — heating & cooling year-round.', href: '/services/ductless-mini-split', color: 'bg-yellow-50 text-yellow-600', border: 'hover:border-yellow-200' },
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
      {/* ── Hero ──────────────────────────────────────────────────── */}
      {/*
        Place your branded technician photo at:
        public/images/heroes/homepage-hero.jpg
        Recommended: landscape, 1920×1080, JPG
      */}
      <HeroMedia
        mode="image"
        imageUrl="/images/heroes/homepage-hero.webp"
        imageAlt="Go Pro HVAC technician servicing an air conditioning unit in Northern NJ"
        imagePriority={true}
        objectPosition="top"
        overlayOpacity={62}
        className="py-20 md:py-28 px-4 min-h-[640px]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: headline + CTAs */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange border border-brand-orange/40 px-4 py-2 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                🏆 Northern NJ&apos;s #1 Rated HVAC Company
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-[1.06] mb-6">
                <span className="text-brand-orange">Clifton NJ</span>
                <br />HVAC Experts
                <br />You Can Trust
              </h1>
              <p className="text-white/85 text-xl mb-8 leading-relaxed max-w-lg">
                Fast, honest HVAC service across Northern New Jersey —
                AC repair, furnace installation &amp; 24/7 emergency service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={COMPANY.phoneTel}
                  className="inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-black text-lg px-7 py-4 rounded-xl hover:bg-orange-500 transition-all cta-pulse shadow-lg shadow-orange-500/30"
                >
                  <Phone size={22} />
                  Call {COMPANY.phone}
                </a>
                <Link
                  href="/estimate"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/70 text-white font-bold text-lg px-7 py-4 rounded-xl hover:bg-white hover:text-brand-blue transition-all"
                >
                  Get Free Estimate
                </Link>
              </div>
              <div className="flex flex-wrap gap-5">
                {['Licensed & Insured', '24/7 Emergency', 'Same-Day Service', 'Free Estimates'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-white/90 text-sm font-medium">
                    <CheckCircle size={15} className="text-brand-orange flex-shrink-0" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: estimate card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-2xl p-7 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
                  FREE · No Obligation
                </div>
                <h2 className="text-2xl font-black mb-1">Get Your Free Estimate</h2>
                <p className="text-white/70 text-sm">Tell us about your project in 60 seconds</p>
              </div>
              <Link
                href="/estimate"
                className="flex items-center justify-center gap-2 w-full bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-orange-500 transition-colors text-lg mb-5 shadow-lg"
              >
                Start Free Estimate <ArrowRight size={18} />
              </Link>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 border-t border-white/20" />
                <span className="text-white/40 text-xs font-medium">or call directly</span>
                <div className="flex-1 border-t border-white/20" />
              </div>
              <a
                href={COMPANY.phoneTel}
                className="block text-center text-white font-black text-2xl hover:text-brand-orange transition-colors"
              >
                {COMPANY.phone}
              </a>
              <p className="text-white/50 text-xs text-center mt-2">Available 24/7 · No overtime charges</p>
            </div>
          </div>
        </div>
      </HeroMedia>

      {/* ── Trust Badges ──────────────────────────────────────────── */}
      <TrustBadges />

      {/* ── Services Grid ─────────────────────────────────────────── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
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
                className={`group bg-white border-2 border-slate-100 rounded-2xl p-6 card-hover shadow-sm ${service.border} transition-all duration-200`}
              >
                <div className={`inline-flex p-3.5 rounded-xl mb-4 ${service.color}`}>
                  <service.icon size={26} />
                </div>
                <h3 className="font-bold text-brand-dark text-lg mb-2 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-brand-orange text-sm font-bold">
                  Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services/emergency-hvac"
              className="inline-flex items-center gap-2 bg-red-50 border-2 border-red-200 text-red-700 font-bold px-6 py-3.5 rounded-xl hover:bg-red-100 transition-colors"
            >
              🚨 24/7 Emergency HVAC Service Available — Call Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────── */}
      {/*
        Place your HVAC gauges/tools photo at:
        public/images/why-us-bg.jpg
        Recommended: landscape, 1920×1080, JPG
      */}
      <HeroMedia
        mode="gradient"
        imageAlt="HVAC technician with manifold gauges and tools"
        overlayOpacity={78}
        gradientClass="bg-slate-900"
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white">Why Northern NJ Homeowners Choose Go Pro</h2>
            <p className="text-white/65 text-lg mt-3 max-w-2xl mx-auto">
              We&apos;ve built our reputation one satisfied customer at a time across Passaic, Bergen &amp; Essex counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-brand-orange text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-brand-dark">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </HeroMedia>

      {/* ── Emergency Banner ──────────────────────────────────────── */}
      <EmergencyBanner />

      {/* ── Estimate Wizard ───────────────────────────────────────── */}
      <section className="bg-brand-light py-20 px-4" id="estimate">
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

      {/* ── Lead Magnet ───────────────────────────────────────────── */}
      <LeadMagnetSection />

      {/* ── Reviews ───────────────────────────────────────────────── */}
      <ReviewCarousel />

      {/* ── Service Area ──────────────────────────────────────────── */}
      <ServiceAreaGrid />

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <FAQAccordion
        faqs={HOME_FAQS}
        title="HVAC Questions? We Have Answers."
        subtitle="Common questions from Northern NJ homeowners about heating, cooling, and HVAC maintenance."
      />

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="bg-brand-orange py-16 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Solve Your HVAC Problem?
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Call now for same-day service or get a free estimate online. We serve all of Northern NJ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors shadow-lg"
            >
              <Phone size={24} />
              {COMPANY.phone}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-bold text-xl px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Get Free Estimate Online
            </Link>
          </div>
          <p className="mt-8 text-orange-200 text-sm">
            NJ License {COMPANY.license} · {COMPANY.address}
          </p>
        </div>
      </section>
    </>
  )
}
