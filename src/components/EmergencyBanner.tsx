import { Phone, AlertCircle } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

export default function EmergencyBanner() {
  return (
    <section className="bg-brand-blue text-white py-14 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange border border-brand-orange/40 px-4 py-1.5 rounded-full text-sm font-bold mb-5">
          <AlertCircle size={16} />
          24/7 Emergency Service
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          HVAC Emergency? We're Here Right Now.
        </h2>
        <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
          No heat on a freezing night? AC out during a heat wave? Our technicians are
          dispatched around the clock throughout Northern NJ — no overtime charges, no
          waiting until morning.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={COMPANY.phoneTel}
            className="cta-pulse inline-flex items-center gap-3 bg-brand-orange text-white font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors"
          >
            <Phone size={24} />
            Call {COMPANY.phone}
          </a>
          <p className="text-blue-300 text-sm">
            Average response time: <strong className="text-white">Under 2 hours</strong>
          </p>
        </div>
        <p className="mt-6 text-blue-300 text-sm">
          Serving Clifton, Paterson, Wayne, Nutley, Hackensack &amp; all of Northern NJ
        </p>
      </div>
    </section>
  )
}
