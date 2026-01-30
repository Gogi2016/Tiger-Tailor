import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-[#EBE4D8]">
        <img
          src={product.images?.[0] || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-[#0E2A47] text-[#F5F1E8] text-xs tracking-widest uppercase">
            {product.type}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-xl text-[#0E2A47] mb-1 group-hover:text-[#A88D4B] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#2B2B2B]/60 text-sm">
            From {formatPrice(product.base_price || 0)}
          </p>
        </div>
        <motion.div
          className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ x: 4 }}
        >
          <ArrowRight className="w-5 h-5 text-[#A88D4B]" />
        </motion.div>
      </div>
    </motion.div>
  );
}