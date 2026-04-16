'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const navLinks = [
  {
    label: 'Services',
    href: '/services/ac-repair',
    children: [
      { label: 'AC Repair', href: '/services/ac-repair' },
      { label: 'AC Installation', href: '/services/ac-installation' },
      { label: 'Heating Repair', href: '/services/heating-repair' },
      { label: 'Furnace Installation', href: '/services/furnace-installation' },
      { label: 'Heat Pump', href: '/services/heat-pump' },
      { label: 'Mini-Split', href: '/services/ductless-mini-split' },
      { label: 'Duct Cleaning', href: '/services/duct-cleaning' },
      { label: 'HVAC Tune-Up', href: '/services/hvac-tune-up' },
      { label: '24/7 Emergency', href: '/services/emergency-hvac' },
      { label: 'Commercial', href: '/services/commercial-hvac' },
    ],
  },
  { label: 'Locations', href: '/locations/clifton' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[44px] z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-brand-blue text-white font-black text-lg px-3 py-1.5 rounded">
              GO PRO
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-brand-dark text-sm leading-tight">Heating &amp; Cooling</div>
              <div className="text-xs text-slate-500">Clifton, NJ — Lic. {COMPANY.license}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue rounded-md hover:bg-slate-50 transition-colors"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  <div
                    className={`absolute top-full left-0 w-52 bg-white border border-slate-200 rounded-lg shadow-xl py-2 transition-all duration-150 ${servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-blue hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue rounded-md hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={COMPANY.phoneTel}
              className="flex items-center gap-2 text-brand-blue font-bold text-sm hover:text-brand-orange transition-colors"
            >
              <Phone size={16} />
              {COMPANY.phone}
            </a>
            <Link
              href="/estimate"
              className="bg-brand-orange text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <a href={COMPANY.phoneTel} className="text-brand-orange" aria-label="Call Now">
              <Phone size={22} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 py-3 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-2 text-sm text-slate-700 hover:text-brand-blue"
                      onClick={() => setIsOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-blue"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-slate-100 px-3">
              <Link
                href="/estimate"
                className="block w-full text-center bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600"
                onClick={() => setIsOpen(false)}
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
