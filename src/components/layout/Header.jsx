import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Products', href: '#products' },
  { label: 'Tailors', href: '#tailors' },
  { label: 'Process', href: '#process' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-[#F5F1E8]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link
              to={createPageUrl('Home')}
              className="font-serif text-2xl md:text-3xl text-[#0E2A47] tracking-tight"
            >
              Tiger Hunt
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm tracking-wide text-[#2B2B2B]/80 hover:text-[#0E2A47] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-px bg-[#A88D4B] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                to={createPageUrl('Contact')}
                className="hidden md:inline-flex px-6 py-2.5 bg-[#0E2A47] text-[#F5F1E8] text-sm tracking-wide hover:bg-[#0E2A47]/90 transition-colors"
              >
                Book Consultation
              </Link>
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-[#0E2A47]"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

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
                <span className="font-serif text-2xl text-[#0E2A47]">Tiger Hunt</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-[#0E2A47]" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="font-serif text-3xl text-[#0E2A47]"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              
              <div className="mt-auto">
                <Link
                  to={createPageUrl('Contact')}
                  className="block w-full py-4 bg-[#0E2A47] text-[#F5F1E8] text-center text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}