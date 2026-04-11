import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Verify auth header
    const authHeader = request.headers.get('Authorization')
    const expectedKey = process.env.OPENCLAW_API_KEY

    if (expectedKey && authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await request.json()
    const eventType = payload.event_type || payload.type || 'unknown'

    const supabase = createServerSupabaseClient()

    // Store in automation_events
    await supabase.from('automation_events').insert({
      event_type: eventType,
      payload,
      source: 'openclaw',
    })

    // Log incoming webhook
    await supabase.from('webhook_logs').insert({
      direction: 'incoming',
      endpoint: '/api/openclaw-webhook',
      payload,
      status: 'received',
      attempts: 1,
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[OpenClaw Webhook] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
