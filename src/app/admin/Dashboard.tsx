'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Search, Download, ChevronLeft, ChevronRight, TrendingUp, Users, FileText, Activity, LogOut, RefreshCw } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'estimates' | 'leads' | 'webhooks'

interface Stats {
  totalEstimates: number
  totalLeads: number
  weeklyEstimates: number
  weeklyLeads: number
}

interface Estimate {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  city: string
  service_type: string
  home_size: string
  system_age: string
  urgency: string
  estimated_min: number
  estimated_max: number
  notes: string | null
  status: string
}

interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  source: string
  city: string | null
  notes: string | null
  status: string
}

interface WebhookLog {
  id: string
  created_at: string
  direction: string
  endpoint: string
  payload: Record<string, unknown>
  status: string
  attempts: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = ['new', 'contacted', 'booked', 'closed'] as const
type Status = typeof STATUS_OPTIONS[number]

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-amber-100 text-amber-700 border-amber-200',
  booked: 'bg-green-100 text-green-700 border-green-200',
  closed: 'bg-slate-100 text-slate-500 border-slate-200',
}

const WEBHOOK_STATUS_COLORS: Record<string, string> = {
  success: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function fmtPrice(min: number | null, max: number | null) {
  if (!min || !max) return '—'
  return `$${min.toLocaleString()}–$${max.toLocaleString()}`
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[status] ?? 'bg-slate-100 text-slate-500 border-slate-200'}`}>
      {status}
    </span>
  )
}

function StatusSelect({
  id, table, current, onChange,
}: {
  id: string
  table: 'estimates' | 'leads'
  current: string
  onChange: (id: string, status: string) => void
}) {
  const [busy, setBusy] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value
    setBusy(true)
    await fetch('/api/admin/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, id, status: next }),
    })
    onChange(id, next)
    setBusy(false)
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={busy}
      className={`text-xs font-semibold rounded-full px-2 py-1 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] disabled:opacity-50 ${STATUS_COLORS[current] ?? 'bg-slate-100 text-slate-500 border-slate-200'}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-4 border-[#1B3A6B] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <FileText className="w-10 h-10 mb-3 opacity-40" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

// ─── CSV Export ───────────────────────────────────────────────────────────────

function exportCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return
  const headers = Object.keys(data[0])
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = String(row[h] ?? '')
      return val.includes(',') || val.includes('"') || val.includes('\n')
        ? `"${val.replace(/"/g, '""')}"`
        : val
    }).join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Estimates Tab ────────────────────────────────────────────────────────────

