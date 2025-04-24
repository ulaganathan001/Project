/*
  # Add normal user and sample products

  1. Changes
    - Insert a normal user into auth.users and profiles tables
    - Add sample electrical products with descriptions, prices, and stock levels

  2. Security
    - Uses secure UUID generation
    - Follows existing RLS policies
    - Maintains proper role assignments
*/

-- Create normal user
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
  'authenticated',
  'user@electroshop.com',
  crypt('user123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING
RETURNING id;

-- Create normal user profile
INSERT INTO public.profiles (id, role)
SELECT id, 'user'
FROM auth.users
WHERE email = 'user@electroshop.com'
ON CONFLICT (id) DO NOTHING;

-- Add sample products
INSERT INTO public.products (name, description, price, stock) VALUES
  ('LED Bulb 10W', 'Energy-efficient LED bulb with warm white light, E27 base', 9.99, 100),
  ('Extension Cord 5m', 'Heavy-duty extension cord with 3 outlets and surge protection', 24.99, 50),
  ('Digital Multimeter', 'Professional digital multimeter with auto-ranging capability', 49.99, 30),
  ('Wire Stripper', 'Automatic wire stripper and cutter for 10-24 AWG', 19.99, 45),
  ('Circuit Breaker 20A', 'Single-pole circuit breaker, 20 amp rating', 15.99, 75),
  ('Smart Switch', 'WiFi-enabled smart switch compatible with voice assistants', 29.99, 60),
  ('Power Strip', '6-outlet power strip with USB ports and surge protection', 34.99, 40),
  ('Electrical Tape Pack', 'Pack of 5 professional-grade electrical tapes', 12.99, 150),
  ('Junction Box', 'Weather-resistant outdoor junction box', 8.99, 85),
  ('Cable Ties 100pc', 'Pack of 100 heavy-duty cable ties, UV resistant', 7.99, 200);