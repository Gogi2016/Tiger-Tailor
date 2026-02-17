// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isIframe = window.self !== window.top;

// Add this:
export const createPageUrl = (page) => {
  switch (page) {
    case 'ProductDetail':
      return '/product-detail'; // <- SPA relative path
    default:
      return '/';
  }
};
