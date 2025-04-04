-- Configurar limites e tipos de arquivo permitidos para cada bucket
update storage.buckets
set public = true,
    file_size_limit = 5242880, -- 5MB
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'property-images';

update storage.buckets
set public = true,
    file_size_limit = 5242880, -- 5MB
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'realtor-photos';

update storage.buckets
set public = true,
    file_size_limit = 2097152, -- 2MB
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'user-avatars';

-- Remover políticas existentes
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated users can upload property images" on storage.objects;
drop policy if exists "Authenticated users can upload their photos" on storage.objects;
drop policy if exists "Users can upload their avatars" on storage.objects;

-- Políticas detalhadas para cada bucket
-- property-images
create policy "Public can view property images"
on storage.objects for select
using (bucket_id = 'property-images');

create policy "Realtors can upload property images"
on storage.objects for insert
with check (
  bucket_id = 'property-images'
  and auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and (storage.foldername(name))[1] in (
        select id::text from properties
        where realtor_id in (
          select id from realtors where user_id = auth.uid()
        )
      )
    )
  )
);

create policy "Property owners can update images"
on storage.objects for update
using (
  bucket_id = 'property-images'
  and auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and (storage.foldername(name))[1] in (
        select id::text from properties
        where realtor_id in (
          select id from realtors where user_id = auth.uid()
        )
      )
    )
  )
);

create policy "Property owners can delete images"
on storage.objects for delete
using (
  bucket_id = 'property-images'
  and auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and (storage.foldername(name))[1] in (
        select id::text from properties
        where realtor_id in (
          select id from realtors where user_id = auth.uid()
        )
      )
    )
  )
);

-- realtor-photos
create policy "Public can view realtor photos"
on storage.objects for select
using (bucket_id = 'realtor-photos');

create policy "Realtors can manage their photos"
on storage.objects for insert
with check (
  bucket_id = 'realtor-photos'
  and auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and (storage.foldername(name))[1] = auth.uid()::text
    )
  )
);

create policy "Realtors can update their photos"
on storage.objects for update
using (
  bucket_id = 'realtor-photos'
  and auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and (storage.foldername(name))[1] = auth.uid()::text
    )
  )
);

create policy "Realtors can delete their photos"
on storage.objects for delete
using (
  bucket_id = 'realtor-photos'
  and auth.role() = 'authenticated'
  and (
    auth.jwt() ->> 'role' = 'admin'
    or (
      auth.jwt() ->> 'role' = 'realtor'
      and (storage.foldername(name))[1] = auth.uid()::text
    )
  )
);

-- user-avatars
create policy "Public can view user avatars"
on storage.objects for select
using (bucket_id = 'user-avatars');

create policy "Users can upload their avatar"
on storage.objects for insert
with check (
  bucket_id = 'user-avatars'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update their avatar"
on storage.objects for update
using (
  bucket_id = 'user-avatars'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their avatar"
on storage.objects for delete
using (
  bucket_id = 'user-avatars'
  and auth.role() = 'authenticated'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Criar funções auxiliares para limpeza automática
create or replace function delete_storage_object(bucket text, object_path text)
returns void as $$
begin
  delete from storage.objects
  where bucket_id = bucket and name = object_path;
end;
$$ language plpgsql security definer;

-- Trigger para deletar imagens quando um imóvel é removido
create or replace function delete_property_images()
returns trigger as $$
begin
  perform delete_storage_object('property-images', old.id || '/' || name)
  from storage.objects
  where bucket_id = 'property-images'
    and storage.foldername(name) = old.id::text;
  return old;
end;
$$ language plpgsql security definer;

create trigger property_delete_images
before delete on properties
for each row
execute function delete_property_images();

-- Trigger para deletar foto quando um corretor é removido
create or replace function delete_realtor_photo()
returns trigger as $$
begin
  perform delete_storage_object('realtor-photos', old.user_id || '/' || name)
  from storage.objects
  where bucket_id = 'realtor-photos'
    and storage.foldername(name) = old.user_id::text;
  return old;
end;
$$ language plpgsql security definer;

create trigger realtor_delete_photo
before delete on realtors
for each row
execute function delete_realtor_photo();

-- Trigger para deletar avatar quando um usuário é removido
create or replace function delete_user_avatar()
returns trigger as $$
begin
  perform delete_storage_object('user-avatars', old.id || '/' || name)
  from storage.objects
  where bucket_id = 'user-avatars'
    and storage.foldername(name) = old.id::text;
  return old;
end;
$$ language plpgsql security definer;

create trigger user_delete_avatar
before delete on users
for each row
execute function delete_user_avatar();
