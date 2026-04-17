declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

export const GA = {
  phoneClick: (location: string) =>
    trackEvent('phone_click', 'engagement', location),

  ctaClick: (ctaName: string, location: string) =>
    trackEvent('cta_click', 'engagement', `${ctaName} | ${location}`),

  estimateStepComplete: (step: number, label?: string) =>
    trackEvent('estimate_step_complete', 'funnel', label, step),

  estimateSubmit: (serviceType: string, urgency: string) =>
    trackEvent('estimate_submit', 'conversion', `${serviceType} | ${urgency}`),

  leadFormSubmit: (source: string) =>
    trackEvent('lead_form_submit', 'conversion', source),

  checklistDownload: (source: string) =>
    trackEvent('checklist_download', 'engagement', source),
}
