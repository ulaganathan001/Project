import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Receipt, Plus, X, ShoppingCart, Printer, Eye, Search, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useAuthStore } from '../lib/store';
import { jsPDF } from 'jspdf';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface BillItem {
  product_id: string;
  quantity: number;
  price_at_time: number;
  product?: {
    name: string;
  };
}

interface Bill {
  id: string;
  total_amount: number;
  created_at: string;
}

function Bills() {
  const user = useAuthStore((state) => state.user);
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<BillItem[]>([]);
  const [productQuantity, setProductQuantity] = useState<string>('1');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    fetchBills();
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  async function fetchBills() {
    try {
      const { data, error } = await supabase
        .from('bills')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBills(data || []);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;

      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (err:any) {
      setError(err.message);
    }
  }

  async function fetchBillItems(billId: string) {
    try {
      const { data, error } = await supabase
        .from('bill_items')
        .select(`
          *,
          product:products(name)
        `)
        .eq('bill_id', billId);

      if (error) throw error;

      setBillItems(data || []);
    } catch (err:any) {
      setError(err.message);
    }
  }

  const handleViewDetails = async (bill: Bill) => {
    setSelectedBill(bill);
    await fetchBillItems(bill.id);
    setShowDetailsModal(true);
  };

  const handlePrintBill = (bill: Bill) => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 20;

    // Header
    doc.setFontSize(20);
    doc.text('ElectroShop Bill', 20, y);
    y += lineHeight * 2;

    // Bill details
    doc.setFontSize(12);
    doc.text(`Bill ID: ${bill.id}`, 20, y);
    y += lineHeight;
    doc.text(`Date: ${format(new Date(bill.created_at), 'PPp')}`, 20, y);
    y += lineHeight * 1.5;

    // Items header
    doc.setFontSize(14);
    doc.text('Items:', 20, y);
    y += lineHeight;

    // Table header
    doc.setFontSize(12);
    doc.text('Product', 20, y);
    doc.text('Qty', 120, y);
    doc.text('Price', 140, y);
    doc.text('Total', 170, y);
    y += lineHeight;

    // Items
    billItems.forEach(item => {
      const total = item.quantity * item.price_at_time;
      doc.text(item.product?.name || '', 20, y);
      doc.text(item.quantity.toString(), 120, y);
      doc.text(`$${item.price_at_time.toFixed(2)}`, 140, y);
      doc.text(`$${total.toFixed(2)}`, 170, y);
      y += lineHeight;
    });

    y += lineHeight;
    doc.text(`Total Amount: $${bill.total_amount.toFixed(2)}`, 140, y);

    // Save the PDF
    doc.save(`bill-${bill.id}.pdf`);
  };

  const handleAddProduct = () => {
    if (!selectedProductId || parseInt(productQuantity) < 1) return;

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    // Check if quantity is available in stock
    if (product.stock < parseInt(productQuantity)) {
      setError(`Only ${product.stock} items available in stock`);
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      {
        product_id: selectedProductId,
        quantity: parseInt(productQuantity),
        price_at_time: product.price,
        product: { name: product.name }
      }
    ]);

    setSelectedProductId('');
    setProductQuantity('1');
    setSearchQuery('');
    setError(null);
  };

  const handleSearchSelect = (product: Product) => {
    setSelectedProductId(product.id);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      return total + (item.price_at_time * item.quantity);
    }, 0);
  };

  const handleCreateBill = async () => {
    if (selectedProducts.length === 0 || !user) return;

    try {
      const billDate = selectedDate ? new Date(selectedDate) : new Date();

      // Start a transaction by creating the bill first
      const { data: billData, error: billError } = await supabase
        .from('bills')
        .insert([
          {
            user_id: user.id,
            total_amount: calculateTotal(),
            created_at: billDate.toISOString()
          }
        ])
        .select()
        .single();

      if (billError) throw billError;

      // Create bill items and update stock
      for (const item of selectedProducts) {
        // Insert bill item
        const { error: itemError } = await supabase
          .from('bill_items')
          .insert({
            bill_id: billData.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_time: item.price_at_time,
            created_at: billDate.toISOString()
          });

        if (itemError) throw itemError;

        // Update product stock
        const { error: stockError } = await supabase
          .rpc('update_product_stock', {
            p_product_id: item.product_id,
            p_quantity: item.quantity
          });

        if (stockError) throw stockError;
      }

      setShowModal(false);
      setSelectedProducts([]);
      fetchBills();
      fetchProducts(); // Refresh products to show updated stock
    } catch (err:any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading bills...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bills</h1>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Bill
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Bill ID</th>
              <th scope="col">Date</th>
              <th scope="col" className="text-right">Total Amount</th>
              <th scope="col" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="flex items-center">
                  <Receipt className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="font-medium">{bill.id.slice(0, 8)}...</span>
                </td>
                <td>{format(new Date(bill.created_at), 'PPp')}</td>
                <td className="text-right">${bill.total_amount.toFixed(2)}</td>
                <td>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleViewDetails(bill)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handlePrintBill(bill)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Printer className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Bill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Bill</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date Selection */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative mb-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSearchResults(true);
                      }}
                      onFocus={() => setShowSearchResults(true)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {showSearchResults && searchQuery && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                        {filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                            onClick={() => handleSearchSelect(product)}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{product.name}</span>
                              <span className="text-gray-500">${product.price.toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              Stock: {product.stock}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id} disabled={product.stock === 0}>
                        {product.name} - ${product.price.toFixed(2)} - {product.stock} in stock
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="number"
                  min="1"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add
                </button>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Selected Products</h3>
                {selectedProducts.length === 0 ? (
                  <div className="text-gray-500 flex items-center justify-center py-4">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    No products added yet
                  </div>
                ) : (
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th className="text-right">Quantity</th>
                          <th className="text-right">Price</th>
                          <th className="text-right">Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProducts.map((item, index) => (
                          <tr key={index}>
                            <td>{item.product?.name}</td>
                            <td className="text-right">{item.quantity}</td>
                            <td className="text-right">${item.price_at_time.toFixed(2)}</td>
                            <td className="text-right">
                              ${(item.quantity * item.price_at_time).toFixed(2)}
                            </td>
                            <td>
                              <button
                                onClick={() => removeProduct(index)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-lg font-medium">
                  Total: ${calculateTotal().toFixed(2)}
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateBill}
                    disabled={selectedProducts.length === 0}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    Create Bill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bill Details Modal */}
      {showDetailsModal && selectedBill && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Bill Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Bill ID</p>
                  <p className="text-sm font-medium">{selectedBill.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-sm font-medium">
                    {format(new Date(selectedBill.created_at), 'PPp')}
                  </p>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Items</h3>
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="text-right">Quantity</th>
                        <th className="text-right">Price</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product?.name}</td>
                          <td className="text-right">{item.quantity}</td>
                          <td className="text-right">${item.price_at_time.toFixed(2)}</td>
                          <td className="text-right">
                            ${(item.quantity * item.price_at_time).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-lg font-medium">
                  Total Amount: ${selectedBill.total_amount.toFixed(2)}
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handlePrintBill(selectedBill)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Bill
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bills;