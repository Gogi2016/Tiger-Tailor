import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineBlock({ items }) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#EBE4D8] -translate-x-1/2 hidden md:block" />
      
      <div className="space-y-16 md:space-y-24">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
              <span className="text-[#A88D4B] text-sm tracking-[0.3em] uppercase mb-2 block">
                {item.year}
              </span>
              <h4 className="font-serif text-2xl text-[#0E2A47] mb-3">{item.title}</h4>
              <p className="text-[#2B2B2B]/70 leading-relaxed">{item.description}</p>
            </div>
            
            <div className="relative z-10 w-4 h-4 bg-[#A88D4B] rounded-full ring-4 ring-[#F5F1E8]" />
            
            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}