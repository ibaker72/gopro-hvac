import Image from 'next/image'

type HeroMediaMode = 'gradient' | 'image' | 'video'

interface HeroMediaProps {
  mode: HeroMediaMode
  /** Unsplash or Pexels static image URL */
  imageUrl?: string
  imageAlt?: string
  /** Set true only for the above-the-fold hero (homepage). All others should be false. */
  imagePriority?: boolean
  /** Direct .mp4 URL (e.g. from Pexels) */
  videoUrl?: string
  /** Poster frame shown before video loads and as fallback on reduced-motion */
  videoPosterUrl?: string
  /** Black overlay opacity 0–100. Default 60. Ensures WCAG AA contrast on white text. */
  overlayOpacity?: number
  /** Tailwind gradient fallback used in gradient mode and as the section background colour. */
  gradientClass?: string
  /** Additional Tailwind classes on the section (min-h, py, px, etc.) */
  className?: string
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
  children,
}: HeroMediaProps) {
  const overlayStyle = { opacity: overlayOpacity / 100 }

  return (
    <section className={`relative overflow-hidden text-white ${gradientClass} ${className}`}>
      {/* ── Background layer ─────────────────────────────────────────── */}
      {mode === 'image' && imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority={imagePriority}
          sizes="100vw"
        />
      )}

      {mode === 'video' && (
        <>
          {/* Poster image behind the video — visible on reduced-motion or while video loads */}
          {videoPosterUrl && (
            <Image
              src={videoPosterUrl}
              alt={imageAlt}
              fill
              className="object-cover object-center"
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

      {/* ── Overlays (image & video modes only) ──────────────────────── */}
      {mode !== 'gradient' && (
        <>
          {/* Dark overlay — guarantees WCAG AA contrast for white text */}
          <div
            className="absolute inset-0 bg-black"
            style={overlayStyle}
            aria-hidden="true"
          />
          {/* Brand-blue tint — ties the photo to site colour identity */}
          <div
            className="absolute inset-0 bg-brand-blue/20"
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Foreground content ────────────────────────────────────────── */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
