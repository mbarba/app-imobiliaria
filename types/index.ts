export type User = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'realtor' | 'client';
  created_at: string;
  updated_at: string;
}

export type Realtor = {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email: string;
  photo_url: string | null;
  creci: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export type Property = {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'commercial';
  status: 'active' | 'inactive' | 'sold' | 'rented';
  is_launch: boolean;
  price: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  bedrooms: number | null;
  bathrooms: number;
  area: number;
  parking_spots: number;
  realtor_id: string;
  created_at: string;
  updated_at: string;
  images?: PropertyImage[];
  amenities?: PropertyAmenity[];
  realtor?: Realtor;
}

export type PropertyImage = {
  id: string;
  property_id: string;
  url: string;
  is_main: boolean;
  order_index: number;
  created_at: string;
}

export type PropertyAmenity = {
  id: string;
  property_id: string;
  name: string;
  created_at: string;
}

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  property_id: string | null;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
  property?: Property;
}
