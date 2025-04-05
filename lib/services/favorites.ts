import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Favorite = Database['public']['Tables']['favorites']['Row']

export async function toggleFavorite(propertyId: string, userId: string) {
  // Check if favorite exists
  const { data: existingFavorite } = await supabase
    .from('favorites')
    .select()
    .eq('property_id', propertyId)
    .eq('user_id', userId)
    .single()

  if (existingFavorite) {
    // Remove favorite
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', existingFavorite.id)

    if (error) {
      throw error
    }

    return null
  } else {
    // Add favorite
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        property_id: propertyId,
        user_id: userId
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }
}

export async function getUserFavorites(userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      *,
      properties (
        *,
        property_images (
          *
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function isFavorite(propertyId: string, userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select()
    .eq('property_id', propertyId)
    .eq('user_id', userId)
    .single()

  if (error) {
    return false
  }

  return !!data
}
