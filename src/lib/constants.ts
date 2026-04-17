import type { ServiceData, CityData, FAQ } from '@/types'

export const COMPANY = {
  name: 'Go Pro Heating & Cooling',
  shortName: 'Go Pro HVAC',
  address: '23 Major Street, Clifton, NJ 07013',
  street: '23 Major Street',
  city: 'Clifton',
  state: 'NJ',
  zip: '07013',
  phone: '973-938-2217',
  phoneRaw: '9739382217',
  phoneTel: 'tel:9739382217',
  email: 'goproHVACNJ@gmail.com',
  license: '#19HC00212300',
  lat: '40.8584',
  lng: '-74.1638',
  hours: 'Mo-Su 00:00-23:59',
  hoursDisplay: '24/7 Emergency Service Available',
  yearsInBusiness: '10+',
} as const

export const HOME_FAQS: FAQ[] = [
  {
    q: 'How often should I schedule HVAC maintenance?',
    a: 'We recommend having your HVAC system serviced twice a year — once in spring before cooling season and once in fall before heating season. Regular tune-ups can extend the life of your system by years and prevent costly emergency repairs.',
  },
  {
    q: 'How do I know if I need AC repair or a full replacement?',
    a: 'If your AC is under 10 years old and the repair cost is less than half the replacement cost, repair is usually the better option. For systems over 15 years old, or those needing frequent repairs, replacement is often more cost-effective. Our technicians will give you an honest assessment.',
  },
  {
    q: 'What areas does Go Pro Heating & Cooling serve?',
    a: 'We serve Clifton and all of Northern New Jersey including Paterson, Passaic, Wayne, Nutley, Bloomfield, Montclair, West Orange, Hackensack, Paramus, Fair Lawn, Garfield, Lodi, Teaneck, Englewood, Ridgewood, and Bergenfield. Call us to confirm service in your area.',
  },
  {
    q: 'Do you offer 24/7 emergency HVAC service?',
    a: 'Yes! We provide 24/7 emergency HVAC service throughout Northern NJ. Whether your heating fails on the coldest night of the year or your AC breaks during a heat wave, call 973-938-2217 and we\'ll dispatch a technician as quickly as possible.',
  },
  {
    q: 'How long does an HVAC installation take?',
    a: 'A standard central AC or furnace installation typically takes 4–8 hours. Mini-split installations can range from 4–12 hours depending on how many zones you need. We always complete the job in a single visit whenever possible to minimize disruption.',
  },
  {
    q: 'What brands of HVAC equipment do you work with?',
    a: 'We work with all major HVAC brands including Carrier, Trane, Lennox, Rheem, York, Goodman, Bryant, and more. We can service and install virtually any brand, and we\'ll recommend the best option for your home and budget.',
  },
  {
    q: 'Are you licensed and insured in New Jersey?',
    a: 'Yes, Go Pro Heating & Cooling is fully licensed in New Jersey (License #19HC00212300) and carries comprehensive liability insurance and workers\' compensation. You can trust our team to work safely and professionally in your home.',
  },
]

