import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, ShieldCheck, Truck } from 'lucide-react';
import { productService } from '../../services/mockApi';
import { Product } from '../../types';

const StoreHome = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const all = await productService.getAll();
      setFeaturedProducts(all.slice(0, 3));
    };
    loadProducts();
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
              New Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Curated Gear for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Modern Living
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg">
              Discover innovative products sourced directly from premium suppliers. Quality assured, fast shipping, and unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/catalog" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/catalog" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full backdrop-blur-sm transition-all border border-white/10">
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Fast Worldwide Shipping</h3>
              <p className="text-slate-500 text-sm">Direct from supplier to your doorstep with tracking.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Buyer Protection</h3>
              <p className="text-slate-500 text-sm">100% money back guarantee if issues arise.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Trending Products</h3>
              <p className="text-slate-500 text-sm">We find the hottest items before they go viral.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Trending Now</h2>
            <p className="text-slate-500 mt-2">Handpicked favorites for this week</p>
          </div>
          <Link to="/catalog" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.compareAtPrice && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">{product.category}</div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 truncate">{product.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-slate-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-blue-600 font-semibold">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StoreHome;