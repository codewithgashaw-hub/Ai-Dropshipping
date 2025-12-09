import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Package, LayoutDashboard, Settings, FileText, LogOut, Store, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { cartCount, isAdminMode, toggleAdminMode } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith('/admin');

  // If we are in Admin Mode but on a store page, show the admin toggle clearly
  // If we are in Admin Route, show Admin Sidebar
  
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b p-4 flex justify-between items-center">
          <Link to="/admin" className="font-bold text-xl text-blue-600">DropFlow Admin</Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-slate-900 text-white min-h-screen flex-shrink-0 transition-all`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight text-blue-400">DropFlow</h1>
            <p className="text-xs text-slate-400 mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="mt-6 px-4 space-y-2">
            <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/products') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Package size={20} /> Products
            </Link>
            <Link to="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/orders') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <FileText size={20} /> Orders
            </Link>
            <Link to="/admin/guide" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/guide') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Settings size={20} /> Blueprint & Guide
            </Link>
          </nav>

          <div className="absolute bottom-8 w-full px-6">
            <button onClick={() => { toggleAdminMode(); navigate('/'); }} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <LogOut size={18} /> Exit Admin
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen">
          {children}
        </main>
      </div>
    );
  }

  // Storefront Layout
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900">
              DROP<span className="text-blue-600">FLOW</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/catalog" className="hover:text-blue-600 transition-colors">Catalog</Link>
              <Link to="#" className="hover:text-blue-600 transition-colors">Track Order</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => { toggleAdminMode(); navigate('/admin'); }}
              className="hidden md:flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors"
            >
              <Settings size={14} /> Admin
            </button>
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b py-4 px-4 space-y-4 shadow-lg">
            <Link to="/" className="block py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/catalog" className="block py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Catalog</Link>
            <Link to="/cart" className="block py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Cart ({cartCount})</Link>
            <button 
              onClick={() => { toggleAdminMode(); navigate('/admin'); setIsMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-medium text-blue-600"
            >
              Go to Admin Dashboard
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">DropFlow</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Premium dropshipping destination for curated lifestyle products.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-white">All Products</Link></li>
              <li><Link to="#" className="hover:text-white">New Arrivals</Link></li>
              <li><Link to="#" className="hover:text-white">Featured</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white">Track Order</Link></li>
              <li><Link to="#" className="hover:text-white">FAQ</Link></li>
              <li><Link to="#" className="hover:text-white">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className="bg-slate-800 border-none rounded px-3 py-2 w-full text-sm text-white focus:ring-1 focus:ring-blue-500" />
              <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};