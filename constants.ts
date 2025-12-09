import { Product, Supplier } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Minimalist Smart Watch',
    description: 'Track your health with style. Features heart rate monitoring, sleep tracking, and 7-day battery life.',
    price: 49.99,
    compareAtPrice: 89.99,
    costPrice: 15.00,
    supplier: 'AliExpress',
    image: 'https://picsum.photos/400/400?random=1',
    category: 'Electronics',
    inventory: 45,
    rating: 4.8,
    reviews: 120
  },
  {
    id: '2',
    title: 'Ergonomic Laptop Stand',
    description: 'Aluminum alloy stand, adjustable height, improves posture while working.',
    price: 29.99,
    compareAtPrice: 45.00,
    costPrice: 8.50,
    supplier: 'CJDropshipping',
    image: 'https://picsum.photos/400/400?random=2',
    category: 'Office',
    inventory: 120,
    rating: 4.5,
    reviews: 85
  },
  {
    id: '3',
    title: 'Wireless Noise Cancelling Headphones',
    description: 'Immersive sound with active noise cancellation. 30 hours playtime.',
    price: 79.99,
    compareAtPrice: 150.00,
    costPrice: 25.00,
    supplier: 'Spocket',
    image: 'https://picsum.photos/400/400?random=3',
    category: 'Audio',
    inventory: 30,
    rating: 4.9,
    reviews: 210
  },
  {
    id: '4',
    title: 'Portable Blender Bottle',
    description: 'Make smoothies on the go. USB rechargeable, BPA free.',
    price: 34.99,
    costPrice: 10.00,
    supplier: 'AliExpress',
    image: 'https://picsum.photos/400/400?random=4',
    category: 'Home & Kitchen',
    inventory: 200,
    rating: 4.2,
    reviews: 55
  }
];

export const MOCK_SUPPLIERS: Supplier[] = [
  { id: 'sup_1', name: 'AliExpress Official', apiStatus: 'connected', autoSync: true },
  { id: 'sup_2', name: 'CJDropshipping', apiStatus: 'connected', autoSync: true },
  { id: 'sup_3', name: 'Spocket US', apiStatus: 'disconnected', autoSync: false },
];
