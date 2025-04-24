/*
  # Initial Schema for Electrical Shop Management System

  1. New Tables
    - users (handled by Supabase Auth)
    - profiles
      - id (uuid, references auth.users)
      - role (text)
      - created_at (timestamp)
    - products
      - id (uuid)
      - name (text)
      - description (text)
      - price (numeric)
      - stock (integer)
      - created_at (timestamp)
    - bills
      - id (uuid)
      - user_id (uuid, references profiles)
      - total_amount (numeric)
      - created_at (timestamp)
    - bill_items
      - id (uuid)
      - bill_id (uuid, references bills)
      - product_id (uuid, references products)
      - quantity (integer)
      - price_at_time (numeric)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  role text NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at timestamptz DEFAULT now()
);

-- Create bills table
CREATE TABLE bills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  created_at timestamptz DEFAULT now()
);

-- Create bill_items table
CREATE TABLE bill_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id uuid REFERENCES bills NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_time numeric NOT NULL CHECK (price_at_time >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by users who created them and admins"
  ON profiles FOR SELECT
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products policies
CREATE POLICY "Products are viewable by authenticated users"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Products are editable by admins only"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Bills policies
CREATE POLICY "Bills are viewable by users who created them and admins"
  ON bills FOR SELECT
  USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Bills can be created by authenticated users"
  ON bills FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Bill items policies
CREATE POLICY "Bill items are viewable by related users and admins"
  ON bill_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bills 
      WHERE bills.id = bill_items.bill_id 
      AND (
        bills.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM profiles 
          WHERE id = auth.uid() AND role = 'admin'
        )
      )
    )
  );

CREATE POLICY "Bill items can be created by authenticated users"
  ON bill_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bills 
      WHERE bills.id = bill_items.bill_id 
      AND bills.user_id = auth.uid()
    )
  );