export const SERVICES_DATA: Record<string, ServiceData> = {
  'ac-repair': {
    slug: 'ac-repair',
    title: 'AC Repair',
    h1: 'AC Repair in Clifton, NJ',
    metaTitle: 'AC Repair in Clifton, NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Fast, reliable AC repair in Clifton & Northern NJ. Go Pro Heating & Cooling fixes all brands. Same-day service available. Call 973-938-2217.',
    description:
      'Is your air conditioner blowing warm air, making strange noises, or not turning on at all? Go Pro Heating & Cooling provides fast, expert AC repair throughout Clifton and Northern New Jersey. Our NATE-certified technicians diagnose and fix all makes and models, getting your home cool again—often the same day you call.',
    benefits: [
      'Same-day and emergency AC repair available',
      'All makes and models serviced',
      'Upfront pricing with no hidden fees',
      'Licensed NJ HVAC technicians',
      'Parts and labor warranty on all repairs',
      'Serving Clifton, Paterson, Wayne & surrounding areas',
    ],
    faqs: [
      {
        q: 'Why is my AC blowing warm air?',
        a: 'Common causes include a dirty air filter, low refrigerant, a faulty compressor, or a malfunctioning thermostat. Our technician will diagnose the exact issue and provide a transparent repair quote before any work begins.',
      },
      {
        q: 'How much does AC repair cost in NJ?',
        a: 'AC repair costs in New Jersey typically range from $150 to $600 depending on the problem. Refrigerant recharges, capacitor replacements, and fan motor repairs are among the most common fixes. We provide upfront quotes before starting any work.',
      },
      {
        q: 'Can you repair my AC today?',
        a: 'In most cases, yes! We offer same-day AC repair in Clifton and surrounding NJ towns. Call 973-938-2217 and we\'ll do our best to dispatch a technician the same day, especially for emergency situations.',
      },
    ],
    icon: 'Snowflake',
  },
  'ac-installation': {
    slug: 'ac-installation',
    title: 'AC Installation',
    h1: 'AC Installation in Clifton, NJ',
    metaTitle: 'AC Installation in Clifton, NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Professional central AC installation in Clifton & Northern NJ. Energy-efficient systems, expert sizing, and quality install. Get a free estimate: 973-938-2217.',
    description:
      'Ready to upgrade to a new, energy-efficient air conditioning system? Go Pro Heating & Cooling handles complete central AC installations throughout Northern New Jersey. From proper load calculation to expert installation, we ensure your new system runs at peak efficiency for years to come.',
    benefits: [
      'Free in-home estimate and system sizing',
      'Energy Star certified equipment options',
      'Full system installation in one day',
      'Removal and disposal of old equipment',
      'Manufacturer warranty + our labor guarantee',
      'Financing options available',
    ],
    faqs: [
      {
        q: 'What size AC do I need for my NJ home?',
        a: 'AC sizing depends on your home\'s square footage, insulation, window placement, and local climate. An undersized unit won\'t cool effectively; an oversized unit short-cycles, wasting energy. We perform a proper Manual J load calculation for every installation.',
      },
      {
        q: 'How long does AC installation take?',
        a: 'Most central AC installations in NJ homes take 4–8 hours and are completed in a single day. We handle everything: equipment delivery, installation, testing, and cleanup.',
      },
    ],
    icon: 'Wind',
  },
  'heating-repair': {
    slug: 'heating-repair',
    title: 'Heating Repair',
    h1: 'Heating Repair in Clifton, NJ',
    metaTitle: 'Heating Repair in Clifton, NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Expert heating repair in Clifton & Northern NJ. Furnace, boiler & heat pump repair. 24/7 emergency service. Call Go Pro HVAC: 973-938-2217.',
    description:
      'When your heat goes out on a cold New Jersey night, you need fast, reliable heating repair. Go Pro Heating & Cooling provides expert heating system repair for furnaces, boilers, and heat pumps throughout Clifton and Northern NJ. We offer 24/7 emergency heating repair because we know comfort can\'t wait.',
    benefits: [
      '24/7 emergency heating repair service',
      'All heating systems: furnaces, boilers, heat pumps',
      'Same-day appointments available',
      'Transparent pricing before work begins',
      'Licensed NJ heating contractors',
      'Fast diagnosis with truck-stocked parts',
    ],
    faqs: [
      {
        q: 'My heat stopped working. What should I check first?',
        a: 'First, check your thermostat settings and batteries. Then check your circuit breaker and ensure the furnace power switch is on. Check your air filter — a clogged filter can shut the system down. If none of these help, call 973-938-2217 for professional diagnosis.',
      },
      {
        q: 'How much does heating repair cost in NJ?',
        a: 'Heating repair in New Jersey typically costs $200–$800 depending on the issue. Igniter replacements, gas valve repairs, and heat exchanger issues are common. We provide transparent quotes before any repairs.',
      },
    ],
    icon: 'Flame',
  },
  'furnace-installation': {
    slug: 'furnace-installation',
    title: 'Furnace Installation',
    h1: 'Furnace Installation in Clifton, NJ',
    metaTitle: 'Furnace Installation Clifton NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'New furnace installation in Clifton & Northern NJ. High-efficiency gas furnaces installed by licensed NJ contractors. Free estimates: 973-938-2217.',
    description:
      'Replace your old, inefficient furnace with a high-efficiency model and start saving on energy bills. Go Pro Heating & Cooling installs all major furnace brands throughout Clifton and Northern New Jersey. Our licensed technicians handle the complete installation, from removal of your old unit to testing the new system.',
    benefits: [
      'High-efficiency furnaces (up to 98% AFUE)',
      'Free in-home estimate and load calculation',
      'Complete installation in one day',
      'Old furnace removal and disposal included',
      'Rebates and financing options available',
      'Manufacturer and labor warranties',
    ],
    faqs: [
      {
        q: 'When should I replace my furnace?',
        a: 'Most furnaces last 15–20 years. If yours is over 15 years old, requires frequent repairs, or your energy bills are rising despite normal use, replacement is often the smarter investment. We can help you decide.',
      },
      {
        q: 'What is AFUE and why does it matter?',
        a: 'AFUE (Annual Fuel Utilization Efficiency) measures how efficiently your furnace converts gas to heat. A 96% AFUE furnace converts 96 cents of every dollar of gas into heat. Modern high-efficiency furnaces can dramatically reduce your heating bills.',
      },
    ],
    icon: 'Thermometer',
  },
  'heat-pump': {
    slug: 'heat-pump',
    title: 'Heat Pump Services',
    h1: 'Heat Pump Services in Clifton, NJ',
    metaTitle: 'Heat Pump Installation & Repair NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Heat pump installation, repair & maintenance in Northern NJ. Energy-efficient heating & cooling in one system. Call Go Pro HVAC: 973-938-2217.',
    description:
      'Heat pumps offer year-round comfort—heating in winter and cooling in summer—with remarkable energy efficiency. Go Pro Heating & Cooling installs and services all types of heat pumps throughout Northern New Jersey, including air-source, ground-source, and cold-climate heat pumps designed for NJ winters.',
    benefits: [
      'Heat and cool with one efficient system',
      'Significant energy savings vs. traditional HVAC',
      'Cold-climate models work in NJ winters',
      'Qualifies for NJ state energy rebates',
      'Expert installation and service',
      'All major brands serviced',
    ],
    faqs: [
      {
        q: 'Do heat pumps work well in New Jersey winters?',
        a: 'Modern cold-climate heat pumps are designed to operate efficiently even when temperatures drop below 0°F, making them an excellent choice for NJ winters. Many homeowners pair them with a backup heat strip for the coldest days.',
      },
    ],
    icon: 'ArrowUpDown',
  },
  'ductless-mini-split': {
    slug: 'ductless-mini-split',
    title: 'Ductless Mini-Split',
    h1: 'Ductless Mini-Split Installation in NJ',
    metaTitle: 'Mini-Split Installation NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Ductless mini-split installation in Clifton & Northern NJ. Perfect for additions, older homes & zoned comfort. Free estimates: 973-938-2217.',
    description:
      'Ductless mini-split systems are the perfect solution for homes without existing ductwork, room additions, garages, or any space needing independent temperature control. Go Pro Heating & Cooling specializes in mini-split installation throughout Northern New Jersey, offering single-zone and multi-zone systems from leading brands.',
    benefits: [
      'No ductwork required',
      'Zoned temperature control',
      'Highly energy efficient (up to 30 SEER)',
      'Quiet operation',
      'Year-round heating and cooling',
      'Perfect for additions and older homes',
    ],
    faqs: [
      {
        q: 'How many zones do I need for a mini-split system?',
        a: 'Each room or area you want to control independently requires its own zone. Many homeowners choose one zone for a master bedroom, one for a living area, and additional zones for other spaces. We\'ll help you design the ideal system for your home.',
      },
    ],
    icon: 'SplitSquareHorizontal',
  },
  'duct-cleaning': {
    slug: 'duct-cleaning',
    title: 'Duct Cleaning',
    h1: 'Duct Cleaning Services in Clifton, NJ',
    metaTitle: 'Duct Cleaning Clifton NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Professional duct cleaning in Clifton & Northern NJ. Improve air quality, reduce allergens & boost HVAC efficiency. Call 973-938-2217.',
    description:
      'Dirty air ducts can circulate dust, allergens, mold spores, and other contaminants throughout your home. Professional duct cleaning from Go Pro Heating & Cooling removes built-up debris, improves indoor air quality, and helps your HVAC system run more efficiently—saving energy and extending equipment life.',
    benefits: [
      'Removes dust, allergens, and mold spores',
      'Improves indoor air quality',
      'Reduces energy bills by improving airflow',
      'Eliminates musty odors from ducts',
      'NADCA-standard cleaning procedures',
      'Before & after photos provided',
    ],
    faqs: [
      {
        q: 'How often should I have my ducts cleaned?',
        a: 'The EPA recommends duct cleaning every 3–5 years, or sooner if you\'ve had renovations, pest infestations, visible mold growth, or if family members suffer from unexplained allergies. Homes with pets may benefit from more frequent cleaning.',
      },
    ],
    icon: 'Wind',
  },
  'hvac-tune-up': {
    slug: 'hvac-tune-up',
    title: 'HVAC Tune-Up',
    h1: 'HVAC Tune-Up & Maintenance in NJ',
    metaTitle: 'HVAC Tune-Up & Maintenance NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Seasonal HVAC tune-up & maintenance in Clifton & Northern NJ. Starting at $89. Extend system life and prevent breakdowns. Call 973-938-2217.',
    description:
      'Regular HVAC maintenance is the single best way to prevent costly breakdowns, extend system life, and maintain efficiency. Our comprehensive tune-up service covers 21-point inspections, cleaning, lubrication, and adjustment of all critical components. We serve homeowners throughout Clifton and Northern New Jersey.',
    benefits: [
      '21-point comprehensive inspection',
      'Cleaning of coils, burners & components',
      'Refrigerant level check & top-off if needed',
      'Filter replacement included',
      'Priority scheduling for existing clients',
      'Extends system life by years',
    ],
    faqs: [
      {
        q: 'What is included in an HVAC tune-up?',
        a: 'Our 21-point tune-up includes: inspecting and cleaning coils, checking refrigerant levels, testing electrical connections, lubricating moving parts, inspecting the heat exchanger, cleaning burners, calibrating the thermostat, changing filters, and providing a full system health report.',
      },
    ],
    icon: 'Settings',
  },
  'emergency-hvac': {
    slug: 'emergency-hvac',
    title: '24/7 Emergency HVAC',
    h1: '24/7 Emergency HVAC in Clifton, NJ',
    metaTitle: '24/7 Emergency HVAC Clifton NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Emergency HVAC repair 24/7 in Clifton & Northern NJ. No overtime charges. Fast response. Call Go Pro Heating & Cooling now: 973-938-2217.',
    description:
      'HVAC emergencies don\'t follow a 9-to-5 schedule. When your heat fails in January or your AC breaks during a summer heat wave, Go Pro Heating & Cooling is here around the clock. We offer genuine 24/7 emergency HVAC service throughout Northern New Jersey with no hidden overtime charges.',
    benefits: [
      'True 24/7 availability — no answering services',
      'Fast dispatch to Clifton and all NJ areas served',
      'No overtime or weekend surcharges',
      'Fully stocked trucks for same-visit repairs',
      'All systems and brands serviced',
      'Same technicians day and night',
    ],
    faqs: [
      {
        q: 'What counts as an HVAC emergency?',
        a: 'No heat in freezing temperatures, no AC during dangerous heat, gas smells from your HVAC system, water leaking from equipment, or complete system failure all qualify as emergencies. When in doubt, call us—we\'re available 24/7 at 973-938-2217.',
      },
    ],
    icon: 'AlertTriangle',
  },
  'commercial-hvac': {
    slug: 'commercial-hvac',
    title: 'Commercial HVAC',
    h1: 'Commercial HVAC Services in NJ',
    metaTitle: 'Commercial HVAC Services NJ | Go Pro Heating & Cooling | 973-938-2217',
    metaDescription:
      'Commercial HVAC installation, repair & maintenance in Northern NJ. Offices, retail & light commercial. Call Go Pro Heating & Cooling: 973-938-2217.',
    description:
      'Go Pro Heating & Cooling provides comprehensive commercial HVAC services for offices, retail spaces, restaurants, and other light commercial properties throughout Northern New Jersey. Our commercial team handles everything from rooftop unit service to complete system replacements, minimizing downtime for your business.',
    benefits: [
      'Commercial rooftop unit service and installation',
      'Preventive maintenance contracts available',
      'After-hours service to minimize business disruption',
      'Energy audits and efficiency upgrades',
      'Licensed and insured for commercial work',
      'Quick response times for business clients',
    ],
    faqs: [
      {
        q: 'Do you offer commercial HVAC maintenance contracts?',
        a: 'Yes! We offer customized commercial preventive maintenance agreements for businesses in Northern NJ. Regular maintenance keeps your systems running efficiently, prevents unexpected failures, and can be expensed as a business cost.',
      },
    ],
    icon: 'Building2',
  },
}

