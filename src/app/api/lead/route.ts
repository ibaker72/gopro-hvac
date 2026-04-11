import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { sendChecklistWelcome } from '@/lib/resend'
import { fireOpenClawWebhook } from '@/lib/webhook'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, source, city, notes } = body

    // Validate required fields
    if (!name || !email || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

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
