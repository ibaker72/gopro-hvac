import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import ChecklistForm from '@/components/ChecklistForm'
import { breadcrumbSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  title: 'Free HVAC Maintenance Checklist for NJ Homeowners | Go Pro Heating & Cooling',
  description: 'Download the free seasonal HVAC maintenance checklist for New Jersey homeowners. Keep your heating and cooling system running efficiently all year — from Go Pro Heating & Cooling.',
  alternates: { canonical: '/free-checklist' },
  openGraph: {
    title: 'Free HVAC Maintenance Checklist — NJ Homeowners',
    description: 'The same seasonal checklist our NJ HVAC technicians use. Free download for homeowners in Clifton, Paterson, Wayne & all of Northern NJ.',
    url: `${siteUrl}/free-checklist`,
  },
}

export default function FreeChecklistPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Free Checklist', url: `${siteUrl}/free-checklist` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm font-bold mb-5">
            <FileText size={14} />
            100% Free — Instant Download
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            The Ultimate NJ Homeowner<br />
            <span className="text-brand-orange">HVAC Maintenance Checklist</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Save hundreds on repairs — know exactly what to check each season to keep your HVAC system
            running efficiently in New Jersey&apos;s climate.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ChecklistForm />
        </div>
      </section>
    </>
  )
}
