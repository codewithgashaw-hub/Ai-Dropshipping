export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  costPrice: number; // For profit calculation
  supplier: string;
  image: string;
  category: string;
  inventory: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  trackingNumber?: string;
}

export interface DashboardStats {
  revenue: number;
  orders: number;
  products: number;
  profit: number;
}

export interface Supplier {
  id: string;
  name: string;
  apiStatus: 'connected' | 'disconnected';
  autoSync: boolean;
}

export type Language = 'en' | 'es' | 'he' | 'am' | 'ar' | 'fr' | 'de' | 'zh';
export type Theme = 'light' | 'dark';