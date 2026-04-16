import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin } from 'lucide-react'
import HeroMedia from '@/components/HeroMedia'
import ProjectImage from '@/components/ProjectImage'
import { COMPANY } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export const metadata: Metadata = {
  title: `Our Work & Projects | Go Pro Heating & Cooling | ${COMPANY.phone}`,
  description:
    'Browse real HVAC installation and repair projects completed by Go Pro Heating & Cooling across Northern NJ — boiler installs, furnace replacements, hydronic systems & more.',
  alternates: { canonical: '/projects' },
}

/*
  ─────────────────────────────────────────────────────────────────
  TO ADD YOUR REAL PROJECT PHOTOS:
    Place JPG files in public/images/projects/
      project-1.jpg  →  Boiler + copper pipe install
      project-2.jpg  →  Hydronic manifold pumps
      project-3.jpg  →  High-efficiency furnace
      project-4.jpg  →  Expansion tank + copper manifold
    Recommended: 800×600px minimum, JPG format
  ─────────────────────────────────────────────────────────────────
*/
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
        imageUrl="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
        imageAlt="Go Pro HVAC technicians working on a job in Northern NJ"
        overlayOpacity={65}
        gradientClass="bg-gradient-to-br from-brand-blue to-blue-900"
        className="py-20 px-4 min-h-[380px]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange border border-brand-orange/40 px-4 py-2 rounded-full text-sm font-bold mb-5">
            Real Work · Real Results
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Work &amp; Projects</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Real HVAC installations and repairs across Northern New Jersey — every job done right the first time.
          </p>
        </div>
      </HeroMedia>

      {/* Projects Grid */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title">Recent Projects</h2>
            <p className="section-subtitle mx-auto">
              A selection of HVAC installations and service work completed by our licensed technicians.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-7">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image slot */}
                <div className="relative h-64 bg-gradient-to-br from-brand-blue to-blue-900 overflow-hidden">
                  <ProjectImage src={project.image} alt={project.title} />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-3 py-1 rounded-full border border-brand-orange/20">
                      {project.tag}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <MapPin size={11} />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="font-bold text-brand-dark text-xl mb-2">{project.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-12">
            More projects added regularly as we complete jobs across Northern NJ.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-orange py-14 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-3">Ready to Start Your Project?</h2>
          <p className="text-orange-100 text-lg mb-8">
            Licensed NJ HVAC contractor serving Clifton, Paterson, Wayne, Hackensack &amp; all of Northern NJ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center gap-3 bg-white text-brand-orange font-black text-xl px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors shadow-lg"
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
