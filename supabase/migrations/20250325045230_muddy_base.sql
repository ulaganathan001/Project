/*
  # Add admin user

  1. Changes
    - Insert an admin user into the profiles table
    - Email: admin@electroshop.com
    - Role: admin

  2. Security
    - Uses secure UUID generation for user ID
    - Follows existing RLS policies
*/

-- First, create the auth.users entry
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
  'admin@electroshop.com',
  crypt('admin123', gen_salt('bf')),
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

-- Then, create the profile with admin role
INSERT INTO public.profiles (id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'admin@electroshop.com'
ON CONFLICT (id) DO NOTHING;