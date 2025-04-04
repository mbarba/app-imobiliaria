-- Create users table for authentication
create table users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'realtor', 'client')) not null default 'client',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create realtors table
create table realtors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
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
create table properties (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  type text check (type in ('apartment', 'house', 'commercial', 'land')) not null,
  status text check (status in ('active', 'inactive', 'sold', 'rented')) not null default 'active',
  is_launch boolean default false not null,
  price numeric not null check (price >= 0),
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  latitude numeric,
  longitude numeric,
  bedrooms integer,
  bathrooms integer,
  area numeric not null check (area > 0),
  parking_spots integer default 0,
  realtor_id uuid references realtors(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create property_images table
create table property_images (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) on delete cascade not null,
  url text not null,
  is_main boolean default false,
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create property_amenities table
create table property_amenities (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create contacts table for form submissions
create table contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  property_id uuid references properties(id) on delete set null,
  status text check (status in ('new', 'contacted', 'closed')) not null default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table users enable row level security;
alter table realtors enable row level security;
alter table properties enable row level security;
alter table property_images enable row level security;
alter table property_amenities enable row level security;
alter table contacts enable row level security;

-- Users policies
create policy "Users can view their own data" on users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on users
  for update using (auth.uid() = id);

-- Properties policies
create policy "Anyone can view active properties" on properties
  for select using (status = 'active');

create policy "Realtors can manage their own properties" on properties
  for all using (
    exists (
      select 1 from realtors
      where realtors.user_id = auth.uid()
      and realtors.id = properties.realtor_id
    )
  );

create policy "Admins can manage all properties" on properties
  for all using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.role = 'admin'
    )
  );

-- Property images policies
create policy "Anyone can view property images" on property_images
  for select using (true);

create policy "Realtors can manage their property images" on property_images
  for all using (
    exists (
      select 1 from properties
      join realtors on properties.realtor_id = realtors.id
      where property_images.property_id = properties.id
      and realtors.user_id = auth.uid()
    )
  );

-- Contacts policies
create policy "Users can create contacts" on contacts
  for insert with check (true);

create policy "Users can view their own contacts" on contacts
  for select using (
    exists (
      select 1 from users
      where users.id = auth.uid()
      and users.email = contacts.email
    )
  );

create policy "Realtors can view contacts for their properties" on contacts
  for select using (
    exists (
      select 1 from properties
      join realtors on properties.realtor_id = realtors.id
      where contacts.property_id = properties.id
      and realtors.user_id = auth.uid()
    )
  );

-- Create functions and triggers
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger set_users_updated_at
  before update on users
  for each row
  execute function set_updated_at();

create trigger set_realtors_updated_at
  before update on realtors
  for each row
  execute function set_updated_at();

create trigger set_properties_updated_at
  before update on properties
  for each row
  execute function set_updated_at();

create trigger set_contacts_updated_at
  before update on contacts
  for each row
  execute function set_updated_at();

-- Create indexes
create index idx_properties_status on properties(status);
create index idx_properties_type on properties(type);
create index idx_properties_is_launch on properties(is_launch);
create index idx_properties_price on properties(price);
create index idx_property_images_property_id on property_images(property_id);
create index idx_property_amenities_property_id on property_amenities(property_id);
create index idx_contacts_status on contacts(status);
create index idx_contacts_property_id on contacts(property_id);