function EstimatesTab({
  data, loading, onStatusChange,
}: {
  data: Estimate[]
  loading: boolean
  onStatusChange: (id: string, status: string) => void
}) {
  if (loading) return <Spinner />
  if (!data.length) return <EmptyState message="No estimates match your filters." />

  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {data.map((e) => (
          <div key={e.id} className="p-4 bg-white hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-semibold text-slate-900">{e.name}</p>
                <p className="text-sm text-slate-500">{e.service_type} · {e.city}</p>
              </div>
              <StatusSelect id={e.id} table="estimates" current={e.status} onChange={onStatusChange} />
            </div>
            <div className="space-y-1 text-sm text-slate-600">
              <p>
                <a href={`mailto:${e.email}`} className="text-[#1B3A6B] hover:underline">{e.email}</a>
              </p>
              <p>
                <a href={`tel:${e.phone}`} className="hover:underline">{e.phone}</a>
              </p>
              <p className="font-semibold text-[#1B3A6B]">{fmtPrice(e.estimated_min, e.estimated_max)} <span className="font-normal text-slate-500">· {e.urgency}</span></p>
              <p className="text-slate-400 text-xs">{e.home_size} · {e.system_age}</p>
              {e.notes && <p className="text-slate-500 text-xs italic line-clamp-2">{e.notes}</p>}
            </div>
            <p className="text-xs text-slate-400 mt-2">{fmtDate(e.created_at)}</p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Date', 'Name', 'Contact', 'City', 'Service', 'Details', 'Estimate', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{fmtDate(e.created_at)}</td>
                <td className="px-4 py-3 font-medium whitespace-nowrap">{e.name}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${e.email}`} className="block text-[#1B3A6B] hover:underline text-xs">{e.email}</a>
                  <a href={`tel:${e.phone}`} className="block text-slate-500 hover:underline text-xs">{e.phone}</a>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-700">{e.city}</td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-700">{e.service_type}</td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  <span className="block">{e.home_size}</span>
                  <span className="block">{e.system_age}</span>
                  <span className="block">{e.urgency}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-[#1B3A6B] whitespace-nowrap">{fmtPrice(e.estimated_min, e.estimated_max)}</td>
                <td className="px-4 py-3">
                  <StatusSelect id={e.id} table="estimates" current={e.status} onChange={onStatusChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ─── Leads Tab ────────────────────────────────────────────────────────────────

function LeadsTab({
  data, loading, onStatusChange,
}: {
  data: Lead[]
  loading: boolean
  onStatusChange: (id: string, status: string) => void
}) {
  if (loading) return <Spinner />
  if (!data.length) return <EmptyState message="No leads match your filters." />

  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {data.map((l) => (
          <div key={l.id} className="p-4 bg-white hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-semibold text-slate-900">{l.name}</p>
                <p className="text-sm text-slate-500">
                  <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs mr-1">{l.source}</span>
                  {l.city ?? ''}
                </p>
              </div>
              <StatusSelect id={l.id} table="leads" current={l.status} onChange={onStatusChange} />
            </div>
            <div className="space-y-1 text-sm">
              <p><a href={`mailto:${l.email}`} className="text-[#1B3A6B] hover:underline">{l.email}</a></p>
              {l.phone && <p><a href={`tel:${l.phone}`} className="text-slate-600 hover:underline">{l.phone}</a></p>}
              {l.notes && <p className="text-slate-500 text-xs italic line-clamp-2">{l.notes}</p>}
            </div>
            <p className="text-xs text-slate-400 mt-2">{fmtDate(l.created_at)}</p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Date', 'Name', 'Contact', 'Source', 'City', 'Notes', 'Status'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{fmtDate(l.created_at)}</td>
                <td className="px-4 py-3 font-medium whitespace-nowrap">{l.name}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${l.email}`} className="block text-[#1B3A6B] hover:underline text-xs">{l.email}</a>
                  {l.phone && <a href={`tel:${l.phone}`} className="block text-slate-500 hover:underline text-xs">{l.phone}</a>}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">{l.source}</span>
                </td>
                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{l.city ?? '—'}</td>
                <td className="px-4 py-3 text-slate-500 text-xs max-w-[180px] truncate">{l.notes ?? '—'}</td>
                <td className="px-4 py-3">
                  <StatusSelect id={l.id} table="leads" current={l.status} onChange={onStatusChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ─── Webhooks Tab ─────────────────────────────────────────────────────────────

function WebhooksTab({ data, loading }: { data: WebhookLog[]; loading: boolean }) {
  if (loading) return <Spinner />
  if (!data.length) return <EmptyState message="No webhook logs found." />

  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {data.map((w) => (
          <div key={w.id} className="p-4 bg-white hover:bg-slate-50">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${WEBHOOK_STATUS_COLORS[w.status] ?? 'bg-slate-100 text-slate-600'}`}>{w.status}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${w.direction === 'outgoing' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{w.direction}</span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-1">{w.endpoint}</p>
            <p className="text-xs text-slate-400 mt-1">{fmtDate(w.created_at)} · {w.attempts} attempt{w.attempts !== 1 ? 's' : ''}</p>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Date', 'Direction', 'Endpoint', 'Status', 'Attempts'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{fmtDate(w.created_at)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${w.direction === 'outgoing' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{w.direction}</span>
                </td>
                <td className="px-4 py-3 text-slate-600 text-xs max-w-[280px] truncate">{w.endpoint}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${WEBHOOK_STATUS_COLORS[w.status] ?? 'bg-slate-100 text-slate-600'}`}>{w.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-600">{w.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('estimates')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [stats, setStats] = useState<Stats | null>(null)
  const [data, setData] = useState<(Estimate | Lead | WebhookLog)[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [search])

  // Reset page on tab/filter change
  useEffect(() => { setPage(1) }, [activeTab, statusFilter])

  // Fetch stats once + on refresh
  useEffect(() => {
    setStatsLoading(true)
    fetch('/api/admin/data?table=stats')
      .then((r) => r.json())
      .then((d) => { setStats(d); setStatsLoading(false) })
      .catch(() => setStatsLoading(false))
  }, [refreshKey])

  // Fetch tab data
  const fetchData = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      table: activeTab === 'webhooks' ? 'webhooks' : activeTab,
      page: String(page),
    })
    if (activeTab !== 'webhooks') {
      if (debouncedSearch) params.set('search', debouncedSearch)
      if (statusFilter !== 'all') params.set('status', statusFilter)
    }
    const res = await fetch(`/api/admin/data?${params}`)
    const json = await res.json()
    setData(json.data ?? [])
    setTotalPages(json.pages ?? 1)
    setTotalCount(json.count ?? 0)
    setLoading(false)
  }, [activeTab, debouncedSearch, statusFilter, page, refreshKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchData() }, [fetchData])

  function handleStatusChange(id: string, status: string) {
    setData((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  function handleExport() {
    const filename = `gopro-${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`
    exportCSV(data as unknown as Record<string, unknown>[], filename)
  }

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'estimates', label: 'Estimates', icon: <FileText className="w-4 h-4" /> },
    { key: 'leads', label: 'Leads', icon: <Users className="w-4 h-4" /> },
    { key: 'webhooks', label: 'Webhooks', icon: <Activity className="w-4 h-4" /> },
  ]

  const statCards = [
    { label: 'Total Estimates', value: stats?.totalEstimates ?? 0, sub: `${stats?.weeklyEstimates ?? 0} this week`, icon: <FileText className="w-5 h-5" />, accent: false },
    { label: 'Total Leads', value: stats?.totalLeads ?? 0, sub: `${stats?.weeklyLeads ?? 0} this week`, icon: <Users className="w-5 h-5" />, accent: false },
    { label: 'Estimates / Week', value: stats?.weeklyEstimates ?? 0, sub: 'last 7 days', icon: <TrendingUp className="w-5 h-5" />, accent: true },
    { label: 'Leads / Week', value: stats?.weeklyLeads ?? 0, sub: 'last 7 days', icon: <TrendingUp className="w-5 h-5" />, accent: true },
  ]

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Header */}
      <header className="bg-[#1B3A6B] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center font-bold text-lg">G</div>
            <div className="min-w-0">
              <h1 className="font-bold text-base sm:text-lg leading-tight truncate">Go Pro HVAC</h1>
              <p className="text-blue-200 text-xs hidden sm:block">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRefreshKey((k) => k + 1)}
              title="Refresh"
              className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className={`rounded-xl p-4 shadow-sm flex items-start gap-3 ${s.accent ? 'bg-[#1B3A6B] text-white' : 'bg-white'}`}>
              <div className={`flex-shrink-0 p-2 rounded-lg ${s.accent ? 'bg-white/15' : 'bg-[#1B3A6B]/10 text-[#1B3A6B]'}`}>
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-medium truncate ${s.accent ? 'text-blue-200' : 'text-slate-500'}`}>{s.label}</p>
                <p className={`text-2xl font-bold leading-none mt-0.5 ${statsLoading ? 'opacity-30' : ''}`}>{s.value}</p>
                <p className={`text-xs mt-0.5 ${s.accent ? 'text-blue-200' : 'text-slate-400'}`}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          {/* Tab bar */}
          <div className="border-b border-slate-200 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t.key
                    ? 'border-[#1B3A6B] text-[#1B3A6B]'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.icon}
                {t.label}
                {activeTab === t.key && !loading && (
                  <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs bg-[#1B3A6B] text-white leading-none">
                    {totalCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          {activeTab !== 'webhooks' && (
            <div className="px-4 sm:px-6 py-3 border-b border-slate-100 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search name, email or city…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] bg-slate-50"
                />
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]"
                >
                  <option value="all">All statuses</option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <button
                  onClick={handleExport}
                  disabled={loading || !data.length}
                  title="Export CSV"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">CSV</span>
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="min-h-[200px]">
            {activeTab === 'estimates' && (
              <EstimatesTab data={data as Estimate[]} loading={loading} onStatusChange={handleStatusChange} />
            )}
            {activeTab === 'leads' && (
              <LeadsTab data={data as Lead[]} loading={loading} onStatusChange={handleStatusChange} />
            )}
            {activeTab === 'webhooks' && (
              <WebhooksTab data={data as WebhookLog[]} loading={loading} />
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="px-4 sm:px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Page {page} of {totalPages} · {totalCount} total
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
