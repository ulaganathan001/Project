import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, 
  Package, 
  Receipt, 
  LogOut,
  Zap,
  FileText,
  Building2,
  ShoppingCart
} from 'lucide-react';

function Layout() {
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Zap className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">ElectroShop</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {isAdmin && (
                  <>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center px-1 pt-1 text-gray-900"
                    >
                      <LayoutDashboard className="h-5 w-5 mr-1" />
                      Dashboard
                    </Link>
                    <Link
                      to="/products"
                      className="inline-flex items-center px-1 pt-1 text-gray-900"
                    >
                      <Package className="h-5 w-5 mr-1" />
                      Products
                    </Link>
                    <Link
                      to="/suppliers"
                      className="inline-flex items-center px-1 pt-1 text-gray-900"
                    >
                      <Building2 className="h-5 w-5 mr-1" />
                      Suppliers
                    </Link>
                    <Link
                      to="/purchase-orders"
                      className="inline-flex items-center px-1 pt-1 text-gray-900"
                    >
                      <ShoppingCart className="h-5 w-5 mr-1" />
                      Purchase Orders
                    </Link>
                    <Link
                      to="/reports"
                      className="inline-flex items-center px-1 pt-1 text-gray-900"
                    >
                      <FileText className="h-5 w-5 mr-1" />
                      Reports
                    </Link>
                  </>
                )}
                <Link
                  to="/bills"
                  className="inline-flex items-center px-1 pt-1 text-gray-900"
                >
                  <Receipt className="h-5 w-5 mr-1" />
                  Bills
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-4">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;