import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase'
import { sendEstimateNotification, sendEstimateConfirmation } from '@/lib/resend'
import { fireOpenClawWebhook } from '@/lib/webhook'
import { calculateEstimate } from '@/lib/pricing'

const EstimateSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(20),
  city: z.string().min(1).max(100),
  serviceType: z.string().min(1).max(100),
  homeSize: z.string().min(1).max(100),
  systemAge: z.string().min(1).max(100),
  urgency: z.enum(['Emergency (today)', 'This week', 'Flexible']),
  notes: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Silent honeypot rejection
    if (body.website) {
      return NextResponse.json({ success: true, estimatedMin: 0, estimatedMax: 0 })
    }

    const parsed = EstimateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const { name, email, phone, city, serviceType, homeSize, systemAge, urgency, notes } = parsed.data

    // Calculate estimate
    const { estimatedMin, estimatedMax } = calculateEstimate(serviceType, homeSize, systemAge, urgency)

    // Save to Supabase
    const supabase = createServerSupabaseClient()
    const { error: dbError } = await supabase.from('estimates').insert({
      name,
      email,
      phone,
      city,
      service_type: serviceType,
      home_size: homeSize,
      system_age: systemAge,
      urgency,
      estimated_min: estimatedMin,
      estimated_max: estimatedMax,
      notes: notes || null,
      status: 'new',
    })

    if (dbError) {
      console.error('[Estimate API] DB error:', dbError)
    }

    // Send emails (parallel, don't block on errors)
    const emailData = { name, email, phone, city, serviceType, homeSize, systemAge, urgency, estimatedMin, estimatedMax, notes }
    await Promise.allSettled([
      sendEstimateNotification(emailData),
      sendEstimateConfirmation({ name, email, serviceType, estimatedMin, estimatedMax }),
    ])

    // Fire OpenClaw webhook (async, never blocks)
    void fireOpenClawWebhook({
      type: 'estimate',
      name,
      email,
      phone,
      city,
      serviceType,
      homeSize,
      systemAge,
      urgency,
      estimatedMin,
      estimatedMax,
      notes,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, estimatedMin, estimatedMax })
  } catch (error) {
    console.error('[Estimate API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
