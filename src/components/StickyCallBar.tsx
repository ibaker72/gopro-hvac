import { Phone } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

export default function StickyCallBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-brand-orange text-white py-2.5 px-4 text-center text-sm font-semibold shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="hidden sm:inline">🚨 24/7 Emergency HVAC Service —</span>
        <span className="sm:hidden">24/7 Emergency —</span>
        <a
          href={COMPANY.phoneTel}
          className="inline-flex items-center gap-1.5 bg-white text-brand-orange font-bold px-3 py-0.5 rounded-full hover:bg-orange-50 transition-colors text-sm"
        >
          <Phone size={14} />
          Call Now: {COMPANY.phone}
        </a>
      </div>
    </div>
  )
}
