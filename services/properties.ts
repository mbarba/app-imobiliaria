import { supabase } from '@/lib/supabase';
import type { Property, PropertyImage, PropertyAmenity } from '@/types';

export const propertyService = {
  async list(filters?: {
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    isLaunch?: boolean;
  }) {
    let query = supabase
      .from('properties')
      .select(`
        *,
        images (*),
        amenities (*),
        realtor (*)
      `)
      .eq('status', 'active');

    if (filters) {
      const { type, city, minPrice, maxPrice, bedrooms, isLaunch } = filters;
      if (type) query = query.eq('type', type);
      if (city) query = query.ilike('city', `%${city}%`);
      if (minPrice) query = query.gte('price', minPrice);
      if (maxPrice) query = query.lte('price', maxPrice);
      if (bedrooms) query = query.eq('bedrooms', bedrooms);
      if (isLaunch !== undefined) query = query.eq('is_launch', isLaunch);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data as Property[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        images (*),
        amenities (*),
        realtor (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Property;
  },

  async create(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();

    if (error) throw error;
    return data as Property;
  },

  async update(id: string, property: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .update(property)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Property;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async addImage(image: Omit<PropertyImage, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('property_images')
      .insert(image)
      .select()
      .single();

    if (error) throw error;
    return data as PropertyImage;
  },

  async removeImage(id: string) {
    const { error } = await supabase
      .from('property_images')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async addAmenity(amenity: Omit<PropertyAmenity, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('property_amenities')
      .insert(amenity)
      .select()
      .single();

    if (error) throw error;
    return data as PropertyAmenity;
  },

  async removeAmenity(id: string) {
    const { error } = await supabase
      .from('property_amenities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
