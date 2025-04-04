-- Disable triggers temporarily for seeding
alter table users disable trigger all;
alter table realtors disable trigger all;
alter table properties disable trigger all;
alter table property_images disable trigger all;
alter table property_amenities disable trigger all;
alter table contacts disable trigger all;

-- Insert admin user
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

-- Insert realtors with their user accounts
insert into auth.users (id, email, encrypted_password, email_confirmed_at, role) values
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'joao.silva@imobprime.com.br', crypt('realtor123', gen_salt('bf')), now(), 'authenticated'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'maria.santos@imobprime.com.br', crypt('realtor123', gen_salt('bf')), now(), 'authenticated'),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'pedro.oliveira@imobprime.com.br', crypt('realtor123', gen_salt('bf')), now(), 'authenticated');

insert into public.users (id, email, full_name, role) values
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'joao.silva@imobprime.com.br', 'João Silva', 'realtor'),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'maria.santos@imobprime.com.br', 'Maria Santos', 'realtor'),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'pedro.oliveira@imobprime.com.br', 'Pedro Oliveira', 'realtor');

insert into public.realtors (id, user_id, name, phone, email, photo_url, creci, bio) values
('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'João Silva', '(11) 98765-4321', 'joao.silva@imobprime.com.br', 'https://randomuser.me/api/portraits/men/1.jpg', '123456', 'Especialista em imóveis de alto padrão com mais de 10 anos de experiência.'),
('f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Maria Santos', '(11) 98765-4322', 'maria.santos@imobprime.com.br', 'https://randomuser.me/api/portraits/women/1.jpg', '234567', 'Especializada em imóveis residenciais e investimentos imobiliários.'),
('f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Pedro Oliveira', '(11) 98765-4323', 'pedro.oliveira@imobprime.com.br', 'https://randomuser.me/api/portraits/men/2.jpg', '345678', 'Foco em imóveis comerciais e consultoria para investidores.');

-- Insert properties
insert into public.properties (
  id, title, description, type, status, is_launch,
  price, address, city, state, zip_code,
  latitude, longitude, bedrooms, bathrooms,
  area, parking_spots, realtor_id
) values
-- Apartamentos
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Apartamento de Luxo nos Jardins', 
'Luxuoso apartamento com acabamento premium, vista panorâmica e localização privilegiada.', 
'apartment', 'active', true, 1200000, 
'Rua Oscar Freire, 123', 'São Paulo', 'SP', '01426-001',
-23.562754, -46.668715, 3, 2, 120, 2,
'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15'),

('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Cobertura Duplex em Moema', 
'Espetacular cobertura duplex com terraço gourmet e vista para o parque.', 
'apartment', 'active', true, 3800000, 
'Alameda dos Anapurus, 456', 'São Paulo', 'SP', '04087-001',
-23.603434, -46.662914, 4, 4, 280, 3,
'f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a16'),

-- Casas
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Casa com Piscina em Alphaville', 
'Linda casa em condomínio fechado com piscina e área de lazer completa.', 
'house', 'active', false, 2500000, 
'Alameda Paris, 789', 'Barueri', 'SP', '06474-020',
-23.484094, -46.853156, 4, 3, 350, 4,
'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15'),

('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Mansão no Alto de Pinheiros', 
'Mansão contemporânea com projeto arquitetônico exclusivo e acabamento premium.', 
'house', 'active', true, 8500000, 
'Rua dos Pinheiros, 1000', 'São Paulo', 'SP', '05422-001',
-23.561724, -46.691754, 5, 6, 800, 6,
'f2eebc99-9c0b-4ef8-bb6d-6bb9bd380a16'),

-- Comerciais
('e5eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Sala Comercial no Itaim', 
'Sala comercial moderna com infraestrutura completa e localização estratégica.', 
'commercial', 'active', false, 950000, 
'Rua Joaquim Floriano, 100', 'São Paulo', 'SP', '04534-000',
-23.585184, -46.672914, null, 2, 50, 2,
'f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a17'),

('e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'Loja em Pinheiros', 
'Loja com alto fluxo de pessoas e excelente visibilidade.', 
'commercial', 'active', false, 1200000, 
'Rua dos Pinheiros, 500', 'São Paulo', 'SP', '05422-000',
-23.564824, -46.678914, null, 1, 80, 0,
'f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a17');

-- Insert property images
insert into public.property_images (property_id, url, is_main, order_index) values
-- Apartamento de Luxo
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', true, 0),
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', false, 1),

-- Cobertura Duplex
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', true, 0),
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', false, 1),

-- Casa com Piscina
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', true, 0),
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', false, 1);

-- Insert property amenities
insert into public.property_amenities (property_id, name) values
-- Apartamento de Luxo
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Academia'),
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Piscina'),
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Varanda Gourmet'),
('e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Segurança 24h'),

-- Cobertura Duplex
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Terraço'),
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Churrasqueira'),
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Spa'),
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Vista Panorâmica'),

-- Casa com Piscina
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Piscina'),
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Jardim'),
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Área Gourmet'),
('e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Condomínio Fechado');

-- Insert sample contacts
insert into public.contacts (name, email, phone, subject, message, property_id, status) values
('Ana Paula', 'ana.paula@email.com', '(11) 98765-4324', 'Interesse no Apartamento de Luxo', 'Gostaria de agendar uma visita para conhecer o apartamento.', 'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'new'),
('Carlos Eduardo', 'carlos.eduardo@email.com', '(11) 98765-4325', 'Dúvidas sobre a Cobertura', 'Poderia me passar mais informações sobre as condições de pagamento?', 'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'contacted'),
('Beatriz Silva', 'beatriz.silva@email.com', '(11) 98765-4326', 'Visita à Casa em Alphaville', 'Tenho interesse em conhecer a casa. Quais os horários disponíveis?', 'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'new');

-- Re-enable triggers
alter table users enable trigger all;
alter table realtors enable trigger all;
alter table properties enable trigger all;
alter table property_images enable trigger all;
alter table property_amenities enable trigger all;
alter table contacts enable trigger all;
