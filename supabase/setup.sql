-- Enable extensions
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- Create users table for authentication
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'realtor', 'client')) not null default 'client',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create realtors table
create table public.realtors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null,
  phone text not null,
  email text not null,
  photo_url text,
  creci text unique,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create properties table
create table public.properties (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  type text check (type in ('apartment', 'house', 'commercial')) not null,
  status text check (status in ('active', 'inactive', 'sold', 'rented')) not null default 'active',
  is_launch boolean not null default false,
  price numeric(12,2) not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  latitude numeric(10,8),
  longitude numeric(11,8),
  bedrooms integer,
  bathrooms integer not null,
  area numeric(10,2) not null,
  parking_spots integer not null default 0,
  realtor_id uuid references public.realtors(id) on delete restrict not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create property images table
create table public.property_images (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references public.properties(id) on delete cascade not null,
  url text not null,
  is_main boolean not null default false,
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create property amenities table
create table public.property_amenities (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references public.properties(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create contacts table
create table public.contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  property_id uuid references public.properties(id) on delete set null,
  status text check (status in ('new', 'contacted', 'closed')) not null default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create storage buckets
insert into storage.buckets (id, name, public) values 
('property-images', 'property-images', true),
('realtor-photos', 'realtor-photos', true),
('user-avatars', 'user-avatars', true);

-- Create storage policies
create policy "Public Access"
on storage.objects for select
using ( bucket_id in ('property-images', 'realtor-photos', 'user-avatars') );

create policy "Authenticated users can upload property images"
on storage.objects for insert
with check (
  bucket_id = 'property-images' 
  and auth.role() = 'authenticated'
  and (auth.jwt() ->> 'role' = 'admin' or auth.jwt() ->> 'role' = 'realtor')
);

create policy "Authenticated users can upload their photos"
on storage.objects for insert
with check (
  bucket_id = 'realtor-photos'
  and auth.role() = 'authenticated'
  and (auth.jwt() ->> 'role' = 'admin' or auth.jwt() ->> 'role' = 'realtor')
);

create policy "Users can upload their avatars"
on storage.objects for insert
with check (
  bucket_id = 'user-avatars'
  and auth.role() = 'authenticated'
);

-- Create RLS policies
alter table public.users enable row level security;
alter table public.realtors enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.property_amenities enable row level security;
alter table public.contacts enable row level security;

-- Users policies
create policy "Public users are viewable by everyone"
on public.users for select
using (true);

create policy "Users can update own record"
on public.users for update
using (auth.uid() = id);

-- Realtors policies
create policy "Realtors are viewable by everyone"
on public.realtors for select
using (true);

create policy "Only admins can manage realtors"
on public.realtors for all
using (auth.jwt() ->> 'role' = 'admin');

-- Properties policies
create policy "Properties are viewable by everyone"
on public.properties for select
using (true);

create policy "Realtors can manage their properties"
on public.properties for all
using (
  auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and realtor_id in (
        select id from public.realtors where user_id = auth.uid()
      )
    )
  )
);

-- Property images policies
create policy "Property images are viewable by everyone"
on public.property_images for select
using (true);

create policy "Property owners can manage images"
on public.property_images for all
using (
  auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and property_id in (
        select id from public.properties
        where realtor_id in (
          select id from public.realtors where user_id = auth.uid()
        )
      )
    )
  )
);

-- Property amenities policies
create policy "Property amenities are viewable by everyone"
on public.property_amenities for select
using (true);

create policy "Property owners can manage amenities"
on public.property_amenities for all
using (
  auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and property_id in (
        select id from public.properties
        where realtor_id in (
          select id from public.realtors where user_id = auth.uid()
        )
      )
    )
  )
);

-- Contacts policies
create policy "Contacts are manageable by admins and related realtors"
on public.contacts for all
using (
  auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and property_id in (
        select id from public.properties
        where realtor_id in (
          select id from public.realtors where user_id = auth.uid()
        )
      )
    )
  )
);

create policy "Anyone can create contacts"
on public.contacts for insert
with check (true);

-- Insert initial admin user
insert into auth.users (id, email, encrypted_password, email_confirmed_at, role)
values (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'admin@imobprime.com.br',
  crypt('admin123', gen_salt('bf')),
  now(),
  'authenticated'
);

insert into public.users (id, email, full_name, role)
values (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'admin@imobprime.com.br',
  'Administrador Sistema',
  'admin'
);
