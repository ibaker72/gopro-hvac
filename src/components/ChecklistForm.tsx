'use client'

import { useState } from 'react'
import { CheckCircle, Download, FileText, Shield, Star } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { GA } from '@/lib/analytics'

const benefits = [
  { season: '🌸 Spring', items: ['Check AC coolant levels', 'Clean condenser coils', 'Test thermostat accuracy', 'Replace air filters'] },
  { season: '☀️ Summer', items: ['Monitor AC performance', 'Keep vents clear', 'Check condensate drain', 'Watch energy bills'] },
  { season: '🍂 Fall', items: ['Schedule furnace tune-up', 'Inspect heat exchanger', 'Check carbon monoxide detectors', 'Seal duct leaks'] },
  { season: '❄️ Winter', items: ['Keep vents unobstructed', 'Monitor heating costs', 'Check thermostat batteries', 'Know emergency numbers'] },
]

export default function ChecklistForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) {
      setStatus('success')
      return
    }
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'checklist', website: honeypot }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      GA.checklistDownload('checklist_page')
    } catch {
      setError('Something went wrong. Please try again or call us at ' + COMPANY.phone)
      setStatus('error')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Left: What you get */}
      <div>
        <h2 className="text-2xl font-bold text-brand-dark mb-6">What&apos;s Inside the Checklist</h2>
        <div className="grid grid-cols-2 gap-4">
          {benefits.map((season) => (
            <div key={season.season} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="font-bold text-brand-dark mb-3">{season.season}</p>
              <ul className="space-y-1.5">
                {season.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Shield size={20} className="text-brand-blue" />
            <h3 className="font-bold text-brand-dark">From the Pros at Go Pro HVAC</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            This checklist was developed by our licensed NJ HVAC technicians based on {COMPANY.yearsInBusiness} years
            of service in Northern New Jersey. It&apos;s the same inspection guide we use when evaluating
            systems for our customers.
          </p>
          <div className="flex items-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-slate-500 ml-1">Used by 1,200+ NJ homeowners</span>
          </div>
        </div>
      </div>

      {/* Right: Form or Success */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sticky top-24">
        {status === 'success' ? (
          <div className="text-center py-6">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Check Your Email!</h3>
            <p className="text-slate-600 mb-6">
              We&apos;ve sent your free HVAC checklist to <strong>{form.email}</strong>.
              Check your inbox (and spam folder just in case).
            </p>
            <a
              href="/hvac-maintenance-checklist.pdf"
              download
              onClick={() => GA.checklistDownload('checklist_direct_download')}
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors mb-4"
            >
              <Download size={18} />
              Download Now
            </a>
            <p className="text-sm text-slate-500">
              Want a professional HVAC inspection?{' '}
              <a href={COMPANY.phoneTel} className="text-brand-orange font-bold hover:underline">
                Call {COMPANY.phone}
              </a>
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText size={28} className="text-brand-orange" />
              </div>
              <h2 className="text-xl font-black text-brand-dark">Get Instant Access</h2>
              <p className="text-slate-500 text-sm mt-1">Free download. No credit card required.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone <span className="text-slate-400 text-xs">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="(973) 555-0123"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-orange text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-base disabled:opacity-60"
              >
                <Download size={18} />
                {status === 'loading' ? 'Sending...' : 'Send Me the Free Checklist'}
              </button>
              <p className="text-xs text-center text-slate-400">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
