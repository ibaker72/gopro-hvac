import { COMPANY, CITY_SLUGS, CITIES_DATA } from './constants'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HVACBusiness', 'LocalBusiness'],
    name: COMPANY.name,
    description:
      'Licensed HVAC contractor serving Clifton and Northern NJ. AC repair, furnace installation, heating repair, duct cleaning, and 24/7 emergency service.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com',
    telephone: `+1${COMPANY.phoneRaw}`,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.street,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.state,
      postalCode: COMPANY.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.lat,
      longitude: COMPANY.lng,
    },
    openingHours: COMPANY.hours,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: CITY_SLUGS.map((slug) => ({
      '@type': 'City',
      name: `${CITIES_DATA[slug].name}, NJ`,
    })),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'License',
      name: `NJ HVAC Contractor License ${COMPANY.license}`,
    },
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Check, Financing',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'}/og-image.jpg`,
    sameAs: [],
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function serviceSchema(serviceName: string, serviceDescription: string, serviceUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY.name,
      telephone: `+1${COMPANY.phoneRaw}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.state,
        postalCode: COMPANY.zip,
      },
    },
    areaServed: {
      '@type': 'State',
      name: 'New Jersey',
    },
    url: serviceUrl,
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}
