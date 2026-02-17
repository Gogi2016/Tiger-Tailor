import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A47]/40 via-[#0E2A47]/20 to-[#F5F1E8] z-10" />
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1080&fit=crop"
          alt="Bespoke tailoring"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay z-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Content */}
      <div className="relative z-30 max-w-[1200px] mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-[#F5F1E8]/90 mb-6 md:mb-8">
            Bespoke Tailoring • Johannesburg
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F5F1E8] mb-6 md:mb-8 leading-[1.1]"
        >
          Tailored for<br />
          <span className="italic">Distinction</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-[#F5F1E8]/80 max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed"
        >
          Where traditional craftsmanship meets modern sophistication. 
          Every stitch tells your story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#philosophy"
            className="px-8 py-4 border border-[#F5F1E8]/50 text-[#F5F1E8] text-sm tracking-wide hover:bg-[#F5F1E8]/10 transition-colors min-w-[200px]"
          >
            Discover More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#philosophy"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#F5F1E8]/60 hover:text-[#F5F1E8] transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}