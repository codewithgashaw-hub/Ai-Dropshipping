import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { orderService } from '../../services/mockApi';
import { CheckCircle, Loader } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart, t } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await orderService.create({
      customerName: formData.name,
      customerEmail: formData.email,
      items: cart,
      total: cartTotal
    });
    
    setLoading(false);
    setStep(3);
    clearCart();
  };

  if (cart.length === 0 && step !== 3) {
    navigate('/');
    return null;
  }

  if (step === 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">{t('checkout.success')}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
          {t('checkout.success.desc')}
        </p>
        <button onClick={() => navigate('/')} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-bold">
          {t('checkout.return')}
        </button>
      </div>
    );
  }

  const inputClass = "w-full border dark:border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6 dark:text-white">{t('checkout.title')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>{t('checkout.name')}</label>
              <input required name="name" onChange={handleChange} className={inputClass} placeholder="John Doe" />
            </div>
            <div>
              <label className={labelClass}>{t('checkout.email')}</label>
              <input required type="email" name="email" onChange={handleChange} className={inputClass} placeholder="john@example.com" />
            </div>
            <div>
              <label className={labelClass}>{t('checkout.address')}</label>
              <input required name="address" onChange={handleChange} className={inputClass} placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t('checkout.city')}</label>
                <input required name="city" onChange={handleChange} className={inputClass} placeholder="New York" />
              </div>
              <div>
                <label className={labelClass}>{t('checkout.zip')}</label>
                <input required name="zip" onChange={handleChange} className={inputClass} placeholder="10001" />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t dark:border-slate-700">
              <h2 className="text-xl font-bold mb-4 dark:text-white">{t('checkout.payment')}</h2>
              <div className="p-4 border dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm mb-4">
                This is a secure demo. No real payment will be processed.
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader className="animate-spin" /> : `${t('checkout.pay')} $${cartTotal.toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>

        {/* Summary */}
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl h-fit">
          <h3 className="font-bold text-lg mb-4 dark:text-white">{t('cart.summary')}</h3>
          <div className="space-y-4 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded overflow-hidden">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span>{item.title} <span className="text-slate-400">x{item.quantity}</span></span>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t dark:border-slate-700 flex justify-between font-bold text-lg dark:text-white">
            <span>{t('cart.total')}</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;