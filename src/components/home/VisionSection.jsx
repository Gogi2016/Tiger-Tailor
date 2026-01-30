import React from 'react';
import { motion } from 'framer-motion';
import TimelineBlock from '@/components/ui/TimelineBlock';

const visionTimeline = [
  {
    year: "Foundation",
    title: "A Dream Takes Shape",
    description: "Tiger Hunt was born from a simple belief: every person deserves clothing that truly fits. What started in a small Johannesburg workshop has grown into a symbol of African excellence in bespoke tailoring."
  },
  {
    year: "Growth",
    title: "Building Excellence",
    description: "We invested in our craft—training with Savile Row masters, sourcing the finest European fabrics, and developing techniques suited to African bodies and lifestyles."
  },
  {
    year: "Today",
    title: "Accessible Luxury",
    description: "Over 5,000 garments later, we've refined our process to offer bespoke quality at prices that honor your investment. Our studio welcomes clients from across the continent."
  },
  {
    year: "Tomorrow",
    title: "The Future of Tailoring",
    description: "We're pioneering digital measurement technology and sustainable fabric partnerships, ensuring Tiger Hunt remains at the forefront of bespoke tailoring for generations to come."
  }
];

export default function VisionSection() {
  return (
    <section className="py-24 md:py-32 bg-[#EBE4D8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
            Our Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] leading-[1.2]">
            The Vision <span className="italic">Continues</span>
          </h2>
        </motion.div>

        <TimelineBlock items={visionTimeline} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20 pt-16 border-t border-[#0E2A47]/10"
        >
          <h3 className="font-serif text-3xl text-[#0E2A47] mb-4">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-[#2B2B2B]/70 mb-8 max-w-md mx-auto">
            Join thousands who've discovered the difference bespoke tailoring makes.
          </p>
          <a
            href="#"
            className="inline-flex px-8 py-4 bg-[#0E2A47] text-[#F5F1E8] text-sm tracking-wide hover:bg-[#0E2A47]/90 transition-colors"
          >
            Book Your Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}