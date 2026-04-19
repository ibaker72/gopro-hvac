import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Michael T.',
    location: 'Clifton, NJ',
    rating: 5,
    text: "Called Go Pro at 11pm when my heat went out in January. Technician arrived within 90 minutes and had everything fixed same night. Incredible service and very reasonable pricing. Highly recommend!",
    date: '2 weeks ago',
  },
  {
    name: 'Sarah K.',
    location: 'Wayne, NJ',
    rating: 5,
    text: "Replaced our entire AC system last summer. The team was professional, arrived on time, and completed the job in one day as promised. Our new system is so much more efficient. Very happy.",
    date: '1 month ago',
  },
  {
    name: 'Robert M.',
    location: 'Paterson, NJ',
    rating: 5,
    text: "Had them install a ductless mini-split in our basement. From the estimate to the final installation, everything was smooth and professional. Fair pricing and excellent work.",
    date: '3 months ago',
  },
  {
    name: 'Linda P.',
    location: 'Nutley, NJ',
    rating: 5,
    text: "Annual tune-up keeps our HVAC running perfectly. Go Pro is always honest about what's needed and never tries to upsell unnecessary services. They've been our go-to for 3 years.",
    date: '2 months ago',
  },
  {
    name: 'James D.',
    location: 'Hackensack, NJ',
    rating: 5,
    text: "The most professional HVAC company we've used. Licensed, on time, clean work, and they explained everything clearly. Will definitely use Go Pro for all our future HVAC needs.",
    date: '1 month ago',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const initials = review.name.split(' ').map((n) => n[0]).join('')
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <StarRating count={review.rating} />
      <p className="text-slate-600 text-sm leading-relaxed mt-4 flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-bold text-brand-dark text-sm leading-tight">{review.name}</p>
            <p className="text-slate-400 text-xs">{review.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-[#4285F4] flex items-center justify-center">
            <span className="text-white text-[8px] font-bold leading-none">G</span>
          </div>
          <span className="text-xs text-slate-400">{review.date}</span>
        </div>
      </div>
    </div>
  )
}

export default function ReviewCarousel() {
  return (
    <section className="bg-brand-light py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-full text-sm font-bold mb-5">
            <Star size={14} className="fill-yellow-500 text-yellow-500" />
            5.0 · 100+ Google Reviews
          </div>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Don&apos;t take our word for it — hear from Northern NJ homeowners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/Go+Pro+Heating+%26+Cooling"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-sm"
          >
            <div className="w-4 h-4 rounded-full bg-[#4285F4] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[8px] font-bold leading-none">G</span>
            </div>
            View all 100+ reviews on Google
            <span className="text-slate-400">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
