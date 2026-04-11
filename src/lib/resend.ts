import { Resend } from 'resend'

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@goprohvacnj.com'
const COMPANY_EMAIL = 'goproHVACNJ@gmail.com'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[Resend] RESEND_API_KEY not set — emails will not be sent')
    return null
  }
  return new Resend(key)
}

export async function sendEstimateNotification(data: {
  name: string
  email: string
  phone: string
  city: string
  serviceType: string
  homeSize: string
  systemAge: string
  urgency: string
  estimatedMin: number
  estimatedMax: number
  notes?: string
}) {
  const client = getResend(); if (!client) return null; return client.emails.send({
    from: FROM,
    to: COMPANY_EMAIL,
    subject: `New Estimate Request from ${data.name} — ${data.serviceType}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B3A6B; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">New Estimate Request</h1>
          <p style="margin: 8px 0 0; opacity: 0.8;">Go Pro Heating &amp; Cooling — Estimate Wizard</p>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${data.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${data.phone}">${data.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">City:</td><td>${data.city}, NJ</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td>${data.serviceType}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Home Size:</td><td>${data.homeSize}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">System Age:</td><td>${data.systemAge}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Urgency:</td><td>${data.urgency}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Notes:</td><td>${data.notes || 'None'}</td></tr>
          </table>
          <div style="background: #F97316; color: white; padding: 16px; border-radius: 8px; margin-top: 16px; text-align: center;">
            <strong style="font-size: 20px;">Estimated Range: $${data.estimatedMin.toLocaleString()} – $${data.estimatedMax.toLocaleString()}</strong>
          </div>
          <p style="margin-top: 16px; font-size: 14px; color: #64748b;">
            Customer expects a call within 2 hours. Urgency level: <strong>${data.urgency}</strong>
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendEstimateConfirmation(data: {
  name: string
  email: string
  serviceType: string
  estimatedMin: number
  estimatedMax: number
}) {
  const client = getResend(); if (!client) return null; return client.emails.send({
    from: FROM,
    to: data.email,
    subject: `Your HVAC Estimate from Go Pro Heating & Cooling`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B3A6B; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">Your Estimate Is Ready!</h1>
          <p style="margin: 8px 0 0; opacity: 0.8;">Go Pro Heating &amp; Cooling — Clifton, NJ</p>
        </div>
        <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
          <p>Hi ${data.name},</p>
          <p>Thank you for requesting an estimate from Go Pro Heating &amp; Cooling! Based on the information you provided for <strong>${data.serviceType}</strong>, here is your estimated range:</p>
          <div style="background: #f8fafc; border: 2px solid #1B3A6B; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #64748b;">Estimated Cost Range</p>
            <p style="margin: 8px 0 0; font-size: 28px; font-weight: bold; color: #1B3A6B;">$${data.estimatedMin.toLocaleString()} – $${data.estimatedMax.toLocaleString()}</p>
            <p style="margin: 8px 0 0; font-size: 12px; color: #94a3b8;">*Estimate based on typical pricing. Final price confirmed after on-site assessment.</p>
          </div>
          <div style="background: #F97316; color: white; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 16px;">We'll call you within <strong>2 hours</strong> to confirm your appointment!</p>
            <p style="margin: 8px 0 0; font-size: 14px;">Can't wait? Call us directly: <strong>(973) 938-2217</strong></p>
          </div>
          <p style="margin-top: 20px; font-size: 14px; color: #64748b;">
            Go Pro Heating &amp; Cooling | 23 Major Street, Clifton, NJ 07013<br>
            License #19HC00212300 | Available 24/7 for emergencies
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendChecklistWelcome(data: {
  name: string
  email: string
}) {
  const client = getResend(); if (!client) return null; return client.emails.send({
    from: FROM,
    to: data.email,
    subject: `Your Free HVAC Maintenance Checklist from Go Pro Heating & Cooling`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1B3A6B; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">Your Free HVAC Checklist Is Here!</h1>
          <p style="margin: 8px 0 0; opacity: 0.8;">Go Pro Heating &amp; Cooling</p>
        </div>
        <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
          <p>Hi ${data.name},</p>
          <p>Thanks for downloading the <strong>Ultimate NJ Homeowner HVAC Maintenance Checklist</strong>!</p>
          <p>This checklist will help you:</p>
          <ul>
            <li>Know exactly what to inspect each season</li>
            <li>Catch small problems before they become expensive repairs</li>
            <li>Keep your system running at peak efficiency</li>
            <li>Save hundreds of dollars on energy and repair costs</li>
          </ul>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/hvac-maintenance-checklist.pdf"
               style="background: #F97316; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Download Your Checklist →
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
          <p style="font-size: 14px; color: #64748b;">
            Need HVAC service? We're here to help! Call <strong>(973) 938-2217</strong> or visit our website.<br>
            Go Pro Heating &amp; Cooling | 23 Major Street, Clifton, NJ 07013 | License #19HC00212300
          </p>
        </div>
      </div>
    `,
  })
}
