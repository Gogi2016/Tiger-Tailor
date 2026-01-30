import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';

const problems = [
  "Off-the-rack suits that never fit quite right",
  "Fast fashion that falls apart after a season",
  "Generic styles that don't reflect your personality",
  "Poor quality fabrics that look cheap up close",
];

const solutions = [
  "Precision measurements for perfect fit",
  "Heirloom-quality construction that lasts decades",
  "Personalized designs that tell your story",
  "Premium fabrics from the world's finest mills",
];

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0E2A47]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
            The Problem We Solve
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F1E8] leading-[1.2]">
            Why Settle for <span className="italic">Less?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-lg text-[#F5F1E8]/50 mb-8">The Status Quo</h3>
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-[#F5F1E8]/5 border-l-2 border-red-400/50"
              >
                <AlertCircle className="w-5 h-5 text-red-400/70 flex-shrink-0 mt-0.5" />
                <span className="text-[#F5F1E8]/70">{problem}</span>
              </motion.div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-lg text-[#A88D4B] mb-8">The Tiger Hunt Way</h3>
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="flex items-start gap-4 p-5 bg-[#A88D4B]/10 border-l-2 border-[#A88D4B]"
              >
                <Check className="w-5 h-5 text-[#A88D4B] flex-shrink-0 mt-0.5" />
                <span className="text-[#F5F1E8]">{solution}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}