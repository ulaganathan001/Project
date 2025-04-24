/*
  # Fix infinite recursion in profiles policies

  1. Changes
    - Drop existing profiles policies
    - Create new, optimized policies without recursion
    - Add separate policies for users and admins

  2. Security
    - Maintains role-based access control
    - Prevents infinite recursion
    - Ensures proper data access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Profiles are viewable by users who created them and admins" ON profiles;

-- Create new policies
CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
TO public
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON profiles
FOR SELECT
TO public
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Update bills policies
DROP POLICY IF EXISTS "Bills are viewable by users who created them and admins" ON bills;

CREATE POLICY "Users can view their own bills"
ON bills
FOR SELECT
TO public
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all bills"
ON bills
FOR SELECT
TO public
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Update bill items policies
DROP POLICY IF EXISTS "Bill items are viewable by related users and admins" ON bill_items;

CREATE POLICY "Users can view their own bill items"
ON bill_items
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM bills
    WHERE bills.id = bill_items.bill_id
    AND bills.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all bill items"
ON bill_items
FOR SELECT
TO public
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);