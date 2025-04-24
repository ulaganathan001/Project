import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface SalesReport {
  date: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

function Reports() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dateRangeStart, setDateRangeStart] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dateRangeEnd, setDateRangeEnd] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [salesReport, setSalesReport] = useState<SalesReport[]>([]);
  const [showDateReport, setShowDateReport] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDateSalesReport = async (date: string) => {
    setLoading(true);
    try {
      const startOfDayDate = new Date(date);
      startOfDayDate.setHours(0, 0, 0, 0);
      
      const endOfDayDate = new Date(date);
      endOfDayDate.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from('bill_items')
        .select(`
          quantity,
          price_at_time,
          created_at,
          products (
            name
          ),
          bills!inner (
            created_at
          )
        `)
        .gte('bills.created_at', startOfDayDate.toISOString())
        .lte('bills.created_at', endOfDayDate.toISOString());

      if (error) throw error;

      const report = data.map(item => ({
        date: format(parseISO(item.bills.created_at), 'yyyy-MM-dd HH:mm:ss'),
        productName: item.products.name,
        quantity: item.quantity,
        price: item.price_at_time,
        total: item.quantity * item.price_at_time
      }));

      setSalesReport(report);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDateRangeSalesReport = async (start: string, end: string) => {
    setLoading(true);
    try {
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from('bill_items')
        .select(`
          quantity,
          price_at_time,
          created_at,
          products (
            name
          ),
          bills!inner (
            created_at
          )
        `)
        .gte('bills.created_at', startDate.toISOString())
        .lte('bills.created_at', endDate.toISOString());

      if (error) throw error;

      const report = data.map(item => ({
        date: format(parseISO(item.bills.created_at), 'yyyy-MM-dd HH:mm:ss'),
        productName: item.products.name,
        quantity: item.quantity,
        price: item.price_at_time,
        total: item.quantity * item.price_at_time
      }));

      setSalesReport(report);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateReportTotal = () => {
    return salesReport.reduce((sum, item) => sum + item.total, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales Reports</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Sales Report</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowDateReport(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                showDateReport
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Single Date
            </button>
            <button
              onClick={() => setShowDateReport(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                !showDateReport
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Date Range
            </button>
          </div>
        </div>

        {showDateReport ? (
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={() => fetchDateSalesReport(selectedDate)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={dateRangeStart}
                onChange={(e) => setDateRangeStart(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span>to</span>
              <input
                type="date"
                value={dateRangeEnd}
                onChange={(e) => setDateRangeEnd(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={() => fetchDateRangeSalesReport(dateRangeStart, dateRangeEnd)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">{error}</div>
        ) : salesReport.length > 0 ? (
          <div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Product</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReport.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.productName}</td>
                      <td className="text-right">{item.quantity}</td>
                      <td className="text-right">${item.price.toFixed(2)}</td>
                      <td className="text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right text-lg font-medium">
              Total Revenue: ${calculateReportTotal().toFixed(2)}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 flex flex-col items-center">
            <FileText className="h-12 w-12 mb-2" />
            <p>Select a date to view sales report</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;