export const CITIES_DATA: Record<string, CityData> = {
  // Passaic County
  clifton: { slug: 'clifton', name: 'Clifton', county: 'Passaic', zip: '07011' },
  paterson: { slug: 'paterson', name: 'Paterson', county: 'Passaic', zip: '07501' },
  passaic: { slug: 'passaic', name: 'Passaic', county: 'Passaic', zip: '07055' },
  wayne: { slug: 'wayne', name: 'Wayne', county: 'Passaic', zip: '07470' },
  'little-falls': { slug: 'little-falls', name: 'Little Falls', county: 'Passaic', zip: '07424' },
  totowa: { slug: 'totowa', name: 'Totowa', county: 'Passaic', zip: '07512' },
  'woodland-park': { slug: 'woodland-park', name: 'Woodland Park', county: 'Passaic', zip: '07424' },
  haledon: { slug: 'haledon', name: 'Haledon', county: 'Passaic', zip: '07508' },
  'north-haledon': { slug: 'north-haledon', name: 'North Haledon', county: 'Passaic', zip: '07508' },
  'prospect-park': { slug: 'prospect-park', name: 'Prospect Park', county: 'Passaic', zip: '07508' },
  'pompton-lakes': { slug: 'pompton-lakes', name: 'Pompton Lakes', county: 'Passaic', zip: '07442' },
  wanaque: { slug: 'wanaque', name: 'Wanaque', county: 'Passaic', zip: '07465' },
  // Essex County
  nutley: { slug: 'nutley', name: 'Nutley', county: 'Essex', zip: '07110' },
  bloomfield: { slug: 'bloomfield', name: 'Bloomfield', county: 'Essex', zip: '07003' },
  montclair: { slug: 'montclair', name: 'Montclair', county: 'Essex', zip: '07042' },
  'west-orange': { slug: 'west-orange', name: 'West Orange', county: 'Essex', zip: '07052' },
  newark: { slug: 'newark', name: 'Newark', county: 'Essex', zip: '07102' },
  'east-orange': { slug: 'east-orange', name: 'East Orange', county: 'Essex', zip: '07017' },
  'south-orange': { slug: 'south-orange', name: 'South Orange', county: 'Essex', zip: '07079' },
  maplewood: { slug: 'maplewood', name: 'Maplewood', county: 'Essex', zip: '07040' },
  belleville: { slug: 'belleville', name: 'Belleville', county: 'Essex', zip: '07109' },
  'glen-ridge': { slug: 'glen-ridge', name: 'Glen Ridge', county: 'Essex', zip: '07028' },
  'cedar-grove': { slug: 'cedar-grove', name: 'Cedar Grove', county: 'Essex', zip: '07009' },
  verona: { slug: 'verona', name: 'Verona', county: 'Essex', zip: '07044' },
  caldwell: { slug: 'caldwell', name: 'Caldwell', county: 'Essex', zip: '07006' },
  // Bergen County
  hackensack: { slug: 'hackensack', name: 'Hackensack', county: 'Bergen', zip: '07601' },
  paramus: { slug: 'paramus', name: 'Paramus', county: 'Bergen', zip: '07652' },
  'fair-lawn': { slug: 'fair-lawn', name: 'Fair Lawn', county: 'Bergen', zip: '07410' },
  garfield: { slug: 'garfield', name: 'Garfield', county: 'Bergen', zip: '07026' },
  lodi: { slug: 'lodi', name: 'Lodi', county: 'Bergen', zip: '07644' },
  teaneck: { slug: 'teaneck', name: 'Teaneck', county: 'Bergen', zip: '07666' },
  englewood: { slug: 'englewood', name: 'Englewood', county: 'Bergen', zip: '07631' },
  ridgewood: { slug: 'ridgewood', name: 'Ridgewood', county: 'Bergen', zip: '07450' },
  bergenfield: { slug: 'bergenfield', name: 'Bergenfield', county: 'Bergen', zip: '07621' },
  'fort-lee': { slug: 'fort-lee', name: 'Fort Lee', county: 'Bergen', zip: '07024' },
  'cliffside-park': { slug: 'cliffside-park', name: 'Cliffside Park', county: 'Bergen', zip: '07010' },
  'palisades-park': { slug: 'palisades-park', name: 'Palisades Park', county: 'Bergen', zip: '07650' },
  edgewater: { slug: 'edgewater', name: 'Edgewater', county: 'Bergen', zip: '07020' },
  mahwah: { slug: 'mahwah', name: 'Mahwah', county: 'Bergen', zip: '07430' },
  ramsey: { slug: 'ramsey', name: 'Ramsey', county: 'Bergen', zip: '07446' },
  'saddle-brook': { slug: 'saddle-brook', name: 'Saddle Brook', county: 'Bergen', zip: '07663' },
  // Morris County
  parsippany: { slug: 'parsippany', name: 'Parsippany', county: 'Morris', zip: '07054' },
  'morris-plains': { slug: 'morris-plains', name: 'Morris Plains', county: 'Morris', zip: '07950' },
  morristown: { slug: 'morristown', name: 'Morristown', county: 'Morris', zip: '07960' },
  rockaway: { slug: 'rockaway', name: 'Rockaway', county: 'Morris', zip: '07866' },
  denville: { slug: 'denville', name: 'Denville', county: 'Morris', zip: '07834' },
  // Hudson County
  'jersey-city': { slug: 'jersey-city', name: 'Jersey City', county: 'Hudson', zip: '07302' },
  'union-city': { slug: 'union-city', name: 'Union City', county: 'Hudson', zip: '07087' },
  'west-new-york': { slug: 'west-new-york', name: 'West New York', county: 'Hudson', zip: '07093' },
  secaucus: { slug: 'secaucus', name: 'Secaucus', county: 'Hudson', zip: '07094' },
  kearny: { slug: 'kearny', name: 'Kearny', county: 'Hudson', zip: '07032' },
  bayonne: { slug: 'bayonne', name: 'Bayonne', county: 'Hudson', zip: '07002' },
}

export const SERVICE_SLUGS = Object.keys(SERVICES_DATA)
export const CITY_SLUGS = Object.keys(CITIES_DATA)
