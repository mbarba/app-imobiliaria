-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('property-images', 'property-images', true);

-- Set up storage policies for property images
CREATE POLICY "Public can view property images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'property-images' AND
    auth.role() IN ('authenticated', 'service_role')
  );

CREATE POLICY "Users can update their own property images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'property-images' AND
    auth.uid() = owner
  );

CREATE POLICY "Users can delete their own property images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'property-images' AND
    auth.uid() = owner
  );
