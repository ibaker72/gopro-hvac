import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'
import HeroMedia from '@/components/HeroMedia'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  title: `Our Work & Projects | Go Pro Heating & Cooling | ${COMPANY.phone}`,
  description:
    'Browse real HVAC installation and repair projects completed by Go Pro Heating & Cooling across Northern NJ — boiler installs, furnace replacements, hydronic systems & more.',
  alternates: { canonical: '/projects' },
}

const projects = [
  {
    image: '/images/projects/project-1.jpg',
    title: 'Boiler System Installation',
    desc: 'Full boiler replacement with new copper piping, zone valves, and pressure relief system.',
    location: 'Clifton, NJ',
    tag: 'Heating',
  },
  {
    image: '/images/projects/project-2.jpg',
    title: 'Hydronic Heating Manifold',
    desc: 'Multi-zone hydronic system with Taco pump manifold and full copper distribution piping.',
    location: 'Paterson, NJ',
    tag: 'Heating',
  },
  {
    image: '/images/projects/project-3.jpg',
    title: 'High-Efficiency Furnace Install',
    desc: 'New high-efficiency gas furnace with full ductwork connection, flue reroute, and thermostat upgrade.',
    location: 'Wayne, NJ',
    tag: 'Heating',
  },
  {
    image: '/images/projects/project-4.jpg',
    title: 'Expansion Tank & Copper Manifold',
    desc: 'Expansion tank replacement and full copper manifold rebuild for a radiant heating system.',
    location: 'Hackensack, NJ',
    tag: 'Heating',
  },
]

export default function ProjectsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Projects', url: `${siteUrl}/projects` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <HeroMedia
        mode="image"
        imageUrl="/images/heroes/homepage-hero.jpg"
        imageAlt="Go Pro HVAC technician working on a job in Northern NJ"
        overlayOpacity={65}
        gradientClass="bg-gradient-to-br from-brand-blue to-blue-900"
        className="py-14 px-4 min-h-[320px]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Work &amp; Projects</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Real installations and repairs across Northern New Jersey — every job done right the first time.
          </p>
        </div>
      </HeroMedia>

      {/* Projects Grid */}
      <section className="bg-brand-light py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-subtitle mx-auto">
              A selection of HVAC installations and service work completed by our licensed technicians.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 card-hover"
              >
                {/* Image slot — replace .jpg files in public/images/projects/ */}
                <div className="relative h-64 bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {/* Fallback label shown if image file is missing */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-400 text-sm font-medium select-none pointer-events-none opacity-0 [img+&]:opacity-100">
                    Image coming soon
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-2.5 py-1 rounded-full">
                      {project.tag}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <MapPin size={11} />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="font-bold text-brand-dark text-lg mb-1">{project.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-10">
            More projects added regularly. Call us to discuss your project.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-12 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black mb-3">Ready to Start Your Project?</h2>
          <p className="text-orange-100 mb-6">
            Licensed NJ HVAC contractor serving Clifton, Paterson, Wayne, Hackensack &amp; all of Northern NJ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors"
            >
              <Phone size={22} />
              {COMPANY.phone}
            </a>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center bg-brand-blue text-white font-bold text-xl px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
