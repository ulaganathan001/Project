/*
  # Add Supplier Management and Stock Alerts

  1. New Tables
    - suppliers
      - id (uuid)
      - name (text)
      - email (text)
      - phone (text)
      - address (text)
      - created_at (timestamp)
    - purchase_orders
      - id (uuid)
      - supplier_id (uuid)
      - status (text)
      - total_amount (numeric)
      - created_at (timestamp)
    - purchase_order_items
      - id (uuid)
      - purchase_order_id (uuid)
      - product_id (uuid)
      - quantity (integer)
      - price (numeric)
      - created_at (timestamp)
    - stock_alerts
      - id (uuid)
      - product_id (uuid)
      - threshold (integer)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin-only access
*/

-- Create suppliers table
CREATE TABLE suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  created_at timestamptz DEFAULT now()
);

-- Create purchase_orders table
CREATE TABLE purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES suppliers NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'sent', 'received', 'cancelled')) DEFAULT 'draft',
  total_amount numeric NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  created_at timestamptz DEFAULT now()
);

-- Create purchase_order_items table
CREATE TABLE purchase_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid REFERENCES purchase_orders NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Create stock_alerts table
CREATE TABLE stock_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products NOT NULL,
  threshold integer NOT NULL CHECK (threshold > 0),
  created_at timestamptz DEFAULT now(),
  UNIQUE (product_id)
);

-- Enable RLS
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_alerts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Suppliers are viewable by admins only"
  ON suppliers FOR ALL
  USING (is_admin());

CREATE POLICY "Purchase orders are viewable by admins only"
  ON purchase_orders FOR ALL
  USING (is_admin());

CREATE POLICY "Purchase order items are viewable by admins only"
  ON purchase_order_items FOR ALL
  USING (is_admin());

CREATE POLICY "Stock alerts are viewable by admins only"
  ON stock_alerts FOR ALL
  USING (is_admin());

-- Create function to check stock levels and create notifications
CREATE OR REPLACE FUNCTION check_stock_alerts()
RETURNS trigger AS $$
BEGIN
  -- Check if stock is below threshold
  IF EXISTS (
    SELECT 1 
    FROM stock_alerts sa 
    WHERE sa.product_id = NEW.id 
    AND NEW.stock <= sa.threshold
  ) THEN
    -- Insert into notification system (you can extend this to send emails)
    PERFORM pg_notify(
      'stock_alerts',
      json_build_object(
        'product_id', NEW.id,
        'product_name', NEW.name,
        'current_stock', NEW.stock,
        'threshold', (SELECT threshold FROM stock_alerts WHERE product_id = NEW.id)
      )::text
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for stock alerts
CREATE TRIGGER check_stock_level
  AFTER UPDATE OF stock ON products
  FOR EACH ROW
  EXECUTE FUNCTION check_stock_alerts();