import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, CheckCircle, MapPin } from 'lucide-react'
import LocationHero from '@/components/LocationHero'
import TrustBadges from '@/components/TrustBadges'
import EstimateWizard from '@/components/EstimateWizard'
import FAQAccordion from '@/components/FAQAccordion'
import RecentWork from '@/components/RecentWork'
import { COMPANY, CITIES_DATA, CITY_SLUGS, SERVICES_DATA, SERVICE_SLUGS } from '@/lib/constants'
import { breadcrumbSchema, serviceAreaSchema } from '@/lib/schema'
import { getRecentProjects } from '@/lib/projects'
import type { FAQ } from '@/types'

export const revalidate = 3600

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

interface Props {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = CITIES_DATA[citySlug]
  if (!city) return {}
  return {
    title: `HVAC Services in ${city.name}, NJ | Go Pro Heating & Cooling | ${COMPANY.phone}`,
    description: `Expert AC repair, furnace installation & HVAC maintenance in ${city.name}, NJ. Go Pro Heating & Cooling — licensed, local, and available 24/7. Call ${COMPANY.phone}.`,
    alternates: { canonical: `/locations/${citySlug}` },
    openGraph: {
      title: `HVAC Services in ${city.name}, NJ | Go Pro Heating & Cooling`,
      description: `Expert HVAC services in ${city.name}, NJ. AC repair, furnace installation & 24/7 emergency service.`,
    },
  }
}

function getCityFAQs(cityName: string): FAQ[] {
  return [
    {
      q: `Do you offer same-day HVAC service in ${cityName}, NJ?`,
      a: `Yes! Go Pro Heating & Cooling offers same-day HVAC service in ${cityName} and throughout ${cityName === 'Clifton' ? 'Passaic' : 'the surrounding'} County. Call ${COMPANY.phone} and we'll do our best to dispatch a technician the same day, especially for emergencies.`,
    },
    {
      q: `How much does AC repair cost in ${cityName}, NJ?`,
      a: `AC repair in ${cityName} typically costs $150–$600 depending on the problem. We provide transparent upfront quotes before starting any work. For a free estimate, fill out our online form or call ${COMPANY.phone}.`,
    },
    {
      q: `Are you licensed to work in ${cityName}, NJ?`,
      a: `Yes, Go Pro Heating & Cooling holds NJ HVAC Contractor License ${COMPANY.license} and is fully insured. We're authorized to perform HVAC work throughout New Jersey, including ${cityName}.`,
    },
  ]
}

export default async function LocationPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = CITIES_DATA[citySlug]
  if (!city) notFound()

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Service Areas', url: `${siteUrl}/locations/clifton` },
    { name: `${city.name}, NJ`, url: `${siteUrl}/locations/${citySlug}` },
  ])

  const cityFAQs = getCityFAQs(city.name)

  const { projects, isCitySpecific } = await getRecentProjects(citySlug)
  const serviceArea = serviceAreaSchema(city, projects[0]?.image_url)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceArea) }} />

      {/* Hero */}
      <LocationHero city={city} />

      <TrustBadges />

      {/* Main Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Content */}
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-4">
                HVAC Services We Provide in {city.name}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Go Pro Heating &amp; Cooling has been serving {city.name} homeowners and businesses in{' '}
                {city.county} County with reliable, affordable HVAC service. Whether you need an
                emergency repair or are planning a full system upgrade, our licensed technicians are ready to help.
              </p>
              <div className="grid grid-cols-1 gap-3 mb-8">
                {SERVICE_SLUGS.map((slug) => (
                  <Link
                    key={slug}
                    href={`/locations/${citySlug}/${slug}`}
                    className="flex items-center gap-3 bg-brand-light border border-slate-200 rounded-lg px-4 py-3 hover:border-brand-orange hover:bg-orange-50 transition-all group"
                  >
                    <CheckCircle size={16} className="text-brand-orange flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-brand-dark group-hover:text-brand-orange transition-colors">
                        {SERVICES_DATA[slug].title}
                      </span>
                      <span className="text-slate-500 text-sm"> in {city.name}, NJ</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Recent job proof photos */}
              <RecentWork projects={projects} cityName={city.name} isCitySpecific={isCitySpecific} />

              {/* Map placeholder */}
              <div className="bg-slate-100 border border-slate-200 rounded-xl overflow-hidden mb-6">
                <div className="bg-slate-200 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-brand-blue mx-auto mb-2" />
                    <p className="text-slate-600 font-medium">{city.name}, NJ {city.zip}</p>
                    <p className="text-slate-500 text-sm">{city.county} County</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">Go Pro Heating &amp; Cooling</p>
                    <p className="text-slate-500 text-xs">{COMPANY.address}</p>
                  </div>
                  <a
                    href={COMPANY.phoneTel}
                    className="ml-auto flex-shrink-0 bg-brand-orange text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-5">
                <h3 className="font-bold text-brand-dark mb-2">
                  Serving {city.name} &amp; Surrounding Areas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  From our base in Clifton, NJ, Go Pro Heating &amp; Cooling provides fast, reliable HVAC
                  service throughout {city.county} County and beyond. Our technicians know {city.name}&apos;s
                  neighborhoods and can typically reach you faster than other companies.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Phone size={16} className="text-brand-orange" />
                  <a href={COMPANY.phoneTel} className="font-bold text-brand-orange hover:underline">
                    {COMPANY.phone}
                  </a>
                  <span className="text-slate-400 text-sm">— Call for service in {city.name}</span>
                </div>
              </div>
            </div>

            {/* Right: Estimate */}
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                Get a Free Estimate in {city.name}
              </h2>
              <EstimateWizard />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        faqs={cityFAQs}
        title={`HVAC Service FAQs for ${city.name}, NJ`}
        subtitle={`Common questions from ${city.name} homeowners about Go Pro Heating & Cooling.`}
      />

      {/* Nearby areas */}
      <section className="bg-white py-12 px-4 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-brand-dark mb-6">We Also Serve These Nearby Areas</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {CITY_SLUGS.filter((s) => s !== citySlug)
              .slice(0, 10)
              .map((s) => (
                <Link
                  key={s}
                  href={`/locations/${s}`}
                  className="text-sm bg-brand-light border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  {CITIES_DATA[s].name}, NJ
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
