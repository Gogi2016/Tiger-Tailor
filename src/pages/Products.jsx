import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ProductCard from '@/components/ui/ProductCard';

// Local product data
const allProducts = [
  {
    id: 1,
    name: "The Classic Two-Piece",
    type: "suit",
    base_price: 15000,
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"],
  },
  {
    id: 2,
    name: "The Executive Three-Piece",
    type: "suit",
    base_price: 22000,
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop"],
  },
  {
    id: 3,
    name: "The Director's Suit",
    type: "suit",
    base_price: 28000,
    images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=750&fit=crop"],
  },
  {
    id: 4,
    name: "The Wedding Collection",
    type: "suit",
    base_price: 35000,
    images: ["https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=750&fit=crop"],
  },
  {
    id: 5,
    name: "The Perfect White Shirt",
    type: "shirt",
    base_price: 3500,
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"],
  },
  {
    id: 6,
    name: "The Business Essential",
    type: "shirt",
    base_price: 2800,
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=750&fit=crop"],
  },
  {
    id: 7,
    name: "The Linen Casual",
    type: "shirt",
    base_price: 3200,
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop"],
  },
  {
    id: 8,
    name: "The Overcoat",
    type: "coat",
    base_price: 18000,
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop"],
  },
  {
    id: 9,
    name: "The Trench",
    type: "coat",
    base_price: 16000,
    images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop"],
  },
  {
    id: 10,
    name: "Oxford Brogues",
    type: "shoes",
    base_price: 8500,
    images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=750&fit=crop"],
  },
  {
    id: 11,
    name: "Chelsea Boots",
    type: "shoes",
    base_price: 9500,
    images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=750&fit=crop"],
  },
  {
    id: 12,
    name: "Silk Pocket Square Set",
    type: "accessory",
    base_price: 1200,
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"],
  },
];

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'suit', label: 'Suits' },
  { value: 'shirt', label: 'Shirts' },
  { value: 'coat', label: 'Coats' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessory', label: 'Accessories' },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.type === activeCategory);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-[#F5F1E8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
            Our Collection
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">
            Bespoke <span className="italic">Creations</span>
          </h1>
          <p className="text-[#2B2B2B]/70 leading-relaxed">
            Each piece begins as a conversation and ends as a masterwork. 
            Explore our range of customizable garments.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(cat => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.value)}
              className={`
                ${activeCategory === cat.value 
                  ? 'bg-[#0E2A47] text-[#F5F1E8] hover:bg-[#0E2A47]/90' 
                  : 'border-[#0E2A47] text-[#0E2A47] hover:bg-[#0E2A47] hover:text-[#F5F1E8]'
                }
              `}
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#2B2B2B]/60">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
