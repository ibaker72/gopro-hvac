import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import type { Project } from '@/lib/projects'

interface Props {
  projects: Project[]
  cityName: string
  isCitySpecific: boolean
}

export default function RecentWork({ projects, cityName, isCitySpecific }: Props) {
  if (projects.length === 0) return null

  const heading = isCitySpecific ? `Recent Work in ${cityName}` : 'Recent Work in Northern NJ'

  return (
    <section className="mt-8">
      <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
        <ShieldCheck size={18} className="text-green-600 flex-shrink-0" />
        {heading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-slate-100">
              <Image
                src={project.image_url}
                alt={project.description}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute top-2 left-2">
                <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  <ShieldCheck size={10} />
                  Verified Local Job
                </span>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-slate-700 leading-snug">{project.description}</p>
              {project.customer_review_preview && (
                <p className="mt-2 text-xs text-slate-500 italic border-t border-slate-100 pt-2 leading-relaxed">
                  &ldquo;{project.customer_review_preview}&rdquo;
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
