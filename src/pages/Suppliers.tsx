import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Building2, Plus, Pencil, Trash2, X, Truck, FileText, Search, Calendar } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { format } from 'date-fns';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface PurchaseOrderItem {
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
  };
}

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<PurchaseOrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  async function fetchSuppliers() {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');

      if (error) throw error;

      setSuppliers(data || []);
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
    } catch (err:any) {
      setError(err.message);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedSupplier) {
        const { error } = await supabase
          .from('suppliers')
          .update(formData)
          .eq('id', selectedSupplier.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('suppliers')
          .insert([formData]);
        if (error) throw error;
      }

      setShowModal(false);
      fetchSuppliers();
    } catch (err:any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        const { error } = await supabase
          .from('suppliers')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        fetchSuppliers();
      } catch (err:any) {
        setError(err.message);
      }
    }
  };

  const openModal = (supplier?: Supplier) => {
    if (supplier) {
      setSelectedSupplier(supplier);
      setFormData({
        name: supplier.name,
        email: supplier.email,
        phone: supplier.phone || '',
        address: supplier.address || '',
      });
    } else {
      setSelectedSupplier(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    }
    setShowModal(true);
  };

  const handleAddProduct = (product: Product) => {
    setSelectedProducts([
      ...selectedProducts,
      {
        product_id: product.id,
        quantity: 1,
        price: product.price,
        product: { name: product.name }
      }
    ]);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updated = [...selectedProducts];
    updated[index].quantity = quantity;
    setSelectedProducts(updated);
  };

  const updatePrice = (index: number, price: number) => {
    const updated = [...selectedProducts];
    updated[index].price = price;
    setSelectedProducts(updated);
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const createPurchaseOrder = async () => {
    if (!selectedSupplier || selectedProducts.length === 0) return;

    try {
      const orderDate = selectedDate ? new Date(selectedDate) : new Date();

      // Create purchase order
      const { data: poData, error: poError } = await supabase
        .from('purchase_orders')
        .insert([{
          supplier_id: selectedSupplier.id,
          total_amount: calculateTotal(),
          created_at: orderDate.toISOString()
        }])
        .select()
        .single();

      if (poError) throw poError;

      // Create purchase order items
      const poItems = selectedProducts.map(item => ({
        purchase_order_id: poData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        created_at: orderDate.toISOString()
      }));

      const { error: itemsError } = await supabase
        .from('purchase_order_items')
        .insert(poItems);

      if (itemsError) throw itemsError;

      setShowPOModal(false);
      setSelectedProducts([]);
      setSelectedDate('');
      setError(null);
    } catch (err:any) {
      setError(err.message);
    }
  };

  const openPurchaseOrder = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setSelectedProducts([]);
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
    setShowPOModal(true);
  };

  if (loading) {
    return <div>Loading suppliers...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Supplier</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              <th scope="col" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="font-medium">{supplier.name}</div>
                </td>
                <td>
                  <div>{supplier.email}</div>
                  <div className="text-sm text-gray-500">{supplier.phone}</div>
                </td>
                <td>{supplier.address}</td>
                <td>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => openPurchaseOrder(supplier)}
                      className="text-green-600 hover:text-green-900"
                      title="Create Purchase Order"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openModal(supplier)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit Supplier"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Supplier"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Supplier Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {selectedSupplier ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Purchase Order Modal */}
      {showPOModal && selectedSupplier && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create Purchase Order</h2>
              <button
                onClick={() => setShowPOModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium">Supplier: {selectedSupplier.name}</h3>
              
              {/* Date Selection */}
              <div className="mt-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Product Search */}
              <div className="relative">
                <div className="flex items-center border rounded-md">
                  <Search className="h-5 w-5 text-gray-400 ml-3" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchResults(true);
                    }}
                    className="w-full p-2 pl-3 rounded-md focus:outline-none"
                  />
                </div>
                {showSearchResults && searchQuery && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {products
                      .filter(product =>
                        product.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(product => (
                        <div
                          key={product.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleAddProduct(product)}
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            Current Price: ${product.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Selected Products Table */}
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
                        <td className="text-right">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                            className="w-20 text-right rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </td>
                        <td className="text-right">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updatePrice(index, parseFloat(e.target.value))}
                            className="w-24 text-right rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </td>
                        <td className="text-right">
                          ${(item.quantity * item.price).toFixed(2)}
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

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-lg font-medium">
                  Total Amount: ${calculateTotal().toFixed(2)}
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => setShowPOModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createPurchaseOrder}
                    disabled={selectedProducts.length === 0}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    Create Purchase Order
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

export default Suppliers;