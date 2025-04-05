import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Property = Database['public']['Tables']['properties']['Row']
type PropertyInsert = Database['public']['Tables']['properties']['Insert']
type PropertyUpdate = Database['public']['Tables']['properties']['Update']
type PropertyImage = Database['public']['Tables']['property_images']['Row']

export async function getProperties(filters?: {
  type?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  isLaunch?: boolean
}) {
  let query = supabase
    .from('properties')
    .select(`
      *,
      property_images (
        *
      )
    `)

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }
  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`)
  }
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }
  if (filters?.isLaunch !== undefined) {
    query = query.eq('is_launch', filters.isLaunch)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return data as (Property & { property_images: PropertyImage[] })[]
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images (
        *
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return data as (Property & { property_images: PropertyImage[] })
}

export async function createProperty(property: PropertyInsert, images: File[]) {
  const { data: propertyData, error: propertyError } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single()

  if (propertyError) {
    throw propertyError
  }

  // Upload images
  const imagePromises = images.map(async (image, index) => {
    const fileExt = image.name.split('.').pop()
    const filePath = `${propertyData.id}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, image)

    if (uploadError) {
      throw uploadError
    }

    const { data: urlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath)

    return supabase.from('property_images').insert({
      property_id: propertyData.id,
      url: urlData.publicUrl,
      is_main: index === 0
    })
  })

  await Promise.all(imagePromises)

  return propertyData
}

export async function updateProperty(id: string, property: PropertyUpdate, newImages?: File[]) {
  const { data: propertyData, error: propertyError } = await supabase
    .from('properties')
    .update(property)
    .eq('id', id)
    .select()
    .single()

  if (propertyError) {
    throw propertyError
  }

  if (newImages?.length) {
    // Upload new images
    const imagePromises = newImages.map(async (image) => {
      const fileExt = image.name.split('.').pop()
      const filePath = `${propertyData.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, image)

      if (uploadError) {
        throw uploadError
      }

      const { data: urlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath)

      return supabase.from('property_images').insert({
        property_id: propertyData.id,
        url: urlData.publicUrl,
        is_main: false
      })
    })

    await Promise.all(imagePromises)
  }

  return propertyData
}

export async function deleteProperty(id: string) {
  // Delete images from storage first
  const { data: images } = await supabase
    .from('property_images')
    .select('url')
    .eq('property_id', id)

  if (images?.length) {
    const filePaths = images.map(img => img.url.split('/').pop()!)
    await supabase.storage.from('property-images').remove(filePaths)
  }

  // Delete property and related data (images will be deleted by cascade)
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }
}
