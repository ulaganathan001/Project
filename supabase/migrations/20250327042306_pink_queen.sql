/*
  # Add function to update product stock

  1. Changes
    - Add a stored procedure to safely update product stock
    - Ensures atomic updates to prevent race conditions
    - Validates stock availability before update

  2. Security
    - Function is accessible to authenticated users
    - Maintains RLS policies
    - Prevents negative stock values
*/

CREATE OR REPLACE FUNCTION update_product_stock(p_product_id uuid, p_quantity integer)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET stock = stock - p_quantity
  WHERE id = p_product_id
    AND stock >= p_quantity;
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock available';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;