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
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  )
}

export default function ReviewCarousel() {
  return (
    <section className="bg-brand-light py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Star size={14} className="fill-yellow-500 text-yellow-500" />
            5.0 Average Rating — 100+ Google Reviews
          </div>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Don&apos;t take our word for it — here&apos;s what homeowners across Northern NJ say about Go Pro Heating &amp; Cooling.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-brand-dark">{review.name}</p>
                  <p className="text-sm text-slate-500">{review.location}</p>
                </div>
                <StarRating count={review.rating} />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <div className="w-5 h-5 rounded-full bg-[#4285F4] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-xs text-slate-400">Google Review · {review.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-5 mt-5">
          {reviews.slice(3).map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-brand-dark">{review.name}</p>
                  <p className="text-sm text-slate-500">{review.location}</p>
                </div>
                <StarRating count={review.rating} />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <div className="w-5 h-5 rounded-full bg-[#4285F4] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-xs text-slate-400">Google Review · {review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
