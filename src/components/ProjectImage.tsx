'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Wrench } from 'lucide-react'

interface ProjectImageProps {
  src: string
  alt: string
  sizes?: string
}

export default function ProjectImage({ src, alt, sizes = '(max-width: 640px) 100vw, 50vw' }: ProjectImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-blue-900 flex flex-col items-center justify-center gap-3">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
          <Wrench size={28} className="text-white/40" />
        </div>
        <p className="text-white/40 text-xs font-medium tracking-widest uppercase">Photo Coming Soon</p>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  )
}
