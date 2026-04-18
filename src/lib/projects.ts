import { createServerSupabaseClient } from './supabase'

export interface Project {
  id: string
  created_at: string
  city_slug: string
  service_slug: string
  description: string
  image_url: string
  customer_review_preview: string | null
}

export interface RecentProjectsResult {
  projects: Project[]
  isCitySpecific: boolean
}

export async function getRecentProjects(
  citySlug: string,
  serviceSlug?: string,
  limit = 3
): Promise<RecentProjectsResult> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { projects: [], isCitySpecific: false }
  }

  const supabase = createServerSupabaseClient()

  // 1. Try city + service match (most specific)
  if (serviceSlug) {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('city_slug', citySlug)
      .eq('service_slug', serviceSlug)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (data && data.length > 0) return { projects: data, isCitySpecific: true }
  }

  // 2. Fallback: city only
  const { data: cityData } = await supabase
    .from('projects')
    .select('*')
    .eq('city_slug', citySlug)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (cityData && cityData.length > 0) return { projects: cityData, isCitySpecific: true }

  // 3. Global fallback: recent work in Northern NJ
  const { data: globalData } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  return { projects: globalData ?? [], isCitySpecific: false }
}
