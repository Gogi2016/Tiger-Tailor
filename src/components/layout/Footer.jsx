import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Instagram, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

const exploreLinks = [
  { label: 'Products',          page: 'Products' },
  { label: 'Meet Our Tailors',  page: 'Tailors' },
  { label: 'Our Fabrics',       page: 'Fabrics' },
  { label: 'Measurement Guide', page: 'MeasurementGuide' },
  { label: 'Book Consultation', page: 'Contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', page: 'Privacy' },
  { label: 'Terms of Service', page: 'Terms' },
  { label: 'Shipping Policy', page: 'Shipping' },
  { label: 'Returns', page: 'Returns' },
];

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <footer className="bg-[#0E2A47] text-[#F5F1E8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Brand */}
            <div>
              <span className="font-serif text-3xl block mb-6">Tiger Hunt</span>
              <p className="text-[#F5F1E8]/70 text-sm leading-relaxed mb-6">
                Bespoke tailoring for the modern gentleman. Crafted with precision, delivered with care.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 border border-[#F5F1E8]/20 hover:border-[#A88D4B] hover:text-[#A88D4B] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:hello@tigerhunt.co.za" className="p-2 border border-[#F5F1E8]/20 hover:border-[#A88D4B] hover:text-[#A88D4B] transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-6">Explore</h4>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={createPageUrl(link.page)}
                      className="text-sm text-[#F5F1E8]/70 hover:text-[#F5F1E8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-[#A88D4B] flex-shrink-0" />
                  <span className="text-sm text-[#F5F1E8]/70">
                    123 Fashion District<br />Johannesburg, 2000
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#A88D4B] flex-shrink-0" />
                  <a href="tel:+27112345678" className="text-sm text-[#F5F1E8]/70 hover:text-[#F5F1E8] transition-colors">
                    +27 11 234 5678
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#A88D4B] flex-shrink-0" />
                  <a href="mailto:hello@tigerhunt.co.za" className="text-sm text-[#F5F1E8]/70 hover:text-[#F5F1E8] transition-colors">
                    hello@tigerhunt.co.za
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[#F5F1E8]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#F5F1E8]/50">
              © {new Date().getFullYear()} Tiger Hunt. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={createPageUrl(link.page)}
                  className="text-xs text-[#F5F1E8]/50 hover:text-[#F5F1E8] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#A88D4B] text-[#0E2A47] shadow-lg transition-opacity duration-300 z-50 ${showScroll ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}