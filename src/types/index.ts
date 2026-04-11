export interface EstimateFormData {
  serviceType: string
  homeSize: string
  systemAge: string
  urgency: string
  name: string
  email: string
  phone: string
  city: string
  notes: string
}

export interface LeadFormData {
  name: string
  email: string
  phone?: string
  source: string
  city?: string
  notes?: string
}

export interface ServiceData {
  slug: string
  title: string
  h1: string
  metaTitle: string
  metaDescription: string
  description: string
  benefits: string[]
  faqs: FAQ[]
  icon?: string
}

export interface CityData {
  slug: string
  name: string
  county: string
  zip: string
  description?: string
}

export interface FAQ {
  q: string
  a: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image?: string
}

export interface EstimateResult {
  estimatedMin: number
  estimatedMax: number
}

export interface WebhookPayload {
  type?: string
  name?: string
  email?: string
  phone?: string
  city?: string
  source?: string
  serviceType?: string
  homeSize?: string
  systemAge?: string
  urgency?: string
  estimatedMin?: number
  estimatedMax?: number
  notes?: string
  timestamp: string
  [key: string]: unknown
}
