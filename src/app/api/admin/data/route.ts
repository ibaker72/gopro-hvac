import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { isAdminAuthed } from '@/lib/adminAuth'

const LIMIT = 20

export async function GET(request: NextRequest) {
  if (!isAdminAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const table = searchParams.get('table') ?? 'estimates'
  const search = searchParams.get('search')?.trim() ?? ''
  const status = searchParams.get('status') ?? 'all'
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const offset = (page - 1) * LIMIT

  const supabase = createServerSupabaseClient()

  // Stats endpoint
  if (table === 'stats') {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const [
      { count: totalEstimates },
      { count: totalLeads },
      { count: weeklyEstimates },
      { count: weeklyLeads },
    ] = await Promise.all([
      supabase.from('estimates').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('estimates').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    ])
    return NextResponse.json({ totalEstimates, totalLeads, weeklyEstimates, weeklyLeads })
  }

  // Webhook logs endpoint
  if (table === 'webhooks') {
    const direction = searchParams.get('direction') ?? 'all'
    let query = supabase
      .from('webhook_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + LIMIT - 1)

    if (direction !== 'all') query = query.eq('direction', direction)

    const { data, count, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data, count, pages: Math.ceil((count ?? 0) / LIMIT) })
  }

  // Estimates or leads
  const validTables = ['estimates', 'leads']
  if (!validTables.includes(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
  }

  let query = supabase
    .from(table)
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + LIMIT - 1)

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,city.ilike.%${search}%`)
  }
  if (status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, count, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, count, pages: Math.ceil((count ?? 0) / LIMIT) })
}
