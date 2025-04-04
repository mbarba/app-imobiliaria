import { supabase } from '@/lib/supabase';
import type { Realtor } from '@/types';

export const realtorService = {
  async list() {
    const { data, error } = await supabase
      .from('realtors')
      .select('*')
      .order('name');

    if (error) throw error;
    return data as Realtor[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('realtors')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Realtor;
  },

  async create(realtor: Omit<Realtor, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('realtors')
      .insert(realtor)
      .select()
      .single();

    if (error) throw error;
    return data as Realtor;
  },

  async update(id: string, realtor: Partial<Realtor>) {
    const { data, error } = await supabase
      .from('realtors')
      .update(realtor)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Realtor;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('realtors')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('realtors')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data as Realtor;
  }
};
