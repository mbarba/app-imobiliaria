import { supabase } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Contact = Database['public']['Tables']['contacts']['Row']
type ContactInsert = Database['public']['Tables']['contacts']['Insert']

export async function createContact(contact: ContactInsert) {
  const { data, error } = await supabase
    .from('contacts')
    .insert(contact)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getContactsByProperty(propertyId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('property_id', propertyId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function getContactsByAgent(agentId: string) {
  const { data, error } = await supabase
    .from('contacts')
    .select(`
      *,
      properties (
        id,
        title
      )
    `)
    .eq('properties.agent_id', agentId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}
