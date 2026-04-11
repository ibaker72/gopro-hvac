import type { WebhookPayload } from '@/types'
import { createServerSupabaseClient } from './supabase'

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fireOpenClawWebhook(payload: WebhookPayload): Promise<void> {
  const webhookUrl = process.env.OPENCLAW_WEBHOOK_URL
  const apiKey = process.env.OPENCLAW_API_KEY

  if (!webhookUrl) {
    console.warn('[OpenClaw] OPENCLAW_WEBHOOK_URL not set, skipping webhook')
    return
  }

  const fullPayload = { ...payload, timestamp: new Date().toISOString() }
  const maxAttempts = 3
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey ?? ''}`,
        },
        body: JSON.stringify(fullPayload),
      })

      if (response.ok) {
        // Log success
        await logWebhook({
          direction: 'outgoing',
          endpoint: webhookUrl,
          payload: fullPayload,
          status: 'success',
          attempts: attempt,
        })
        return
      }

      lastError = new Error(`HTTP ${response.status}: ${await response.text()}`)
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
    }

    // Exponential backoff: 1s, 2s, 4s
    if (attempt < maxAttempts) {
      await sleep(1000 * Math.pow(2, attempt - 1))
    }
  }

  // Log failure
  await logWebhook({
    direction: 'outgoing',
    endpoint: webhookUrl,
    payload: fullPayload,
    status: 'failed',
    attempts: maxAttempts,
  })

  console.error('[OpenClaw] Webhook failed after', maxAttempts, 'attempts:', lastError?.message)
}

async function logWebhook(data: {
  direction: string
  endpoint: string
  payload: Record<string, unknown>
  status: string
  attempts: number
}) {
  try {
    const supabase = createServerSupabaseClient()
    await supabase.from('webhook_logs').insert(data)
  } catch (err) {
    console.error('[OpenClaw] Failed to log webhook:', err)
  }
}
