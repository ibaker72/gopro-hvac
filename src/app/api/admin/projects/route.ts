import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!process.env.ADMIN_SECRET_KEY || authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const citySlug = formData.get('city_slug')?.toString().trim()
  const serviceSlug = formData.get('service_slug')?.toString().trim()
  const description = formData.get('description')?.toString().trim()
  const customerReviewPreview = formData.get('customer_review_preview')?.toString().trim() || null
  const imageFile = formData.get('image') as File | null

  if (!citySlug || !serviceSlug || !description || !imageFile) {
    return NextResponse.json(
      { error: 'city_slug, service_slug, description, and image are required' },
      { status: 400 }
    )
  }

  if (!imageFile.type.startsWith('image/')) {
    return NextResponse.json({ error: 'image must be an image file' }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()

  const ext = imageFile.name.split('.').pop() ?? 'jpg'
  const filePath = `${citySlug}/${serviceSlug}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(filePath, imageFile, { contentType: imageFile.type, upsert: false })

  if (uploadError) {
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('project-images').getPublicUrl(filePath)

  const { data: project, error: insertError } = await supabase
    .from('projects')
    .insert({
      city_slug: citySlug,
      service_slug: serviceSlug,
      description,
      image_url: publicUrl,
      customer_review_preview: customerReviewPreview,
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ project }, { status: 201 })
}
