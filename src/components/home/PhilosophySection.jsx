import React from 'react';
import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 md:py-32 bg-[#F5F1E8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop"
                alt="Tailor at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#A88D4B]/10 -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#A88D4B]/30 -z-10" />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
              Our Philosophy
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">
              The Art of <br />
              <span className="italic">Personal Style</span>
            </h2>
            
            <div className="space-y-6 text-[#2B2B2B]/80 leading-relaxed">
              <p>
                At Tiger Hunt, we believe that exceptional clothing is more than fabric 
                and thread—it's an expression of identity. Each piece we create is a 
                collaboration between artisan and client, resulting in garments that 
                fit not just the body, but the life you lead.
              </p>
              <p>
                Our master tailors bring generations of expertise to every consultation, 
                guiding you through a process that honors tradition while embracing 
                contemporary sensibilities. From the first measurement to the final 
                fitting, we're committed to crafting pieces that elevate your presence.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-[#EBE4D8] grid grid-cols-3 gap-8">
              <div>
                <span className="font-serif text-4xl text-[#0E2A47]">25+</span>
                <p className="text-sm text-[#2B2B2B]/60 mt-1">Years of Excellence</p>
              </div>
              <div>
                <span className="font-serif text-4xl text-[#0E2A47]">5k+</span>
                <p className="text-sm text-[#2B2B2B]/60 mt-1">Garments Crafted</p>
              </div>
              <div>
                <span className="font-serif text-4xl text-[#0E2A47]">100%</span>
                <p className="text-sm text-[#2B2B2B]/60 mt-1">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}