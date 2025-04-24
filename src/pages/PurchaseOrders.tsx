import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FileText, Package, Truck, X, Eye, CheckCircle, XCircle, AlertCircle, Search, Calendar, DollarSign } from 'lucide-react';
import { format, parseISO, isWithinInterval } from 'date-fns';

interface PurchaseOrder {
  id: string;
  supplier_id: string;
  status: 'draft' | 'sent' | 'received' | 'cancelled';
  total_amount: number;
  created_at: string;
  supplier: {
    name: string;
    email: string;
  };
}

interface PurchaseOrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    stock: number;
  };
}

function PurchaseOrders() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<PurchaseOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dateRangeEnd, setDateRangeEnd] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchQuery, dateRangeStart, dateRangeEnd, isDateFilterActive, orders]);

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by supplier name
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date range
    if (isDateFilterActive) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.created_at);
        const startDate = new Date(dateRangeStart);
        const endDate = new Date(dateRangeEnd);
        endDate.setHours(23, 59, 59, 999);

        return isWithinInterval(orderDate, { start: startDate, end: endDate });
      });
    }

    setFilteredOrders(filtered);
  };

  const calculateTotalPurchaseAmount = () => {
    return filteredOrders.reduce((total, order) => total + order.total_amount, 0);
  };

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select(`
          *,
          supplier:suppliers(name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
      setFilteredOrders(data || []);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrderItems(orderId: string) {
    try {
      const { data, error } = await supabase
        .from('purchase_order_items')
        .select(`
          *,
          product:products(name, stock)
        `)
        .eq('purchase_order_id', orderId);

      if (error) throw error;

      setOrderItems(data || []);
    } catch (err:any) {
      setError(err.message);
    }
  }

  const handleViewDetails = async (order: PurchaseOrder) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
    setShowDetailsModal(true);
  };

  const updateOrderStatus = async (orderId: string, newStatus: PurchaseOrder['status']) => {
    try {
      const { error } = await supabase
        .from('purchase_orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // If order is received, update product stock
      if (newStatus === 'received') {
        for (const item of orderItems) {
          const { error: stockError } = await supabase
            .rpc('update_product_stock', {
              p_product_id: item.product_id,
              p_quantity: -item.quantity // Negative because we're adding stock
            });

          if (stockError) throw stockError;
        }
      }

      fetchOrders();
      setShowDetailsModal(false);
    } catch (err:any) {
      setError(err.message);
    }
  };

  const getStatusBadge = (status: PurchaseOrder['status']) => {
    const badges = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      received: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const icons = {
      draft: <FileText className="h-4 w-4" />,
      sent: <Truck className="h-4 w-4" />,
      received: <CheckCircle className="h-4 w-4" />,
      cancelled: <XCircle className="h-4 w-4" />
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status]}`}>
        {icons[status]}
        <span className="ml-1 capitalize">{status}</span>
      </span>
    );
  };

  if (loading) {
    return <div>Loading purchase orders...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Supplier Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by supplier name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={dateRangeStart}
              onChange={(e) => setDateRangeStart(e.target.value)}
              className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={!isDateFilterActive}
            />
            <span>to</span>
            <input
              type="date"
              value={dateRangeEnd}
              onChange={(e) => setDateRangeEnd(e.target.value)}
              className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={!isDateFilterActive}
            />
            <button
              onClick={() => setIsDateFilterActive(!isDateFilterActive)}
              className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                isDateFilterActive
                  ? 'bg-blue-600 text-white border-transparent'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {isDateFilterActive ? 'Clear Date Filter' : 'Filter by Date'}
            </button>
          </div>
        </div>

        {/* Total Purchase Amount */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-end space-x-2 text-lg font-medium">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Total Purchase Amount:</span>
            <span className="text-green-600">${calculateTotalPurchaseAmount().toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Supplier</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-right">Total Amount</th>
              <th scope="col" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id.slice(0, 8)}...</td>
                <td>{order.supplier.name}</td>
                <td>{format(new Date(order.created_at), 'PPp')}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td className="text-right">${order.total_amount.toFixed(2)}</td>
                <td>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Purchase Order Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order ID</h3>
                <p className="mt-1">{selectedOrder.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">{getStatusBadge(selectedOrder.status)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                <p className="mt-1">{selectedOrder.supplier.name}</p>
                <p className="text-sm text-gray-500">{selectedOrder.supplier.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1">{format(new Date(selectedOrder.created_at), 'PPp')}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Order Items</h3>
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
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product.name}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">${item.price.toFixed(2)}</td>
                        <td className="text-right">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-lg font-medium">
                Total Amount: ${selectedOrder.total_amount.toFixed(2)}
              </div>
              <div className="space-x-3">
                {selectedOrder.status === 'draft' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'sent')}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Mark as Sent
                    </button>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  </>
                )}
                {selectedOrder.status === 'sent' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'received')}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    Mark as Received
                  </button>
                )}
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
      )}
    </div>
  );
}

export default PurchaseOrders;