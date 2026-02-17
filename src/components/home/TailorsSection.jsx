import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TailorCard from '@/components/ui/TailorCard';
import TailorOverlay from '@/components/ui/TailorOverlay';

const tailors = [
  {
    id: 1,
    name: "James Mokoena",
    portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop",
    years_experience: 18,
    style_focus: "Classic British Tailoring",
    specialties: ["Savile Row Techniques", "Canvassed Construction", "Formal Wear"],
    approach: "I believe in the invisible art of tailoring—when done right, people notice you, not your clothes. Every garment should feel like a second skin, moving with you through life's important moments.",
    best_suited_for: ["Corporate executives", "Wedding parties", "Those who appreciate tradition"],
    lead_time_days: 28,
    samples: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
      "https://tse1.mm.bing.net/th/id/OIP.PowMOIMjPsLKD-707RNBLgHaI4?pid=Api&P=0&h=220"
    ]
  },
  {
    id: 2,
    name: "Sarah van der Berg",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
    years_experience: 12,
    style_focus: "Contemporary Italian",
    specialties: ["Soft Shoulders", "Lightweight Fabrics", "Modern Silhouettes"],
    approach: "Fashion evolves, and so should tailoring. I blend Italian elegance with African flair, creating pieces that are both current and timeless. Comfort is non-negotiable—you should feel as good as you look.",
    best_suited_for: ["Creative professionals", "Modern minimalists", "Those seeking understated luxury"],
    lead_time_days: 21,
    samples: [
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=400&h=400&fit=crop"
    ]
  },
  {
    id: 3,
    name: "David Nkosi",
    portrait: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop",
    years_experience: 22,
    style_focus: "Power Dressing",
    specialties: ["Statement Pieces", "Bold Patterns", "Evening Wear"],
    approach: "Your clothes should announce your arrival before you speak a word. I specialize in creating presence—garments that command attention while remaining impeccably refined. This is tailoring as armor.",
    best_suited_for: ["Public figures", "Entrepreneurs", "Those who lead from the front"],
    lead_time_days: 35,
    samples: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=400&fit=crop"
    ]
  }
];

export default function TailorsSection() {
  const [selectedTailor, setSelectedTailor] = useState(null);

  return (
    <section id="tailors" className="py-24 md:py-32 bg-[#F5F1E8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
            Meet Your Artisans
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">
            Choose Your <span className="italic">Tailor</span>
          </h2>
          <p className="text-[#2B2B2B]/70 leading-relaxed">
            Each of our master tailors brings a unique perspective and specialty. 
            Find the one whose vision aligns with yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tailors.map((tailor) => (
            <TailorCard 
              key={tailor.id} 
              tailor={tailor} 
              onClick={() => setSelectedTailor(tailor)}
            />
          ))}
        </div>
      </div>

      <TailorOverlay
        tailor={selectedTailor}
        isOpen={!!selectedTailor}
        onClose={() => setSelectedTailor(null)}
      />
    </section>
  );
}