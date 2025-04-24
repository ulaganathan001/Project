/*
  # Fix recursive policies with is_admin function

  1. Changes
    - Create is_admin function for policy checks
    - Recreate policies using the new function
    - Simplify policy logic to prevent recursion

  2. Security
    - Maintains role-based access control
    - Eliminates recursive queries
    - Ensures proper data access
*/

-- Create is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    JOIN profiles ON profiles.id = auth.users.id
    WHERE auth.users.id = auth.uid()
    AND profiles.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view their own bills" ON bills;
DROP POLICY IF EXISTS "Admins can view all bills" ON bills;
DROP POLICY IF EXISTS "Users can view their own bill items" ON bill_items;
DROP POLICY IF EXISTS "Admins can view all bill items" ON bill_items;

-- Create new profile policies
CREATE POLICY "View own profile or all if admin"
ON profiles
FOR SELECT
TO public
USING (
  auth.uid() = id OR is_admin()
);

-- Create new bills policies
CREATE POLICY "View own bills or all if admin"
ON bills
FOR SELECT
TO public
USING (
  user_id = auth.uid() OR is_admin()
);

-- Create new bill items policies
CREATE POLICY "View own bill items or all if admin"
ON bill_items
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM bills
    WHERE bills.id = bill_items.bill_id
    AND (bills.user_id = auth.uid() OR is_admin())
  )
);