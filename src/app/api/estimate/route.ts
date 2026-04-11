import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { sendEstimateNotification, sendEstimateConfirmation } from '@/lib/resend'
import { fireOpenClawWebhook } from '@/lib/webhook'
import { calculateEstimate } from '@/lib/pricing'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, city, serviceType, homeSize, systemAge, urgency, notes } = body

    // Validate required fields
    if (!name || !email || !phone || !city || !serviceType || !homeSize || !systemAge || !urgency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

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
      // Don't block response — still send emails
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
