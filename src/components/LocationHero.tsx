import Link from 'next/link'
import { Phone, MapPin, CheckCircle } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import type { CityData } from '@/types'
import HeroMedia from '@/components/HeroMedia'

interface LocationHeroProps {
  city: CityData
}

export default function LocationHero({ city }: LocationHeroProps) {
  return (
    <HeroMedia
      mode="image"
      imageUrl="/images/heroes/homepage-hero.webp"
      imageAlt={`Residential neighbourhood in ${city.name}, NJ`}
      overlayOpacity={60}
      className="py-16 px-4 min-h-[420px]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
          <MapPin size={14} />
          <span>
            <Link href="/" className="hover:text-white transition-colors">Go Pro HVAC</Link>
            {' → '}
            <Link href="/locations/clifton" className="hover:text-white transition-colors">Service Areas</Link>
            {' → '}
            <span className="text-white">{city.name}</span>
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
          HVAC Services in{' '}
          <span className="text-brand-orange">{city.name}, NJ</span>
        </h1>
        <p className="text-blue-200 text-lg mb-8 max-w-2xl leading-relaxed">
          Go Pro Heating &amp; Cooling provides expert AC repair, furnace installation, and HVAC maintenance
          throughout {city.name} and {city.county} County, NJ. Fast service, fair prices, and 24/7 emergency availability.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {['AC Repair', 'Furnace Installation', 'Heating Repair', 'HVAC Tune-Up', '24/7 Emergency'].map((service) => (
            <span
              key={service}
              className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-sm px-3 py-1.5 rounded-full"
            >
              <CheckCircle size={13} className="text-brand-orange" />
              {service}
            </span>
          ))}
        </div>
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
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue border-2 border-white font-bold text-lg px-7 py-4 rounded-xl hover:bg-brand-blue hover:text-white transition-all"
          >
            Get Free Estimate
          </Link>
        </div>
      </div>
    </HeroMedia>
  )
}
