'use client'

import { useState } from 'react'
import { CheckCircle, ChevronRight, ChevronLeft, Phone, Loader2 } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { GA } from '@/lib/analytics'

type Step = 1 | 2 | 3 | 4 | 5 | 'success'

const SERVICE_SLUG_TO_LABEL: Record<string, string> = {
  'ac-repair': 'AC Repair',
  'ac-installation': 'AC Installation',
  'heating-repair': 'Heating Repair',
  'furnace-installation': 'Furnace Installation',
  'hvac-tune-up': 'Tune-Up',
  'ductless-mini-split': 'Ductwork',
  'emergency-hvac': 'Emergency',
  'duct-cleaning': 'Ductwork',
}

interface WizardData {
  serviceType: string
  homeSize: string
  systemAge: string
  urgency: string
  name: string
  email: string
  phone: string
  city: string
  notes: string
}

const SERVICE_OPTIONS = [
  { label: 'AC Repair', icon: '❄️' },
  { label: 'AC Installation', icon: '💨' },
  { label: 'Heating Repair', icon: '🔥' },
  { label: 'Furnace Installation', icon: '🌡️' },
  { label: 'Tune-Up', icon: '🔧' },
  { label: 'Ductwork', icon: '🏠' },
  { label: 'Emergency', icon: '🚨' },
  { label: 'Not Sure', icon: '❓' },
]

const SIZE_OPTIONS = [
  { label: 'Under 1,000 sqft', desc: 'Condo, small home' },
  { label: '1,000–2,000 sqft', desc: 'Average home' },
  { label: '2,000–3,500 sqft', desc: 'Larger home' },
  { label: '3,500+ sqft', desc: 'Large/luxury home' },
]

const AGE_OPTIONS = [
  { label: 'Less than 5 years', desc: 'Relatively new' },
  { label: '5–10 years', desc: 'Middle-aged' },
  { label: '10–15 years', desc: 'Getting older' },
  { label: '15+ years', desc: 'May need replacement' },
]

const URGENCY_OPTIONS = [
  { label: 'Emergency (today)', desc: 'System is down / unsafe', color: 'border-red-400 bg-red-50' },
  { label: 'This week', desc: 'Needs attention soon', color: 'border-yellow-400 bg-yellow-50' },
  { label: 'Flexible', desc: 'Planning ahead', color: 'border-green-400 bg-green-50' },
]

const STEP_TITLES = ['', 'What service do you need?', 'What is your home size?', 'How old is your system?', 'How urgent is this?', 'Get your free estimate']

