import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { orderService } from '../../services/mockApi';
import { Order } from '../../types';

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, avgOrder: 0 });
  
  useEffect(() => {
    orderService.getAll().then((orders: Order[]) => {
      const revenue = orders.reduce((sum, o) => sum + o.total, 0);
      setStats({
        revenue,
        orders: orders.length,
        avgOrder: orders.length ? revenue / orders.length : 0
      });
    });
  }, []);

  const data = [
    { name: 'Mon', val: 4000 },
    { name: 'Tue', val: 3000 },
    { name: 'Wed', val: 2000 },
    { name: 'Thu', val: 2780 },
    { name: 'Fri', val: 1890 },
    { name: 'Sat', val: 2390 },
    { name: 'Sun', val: 3490 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><DollarSign size={20} /></div>
            <span className="text-xs font-bold text-green-600">+12%</span>
          </div>
          <div className="text-2xl font-bold mb-1">${stats.revenue.toLocaleString()}</div>
          <div className="text-xs text-slate-400">Total Revenue</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><ShoppingBag size={20} /></div>
            <span className="text-xs font-bold text-green-600">+5%</span>
          </div>
          <div className="text-2xl font-bold mb-1">{stats.orders}</div>
          <div className="text-xs text-slate-400">Total Orders</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Package size={20} /></div>
            <span className="text-xs font-bold text-slate-400">0%</span>
          </div>
          <div className="text-2xl font-bold mb-1">452</div>
          <div className="text-xs text-slate-400">Products Live</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
            <span className="text-xs font-bold text-green-600">+2%</span>
          </div>
          <div className="text-2xl font-bold mb-1">${stats.avgOrder.toFixed(2)}</div>
          <div className="text-xs text-slate-400">Avg. Order Value</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h2 className="font-bold text-lg mb-6">Revenue Analytics</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h2 className="font-bold text-lg mb-6">Recent Activity</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-medium">New Order #1234</p>
                <p className="text-xs text-slate-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium">Payment Received</p>
                <p className="text-xs text-slate-400">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
              <div>
                <p className="text-sm font-medium">Inventory Synced (AliExpress)</p>
                <p className="text-xs text-slate-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;