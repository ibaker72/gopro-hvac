'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { FAQ } from '@/types'
import { faqSchema } from '@/lib/schema'

interface FAQAccordionProps {
  faqs: FAQ[]
  title?: string
  subtitle?: string
  includeSchema?: boolean
}

export default function FAQAccordion({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle,
  includeSchema = true,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {includeSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
          />
        )}
        <div className="text-center mb-10">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle mx-auto mt-3">{subtitle}</p>}
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-brand-dark pr-4">{faq.q}</span>
                <span className="flex-shrink-0 text-brand-blue">
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
