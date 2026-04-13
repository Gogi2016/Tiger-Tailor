// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isIframe = window.self !== window.top;

// Page keys must match exactly what is registered in pages.config.js
// HashRouter uses /#/PageKey style routing
export const createPageUrl = (page) => {
  const validPages = [
    'Home',
    'Products',
    'ProductDetail',
    'Tailors',
    'Fabrics',
    'MeasurementGuide',
    'Cart',
    'Checkout',
    'Contact',
    'Privacy',
    'Terms',
    'Shipping',
    'Returns',
  ];

  if (page === 'Home') return '/';
  if (validPages.includes(page)) return `/${page}`;
  return '/';
};