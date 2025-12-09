import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/mockApi';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

const Catalog = () => {
  const { t } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    productService.getAll().then(setProducts);
  }, []);

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{t('catalog.title')}</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700 hover:shadow-lg transition-all overflow-hidden flex flex-col">
            <div className="aspect-square bg-slate-100 dark:bg-slate-700 overflow-hidden relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{product.category}</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 flex-1">{product.title}</h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-lg dark:text-white">${product.price.toFixed(2)}</span>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">{t('catalog.view')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;