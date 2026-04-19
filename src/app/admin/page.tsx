import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Dashboard from './Dashboard'

export default function AdminPage() {
  const token = cookies().get('admin_auth')?.value
  if (!process.env.ADMIN_SECRET_KEY || token !== process.env.ADMIN_SECRET_KEY) {
    redirect('/admin/login')
  }

  return <Dashboard />
}
