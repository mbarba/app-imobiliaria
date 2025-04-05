export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          type: string
          status: string
          launch_date: string
          location: string
          bathrooms: number
          bedrooms: number
          suites: number
          area_size: number
          is_launch: boolean
          is_featured: boolean
          agent_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          type: string
          status: string
          launch_date?: string
          location: string
          bathrooms: number
          bedrooms: number
          suites: number
          area_size: number
          is_launch?: boolean
          is_featured?: boolean
          agent_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          type?: string
          status?: string
          launch_date?: string
          location?: string
          bathrooms?: number
          bedrooms?: number
          suites?: number
          area_size?: number
          is_launch?: boolean
          is_featured?: boolean
          agent_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          url: string
          is_main: boolean
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          url: string
          is_main?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          url?: string
          is_main?: boolean
          created_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          property_id: string
          user_id: string
          name: string
          email: string
          phone: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          user_id?: string
          name: string
          email: string
          phone: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          message?: string
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          property_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
