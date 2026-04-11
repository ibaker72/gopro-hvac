import { Shield, Star, Award, CheckCircle, Clock } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

interface TrustBadgesProps {
  variant?: 'dark' | 'light'
}

export default function TrustBadges({ variant = 'light' }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      subtitle: `NJ ${COMPANY.license}`,
    },
    {
      icon: Star,
      title: '5-Star Rated',
      subtitle: '100+ Reviews',
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      subtitle: 'Always Available',
    },
    {
      icon: Award,
      title: `${COMPANY.yearsInBusiness} Years Experience`,
      subtitle: 'Serving Northern NJ',
    },
    {
      icon: CheckCircle,
      title: 'BBB Accredited',
      subtitle: 'A+ Rating',
    },
  ]

  const isDark = variant === 'dark'

  return (
    <div className={`py-6 ${isDark ? 'bg-brand-blue' : 'bg-brand-light border-y border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-2.5"
            >
              <badge.icon
                size={28}
                className={isDark ? 'text-brand-orange' : 'text-brand-blue'}
              />
              <div>
                <p className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-brand-dark'}`}>
                  {badge.title}
                </p>
                <p className={`text-xs ${isDark ? 'text-blue-200' : 'text-slate-500'}`}>
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
