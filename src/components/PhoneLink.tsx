'use client'

import { GA } from '@/lib/analytics'

interface PhoneLinkProps {
  location: string
  className?: string
  children: React.ReactNode
}

export default function PhoneLink({ location, className, children }: PhoneLinkProps) {
  return (
    <a
      href="tel:9739382217"
      onClick={() => GA.phoneClick(location)}
      className={className}
    >
      {children}
    </a>
  )
}
