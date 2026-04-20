import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: createPageUrl('Home') },
  { label: 'Products', href: createPageUrl('Products') },
  { label: 'Tailors',  href: createPageUrl('Tailors')  },
  { label: 'Contact', href: createPageUrl('Contact') },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(items.length);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F5F1E8]/95 backdrop-blur-md shadow-sm'
            : 'bg-gradient-to-b from-[#0E2A47]/60 to-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* ── Brand: logo + wordmark + slogan ── */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
              {/* SVG Logo Mark */}
              <div className="flex-shrink-0">
                <svg
                  width="40" height="40" viewBox="0 0 40 40"
                  fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:scale-105"
                >
                  {/* Outer shield shape */}
                  <path
                    d="M20 2 L36 8 L36 22 C36 30 28 36.5 20 38 C12 36.5 4 30 4 22 L4 8 Z"
                    fill={isScrolled ? '#0E2A47' : 'rgba(245,241,232,0.15)'}
                    stroke={isScrolled ? '#A88D4B' : '#A88D4B'}
                    strokeWidth="1.5"
                  />
                  {/* Tiger stripe accents */}
                  <path d="M13 15 Q16 13 19 15 Q16 17 13 15Z" fill="#A88D4B" />
                  <path d="M21 15 Q24 13 27 15 Q24 17 21 15Z" fill="#A88D4B" />
                  <path d="M11 20 Q15 17 20 20 Q15 23 11 20Z" fill="#A88D4B" opacity="0.7" />
                  <path d="M20 20 Q25 17 29 20 Q25 23 20 20Z" fill="#A88D4B" opacity="0.7" />
                  {/* Centre scissors / needle cross */}
                  <line x1="20" y1="10" x2="20" y2="30" stroke={isScrolled ? '#A88D4B' : '#F5F1E8'} strokeWidth="1" opacity="0.4" />
                  <line x1="10" y1="20" x2="30" y2="20" stroke={isScrolled ? '#A88D4B' : '#F5F1E8'} strokeWidth="1" opacity="0.4" />
                  <circle cx="20" cy="20" r="2.5" fill="#A88D4B" />
                </svg>
              </div>

              {/* Wordmark + slogan */}
              <div className="flex flex-col leading-none">
                <span className={`font-serif text-2xl md:text-3xl tracking-tight transition-colors ${
                  isScrolled ? 'text-[#0E2A47]' : 'text-[#F5F1E8]'
                }`}>
                  Tiger Hunt
                </span>
                <span className={`text-[9px] tracking-[0.28em] uppercase mt-0.5 transition-colors ${
                  isScrolled ? 'text-[#0E2A47]' : 'text-[#F5F1E8]'
                }`}>
                  Gentlemen walk 
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm tracking-wide transition-colors relative group ${
                    isScrolled
                      ? 'text-[#2B2B2B]/80 hover:text-[#0E2A47]'
                      : 'text-[#F5F1E8]/90 hover:text-[#F5F1E8]'
                  }`}
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#A88D4B] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* ── Cart + mobile toggle ── */}
            <div className="flex items-center gap-4">
              <Link
                to={createPageUrl('Cart')}
                className={`relative p-2 transition-colors ${
                  isScrolled
                    ? 'text-[#0E2A47] hover:text-[#A88D4B]'
                    : 'text-[#F5F1E8] hover:text-[#A88D4B]'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A88D4B] text-white text-xs flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden p-2 transition-colors ${
                  isScrolled ? 'text-[#0E2A47]' : 'text-[#F5F1E8]'
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#F5F1E8] z-50 md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2 L36 8 L36 22 C36 30 28 36.5 20 38 C12 36.5 4 30 4 22 L4 8 Z"
                      fill="#0E2A47" stroke="#A88D4B" strokeWidth="1.5" />
                    <path d="M13 15 Q16 13 19 15 Q16 17 13 15Z" fill="#A88D4B" />
                    <path d="M21 15 Q24 13 27 15 Q24 17 21 15Z" fill="#A88D4B" />
                    <circle cx="20" cy="20" r="2.5" fill="#A88D4B" />
                  </svg>
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-2xl text-[#0E2A47]">Tiger Hunt</span>
                    <span className="text-[9px] tracking-[0.28em] uppercase text-[#A88D4B] mt-0.5">Bespoke Tailoring</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2" aria-label="Close menu">
                  <X className="w-6 h-6 text-[#0E2A47]" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-3xl text-[#0E2A47] block hover:text-[#A88D4B] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}