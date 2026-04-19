import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import AdminLogoutButton from './LogoutButton'

function isAuthed(): boolean {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_auth')?.value
  return !!process.env.ADMIN_SECRET_KEY && token === process.env.ADMIN_SECRET_KEY
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function formatPrice(min: number | null, max: number | null) {
  if (!min || !max) return '—'
  return `$${min.toLocaleString()}–$${max.toLocaleString()}`
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    booked: 'bg-green-100 text-green-700',
    closed: 'bg-slate-100 text-slate-600',
  }
  return colors[status] ?? 'bg-slate-100 text-slate-600'
}

export default async function AdminPage() {
  if (!isAuthed()) redirect('/admin/login')

  const supabase = createServerSupabaseClient()

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { data: estimates },
    { data: leads },
    { count: weeklyEstimates },
    { count: weeklyLeads },
    { count: totalEstimates },
    { count: totalLeads },
  ] = await Promise.all([
    supabase.from('estimates').select('*').order('created_at', { ascending: false }).limit(25),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(25),
    supabase.from('estimates').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    supabase.from('estimates').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Total Estimates', value: totalEstimates ?? 0, color: 'text-[#1B3A6B]' },
    { label: 'Total Leads', value: totalLeads ?? 0, color: 'text-[#1B3A6B]' },
    { label: 'Estimates This Week', value: weeklyEstimates ?? 0, color: 'text-[#F97316]' },
    { label: 'Leads This Week', value: weeklyLeads ?? 0, color: 'text-[#F97316]' },
  ]

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-[#1B3A6B] text-white px-6 py-4 flex items-center justify-between shadow">
        <div>
          <h1 className="text-lg font-bold">Go Pro HVAC — Admin</h1>
          <p className="text-blue-200 text-xs mt-0.5">Internal dashboard · not indexed</p>
        </div>
        <AdminLogoutButton />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Estimates table */}
        <section>
          <h2 className="text-base font-semibold text-slate-700 mb-3">Recent Estimates</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Date', 'Name', 'Email', 'Phone', 'City', 'Service', 'Size', 'Urgency', 'Estimate', 'Status'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {estimates && estimates.length > 0 ? estimates.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(e.created_at)}</td>
                      <td className="px-4 py-3 font-medium whitespace-nowrap">{e.name}</td>
                      <td className="px-4 py-3 text-slate-600">{e.email}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{e.phone}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{e.city}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{e.service_type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">{e.home_size}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">{e.urgency}</td>
                      <td className="px-4 py-3 font-semibold text-[#1B3A6B] whitespace-nowrap">{formatPrice(e.estimated_min, e.estimated_max)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(e.status)}`}>{e.status}</span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={10} className="px-4 py-8 text-center text-slate-400">No estimates yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Leads table */}
        <section>
          <h2 className="text-base font-semibold text-slate-700 mb-3">Recent Leads</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Date', 'Name', 'Email', 'Phone', 'Source', 'City', 'Status'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads && leads.length > 0 ? leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(l.created_at)}</td>
                      <td className="px-4 py-3 font-medium whitespace-nowrap">{l.name}</td>
                      <td className="px-4 py-3 text-slate-600">{l.email}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{l.phone ?? '—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{l.source}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{l.city ?? '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(l.status)}`}>{l.status}</span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No leads yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
