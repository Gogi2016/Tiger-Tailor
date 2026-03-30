import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const featuredFabrics = [
  {
    id: 1,
    name: "Super 150s Wool",
    price_tier: "luxury",
    origin: "Italy",
    weight: "280g/m²",
    description: "The pinnacle of worsted wool. Exceptionally fine, with a luminous drape that holds structure through the longest days.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    color_swatch: "#6B6B6B",
  },
  {
    id: 2,
    name: "English Tweed",
    price_tier: "premium",
    origin: "United Kingdom",
    weight: "400g/m²",
    description: "Woven in the British Isles, this robust fabric carries centuries of heritage. Rugged yet refined, built for the long haul.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    color_swatch: "#8B7355",
  },
  {
    id: 3,
    name: "Cashmere Blend",
    price_tier: "luxury",
    origin: "Scotland",
    weight: "320g/m²",
    description: "A marriage of cashmere and fine wool. Unrivalled softness with enough structure for tailoring. True cold-weather luxury.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop",
    color_swatch: "#4A4A4A",
  },
];

const tierBadgeStyles = {
  standard: 'bg-[#EBE4D8] text-[#2B2B2B]',
  premium:  'bg-[#0E2A47]/10 text-[#0E2A47]',
  luxury:   'bg-[#A88D4B]/15 text-[#A88D4B]',
};

export default function FabricsSection() {
  return (
    <section id="fabrics" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header — mirrors ProductsSection & TailorsSection layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
              The Material
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] leading-[1.2]">
              Finest <span className="italic">Fabrics</span>
            </h2>
          </div>
          <Link
            to={createPageUrl('Fabrics')}
            className="text-sm text-[#0E2A47] border-b border-[#0E2A47] pb-1 hover:text-[#A88D4B] hover:border-[#A88D4B] transition-colors whitespace-nowrap"
          >
            View All Fabrics →
          </Link>
        </motion.div>

        {/* 3 Featured Fabric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFabrics.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#EBE4D8] mb-5">
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-medium ${tierBadgeStyles[fabric.price_tier]}`}>
                    {fabric.price_tier}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-white/90 text-[#0E2A47] text-[10px] tracking-wide">
                    {fabric.origin}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-serif text-xl text-[#0E2A47]">{fabric.name}</h3>
                <div
                  className="w-5 h-5 rounded-full border border-[#EBE4D8] flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: fabric.color_swatch }}
                />
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#A88D4B] mb-3">
                {fabric.weight} · {fabric.origin}
              </p>
              <p className="text-[#2B2B2B]/65 text-sm leading-relaxed">
                {fabric.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}