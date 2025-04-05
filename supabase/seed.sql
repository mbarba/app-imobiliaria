-- Clear existing data safely
DELETE FROM favorites;
DELETE FROM contacts;
DELETE FROM property_images;
DELETE FROM property_addresses;
DELETE FROM properties;

-- Note: users table will be populated by the trigger after auth.users insertion

-- Insert properties
INSERT INTO properties (id, title, description, type, status, price, area_size, bedrooms, bathrooms, suites, parking_spots, is_launch, is_featured, agent_id) VALUES
-- Apartamentos
('c3b9d23f1f8944569fd8b6912b18f2cc', 'Apartamento Luxuoso em Moema', 'Apartamento de alto padrão com acabamento premium, varanda gourmet e vista panorâmica.', 'apartment', 'available', 1200000.00, 120, 3, 4, 1, 2, true, true, 'e8b9d23f6f8944529fd8b6912b18f2c8'),
('d4b9d23f2f8944579fd8b6912b18f2cd', 'Studio Moderno Pinheiros', 'Studio contemporâneo com conceito aberto e localização privilegiada.', 'apartment', 'available', 450000.00, 45, 1, 1, 0, 1, false, true, 'e8b9d23f6f8944529fd8b6912b18f2c8'),
('e5b9d23f3f8944589fd8b6912b18f2ce', 'Apartamento Garden Brooklin', 'Garden com amplo jardim privativo e área gourmet.', 'apartment', 'available', 980000.00, 150, 3, 2, 1, 2, true, false, 'f9c9d23f7f8944539fd8b6912b18f2c9'),

-- Casas
('f6b9d23f4f8944599fd8b6912b18f2cf', 'Casa de Alto Padrão Alphaville', 'Casa em condomínio fechado com acabamento de luxo e área de lazer completa.', 'house', 'available', 2500000.00, 350, 4, 5, 2, 4, false, true, 'f9c9d23f7f8944539fd8b6912b18f2c9'),
('a7b9d23f5f8944609fd8b6912b18f2ca', 'Casa Térrea Campo Belo', 'Casa térrea com quintal amplo e edícula.', 'house', 'available', 1800000.00, 200, 3, 3, 1, 2, false, false, 'e8b9d23f6f8944529fd8b6912b18f2c8'),

-- Coberturas
('b8b9d23f6f8944619fd8b6912b18f2cb', 'Cobertura Duplex Itaim', 'Cobertura duplex com piscina privativa e vista para o Parque do Povo.', 'penthouse', 'available', 3500000.00, 300, 4, 5, 2, 4, true, true, 'f9c9d23f7f8944539fd8b6912b18f2c9'),

-- Salas Comerciais
('c9b9d23f7f8944629fd8b6912b18f2cc', 'Sala Comercial Faria Lima', 'Sala comercial em prédio triple A com vista panorâmica.', 'commercial', 'available', 950000.00, 50, 0, 1, 0, 2, false, true, 'e8b9d23f6f8944529fd8b6912b18f2c8'),

-- Terrenos
('d1b9d23f8f8944639fd8b6912b18f2cd', 'Terreno Residencial Granja Viana', 'Terreno em condomínio fechado com infraestrutura completa.', 'land', 'available', 500000.00, 500, 0, 0, 0, 0, false, false, 'f9c9d23f7f8944539fd8b6912b18f2c9');

-- Insert property addresses
INSERT INTO property_addresses (property_id, street, number, complement, neighborhood, city, state, postal_code, latitude, longitude) VALUES
('c3b9d23f1f8944569fd8b6912b18f2cc', 'Alameda dos Anapurus', '1800', 'Apto 141', 'Moema', 'São Paulo', 'SP', '04087-003', -23.593394, -46.663754),
('d4b9d23f2f8944579fd8b6912b18f2cd', 'Rua dos Pinheiros', '1000', 'Apto 72', 'Pinheiros', 'São Paulo', 'SP', '05422-001', -23.566428, -46.672789),
('e5b9d23f3f8944589fd8b6912b18f2ce', 'Rua Michigan', '900', 'Apto 11', 'Brooklin', 'São Paulo', 'SP', '04566-001', -23.621815, -46.687539),
('f6b9d23f4f8944599fd8b6912b18f2cf', 'Alameda Paris', '500', 'Casa 15', 'Alphaville', 'Barueri', 'SP', '06470-130', -23.484562, -46.853242),
('a7b9d23f5f8944609fd8b6912b18f2ca', 'Rua Pascal', '700', NULL, 'Campo Belo', 'São Paulo', 'SP', '04618-002', -23.621690, -46.663298),
('b8b9d23f6f8944619fd8b6912b18f2cb', 'Rua João Cachoeira', '1200', 'Cobertura', 'Itaim Bibi', 'São Paulo', 'SP', '04535-012', -23.585136, -46.672774),
('c9b9d23f7f8944629fd8b6912b18f2cc', 'Avenida Brigadeiro Faria Lima', '3500', 'Cj 142', 'Itaim Bibi', 'São Paulo', 'SP', '04538-133', -23.586377, -46.681694),
('d1b9d23f8f8944639fd8b6912b18f2cd', 'Rua das Araucárias', 'Lote 42', 'Quadra 7', 'Granja Viana', 'Cotia', 'SP', '06709-015', -23.595392, -46.849723);

