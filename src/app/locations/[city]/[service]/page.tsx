import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react'
import TrustBadges from '@/components/TrustBadges'
import EstimateWizard from '@/components/EstimateWizard'
import FAQAccordion from '@/components/FAQAccordion'
import { COMPANY, CITIES_DATA, CITY_SLUGS, SERVICES_DATA, SERVICE_SLUGS } from '@/lib/constants'
import { breadcrumbSchema, cityServiceSchema } from '@/lib/schema'
import type { FAQ } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

const COUNTY_CONTEXT: Record<string, string> = {
  Passaic:
    'Passaic County homes range from pre-war construction in urban centers to newer suburban builds — our technicians are experienced with both older heating systems and modern high-efficiency equipment throughout the area.',
  Bergen:
    "Bergen County's diverse housing stock, from older colonial homes to new construction communities, demands HVAC expertise across all system types. Go Pro technicians know Bergen County's neighborhoods well.",
  Essex:
    'Essex County properties range from historic homes to modern apartments and condos. Our team handles everything from aging boiler systems in older homes to new central air installations in updated properties.',
  Morris:
    "Morris County's suburban neighborhoods often feature larger homes with complex HVAC needs. Our technicians are experienced with multi-zone systems, high-efficiency equipment, and full system replacements.",
  Hudson:
    "Hudson County's urban and waterfront properties require HVAC technicians comfortable with limited-access installs, high-rise challenges, and diverse building types. Go Pro's team handles it all.",
}

interface Props {
  params: Promise<{ city: string; service: string }>
}

