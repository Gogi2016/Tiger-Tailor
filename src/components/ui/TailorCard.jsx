import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

export default function TailorCard({ tailor, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-6">
        <img
          src={tailor.portrait || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"}
          alt={tailor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[#F5F1E8] text-sm tracking-wide">View Profile →</span>
        </div>
      </div>
      
      <h3 className="font-serif text-2xl text-[#0E2A47] mb-2">{tailor.name}</h3>
      <p className="text-[#2B2B2B]/70 text-sm mb-3">{tailor.style_focus}</p>
      
      <div className="flex items-center gap-4 text-sm text-[#2B2B2B]/60">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#A88D4B]" />
          <span>{tailor.years_experience} years</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#A88D4B]" />
          <span>{tailor.lead_time_days} days</span>
        </div>
      </div>
    </motion.div>
  );
}