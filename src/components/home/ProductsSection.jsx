import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProductCard from '@/components/ui/ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: "The Classic Two-Piece",
    type: "suit",
    base_price: 15000,
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"],
    description: "Timeless elegance for the modern professional"
  },
  {
    id: 2,
    name: "The Executive Three-Piece",
    type: "suit",
    base_price: 22000,
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop"],
    description: "Command the room with confidence"
  },
  {
    id: 3,
    name: "The Perfect White Shirt",
    type: "shirt",
    base_price: 3500,
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"],
    description: "The foundation of every great wardrobe"
  },
  {
    id: 4,
    name: "The Overcoat",
    type: "coat",
    base_price: 18000,
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop"],
    description: "Winter sophistication, uncompromised"
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 md:py-32 bg-[#F5F1E8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
              Our Collection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] leading-[1.2]">
              Crafted for <span className="italic">You</span>
            </h2>
          </div>
          <Link
            to={createPageUrl('Products')}
            className="text-sm text-[#0E2A47] border-b border-[#0E2A47] pb-1 hover:text-[#A88D4B] hover:border-[#A88D4B] transition-colors"
          >
            View All Products →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}