import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase'
import { isAdminAuthed } from '@/lib/adminAuth'

const VALID_STATUSES = ['new', 'contacted', 'booked', 'closed'] as const

const StatusSchema = z.object({
  table: z.enum(['estimates', 'leads']),
  id: z.string().uuid(),
  status: z.enum(VALID_STATUSES),
})

export async function PATCH(request: NextRequest) {
  if (!isAdminAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = StatusSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { table, id, status } = parsed.data
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from(table).update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
