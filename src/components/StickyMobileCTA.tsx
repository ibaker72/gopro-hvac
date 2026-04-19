import Link from 'next/link'
import { Phone, ClipboardList } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-slate-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.10)]">
      <div className="grid grid-cols-2">
        <a
          href={COMPANY.phoneTel}
          className="flex items-center justify-center gap-2 bg-brand-orange text-white font-bold text-sm py-4 hover:bg-orange-500 transition-colors"
        >
          <Phone size={17} />
          Call Now
        </a>
        <Link
          href="/estimate"
          className="flex items-center justify-center gap-2 bg-brand-blue text-white font-bold text-sm py-4 hover:bg-blue-900 transition-colors"
        >
          <ClipboardList size={17} />
          Get Estimate
        </Link>
      </div>
    </div>
  )
}
