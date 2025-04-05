-- Insert users into auth.users first
INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES
('d7bed23c5f8944519fd8b6912b18f2c7', 'admin@imobiliaria.com', 
  jsonb_build_object('full_name', 'Admin Sistema', 'phone', '11999887766', 'role', 'admin')),
('e8b9d23f6f8944529fd8b6912b18f2c8', 'joao.corretor@imobiliaria.com',
  jsonb_build_object('full_name', 'João Silva', 'phone', '11988776655', 'role', 'agent')),
('f9c9d23f7f8944539fd8b6912b18f2c9', 'maria.corretora@imobiliaria.com',
  jsonb_build_object('full_name', 'Maria Santos', 'phone', '11977665544', 'role', 'agent')),
('a1b9d23f8f8944549fd8b6912b18f2ca', 'carlos@email.com',
  jsonb_build_object('full_name', 'Carlos Cliente', 'phone', '11966554433', 'role', 'client')),
('b2b9d23f9f8944559fd8b6912b18f2cb', 'ana@email.com',
  jsonb_build_object('full_name', 'Ana Cliente', 'phone', '11955443322', 'role', 'client'));
