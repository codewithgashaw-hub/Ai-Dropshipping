import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';

// Store Pages
import StoreHome from './pages/store/StoreFront';
import Catalog from './pages/store/ProductList';
import ProductDetail from './pages/store/ProductDetail';
import Cart from './pages/store/Cart';
import Checkout from './pages/store/Checkout';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProductManager from './pages/admin/ProductManager';
import OrderManager from './pages/admin/OrderManager';
import BusinessGuide from './pages/admin/BusinessGuide';

const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Store Routes */}
            <Route path="/" element={<StoreHome />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductManager />} />
            <Route path="/admin/orders" element={<OrderManager />} />
            <Route path="/admin/guide" element={<BusinessGuide />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
};

export default App;