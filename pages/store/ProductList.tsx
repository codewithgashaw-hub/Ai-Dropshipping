import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/mockApi';
import { Product } from '../../types';

const Catalog = () => {
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
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group bg-white rounded-lg border hover:shadow-lg transition-all overflow-hidden flex flex-col">
            <div className="aspect-square bg-slate-100 overflow-hidden relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs text-slate-500 mb-1">{product.category}</div>
              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 flex-1">{product.title}</h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">View</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;