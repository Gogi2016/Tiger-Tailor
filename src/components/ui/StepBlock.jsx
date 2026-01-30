import React from 'react';
import { motion } from 'framer-motion';

export default function StepBlock({ step, index, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isActive ? 1 : 0.4, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative pl-8 pb-12 border-l-2 transition-colors duration-500 ${
        isActive ? 'border-[#A88D4B]' : 'border-[#EBE4D8]'
      }`}
    >
      <div
        className={`absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full transition-colors duration-500 ${
          isActive ? 'bg-[#A88D4B]' : 'bg-[#EBE4D8]'
        }`}
      />
      
      <span className={`text-xs tracking-[0.3em] uppercase mb-3 block transition-colors ${
        isActive ? 'text-[#A88D4B]' : 'text-[#2B2B2B]/40'
      }`}>
        Step {String(index + 1).padStart(2, '0')}
      </span>
      
      <h4 className={`font-serif text-2xl mb-3 transition-colors ${
        isActive ? 'text-[#0E2A47]' : 'text-[#2B2B2B]/40'
      }`}>
        {step.title}
      </h4>
      
      <p className={`text-base leading-relaxed transition-colors ${
        isActive ? 'text-[#2B2B2B]/80' : 'text-[#2B2B2B]/30'
      }`}>
        {step.description}
      </p>
    </motion.div>
  );
}