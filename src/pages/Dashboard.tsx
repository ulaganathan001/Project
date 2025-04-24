import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabase';
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  TrendingUp,
  Calendar,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  AlertTriangle,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  Battery,
  CircuitBoard,
  ArrowRightLeft
} from 'lucide-react';
import { format, parseISO, isWithinInterval, startOfDay, startOfWeek, startOfMonth, startOfYear, subMonths, endOfDay, endOfWeek, endOfMonth, endOfYear } from 'date-fns';

interface SalesMetrics {
  totalSales: number;
  totalProducts: number;
  averageOrderValue: number;
  lowStockProducts: number;
  revenueGrowth: number;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  lowStockItems: Array<{
    name: string;
    stock: number;
  }>;
}

interface TimeframeMetrics {
  [key: string]: {
    sales: number;
    products: number;
    purchases: number;
  };
}

interface ComparisonMetrics {
  totalSales: number;
  totalPurchases: number;
  difference: number;
  percentageDifference: number;
}

function Dashboard() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [metrics, setMetrics] = useState<SalesMetrics>({
    totalSales: 0,
    totalProducts: 0,
    averageOrderValue: 0,
    lowStockProducts: 0,
    revenueGrowth: 0,
    topProducts: [],
    lowStockItems: []
  });
  const [timeframeData, setTimeframeData] = useState<TimeframeMetrics>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparisonDateStart, setComparisonDateStart] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [comparisonDateEnd, setComparisonDateEnd] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [comparisonMetrics, setComparisonMetrics] = useState<ComparisonMetrics>({
    totalSales: 0,
    totalPurchases: 0,
    difference: 0,
    percentageDifference: 0
  });

  useEffect(() => {
    if (isAdmin) {
      fetchMetrics();
      fetchTimeframeData();
    }
  }, [isAdmin, selectedTimeframe]);

  useEffect(() => {
    if (isAdmin && comparisonDateStart && comparisonDateEnd) {
      fetchComparisonData();
    }
  }, [isAdmin, comparisonDateStart, comparisonDateEnd]);

  const getTimeRange = () => {
    const now = new Date();
    let start, end;
    
    switch (selectedTimeframe) {
      case 'day':
        start = startOfDay(now);
        end = endOfDay(now);
        break;
      case 'week':
        start = startOfWeek(now);
        end = endOfWeek(now);
        break;
      case 'month':
        start = startOfMonth(now);
        end = endOfMonth(now);
        break;
      case 'year':
        start = startOfYear(now);
        end = endOfYear(now);
        break;
      default:
        start = startOfMonth(now);
        end = endOfMonth(now);
    }
    return { start, end };
  };

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const { start, end } = getTimeRange();

      // Get bills with items and products for the selected timeframe
      const { data: billsData, error: billsError } = await supabase
        .from('bills')
        .select(`
          total_amount,
          created_at,
          bill_items (
            quantity,
            price_at_time,
            products (
              name
            )
          )
        `)
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (billsError) throw billsError;

      // Calculate total sales and products for the timeframe
      const totalSales = billsData?.reduce((sum, bill) => sum + Number(bill.total_amount), 0) || 0;
      const totalProducts = billsData?.reduce((sum, bill) => 
        sum + bill.bill_items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0) || 0;

      // Calculate revenue growth
      const previousStart = subMonths(start, 1);
      const previousEnd = start;

      const { data: previousBillsData } = await supabase
        .from('bills')
        .select('total_amount')
        .gte('created_at', previousStart.toISOString())
        .lt('created_at', previousEnd.toISOString());

      const previousSales = previousBillsData?.reduce((sum, bill) => sum + Number(bill.total_amount), 0) || 0;
      const revenueGrowth = previousSales ? ((totalSales - previousSales) / previousSales) * 100 : 0;

      // Calculate top products
      const productSales = new Map();
      billsData?.forEach(bill => {
        bill.bill_items.forEach(item => {
          const key = item.products.name;
          if (!productSales.has(key)) {
            productSales.set(key, { quantity: 0, revenue: 0 });
          }
          const current = productSales.get(key);
          productSales.set(key, {
            quantity: current.quantity + item.quantity,
            revenue: current.revenue + (item.quantity * item.price_at_time)
          });
        });
      });

      const topProducts = Array.from(productSales.entries())
        .map(([name, data]) => ({
          name,
          quantity: data.quantity,
          revenue: data.revenue
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      // Get low stock products
      const { data: lowStockData, error: stockError } = await supabase
        .from('products')
        .select('name, stock')
        .lt('stock', 10)
        .order('stock', { ascending: true });

      if (stockError) throw stockError;

      // Calculate average order value
      const averageOrderValue = billsData?.length ? totalSales / billsData.length : 0;

      setMetrics({
        totalSales,
        totalProducts,
        averageOrderValue,
        lowStockProducts: lowStockData?.length || 0,
        revenueGrowth,
        topProducts,
        lowStockItems: lowStockData || []
      });
    } catch (err:any) {
      console.error('Error fetching metrics:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeframeData = async () => {
    try {
      const { start, end } = getTimeRange();
      
      const { data: timeframeData, error: timeframeError } = await supabase
        .from('bills')
        .select(`
          created_at,
          total_amount,
          bill_items (quantity)
        `)
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (timeframeError) throw timeframeError;

      const metrics: TimeframeMetrics = {};
      
      timeframeData?.forEach(bill => {
        const date = format(new Date(bill.created_at), 
          selectedTimeframe === 'day' ? 'HH:00' : 
          selectedTimeframe === 'week' ? 'EEE' :
          selectedTimeframe === 'month' ? 'dd MMM' : 'MMM'
        );

        if (!metrics[date]) {
          metrics[date] = { sales: 0, products: 0, purchases: 0 };
        }

        metrics[date].sales += Number(bill.total_amount);
        metrics[date].products += bill.bill_items.reduce((sum, item) => sum + item.quantity, 0);
      });

      setTimeframeData(metrics);
    } catch (err:any) {
      console.error('Error fetching timeframe data:', err);
      setError(err.message);
    }
  };

  const fetchComparisonData = async () => {
    try {
      const startDate = startOfDay(new Date(comparisonDateStart));
      const endDate = endOfDay(new Date(comparisonDateEnd));

      // Fetch sales data
      const { data: salesData, error: salesError } = await supabase
        .from('bills')
        .select('total_amount')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (salesError) throw salesError;

      // Fetch purchase orders data
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('purchase_orders')
        .select('total_amount')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (purchaseError) throw purchaseError;

      const totalSales = salesData?.reduce((sum, bill) => sum + Number(bill.total_amount), 0) || 0;
      const totalPurchases = purchaseData?.reduce((sum, po) => sum + Number(po.total_amount), 0) || 0;
      const difference = totalSales - totalPurchases;
      const percentageDifference = totalPurchases ? (difference / totalPurchases) * 100 : 0;

      setComparisonMetrics({
        totalSales,
        totalPurchases,
        difference,
        percentageDifference
      });
    } catch (err:any) {
      console.error('Error fetching comparison data:', err);
      setError(err.message);
    }
  };

  const getTimeframeLabel = () => {
    switch (selectedTimeframe) {
      case 'day':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'This Month';
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center text-gray-600">
        Access denied. Admin privileges required.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selection */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedTimeframe('day')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === 'day'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="h-4 w-4 inline mr-1" />
            Day
          </button>
          <button
            onClick={() => setSelectedTimeframe('week')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === 'week'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CalendarDays className="h-4 w-4 inline mr-1" />
            Week
          </button>
          <button
            onClick={() => setSelectedTimeframe('month')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === 'month'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CalendarRange className="h-4 w-4 inline mr-1" />
            Month
          </button>
          <button
            onClick={() => setSelectedTimeframe('year')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeframe === 'year'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CalendarClock className="h-4 w-4 inline mr-1" />
            Year
          </button>
        </div>
      </div>

      {/* Main Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-xl font-bold text-gray-900">
                ${metrics.totalSales.toFixed(2)}
              </h3>
              <p className={`text-sm ${metrics.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metrics.revenueGrowth >= 0 ? <ArrowUp className="h-4 w-4 inline" /> : <ArrowDown className="h-4 w-4 inline" />}
                {Math.abs(metrics.revenueGrowth).toFixed(1)}% from previous period
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Products Sold</p>
              <h3 className="text-xl font-bold text-gray-900">
                {metrics.totalProducts}
              </h3>
              <p className="text-sm text-gray-600">
                Avg. ${metrics.averageOrderValue.toFixed(2)} per order
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <Battery className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock Alert</p>
              <h3 className="text-xl font-bold text-gray-900">
                {metrics.lowStockProducts} items
              </h3>
              <p className="text-sm text-yellow-600">
                Need attention
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <CircuitBoard className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Sales</p>
              <h3 className="text-xl font-bold text-gray-900">
                ${(metrics.totalSales / (Object.keys(timeframeData).length || 1)).toFixed(2)}
              </h3>
              <p className="text-sm text-purple-600">
                {getTimeframeLabel()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales vs Purchases Comparison Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Sales vs Purchases Comparison</h3>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={comparisonDateStart}
              onChange={(e) => setComparisonDateStart(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span>to</span>
            <input
              type="date"
              value={comparisonDateEnd}
              onChange={(e) => setComparisonDateEnd(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-xl font-bold text-gray-900">
                  ${comparisonMetrics.totalSales.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Purchases</p>
                <p className="text-xl font-bold text-gray-900">
                  ${comparisonMetrics.totalPurchases.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <ArrowRightLeft className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Difference</p>
                <p className={`text-xl font-bold ${comparisonMetrics.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(comparisonMetrics.difference).toFixed(2)}
                  {comparisonMetrics.difference >= 0 ? ' profit' : ' loss'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Percentage Difference</p>
                <p className={`text-xl font-bold ${comparisonMetrics.percentageDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comparisonMetrics.percentageDifference >= 0 ? '+' : ''}
                  {comparisonMetrics.percentageDifference.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="mt-6">
          <div className="h-64 flex items-end space-x-4">
            <div className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-green-200 rounded-t transition-all duration-300 hover:bg-green-300"
                style={{ 
                  height: `${(comparisonMetrics.totalSales / Math.max(comparisonMetrics.totalSales, comparisonMetrics.totalPurchases)) * 100}%`
                }}
              >
                <div className="text-center -mt-8 text-sm font-medium text-gray-700">
                  ${comparisonMetrics.totalSales.toFixed(2)}
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">Sales</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-200 rounded-t transition-all duration-300 hover:bg-blue-300"
                style={{ 
                  height: `${(comparisonMetrics.totalPurchases / Math.max(comparisonMetrics.totalSales, comparisonMetrics.totalPurchases)) * 100}%`
                }}
              >
                <div className="text-center -mt-8 text-sm font-medium text-gray-700">
                  ${comparisonMetrics.totalPurchases.toFixed(2)}
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">Purchases</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64">
            <div className="h-full flex items-end space-x-2">
              {Object.entries(timeframeData).map(([date, data]) => {
                const maxSales = Math.max(...Object.values(timeframeData).map(d => d.sales)) || 1;
                const height = `${(data.sales / maxSales) * 100}%`;
                return (
                  <div key={date} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full group">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-200 hover:from-blue-600 hover:to-blue-500"
                        style={{ height }}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          ${data.sales.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                      {date}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Products List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {metrics.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.quantity} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${product.revenue.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center p-4 bg-red-50 rounded-lg border border-red-100">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-red-600">Only {item.stock} units left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;