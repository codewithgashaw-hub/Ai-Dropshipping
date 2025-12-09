import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, t } = useStore();
  const navigate = useNavigate();

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('cart.empty')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">{t('cart.empty.desc')}</p>
        <Link to="/catalog" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700">
          {t('start_shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 items-center">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="text-blue-600 dark:text-blue-400 font-bold mb-4">${item.price.toFixed(2)}</div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-medium w-8 text-center dark:text-white">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl sticky top-24 transition-colors">
            <h2 className="text-xl font-bold mb-6 dark:text-white">{t('cart.summary')}</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{t('cart.subtotal')}</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>{t('cart.shipping')}</span>
                <span className="text-green-600 dark:text-green-400 font-medium">{t('cart.free')}</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700 my-4"></div>
              <div className="flex justify-between text-lg font-bold dark:text-white">
                <span>{t('cart.total')}</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              {t('btn.checkout')} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;