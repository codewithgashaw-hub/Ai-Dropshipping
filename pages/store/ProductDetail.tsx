import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, ShoppingCart, Check } from 'lucide-react';
import { productService } from '../../services/mockApi';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { addToCart, t } = useStore();
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (id) {
      productService.getById(id).then(p => {
        setProduct(p);
        setLoading(false);
      });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500 dark:text-slate-400">Loading...</div>;
  if (!product) return <div className="p-12 text-center text-slate-500 dark:text-slate-400">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
             <div className="flex text-yellow-400">
               {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
             </div>
             <span className="text-sm text-slate-500 dark:text-slate-400">({product.reviews} {t('prod.reviews')})</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{product.title}</h1>
          
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-xl text-slate-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
            )}
            {product.compareAtPrice && (
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% {t('prod.sale')}
              </span>
            )}
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Truck size={18} className="text-blue-500" />
              <span>{t('feature.shipping')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Check size={18} className="text-green-500" />
              <span>{t('prod.stock')}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                added 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200'
              }`}
            >
              {added ? (
                <>{t('btn.added')} <Check /></>
              ) : (
                <>{t('btn.add_cart')} <ShoppingCart size={20} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;