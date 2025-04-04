-- Create storage buckets
insert into storage.buckets (id, name, public, avif_autodetection)
values
  ('property-images', 'property-images', true, false),
  ('realtor-photos', 'realtor-photos', true, false),
  ('user-avatars', 'user-avatars', true, false);

-- Set up CORS policy for the buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('property-images', 'property-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('realtor-photos', 'realtor-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('user-avatars', 'user-avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp']);

-- Storage policies for property images
create policy "Anyone can view property images"
  on storage.objects for select
  using ( bucket_id = 'property-images' );

create policy "Authenticated users can upload property images"
  on storage.objects for insert
  with check (
    bucket_id = 'property-images'
    and auth.role() = 'authenticated'
    and (
      -- Admin can upload
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
      or
      -- Realtor can upload to their properties
      exists (
        select 1 from public.properties
        join public.realtors on properties.realtor_id = realtors.id
        where realtors.user_id = auth.uid()
      )
    )
  );

create policy "Property owners can update their images"
  on storage.objects for update
  with check (
    bucket_id = 'property-images'
    and (
      -- Admin can update
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
      or
      -- Realtor can update their property images
      exists (
        select 1 from public.properties
        join public.realtors on properties.realtor_id = realtors.id
        where realtors.user_id = auth.uid()
      )
    )
  );

create policy "Property owners can delete their images"
  on storage.objects for delete
  using (
    bucket_id = 'property-images'
    and (
      -- Admin can delete
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
      or
      -- Realtor can delete their property images
      exists (
        select 1 from public.properties
        join public.realtors on properties.realtor_id = realtors.id
        where realtors.user_id = auth.uid()
      )
    )
  );

-- Storage policies for realtor photos
create policy "Anyone can view realtor photos"
  on storage.objects for select
  using ( bucket_id = 'realtor-photos' );

create policy "Realtors can upload their photos"
  on storage.objects for insert
  with check (
    bucket_id = 'realtor-photos'
    and auth.role() = 'authenticated'
    and (
      exists (
        select 1 from public.realtors
        where realtors.user_id = auth.uid()
      )
      or
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
    )
  );

create policy "Realtors can update their photos"
  on storage.objects for update
  with check (
    bucket_id = 'realtor-photos'
    and (
      exists (
        select 1 from public.realtors
        where realtors.user_id = auth.uid()
      )
      or
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
    )
  );

create policy "Realtors can delete their photos"
  on storage.objects for delete
  using (
    bucket_id = 'realtor-photos'
    and (
      exists (
        select 1 from public.realtors
        where realtors.user_id = auth.uid()
      )
      or
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
    )
  );

-- Storage policies for user avatars
create policy "Anyone can view user avatars"
  on storage.objects for select
  using ( bucket_id = 'user-avatars' );

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'user-avatars'
    and auth.role() = 'authenticated'
    and (
      storage.foldername(name) = auth.uid()::text
      or
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
    )
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  with check (
    bucket_id = 'user-avatars'
    and (
      storage.foldername(name) = auth.uid()::text
      or
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
    )
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'user-avatars'
    and (
      storage.foldername(name) = auth.uid()::text
      or
      exists (
        select 1 from public.users
        where users.id = auth.uid()
        and users.role = 'admin'
      )
    )
  );

-- Create storage triggers for cleanup
create or replace function delete_storage_object()
returns trigger as $$
begin
  delete from storage.objects
  where name like old.id || '/%';
  return old;
end;
$$ language plpgsql;

-- Add triggers to clean up storage when records are deleted
create trigger delete_property_images
  after delete on public.properties
  for each row
  execute function delete_storage_object();

create trigger delete_realtor_photos
  after delete on public.realtors
  for each row
  execute function delete_storage_object();

create trigger delete_user_avatar
  after delete on public.users
  for each row
  execute function delete_storage_object();
