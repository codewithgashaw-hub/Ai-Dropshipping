import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Theme, Language } from '../types';
import { translations } from '../utils/translations';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');

  // Load state from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dropflow_cart');
    const savedTheme = localStorage.getItem('dropflow_theme') as Theme;
    const savedLang = localStorage.getItem('dropflow_lang') as Language;
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       setTheme('dark');
    }
  }, []);

  // Sync Theme with HTML class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('dropflow_theme', theme);
  }, [theme]);

  // Sync Language and Direction
  useEffect(() => {
    localStorage.setItem('dropflow_lang', language);
    const root = window.document.documentElement;
    
    // Set text direction based on language
    if (language === 'he' || language === 'ar') {
      root.dir = 'rtl';
      root.lang = language;
    } else {
      root.dir = 'ltr';
      root.lang = language;
    }
  }, [language]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleAdminMode = () => setIsAdminMode(!isAdminMode);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Translation function helper
  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isAdminMode,
        toggleAdminMode,
        theme,
        toggleTheme,
        language,
        setLanguage,
        t
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};