import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Package, LayoutDashboard, Settings, FileText, LogOut, ArrowRight, Sun, Moon, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Language } from '../types';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { cartCount, isAdminMode, toggleAdminMode, theme, toggleTheme, language, setLanguage, t } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'he', name: 'עברית' },
    { code: 'ar', name: 'العربية' },
    { code: 'am', name: 'አማርኛ' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
  ];

  // Admin Layout
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row font-sans text-slate-900 dark:text-white transition-colors">
        {/* Mobile Header */}
        <div className="md:hidden bg-white dark:bg-slate-800 border-b dark:border-slate-700 p-4 flex justify-between items-center">
          <Link to="/admin" className="font-bold text-xl text-blue-600">DropFlow Admin</Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-slate-300">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-slate-900 dark:bg-slate-950 text-white min-h-screen flex-shrink-0 transition-all`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold tracking-tight text-blue-400">DropFlow</h1>
            <p className="text-xs text-slate-400 mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="mt-6 px-4 space-y-2">
            <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <LayoutDashboard size={20} /> {t('admin.dashboard')}
            </Link>
            <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/products') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Package size={20} /> {t('admin.products')}
            </Link>
            <Link to="/admin/orders" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/orders') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <FileText size={20} /> {t('admin.orders')}
            </Link>
            <Link to="/admin/guide" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/guide') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Settings size={20} /> {t('admin.guide')}
            </Link>
          </nav>

          <div className="absolute bottom-8 w-full px-6 space-y-4">
             {/* Admin Settings Toggles */}
            <div className="flex gap-2">
              <button onClick={toggleTheme} className="p-2 bg-slate-800 rounded-md text-slate-300 hover:text-white" title={t('common.theme')}>
                {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
              </button>
              
              <div className="relative flex-1">
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full h-full bg-slate-800 text-slate-300 rounded-md text-xs px-2 appearance-none outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Globe size={12} />
                </div>
              </div>
            </div>
            
            <button onClick={() => { toggleAdminMode(); navigate('/'); }} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <LogOut size={18} /> {t('admin.exit')}
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-sans transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              DROP<span className="text-blue-600">FLOW</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.home')}</Link>
              <Link to="/catalog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.catalog')}</Link>
              <Link to="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.track')}</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 p-2" title={t('common.theme')}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Language Selector */}
            <div className="relative hidden md:block">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold py-1.5 pl-3 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                 <Globe size={14} />
              </div>
            </div>

            <button 
              onClick={() => { toggleAdminMode(); navigate('/admin'); }}
              className="hidden md:flex items-center gap-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Settings size={14} /> {t('nav.admin')}
            </button>

            <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden text-slate-600 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 border-b dark:border-slate-700 py-4 px-4 space-y-4 shadow-lg text-slate-900 dark:text-white">
            <Link to="/" className="block py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</Link>
            <Link to="/catalog" className="block py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.catalog')}</Link>
            <Link to="/cart" className="block py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.cart')} ({cartCount})</Link>
            
            <div className="py-2 border-t dark:border-slate-700">
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-2 block">{t('common.language')}</label>
              <div className="grid grid-cols-4 gap-2">
                {languages.map(lang => (
                  <button 
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-xs p-2 rounded ${language === lang.code ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { toggleAdminMode(); navigate('/admin'); setIsMobileMenuOpen(false); }}
              className="w-full text-left py-2 font-medium text-blue-600"
            >
              Go to Admin Dashboard
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 bg-white dark:bg-slate-900 transition-colors duration-200">
        {children}
      </main>

      <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">DropFlow</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('hero.desc')}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-white">{t('catalog.title')}</Link></li>
              <li><Link to="#" className="hover:text-white">{t('section.trending')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-white">{t('nav.track')}</Link></li>
              <li><Link to="#" className="hover:text-white">FAQ</Link></li>
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