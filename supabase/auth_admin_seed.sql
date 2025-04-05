-- Inserir usuário admin com senha hash
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'admin',
  'admin@imobprime.com',
  crypt('Admin123!', gen_salt('bf')), -- Senha: Admin123!
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin","full_name":"Administrador"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Inserir outro usuário admin se necessário
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'agent',
  'corretor@imobprime.com',
  crypt('Corretor123!', gen_salt('bf')), -- Senha: Corretor123!
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"agent","full_name":"Corretor"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
