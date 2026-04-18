import { COMPANY, CITY_SLUGS, CITIES_DATA } from './constants'
import type { CityData, ServiceData } from '@/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HVACBusiness', 'LocalBusiness'],
    '@id': `${siteUrl}/#business`,
    name: COMPANY.name,
    description:
      'Licensed HVAC contractor serving Clifton and Northern NJ. AC repair, furnace installation, heating repair, duct cleaning, and 24/7 emergency service.',
    url: siteUrl,
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
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Passaic County, NJ' },
      { '@type': 'AdministrativeArea', name: 'Bergen County, NJ' },
      { '@type': 'AdministrativeArea', name: 'Essex County, NJ' },
      { '@type': 'AdministrativeArea', name: 'Morris County, NJ' },
      { '@type': 'AdministrativeArea', name: 'Hudson County, NJ' },
      ...CITY_SLUGS.map((slug) => ({
        '@type': 'City',
        name: `${CITIES_DATA[slug].name}, NJ`,
      })),
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'License',
      name: `NJ HVAC Contractor License ${COMPANY.license}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Check, Financing',
    image: `${siteUrl}/og-image.jpg`,
    sameAs: [
      'https://www.google.com/maps?cid=YOUR_GOOGLE_CID',
      'https://www.yelp.com/biz/go-pro-heating-cooling-clifton',
      'https://www.facebook.com/goprohvacnj',
      'https://www.bbb.org/us/nj/clifton/profile/heating-and-air-conditioning/go-pro-heating-cooling',
    ],
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: COMPANY.name,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logos/logo.png`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+1${COMPANY.phoneRaw}`,
      contactType: 'customer service',
      areaServed: 'NJ',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
    sameAs: [
      'https://www.google.com/maps?cid=YOUR_GOOGLE_CID',
      'https://www.yelp.com/biz/go-pro-heating-cooling-clifton',
      'https://www.facebook.com/goprohvacnj',
      'https://www.bbb.org/us/nj/clifton/profile/heating-and-air-conditioning/go-pro-heating-cooling',
    ],
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

export function blogPostingSchema(post: {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: COMPANY.name,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logos/logo.png`,
      },
    },
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    articleSection: post.category,
    image: `${siteUrl}/og-image.jpg`,
  }
}

export function cityServiceSchema(city: CityData, service: ServiceData, imageUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} in ${city.name}, NJ`,
    description: service.description,
    ...(imageUrl ? { image: imageUrl } : {}),
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#business`,
      name: COMPANY.name,
      telephone: `+1${COMPANY.phoneRaw}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.street,
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.state,
        postalCode: COMPANY.zip,
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: `${city.name}, NJ`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${city.county} County, NJ`,
      },
    },
    url: `${siteUrl}/locations/${city.slug}/${service.slug}`,
  }
}

export function serviceAreaSchema(city: CityData, imageUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/locations/${city.slug}#business`,
    name: COMPANY.name,
    url: `${siteUrl}/locations/${city.slug}`,
    telephone: `+1${COMPANY.phoneRaw}`,
    ...(imageUrl ? { image: imageUrl } : {}),
    areaServed: {
      '@type': 'City',
      name: `${city.name}, NJ`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${city.county} County, NJ`,
      },
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: COMPANY.lat,
        longitude: COMPANY.lng,
      },
      geoRadius: '30 mi',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
  }
}
