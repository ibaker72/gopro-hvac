import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Shield } from 'lucide-react'
import { COMPANY, SERVICE_SLUGS, SERVICES_DATA, CITY_SLUGS, CITIES_DATA } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-slate-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-orange text-white font-black text-lg px-3 py-1.5 rounded">
                GO PRO
              </div>
              <div>
                <div className="font-bold text-white text-sm">Heating &amp; Cooling</div>
                <div className="text-xs text-slate-400">Clifton, NJ</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Northern New Jersey's trusted HVAC experts. Licensed, insured, and available 24/7 for emergencies.
            </p>
            <div className="space-y-2 text-sm">
              <a href={COMPANY.phoneTel} className="flex items-center gap-2 text-brand-orange hover:text-orange-400 font-bold">
                <Phone size={14} />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <address className="not-italic">{COMPANY.address}</address>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>24/7 Emergency Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} />
                <span>License {COMPANY.license}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {SERVICES_DATA[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-bold text-white mb-4">Service Areas</h3>
            <ul className="space-y-1.5 text-sm columns-2">
              {CITY_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/locations/${slug}`}
                    className="hover:text-brand-orange transition-colors"
                  >
                    {CITIES_DATA[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="/estimate" className="hover:text-brand-orange transition-colors">Free Estimate</Link></li>
              <li><Link href="/free-checklist" className="hover:text-brand-orange transition-colors">Free HVAC Checklist</Link></li>
              <li><Link href="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-brand-orange transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-brand-orange transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange transition-colors">Contact Us</Link></li>
            </ul>
            <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-lg p-4">
              <p className="text-sm font-bold text-brand-orange mb-2">24/7 Emergency Service</p>
              <a
                href={COMPANY.phoneTel}
                className="block w-full text-center bg-brand-orange text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                Call {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© {currentYear} {COMPANY.name}. All rights reserved. NJ License {COMPANY.license}</p>
          <div className="flex gap-4">
            <Link href="/faq" className="hover:text-slate-300 transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
