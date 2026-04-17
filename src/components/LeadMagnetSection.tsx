'use client'

import { useState } from 'react'
import { CheckCircle, Download, FileText } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { GA } from '@/lib/analytics'

export default function LeadMagnetSection() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const benefits = [
    'What to check every season before breakdowns happen',
    'Filter replacement schedule to maximize efficiency',
    'Warning signs your system needs professional attention',
    'DIY maintenance tips to extend equipment life',
    'How to prepare your system for NJ winters & summers',
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    if (honeypot) {
      setStatus('success')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'checklist-homepage', website: honeypot }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      GA.checklistDownload('homepage_lead_magnet')
    } catch {
      setError('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className="bg-brand-blue text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Offer */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-orange text-white px-4 py-1.5 rounded-full text-sm font-bold mb-5">
              <FileText size={14} />
              FREE Download
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              The Ultimate NJ Homeowner{' '}
              <span className="text-brand-orange">HVAC Maintenance Checklist</span>
            </h2>
            <p className="text-blue-200 mb-6">
              Save hundreds on repairs by knowing exactly what to check each season. Over 1,200 NJ homeowners have downloaded this guide.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-blue-100">
                  <CheckCircle size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-4">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-brand-dark mb-2">Checklist Sent!</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Check your email for your free HVAC maintenance checklist.
                </p>
                <a
                  href="/hvac-maintenance-checklist.pdf"
                  onClick={() => GA.checklistDownload('homepage_direct_download')}
                  className="inline-flex items-center gap-2 bg-brand-orange text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Download size={16} />
                  Download Checklist
                </a>
                <p className="text-xs text-slate-400 mt-4">
                  Want a professional inspection?{' '}
                  <a
                    href={COMPANY.phoneTel}
                    onClick={() => GA.phoneClick('lead_magnet_success')}
                    className="text-brand-orange hover:underline"
                  >
                    Call {COMPANY.phone}
                  </a>
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-black text-xl text-brand-dark mb-1">Get Your Free Copy</h3>
                <p className="text-slate-500 text-sm mb-5">Instant email delivery. No spam, ever.</p>
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      placeholder="your@email.com"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Download size={16} />
                    {status === 'loading' ? 'Sending...' : 'Send Me the Free Checklist'}
                  </button>
                  <p className="text-xs text-center text-slate-400">
                    By submitting, you agree to receive occasional HVAC tips from Go Pro Heating &amp; Cooling. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
