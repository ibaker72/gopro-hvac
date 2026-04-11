'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact', notes: form.message }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Go Pro Heating &amp; Cooling</h1>
          <p className="text-blue-200 text-lg">
            Ready to schedule service or have a question? We&apos;re here to help — 24/7 for emergencies.
          </p>
        </div>
      </section>

      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Get In Touch</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="bg-brand-orange/10 p-3 rounded-lg">
                    <Phone size={22} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Phone (24/7)</p>
                    <a href={COMPANY.phoneTel} className="text-brand-orange font-black text-xl hover:underline">
                      {COMPANY.phone}
                    </a>
                    <p className="text-slate-500 text-sm mt-0.5">Emergency service always available</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="bg-brand-blue/10 p-3 rounded-lg">
                    <Mail size={22} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Email</p>
                    <a href={`mailto:${COMPANY.email}`} className="text-brand-blue hover:underline">
                      {COMPANY.email}
                    </a>
                    <p className="text-slate-500 text-sm mt-0.5">We respond within a few hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <MapPin size={22} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Address</p>
                    <address className="not-italic text-slate-600">{COMPANY.address}</address>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <Clock size={22} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Hours</p>
                    <p className="text-slate-600">Mon–Fri: 7am – 7pm</p>
                    <p className="text-slate-600">Sat–Sun: 8am – 5pm</p>
                    <p className="text-brand-orange font-semibold text-sm">24/7 Emergency Service</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-6 bg-slate-200 rounded-xl h-52 flex items-center justify-center border border-slate-300">
                <div className="text-center text-slate-500">
                  <MapPin size={32} className="mx-auto mb-2 text-brand-blue" />
                  <p className="font-semibold">23 Major Street</p>
                  <p className="text-sm">Clifton, NJ 07013</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Message Received!</h3>
                  <p className="text-slate-600">
                    Thanks for reaching out. We&apos;ll be in touch within a few hours.
                    For urgent matters, call <a href={COMPANY.phoneTel} className="text-brand-orange font-bold">{COMPANY.phone}</a>.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-brand-dark mb-5">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input type="tel" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="(973) 555-0123" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                      <textarea required rows={4} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                        placeholder="How can we help you?" />
                    </div>
                    {status === 'error' && (
                      <p className="text-red-500 text-sm">Something went wrong. Please call us at {COMPANY.phone}.</p>
                    )}
                    <button type="submit" disabled={status === 'loading'}
                      className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60">
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
