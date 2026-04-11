import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { CITY_SLUGS, CITIES_DATA } from '@/lib/constants'

export default function ServiceAreaGrid() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-title">HVAC Service Areas in Northern NJ</h2>
          <p className="section-subtitle mx-auto">
            We serve homeowners and businesses throughout Passaic, Bergen, and Essex counties.
            Don&apos;t see your town? Call us — we likely serve your area.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CITY_SLUGS.map((slug) => {
            const city = CITIES_DATA[slug]
            return (
              <Link
                key={slug}
                href={`/locations/${slug}`}
                className="flex items-center gap-2 bg-brand-light border border-slate-200 hover:border-brand-orange hover:bg-orange-50 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:text-brand-orange transition-all duration-150 card-hover"
              >
                <MapPin size={14} className="text-brand-blue flex-shrink-0" />
                <span>{city.name}, NJ</span>
              </Link>
            )
          })}
        </div>
        <p className="text-center mt-6 text-sm text-slate-500">
          Not in this list?{' '}
          <Link href="/contact" className="text-brand-orange hover:underline font-medium">
            Contact us
          </Link>{' '}
          — we serve many more communities throughout Northern NJ.
        </p>
      </div>
    </section>
  )
}
