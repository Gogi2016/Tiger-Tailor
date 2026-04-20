import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Play } from 'lucide-react';

const featuredFabrics = [
  {
    id: 1,
    name: "Super 150s Wool",
    price_tier: "luxury",
    origin: "Italy",
    weight: "280g/m²",
    description: "The pinnacle of worsted wool. Exceptionally fine, with a luminous drape that holds structure through the longest days.",
    image: "https://i.ebayimg.com/images/g/xqwAAOSwNkZnUEe7/s-l500.jpg",
    video: "https://videos.pexels.com/video-files/4065462/4065462-uhd_2560_1440_25fps.mp4",
    color_swatch: "#6B6B6B",
  },
  {
    id: 2,
    name: "English Tweed",
    price_tier: "premium",
    origin: "United Kingdom",
    weight: "400g/m²",
    description: "Woven in the British Isles, this robust fabric carries centuries of heritage. Rugged yet refined, built for the long haul.",
    image: "https://i.etsystatic.com/25720085/r/il/8056b7/4675062499/il_1080xN.4675062499_mb95.jpg",
    video: null,
    color_swatch: "#8B7355",
  },
  {
    id: 3,
    name: "Cashmere Blend",
    price_tier: "luxury",
    origin: "Scotland",
    weight: "320g/m²",
    description: "A marriage of cashmere and fine wool. Unrivalled softness with enough structure for tailoring. True cold-weather luxury.",
    image: "https://image.made-in-china.com/2f0j00BZYUvfQzsToO/90-Wool-Woolen-10-Cashmere-Double-Face-Coat-Fabric.jpg",
    video: "https://videos.pexels.com/video-files/5698494/5698494-uhd_2560_1440_25fps.mp4",
    color_swatch: "#4A4A4A",
  },
];

const tierBadgeStyles = {
  standard: 'bg-[#EBE4D8] text-[#2B2B2B]',
  premium:  'bg-[#0E2A47]/10 text-[#0E2A47]',
  luxury:   'bg-[#A88D4B]/15 text-[#A88D4B]',
};

function FabricCard({ fabric, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && fabric.video) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden bg-[#EBE4D8] mb-5">
        <img
          src={fabric.image}
          alt={fabric.name}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered && fabric.video ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-105'}`}
        />

        {fabric.video && (
          <video ref={videoRef} src={fabric.video} muted loop playsInline preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase font-medium ${tierBadgeStyles[fabric.price_tier]}`}>
            {fabric.price_tier}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          <span className="px-2.5 py-1 bg-white/90 text-[#0E2A47] text-[10px] tracking-wide">{fabric.origin}</span>
          {fabric.video && (
            <span className={`flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
              <Play className="w-2.5 h-2.5 fill-white" /> Video
            </span>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-serif text-xl text-[#0E2A47]">{fabric.name}</h3>
        <div className="w-5 h-5 rounded-full border border-[#EBE4D8] flex-shrink-0 mt-0.5" style={{ backgroundColor: fabric.color_swatch }} />
      </div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#A88D4B] mb-3">{fabric.weight} · {fabric.origin}</p>
      <p className="text-[#2B2B2B]/65 text-sm leading-relaxed">{fabric.description}</p>
    </motion.div>
  );
}

export default function FabricsSection() {
  return (
    <section id="fabrics" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header — mirrors ProductsSection & TailorsSection layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">The Material</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] leading-[1.2]">Finest <span className="italic">Fabrics</span></h2>
            <p className="text-[#2B2B2B]/50 text-sm mt-3 flex items-center gap-1.5">
              Hover cards marked with <span className="inline-flex items-center gap-1 text-[#A88D4B]"><Play className="w-3 h-3 fill-[#A88D4B]" /> video</span> to see texture in motion
            </p>
          </div>
          <Link to={createPageUrl('Fabrics')} className="text-sm text-[#0E2A47] border-b border-[#0E2A47] pb-1 hover:text-[#A88D4B] hover:border-[#A88D4B] transition-colors whitespace-nowrap">
            View All Fabrics →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredFabrics.map((fabric, index) => (
            <FabricCard key={fabric.id} fabric={fabric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}