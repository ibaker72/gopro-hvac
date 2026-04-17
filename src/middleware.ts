import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 5

const ipRequestMap = new Map<string, { count: number; resetAt: number }>()

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const entry = ipRequestMap.get(ip)

  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
  } else if (entry.count >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a moment.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  } else {
    entry.count++
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/lead', '/api/estimate'],
}