-- Insert property images
INSERT INTO property_images (property_id, url, is_main, order_index) VALUES
-- Apartamento Moema
('c3b9d23f1f8944569fd8b6912b18f2cc', 'https://example-bucket.supabase.co/property-images/moema-living.jpg', true, 0),
('c3b9d23f1f8944569fd8b6912b18f2cc', 'https://example-bucket.supabase.co/property-images/moema-kitchen.jpg', false, 1),
('c3b9d23f1f8944569fd8b6912b18f2cc', 'https://example-bucket.supabase.co/property-images/moema-bedroom.jpg', false, 2),

-- Studio Pinheiros
('d4b9d23f2f8944579fd8b6912b18f2cd', 'https://example-bucket.supabase.co/property-images/pinheiros-studio.jpg', true, 0),
('d4b9d23f2f8944579fd8b6912b18f2cd', 'https://example-bucket.supabase.co/property-images/pinheiros-bathroom.jpg', false, 1),

-- Garden Brooklin
('e5b9d23f3f8944589fd8b6912b18f2ce', 'https://example-bucket.supabase.co/property-images/brooklin-garden.jpg', true, 0),
('e5b9d23f3f8944589fd8b6912b18f2ce', 'https://example-bucket.supabase.co/property-images/brooklin-living.jpg', false, 1),

-- Casa Alphaville
('f6b9d23f4f8944599fd8b6912b18f2cf', 'https://example-bucket.supabase.co/property-images/alphaville-facade.jpg', true, 0),
('f6b9d23f4f8944599fd8b6912b18f2cf', 'https://example-bucket.supabase.co/property-images/alphaville-pool.jpg', false, 1),

-- Outros imóveis
('b8b9d23f6f8944619fd8b6912b18f2cb', 'https://example-bucket.supabase.co/property-images/itaim-penthouse.jpg', true, 0),
('c9b9d23f7f8944629fd8b6912b18f2cc', 'https://example-bucket.supabase.co/property-images/faria-lima-office.jpg', true, 0),
('d1b9d23f8f8944639fd8b6912b18f2cd', 'https://example-bucket.supabase.co/property-images/granja-land.jpg', true, 0);

-- Insert contacts
INSERT INTO contacts (name, email, phone, subject, message, property_id, status) VALUES
('Roberto Interessado', 'roberto@email.com', '11944332211', 'Interesse no Apartamento Moema', 'Gostaria de agendar uma visita ao apartamento.', 'c3b9d23f1f8944569fd8b6912b18f2cc', 'pending'),
('Sandra Compradora', 'sandra@email.com', '11933221100', 'Proposta Cobertura Itaim', 'Tenho interesse em fazer uma proposta.', 'b8b9d23f6f8944619fd8b6912b18f2cb', 'pending'),
('Empresa ABC', 'contato@empresaabc.com', '11922110099', 'Sala Comercial Faria Lima', 'Precisamos de informações sobre a sala comercial.', 'c9b9d23f7f8944629fd8b6912b18f2cc', 'pending');

-- Insert favorites
INSERT INTO favorites (user_id, property_id) VALUES
('a1b9d23f8f8944549fd8b6912b18f2ca', 'c3b9d23f1f8944569fd8b6912b18f2cc'),
('a1b9d23f8f8944549fd8b6912b18f2ca', 'b8b9d23f6f8944619fd8b6912b18f2cb'),
('b2b9d23f9f8944559fd8b6912b18f2cb', 'd4b9d23f2f8944579fd8b6912b18f2cd');
