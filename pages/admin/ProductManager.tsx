import React, { useEffect, useState } from 'react';
import { Plus, Wand2, Trash2, Edit, Loader } from 'lucide-react';
import { productService } from '../../services/mockApi';
import { generateProductDescription } from '../../services/gemini';
import { Product } from '../../types';

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    supplier: 'AliExpress',
    niche: '' // for AI
  });

  const loadProducts = () => productService.getAll().then(setProducts);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAiGenerate = async () => {
    if (!formData.title || !formData.niche) {
      alert("Please enter a product name and niche first.");
      return;
    }
    setAiLoading(true);
    const result = await generateProductDescription(formData.title, formData.niche);
    setAiLoading(false);

    if (result) {
      // Auto-fill form with AI result
      setFormData(prev => ({
        ...prev,
        title: result.title || prev.title,
        price: result.price?.toString() || prev.price,
        category: result.category || prev.category
      }));
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: 'AI Generated Description would go here...',
      price: parseFloat(formData.price),
      costPrice: parseFloat(formData.price) * 0.4,
      supplier: formData.supplier,
      category: formData.category,
      image: `https://picsum.photos/400/400?random=${Math.random()}`,
      inventory: 100,
      rating: 0,
      reviews: 0
    };
    await productService.add(newProduct);
    setLoading(false);
    setIsModalOpen(false);
    loadProducts();
    setFormData({ title: '', category: '', price: '', supplier: 'AliExpress', niche: '' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await productService.delete(id);
      loadProducts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Product</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Price</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Supplier</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Inventory</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} alt="" className="w-10 h-10 rounded object-cover bg-slate-100 dark:bg-slate-700" />
                  <span className="font-medium text-slate-900 dark:text-white">{p.title}</span>
                </td>
                <td className="p-4 dark:text-slate-300">${p.price.toFixed(2)}</td>
                <td className="p-4"><span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold">{p.supplier}</span></td>
                <td className="p-4 dark:text-slate-300">{p.inventory}</td>
                <td className="p-4 flex gap-2">
                  <button className="text-slate-400 hover:text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2"><Wand2 size={16}/> AI Assistant</h3>
                </div>
                <div className="flex gap-2">
                  <input 
                    placeholder="Enter niche (e.g. Eco Friendly)" 
                    className="flex-1 text-sm border-none bg-white dark:bg-slate-700 dark:text-white rounded p-2 focus:ring-1 focus:ring-purple-400 outline-none"
                    value={formData.niche}
                    onChange={e => setFormData({...formData, niche: e.target.value})}
                  />
                  <button 
                    type="button" 
                    onClick={handleAiGenerate}
                    disabled={aiLoading}
                    className="bg-purple-600 text-white text-xs px-3 py-2 rounded font-medium hover:bg-purple-700 flex items-center gap-1"
                  >
                    {aiLoading ? <Loader size={12} className="animate-spin" /> : 'Generate'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Product Name</label>
                <input 
                  required 
                  className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded p-2 outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Price ($)</label>
                  <input 
                    required 
                    type="number"
                    className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded p-2 outline-none focus:ring-2 focus:ring-blue-500" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-slate-300">Category</label>
                  <input 
                    required 
                    className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded p-2 outline-none focus:ring-2 focus:ring-blue-500" 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Supplier</label>
                <select 
                  className="w-full border dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.supplier}
                  onChange={e => setFormData({...formData, supplier: e.target.value})}
                >
                  <option>AliExpress</option>
                  <option>CJDropshipping</option>
                  <option>Spocket</option>
                </select>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;