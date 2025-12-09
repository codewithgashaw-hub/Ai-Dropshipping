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
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-600">Order ID</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Customer</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Items</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Total</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Status</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-slate-500">No orders yet.</td></tr>
            ) : orders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-sm">{order.id}</td>
                <td className="p-4">
                  <div className="font-medium text-slate-900">{order.customerName}</div>
                  <div className="text-xs text-slate-500">{order.customerEmail}</div>
                </td>
                <td className="p-4 text-sm">{order.items.length} items</td>
                <td className="p-4 font-bold">${order.total.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                    className="text-sm border rounded p-1 bg-white"
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