import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import TailorCard from '@/components/ui/TailorCard';
import TailorOverlay from '@/components/ui/TailorOverlay';

const allTailors = [
  {
    id: 1,
    name: "James Mokoena",
    portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop",
    years_experience: 18,
    style_focus: "Classic British",
    specialties: ["Savile Row Techniques", "Canvassed Construction", "Formal Wear"],
    approach: "I believe in the invisible art of tailoring—when done right, people notice you, not your clothes. Every garment should feel like a second skin, moving with you through life's important moments.",
    best_suited_for: ["Corporate executives", "Wedding parties", "Those who appreciate tradition"],
    lead_time_days: 28,
    samples: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=400&fit=crop"
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
  },
  {
    id: 4,
    name: "James Chen",
    portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
    years_experience: 9,
    style_focus: "Modern Minimal",
    specialties: ["Clean Lines", "Technical Fabrics", "Understated Luxury"],
    approach: "Less is more. Every seam, every detail is intentional. I create garments that whisper elegance rather than shout it—for the man who knows exactly who he is.",
    best_suited_for: ["Minimalists", "Tech executives", "Those who value quiet luxury"],
    lead_time_days: 18,
    samples: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop"
    ]
  },
  {
    id: 5,
    name: "Giovanni Rossi",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    years_experience: 25,
    style_focus: "Contemporary Italian",
    specialties: ["Neapolitan Construction", "Hand Stitching", "Luxury Fabrics"],
    approach: "My work is a love letter to the great Italian tailoring houses. Every garment is a piece of art, rooted in centuries of craft and brought to life with passion.",
    best_suited_for: ["Connoisseurs", "Special occasions", "Those who invest in quality"],
    lead_time_days: 42,
    samples: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=400&h=400&fit=crop"
    ]
  },
  {
    id: 6,
    name: "William Thornton",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    years_experience: 31,
    style_focus: "Classic British",
    specialties: ["Country Wear", "Tweeds & Wools", "Traditional Cuts"],
    approach: "True British tailoring is about longevity. I make clothes that outlast trends and get better with age—garments you will one day pass on to the next generation.",
    best_suited_for: ["Traditionalists", "Country occasions", "Heirloom-quality seekers"],
    lead_time_days: 45,
    samples: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop"
    ]
  },
  {
    id: 7,
    name: "Marcus Chen",
    portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    years_experience: 8,
    style_focus: "Modern Minimal",
    specialties: ["Athletic Cuts", "Slim Silhouettes", "Performance Fabrics"],
    approach: "Modern men deserve tailoring that moves with them. I fuse contemporary aesthetics with athletic proportions for the active professional who refuses to compromise.",
    best_suited_for: ["Active professionals", "Younger clients", "Those with athletic builds"],
    lead_time_days: 16,
    samples: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400&h=400&fit=crop"
    ]
  },
  {
    id: 8,
    name: "Sofia Martinez",
    portrait: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    years_experience: 15,
    style_focus: "Power Dressing",
    specialties: ["Avant-garde Cuts", "Luxury Detailing", "Bold Silhouettes"],
    approach: "I challenge the conventions of menswear while respecting its foundations. My work is for those unafraid to define their own style language and wear it with conviction.",
    best_suited_for: ["Fashion-forward clients", "Creative industries", "Those who set trends"],
    lead_time_days: 24,
    samples: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop"
    ]
  }
];

const styleFilters = [
  { value: 'all', label: 'All Tailors' },
  { value: 'Classic British', label: 'Classic British' },
  { value: 'Contemporary Italian', label: 'Contemporary Italian' },
  { value: 'Power Dressing', label: 'Power Dressing' },
  { value: 'Modern Minimal', label: 'Modern Minimal' },
];

export default function Tailors() {
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTailors = activeFilter === 'all'
    ? allTailors
    : allTailors.filter(t => t.style_focus === activeFilter);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-[#F5F1E8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
            Meet Your Artisans
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">
            Our Master <span className="italic">Tailors</span>
          </h1>
          <p className="text-[#2B2B2B]/70 leading-relaxed">
            Each of our master tailors brings a unique perspective and specialty.
            Find the one whose vision aligns with yours.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {styleFilters.map(filter => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.value)}
              className={
                activeFilter === filter.value
                  ? 'bg-[#0E2A47] text-[#F5F1E8] hover:bg-[#0E2A47]/90'
                  : 'border-[#0E2A47] text-[#0E2A47] hover:bg-[#0E2A47] hover:text-[#F5F1E8]'
              }
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Tailor Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {filteredTailors.map((tailor) => (
              <TailorCard
                key={tailor.id}
                tailor={tailor}
                onClick={() => setSelectedTailor(tailor)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredTailors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#2B2B2B]/60">No tailors found for this style.</p>
          </div>
        )}

      </div>

      <TailorOverlay
        tailor={selectedTailor}
        isOpen={!!selectedTailor}
        onClose={() => setSelectedTailor(null)}
      />
    </div>
  );
}