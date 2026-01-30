import React from 'react';
import { motion } from 'framer-motion';
import { Shield, RefreshCw, Ruler, Award, Truck, Clock } from 'lucide-react';

const assurances = [
  {
    icon: Shield,
    title: "Perfect Fit Guarantee",
    description: "If your garment doesn't fit perfectly, we'll alter it free of charge until you're completely satisfied."
  },
  {
    icon: RefreshCw,
    title: "Lifetime Alterations",
    description: "Bodies change. We offer discounted alterations for life on any garment we've created."
  },
  {
    icon: Ruler,
    title: "Precise Measurements",
    description: "30+ measurements taken by master tailors ensure accuracy within 2mm tolerance."
  },
  {
    icon: Award,
    title: "Premium Materials",
    description: "Only fabrics from the world's finest mills—Loro Piana, Scabal, Holland & Sherry."
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "Free delivery across South Africa. International shipping available."
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Your garment ready on the agreed date, or we cover express shipping costs."
  }
];

export default function TrustSection() {
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
            Our Commitment
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F1E8] mb-6 leading-[1.2]">
            Trust & <span className="italic">Assurance</span>
          </h2>
          <p className="text-[#F5F1E8]/70 leading-relaxed">
            Investing in bespoke tailoring is a commitment. We honor that trust 
            with guarantees that ensure your complete satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assurances.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-[#F5F1E8]/5 border border-[#F5F1E8]/10 hover:border-[#A88D4B]/50 transition-colors group"
            >
              <item.icon className="w-8 h-8 text-[#A88D4B] mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-xl text-[#F5F1E8] mb-3">{item.title}</h3>
              <p className="text-sm text-[#F5F1E8]/60 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}