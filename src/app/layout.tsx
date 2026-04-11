import type { Metadata } from 'next'
import './globals.css'
import StickyCallBar from '@/components/StickyCallBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { COMPANY } from '@/lib/constants'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | Clifton NJ HVAC | ${COMPANY.phone}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: `Go Pro Heating & Cooling — NJ's trusted HVAC team. AC repair, furnace installation, duct cleaning & 24/7 emergency service in Clifton, Paterson, Wayne & all of Northern NJ. Call ${COMPANY.phone}.`,
  keywords: [
    'HVAC Clifton NJ', 'AC repair NJ', 'furnace installation NJ', 'heating repair NJ',
    'air conditioning repair Clifton', 'HVAC contractor New Jersey', '24/7 emergency HVAC NJ',
    'duct cleaning NJ', 'mini split installation NJ', 'heat pump NJ',
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Clifton NJ HVAC`,
    description: `NJ's trusted HVAC team. AC repair, furnace installation & 24/7 emergency service. Call ${COMPANY.phone}.`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Go Pro Heating & Cooling — Clifton NJ HVAC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} | Clifton NJ HVAC`,
    description: `NJ's trusted HVAC team. AC repair, furnace installation & 24/7 emergency service.`,
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: siteUrl },
  other: {
    'geo.region': 'US-NJ',
    'geo.placename': 'Clifton, NJ',
    'geo.position': `${COMPANY.lat};${COMPANY.lng}`,
    'ICBM': `${COMPANY.lat}, ${COMPANY.lng}`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-slate-900">
        <LocalBusinessSchema />
        <GoogleAnalytics />
        <StickyCallBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
