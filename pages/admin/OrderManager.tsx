import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/mockApi';
import { Order } from '../../types';

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    orderService.getAll().then(setOrders);
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: Order['status']) => {
    await orderService.updateStatus(id, newStatus);
    const updated = await orderService.getAll();
    setOrders(updated);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'processing': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'shipped': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'delivered': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Orders</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Order ID</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Customer</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Items</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Total</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Status</th>
              <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {orders.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">No orders yet.</td></tr>
            ) : orders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="p-4 font-mono text-sm dark:text-slate-300">{order.id}</td>
                <td className="p-4">
                  <div className="font-medium text-slate-900 dark:text-white">{order.customerName}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{order.customerEmail}</div>
                </td>
                <td className="p-4 text-sm dark:text-slate-300">{order.items.length} items</td>
                <td className="p-4 font-bold dark:text-white">${order.total.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                    className="text-sm border dark:border-slate-600 rounded p-1 bg-white dark:bg-slate-700 dark:text-white outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManager;