import type { NextRequest } from 'next/server'

export function isAdminAuthed(request: NextRequest): boolean {
  const token = request.cookies.get('admin_auth')?.value
  return !!process.env.ADMIN_SECRET_KEY && token === process.env.ADMIN_SECRET_KEY
}
