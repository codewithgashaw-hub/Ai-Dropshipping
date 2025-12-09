import { Product, Order, Supplier } from '../types';
import { MOCK_PRODUCTS, MOCK_SUPPLIERS } from '../constants';

const LS_KEYS = {
  PRODUCTS: 'dropflow_products',
  ORDERS: 'dropflow_orders',
  CART: 'dropflow_cart'
};

// Initialize Storage
const initStorage = () => {
  if (!localStorage.getItem(LS_KEYS.PRODUCTS)) {
    localStorage.setItem(LS_KEYS.PRODUCTS, JSON.stringify(MOCK_PRODUCTS));
  }
  if (!localStorage.getItem(LS_KEYS.ORDERS)) {
    localStorage.setItem(LS_KEYS.ORDERS, JSON.stringify([]));
  }
};

initStorage();

export const productService = {
  getAll: async (): Promise<Product[]> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    return JSON.parse(localStorage.getItem(LS_KEYS.PRODUCTS) || '[]');
  },
  
  getById: async (id: string): Promise<Product | undefined> => {
    const products = JSON.parse(localStorage.getItem(LS_KEYS.PRODUCTS) || '[]');
    return products.find((p: Product) => p.id === id);
  },

  add: async (product: Product): Promise<void> => {
    const products = JSON.parse(localStorage.getItem(LS_KEYS.PRODUCTS) || '[]');
    products.unshift(product);
    localStorage.setItem(LS_KEYS.PRODUCTS, JSON.stringify(products));
  },

  delete: async (id: string): Promise<void> => {
    const products = JSON.parse(localStorage.getItem(LS_KEYS.PRODUCTS) || '[]');
    const newProducts = products.filter((p: Product) => p.id !== id);
    localStorage.setItem(LS_KEYS.PRODUCTS, JSON.stringify(newProducts));
  }
};

export const orderService = {
  create: async (order: Omit<Order, 'id' | 'date' | 'status'>): Promise<Order> => {
    await new Promise(r => setTimeout(r, 800)); // Simulate payment processing
    const orders = JSON.parse(localStorage.getItem(LS_KEYS.ORDERS) || '[]');
    const newOrder: Order = {
      ...order,
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      status: 'pending'
    };
    orders.unshift(newOrder);
    localStorage.setItem(LS_KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  getAll: async (): Promise<Order[]> => {
    return JSON.parse(localStorage.getItem(LS_KEYS.ORDERS) || '[]');
  },

  updateStatus: async (id: string, status: Order['status']): Promise<void> => {
    const orders = JSON.parse(localStorage.getItem(LS_KEYS.ORDERS) || '[]');
    const index = orders.findIndex((o: Order) => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      if (status === 'shipped') {
        orders[index].trackingNumber = `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      }
      localStorage.setItem(LS_KEYS.ORDERS, JSON.stringify(orders));
    }
  }
};

export const supplierService = {
  getAll: async (): Promise<Supplier[]> => {
    return MOCK_SUPPLIERS;
  },
  syncInventory: async (): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1500));
    return true;
  }
};