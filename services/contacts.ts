import { supabase } from '@/lib/supabase';
import type { Contact } from '@/types';

export const contactService = {
  async list() {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        *,
        property (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Contact[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        *,
        property (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Contact;
  },

  async create(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single();

    if (error) throw error;
    return data as Contact;
  },

  async update(id: string, contact: Partial<Contact>) {
    const { data, error } = await supabase
      .from('contacts')
      .update(contact)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Contact;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getByPropertyId(propertyId: string) {
    const { data, error } = await supabase
      .from('contacts')
      .select(`
        *,
        property (*)
      `)
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Contact[];
  }
};
