import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, CheckCircle } from 'lucide-react'
import FAQAccordion from '@/components/FAQAccordion'
import TrustBadges from '@/components/TrustBadges'
import EstimateWizard from '@/components/EstimateWizard'
import HeroMedia from '@/components/HeroMedia'
import { COMPANY, SERVICES_DATA, SERVICE_SLUGS, CITIES_DATA, CITY_SLUGS } from '@/lib/constants'
import { breadcrumbSchema, serviceSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

const SERVICE_IMAGES: Record<string, string> = {
  'ac-repair':           'https://images.unsplash.com/photo-JsPkVrHMQoo?auto=format&fit=crop&w=1920&q=80',
  'ac-installation':     'https://images.unsplash.com/photo-JUAVCUMY008?auto=format&fit=crop&w=1920&q=80',
  'heating-repair':      'https://images.unsplash.com/photo-aPIlltz21OI?auto=format&fit=crop&w=1920&q=80',
  'furnace-installation':'https://images.unsplash.com/photo-TkcnKFXU1aU?auto=format&fit=crop&w=1920&q=80',
  'heat-pump':           'https://images.unsplash.com/photo-NUbkugvpD1M?auto=format&fit=crop&w=1920&q=80',
  'ductless-mini-split': 'https://images.unsplash.com/photo-1KNFO2dpoiM?auto=format&fit=crop&w=1920&q=80',
  'duct-cleaning':       'https://images.unsplash.com/photo-OGV99Jhhvro?auto=format&fit=crop&w=1920&q=80',
  'hvac-tune-up':        'https://images.unsplash.com/photo-6dCFBWET48s?auto=format&fit=crop&w=1920&q=80',
  'emergency-hvac':      'https://images.unsplash.com/photo-E5S7Aks1fFY?auto=format&fit=crop&w=1920&q=80',
  'commercial-hvac':     'https://images.unsplash.com/photo-vvDUCfhiDpE?auto=format&fit=crop&w=1920&q=80',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_DATA[slug]
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${slug}`,
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = SERVICES_DATA[slug]
  if (!service) notFound()

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Services', url: `${siteUrl}/services/ac-repair` },
    { name: service.title, url: `${siteUrl}/services/${slug}` },
  ])

  const schema = serviceSchema(service.h1, service.description, `${siteUrl}/services/${slug}`)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <HeroMedia
        mode="image"
        imageUrl={SERVICE_IMAGES[slug] ?? 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80'}
        imageAlt={`${service.title} service in Northern NJ`}
        overlayOpacity={65}
        gradientClass="bg-gradient-to-br from-brand-blue to-blue-900"
        className="py-14 px-4 min-h-[380px]"
      >
        <div className="max-w-5xl mx-auto">
          <nav className="text-blue-300 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {' → '}
            <Link href="/services/ac-repair" className="hover:text-white transition-colors">Services</Link>
            {' → '}
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">{service.h1}</h1>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl leading-relaxed">{service.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-black text-lg px-7 py-4 rounded-xl hover:bg-orange-500 transition-colors"
            >
              <Phone size={20} />
              Call {COMPANY.phone}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center bg-white text-brand-blue border-2 border-white font-bold text-lg px-7 py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </HeroMedia>

      <TrustBadges />

      {/* Benefits + Estimate */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                Why Choose Go Pro for {service.title}?
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-brand-blue text-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Ready to Schedule?</h3>
                <p className="text-blue-200 text-sm mb-4">
                  Call now for same-day service or fill out our estimate form. We serve all of Northern NJ.
                </p>
                <a
                  href={COMPANY.phoneTel}
                  className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-5 py-2.5 rounded-lg hover:bg-orange-500 transition-colors"
                >
                  <Phone size={16} />
                  {COMPANY.phone}
                </a>
              </div>

              {/* Other services */}
              <div className="mt-8">
                <h3 className="font-bold text-brand-dark mb-4">Other Services We Offer</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.values(SERVICES_DATA)
                    .filter((s) => s.slug !== slug)
                    .slice(0, 6)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="text-sm bg-brand-light border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
                      >
                        {s.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            {/* Estimate Wizard */}
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Get a Free Estimate</h2>
              <EstimateWizard />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <FAQAccordion
          faqs={service.faqs}
          title={`${service.title} — Frequently Asked Questions`}
          subtitle={`Common questions about ${service.title.toLowerCase()} in Northern NJ.`}
        />
      )}

      {/* Cities We Serve */}
      <section className="bg-brand-light py-12 px-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl font-bold text-brand-dark mb-2">
            {service.title} Throughout Northern NJ
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            We provide {service.title.toLowerCase()} in every city and town we serve.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CITY_SLUGS.map((citySlug) => (
              <Link
                key={citySlug}
                href={`/locations/${citySlug}/${slug}`}
                className="text-sm bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {service.title} in {CITIES_DATA[citySlug].name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-orange py-12 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3">Need {service.title} in Northern NJ?</h2>
          <p className="text-orange-100 mb-6">Call Go Pro Heating &amp; Cooling for fast, professional service.</p>
          <a
            href={COMPANY.phoneTel}
            className="inline-flex items-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors"
          >
            <Phone size={22} />
            {COMPANY.phone}
          </a>
          <p className="mt-4 text-orange-200 text-sm">NJ License {COMPANY.license} · Available 24/7</p>
        </div>
      </section>
    </>
  )
}
