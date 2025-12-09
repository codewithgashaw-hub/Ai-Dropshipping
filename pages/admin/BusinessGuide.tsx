import React, { useState } from 'react';

const BusinessGuide = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'tech' | 'deploy'>('business');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Deliverables & Blueprint</h1>
        <p className="text-slate-500">Comprehensive guide for business setup, technical architecture, and deployment.</p>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit mb-8">
        <button 
          onClick={() => setActiveTab('business')} 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'business' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Business Plan
        </button>
        <button 
          onClick={() => setActiveTab('tech')} 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'tech' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Technical Blueprint
        </button>
        <button 
          onClick={() => setActiveTab('deploy')} 
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'deploy' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Deployment Guide
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-slate-800 leading-relaxed">
        {activeTab === 'business' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">1. Niche Strategy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-blue-800 mb-2">Recommended Niche: Eco-Modern Office</h3>
                  <p className="text-sm text-blue-700/80">
                    High margin potential targeting remote workers. Products include bamboo laptop stands, ergonomic accessories, and aesthetic desk organizers.
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="font-bold text-purple-800 mb-2">Profit Strategy</h3>
                  <ul className="list-disc list-inside text-sm text-purple-700/80 space-y-1">
                    <li>Target Margin: 60-70%</li>
                    <li>Low ticket items ($10-30): 3x Markup</li>
                    <li>High ticket items ($50+): 2x Markup</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">2. Competitor Analysis</h2>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <span className="font-bold text-slate-400">01</span>
                  <div>
                    <h4 className="font-bold">Amazon/Generic</h4>
                    <p className="text-sm text-slate-500">Pros: Fast shipping. Cons: Generic branding, low perceived value.</p>
                    <p className="text-sm font-medium text-green-600 mt-1">Opportunity: Win on branding and curation.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="font-bold text-slate-400">02</span>
                  <div>
                    <h4 className="font-bold">Instagram Boutiques</h4>
                    <p className="text-sm text-slate-500">Pros: High aesthetic. Cons: Long shipping times, poor support.</p>
                    <p className="text-sm font-medium text-green-600 mt-1">Opportunity: Win on transparency and automated tracking.</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">System Architecture</h2>
              <div className="p-6 bg-slate-900 text-slate-200 rounded-xl font-mono text-sm overflow-x-auto">
                {`[User] -> [React Frontend (Vercel)]
              |
              v
[API Layer (Next.js API / Firebase Functions)]
    |               |               |
    v               v               v
[Database]      [Stripe]      [Suppliers (AliExpress API)]
(Firestore)     (Payment)     (Inventory Sync)`}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Database Schema</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Products</h3>
                  <ul className="text-sm font-mono text-slate-600 space-y-1">
                    <li>id: string (PK)</li>
                    <li>title: string</li>
                    <li>price: number</li>
                    <li>supplier_id: string (FK)</li>
                    <li>sku: string</li>
                  </ul>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Orders</h3>
                  <ul className="text-sm font-mono text-slate-600 space-y-1">
                    <li>id: string (PK)</li>
                    <li>user_id: string (FK)</li>
                    <li>status: enum</li>
                    <li>tracking_code: string</li>
                    <li>total: number</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">API Endpoints</h2>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2">Method</th>
                    <th className="pb-2">Endpoint</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="py-2 text-green-600 font-bold">GET</td><td>/api/products</td><td>Fetch curated list</td></tr>
                  <tr><td className="py-2 text-blue-600 font-bold">POST</td><td>/api/orders</td><td>Create order & charge Stripe</td></tr>
                  <tr><td className="py-2 text-blue-600 font-bold">POST</td><td>/webhooks/supplier</td><td>Receive tracking updates</td></tr>
                </tbody>
              </table>
            </section>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Optimization Checklist</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Mobile First (Tailwind)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">SEO Meta Tags (React Helmet)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Image Optimization (WebP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Stripe Fraud Detection</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Deployment Steps</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold">Connect Repository</h4>
                    <p className="text-sm text-slate-500">Push this code to GitHub/GitLab.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold">Import to Vercel</h4>
                    <p className="text-sm text-slate-500">Login to Vercel, import repo. Framework preset: Create React App (or Vite).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold">Environment Variables</h4>
                    <p className="text-sm text-slate-500">Add <code>REACT_APP_API_KEY</code> for Gemini and Stripe keys in Vercel dashboard.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessGuide;