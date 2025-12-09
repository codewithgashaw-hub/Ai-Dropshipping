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

  const cardClass = "bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors";
  const labelClass = "text-xs text-slate-400 dark:text-slate-500";
  const valueClass = "text-2xl font-bold mb-1 dark:text-white";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"><DollarSign size={20} /></div>
            <span className="text-xs font-bold text-green-600">+12%</span>
          </div>
          <div className={valueClass}>${stats.revenue.toLocaleString()}</div>
          <div className={labelClass}>Total Revenue</div>
        </div>
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg"><ShoppingBag size={20} /></div>
            <span className="text-xs font-bold text-green-600">+5%</span>
          </div>
          <div className={valueClass}>{stats.orders}</div>
          <div className={labelClass}>Total Orders</div>
        </div>
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg"><Package size={20} /></div>
            <span className="text-xs font-bold text-slate-400">0%</span>
          </div>
          <div className={valueClass}>452</div>
          <div className={labelClass}>Products Live</div>
        </div>
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg"><TrendingUp size={20} /></div>
            <span className="text-xs font-bold text-green-600">+2%</span>
          </div>
          <div className={valueClass}>${stats.avgOrder.toFixed(2)}</div>
          <div className={labelClass}>Avg. Order Value</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 ${cardClass}`}>
          <h2 className="font-bold text-lg mb-6 dark:text-white">Revenue Analytics</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: 'white' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="font-bold text-lg mb-6 dark:text-white">Recent Activity</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-medium dark:text-white">New Order #1234</p>
                <p className="text-xs text-slate-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium dark:text-white">Payment Received</p>
                <p className="text-xs text-slate-400">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
              <div>
                <p className="text-sm font-medium dark:text-white">Inventory Synced (AliExpress)</p>
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