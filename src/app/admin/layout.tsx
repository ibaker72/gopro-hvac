export const metadata = { title: 'Admin | Go Pro HVAC', robots: { index: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-section">{children}</div>
}
