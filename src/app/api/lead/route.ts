import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase'
import { sendChecklistWelcome } from '@/lib/resend'
import { fireOpenClawWebhook } from '@/lib/webhook'

const LeadSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(20).optional(),
  source: z.enum(['contact', 'checklist', 'checklist-homepage', 'estimate', 'location']),
  city: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Silent honeypot rejection
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    const parsed = LeadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const { name, email, phone, source, city, notes } = parsed.data

    // Save to Supabase
    const supabase = createServerSupabaseClient()
    const { error: dbError } = await supabase.from('leads').insert({
      name,
      email,
      phone: phone || null,
      source,
      city: city || null,
      notes: notes || null,
      status: 'new',
    })

    if (dbError) {
      console.error('[Lead API] DB error:', dbError)
    }

    // Send welcome email (for checklist source)
    if (source.includes('checklist')) {
      await sendChecklistWelcome({ name, email }).catch((err) => {
        console.error('[Lead API] Email error:', err)
      })
    }

    // Fire OpenClaw webhook (async, never blocks)
    void fireOpenClawWebhook({
      name,
      email,
      phone: phone || undefined,
      source,
      city: city || undefined,
      notes: notes || undefined,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Lead API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