export default function EstimateWizard({ defaultService }: { defaultService?: string } = {}) {
  const prefilled = defaultService ? (SERVICE_SLUG_TO_LABEL[defaultService] ?? '') : ''
  const [step, setStep] = useState<Step>(prefilled ? 2 : 1)
  const [data, setData] = useState<WizardData>({
    serviceType: prefilled, homeSize: '', systemAge: '', urgency: '',
    name: '', email: '', phone: '', city: '', notes: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [result, setResult] = useState<{ min: number; max: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const progress = step === 'success' ? 100 : ((step as number) / 5) * 100

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) {
      setStep('success')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: honeypot }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to submit')
      setResult({ min: json.estimatedMin, max: json.estimatedMax })
      setStep('success')
      GA.estimateSubmit(data.serviceType, data.urgency)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-slate-100 h-2">
        <div
          className="bg-brand-orange h-2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      {step !== 'success' && (
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              {step !== 1 && (
                <p className="text-xs text-slate-400 mb-1">Step {step as number} of 5</p>
              )}
              <h3 className="font-bold text-brand-dark text-lg">
                {STEP_TITLES[step as number]}
              </h3>
            </div>
            {step !== 1 && (
              <button
                onClick={() => setStep((step as number) - 1 as Step)}
                className="flex items-center gap-1 text-slate-500 hover:text-brand-blue text-sm"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Step 1: Service Type */}
        {step === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVICE_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setData({ ...data, serviceType: opt.label })
                  setStep(2)
                  GA.estimateStepComplete(1, opt.label)
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:border-brand-orange hover:bg-orange-50 ${
                  data.serviceType === opt.label ? 'border-brand-orange bg-orange-50' : 'border-slate-200'
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span className="text-xs font-semibold text-center text-slate-700">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Home Size */}
        {step === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setData({ ...data, homeSize: opt.label })
                  setStep(3)
                  GA.estimateStepComplete(2, opt.label)
                }}
                className={`flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all hover:border-brand-orange hover:bg-orange-50 ${
                  data.homeSize === opt.label ? 'border-brand-orange bg-orange-50' : 'border-slate-200'
                }`}
              >
                <span className="font-bold text-brand-dark">{opt.label}</span>
                <span className="text-sm text-slate-500">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: System Age */}
        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setData({ ...data, systemAge: opt.label })
                  setStep(4)
                  GA.estimateStepComplete(3, opt.label)
                }}
                className={`flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all hover:border-brand-orange hover:bg-orange-50 ${
                  data.systemAge === opt.label ? 'border-brand-orange bg-orange-50' : 'border-slate-200'
                }`}
              >
                <span className="font-bold text-brand-dark">{opt.label}</span>
                <span className="text-sm text-slate-500">{opt.desc}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 4: Urgency */}
        {step === 4 && (
          <div className="space-y-3">
            {URGENCY_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setData({ ...data, urgency: opt.label })
                  setStep(5)
                  GA.estimateStepComplete(4, opt.label)
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                  data.urgency === opt.label ? opt.color + ' border-opacity-100' : 'border-slate-200 hover:' + opt.color
                } ${data.urgency === opt.label ? opt.color : ''}`}
              >
                <div className="flex-1">
                  <span className="font-bold text-brand-dark block">{opt.label}</span>
                  <span className="text-sm text-slate-500">{opt.desc}</span>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {/* Step 5: Contact Info */}
        {step === 5 && (
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="(973) 555-0123"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                City / Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={data.city}
                onChange={(e) => setData({ ...data, city: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                placeholder="Clifton, NJ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={data.notes}
                onChange={(e) => setData({ ...data, notes: e.target.value })}
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                placeholder="Any additional details about your issue..."
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 border border-slate-200">
              <strong>Your Selections:</strong> {data.serviceType} · {data.homeSize} · {data.systemAge} · {data.urgency}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 size={20} className="animate-spin" /> Calculating...</>
              ) : (
                <>Get My Free Estimate <ChevronRight size={20} /></>
              )}
            </button>
            <p className="text-xs text-center text-slate-400">
              We&apos;ll call you within 2 hours to confirm your appointment.
            </p>
          </form>
        )}

        {/* Success Screen */}
        {step === 'success' && result && (
          <div className="text-center py-4">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-brand-dark mb-2">Estimate Sent!</h3>
            <p className="text-slate-600 mb-6">
              Based on your selections, here&apos;s your estimated range:
            </p>
            <div className="bg-brand-light border-2 border-brand-blue rounded-xl p-5 mb-6">
              <p className="text-sm text-slate-500 mb-1">Estimated Cost Range</p>
              <p className="text-4xl font-black text-brand-blue">
                ${result.min.toLocaleString()} – ${result.max.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                *Estimates vary based on specific conditions found during on-site assessment
              </p>
            </div>
            <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-4 mb-5">
              <p className="font-bold text-brand-dark">
                🕐 Expect a call within <span className="text-brand-orange">2 hours</span>
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Can&apos;t wait? Call us directly:
              </p>
              <a
                href={COMPANY.phoneTel}
                onClick={() => GA.phoneClick('estimate_success')}
                className="font-black text-brand-orange text-lg"
              >
                {COMPANY.phone}
              </a>
            </div>
            <button
              onClick={() => {
                setStep(1)
                setData({ serviceType: '', homeSize: '', systemAge: '', urgency: '', name: '', email: '', phone: '', city: '', notes: '' })
                setResult(null)
              }}
              className="text-sm text-slate-500 hover:text-brand-blue underline"
            >
              Submit another estimate
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {step !== 'success' && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Prefer to talk to someone?</p>
          <a
            href={COMPANY.phoneTel}
            onClick={() => GA.phoneClick('estimate_wizard_footer')}
            className="flex items-center gap-1.5 text-brand-orange font-bold text-sm hover:text-orange-600"
          >
            <Phone size={14} />
            {COMPANY.phone}
          </a>
        </div>
      )}
    </div>
  )
}