export async function generateStaticParams() {
  return CITY_SLUGS.flatMap((city) =>
    SERVICE_SLUGS.map((service) => ({ city, service }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params
  const city = CITIES_DATA[citySlug]
  const service = SERVICES_DATA[serviceSlug]
  if (!city || !service) return {}
  return {
    title: `${service.title} in ${city.name}, NJ | Go Pro Heating & Cooling | ${COMPANY.phone}`,
    description: `Professional ${service.title.toLowerCase()} in ${city.name}, ${city.county} County NJ. Go Pro Heating & Cooling — licensed, local, same-day service available. Call ${COMPANY.phone}.`,
    alternates: { canonical: `/locations/${citySlug}/${serviceSlug}` },
    openGraph: {
      title: `${service.title} in ${city.name}, NJ | Go Pro Heating & Cooling`,
      description: `Expert ${service.title.toLowerCase()} in ${city.name}, NJ. Licensed, local, and available 24/7.`,
      url: `/locations/${citySlug}/${serviceSlug}`,
    },
  }
}

function getCrossPageFAQs(cityName: string, countyName: string, serviceTitle: string): FAQ[] {
  return [
    {
      q: `How much does ${serviceTitle.toLowerCase()} cost in ${cityName}, NJ?`,
      a: `${serviceTitle} costs in ${cityName} vary by system type and scope of work. We provide transparent upfront quotes before starting any work. Call ${COMPANY.phone} or use our estimate form for a same-day price — no obligation.`,
    },
    {
      q: `Do you offer same-day ${serviceTitle.toLowerCase()} in ${cityName}?`,
      a: `Yes — Go Pro Heating & Cooling offers same-day and emergency service throughout ${cityName} and ${countyName} County. Most calls are dispatched within 2–4 hours. Call ${COMPANY.phone}.`,
    },
    {
      q: `Are you licensed for ${serviceTitle.toLowerCase()} in ${cityName}, NJ?`,
      a: `Absolutely. Go Pro holds NJ HVAC Contractor License ${COMPANY.license} and is fully insured to perform ${serviceTitle.toLowerCase()} in ${cityName} and throughout New Jersey.`,
    },
  ]
}

export default async function CityServicePage({ params }: Props) {
  const { city: citySlug, service: serviceSlug } = await params
  const city = CITIES_DATA[citySlug]
  const service = SERVICES_DATA[serviceSlug]
  if (!city || !service) notFound()

  const nearbyCities = CITY_SLUGS.filter(
    (s) => CITIES_DATA[s].county === city.county && s !== citySlug
  ).slice(0, 6)

  const otherServices = SERVICE_SLUGS.filter((s) => s !== serviceSlug)

  const crossFAQs = getCrossPageFAQs(city.name, city.county, service.title)
  const allFAQs: FAQ[] = [...service.faqs, ...crossFAQs]

  const countyContext =
    COUNTY_CONTEXT[city.county] ??
    `Go Pro Heating & Cooling proudly serves ${city.name} and all of ${city.county} County with fast, professional HVAC service.`

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Locations', url: `${siteUrl}/locations/clifton` },
    { name: `${city.name}, NJ`, url: `${siteUrl}/locations/${citySlug}` },
    { name: service.title, url: `${siteUrl}/locations/${citySlug}/${serviceSlug}` },
  ])

  const schema = cityServiceSchema(city, service)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-blue-300 text-sm mb-4 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link href={`/locations/${citySlug}`} className="hover:text-white transition-colors">
              {city.name}
            </Link>
            <span>›</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Professional {service.title} in {city.name}, NJ
          </h1>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-brand-orange text-white font-black text-lg px-7 py-4 rounded-xl hover:bg-orange-500 transition-colors"
            >
              <Phone size={20} />
              Call {COMPANY.phone}
            </a>
            <Link
              href="#estimate"
              className="inline-flex items-center justify-center bg-white/10 border-2 border-white text-white font-bold text-lg px-7 py-4 rounded-xl hover:bg-white hover:text-brand-blue transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Main Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                Why {city.name} Homeowners Choose Go Pro for {service.title}
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">{countyContext}</p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our licensed technicians provide fast, professional{' '}
                {service.title.toLowerCase()} in {city.name} with transparent pricing and no hidden fees.
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* City context */}
              <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-brand-dark mb-1">
                      Serving {city.name}, {city.county} County (ZIP {city.zip})
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      From our Clifton base, our technicians reach {city.name} faster than most
                      out-of-area companies. We provide {service.title.toLowerCase()} throughout{' '}
                      {city.zip} and surrounding neighborhoods.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Phone size={14} className="text-brand-orange flex-shrink-0" />
                      <a href={COMPANY.phoneTel} className="font-bold text-brand-orange hover:underline text-sm">
                        {COMPANY.phone}
                      </a>
                      <span className="text-slate-400 text-xs">— {COMPANY.hoursDisplay}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other services in this city */}
              <div>
                <h3 className="font-bold text-brand-dark mb-3">
                  Other HVAC Services in {city.name}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {otherServices.map((slug) => (
                    <Link
                      key={slug}
                      href={`/locations/${citySlug}/${slug}`}
                      className="flex items-center gap-2 text-sm text-slate-700 bg-brand-light border border-slate-200 px-3 py-2 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
                    >
                      <ArrowRight size={14} className="text-brand-orange flex-shrink-0" />
                      {SERVICES_DATA[slug].title} in {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Estimate Wizard */}
            <div id="estimate">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                Get a Free {service.title} Estimate
              </h2>
              <EstimateWizard defaultService={serviceSlug} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQAccordion
        faqs={allFAQs}
        title={`${service.title} FAQs for ${city.name}, NJ`}
        subtitle={`Common questions from ${city.name} homeowners about ${service.title.toLowerCase()}.`}
      />

      {/* Nearby cities for same service */}
      {nearbyCities.length > 0 && (
        <section className="bg-white py-12 px-4 border-t border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-brand-dark mb-2">
              {service.title} in Nearby {city.county} County Cities
            </h2>
            <p className="text-slate-500 text-sm mb-5">
              Go Pro also provides {service.title.toLowerCase()} throughout {city.county} County.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {nearbyCities.map((s) => (
                <Link
                  key={s}
                  href={`/locations/${s}/${serviceSlug}`}
                  className="text-sm bg-brand-light border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  {service.title} in {CITIES_DATA[s].name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-brand-orange py-12 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3">
            Need {service.title} in {city.name}?
          </h2>
          <p className="text-orange-100 mb-6">
            Call Go Pro Heating &amp; Cooling — licensed, local, and available 24/7.
          </p>
          <a
            href={COMPANY.phoneTel}
            className="inline-flex items-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors"
          >
            <Phone size={22} />
            {COMPANY.phone}
          </a>
          <p className="mt-4 text-orange-200 text-sm">
            NJ License {COMPANY.license} · Serving {city.name} &amp; {city.county} County
          </p>
        </div>
      </section>
    </>
  )
}
