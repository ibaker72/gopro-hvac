import Image from 'next/image'

type HeroMediaMode = 'gradient' | 'image' | 'video'

interface HeroMediaProps {
  mode: HeroMediaMode
  imageUrl?: string
  imageAlt?: string
  imagePriority?: boolean
  videoUrl?: string
  videoPosterUrl?: string
  overlayOpacity?: number
  gradientClass?: string
  className?: string
  /** CSS object-position value: 'center' | 'top' | 'bottom' | '50% 20%' etc. */
  objectPosition?: string
  children: React.ReactNode
}

export default function HeroMedia({
  mode,
  imageUrl,
  imageAlt = '',
  imagePriority = false,
  videoUrl,
  videoPosterUrl,
  overlayOpacity = 60,
  gradientClass = 'bg-gradient-to-br from-brand-blue via-blue-800 to-brand-dark',
  className = '',
  objectPosition = 'center',
  children,
}: HeroMediaProps) {
  return (
    <section className={`relative overflow-hidden text-white ${gradientClass} ${className}`}>
      {/* ── Background layer ──────────────────────────────────────── */}
      {mode === 'image' && imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          style={{ objectPosition }}
          priority={imagePriority}
          sizes="100vw"
        />
      )}

      {mode === 'video' && (
        <>
          {videoPosterUrl && (
            <Image
              src={videoPosterUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              style={{ objectPosition }}
              priority={imagePriority}
              sizes="100vw"
            />
          )}
          {videoUrl && (
            <video
              src={videoUrl}
              poster={videoPosterUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover hero-video"
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* ── Overlays ──────────────────────────────────────────────── */}
      {mode !== 'gradient' && (
        <>
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-brand-blue/15" aria-hidden="true" />
        </>
      )}

      {/* ── Foreground ────────────────────────────────────────────── */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
