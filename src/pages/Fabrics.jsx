import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X, MapPin, Sparkles, Scissors, Play, Pause } from 'lucide-react';

const allFabrics = [
  {
    id: 1,
    name: "Super 150s Wool",
    price_tier: "luxury",
    origin: "Italy",
    weight: "280g/m²",
    description: "The pinnacle of worsted wool. Exceptionally fine, with a luminous drape that holds structure through the longest days.",
    best_for: ["Formal suits", "Business wear", "Year-round use"],
    care: ["Dry clean only", "Store folded", "Press with steam"],
    image: "https://i.ebayimg.com/images/g/xqwAAOSwNkZnUEe7/s-l500.jpg",
    video: "https://videos.pexels.com/video-files/4065462/4065462-uhd_2560_1440_25fps.mp4",
    color_swatch: "#6B6B6B",
  },
  {
    id: 2,
    name: "Italian Linen",
    price_tier: "premium",
    origin: "Italy",
    weight: "200g/m²",
    description: "Breathable and naturally textured. Ideal for warmer climates, it softens with every wear and tells the story of a life well-lived.",
    best_for: ["Summer suits", "Casual shirts", "Resort wear"],
    care: ["Hand wash or dry clean", "Iron while damp", "Embrace natural creasing"],
    image: "https://www.stitchfabrics.co.uk/wp-content/uploads/IMG_0354-1-1080x1080.jpg",
    video: null,
    color_swatch: "#C8B89A",
  },
  {
    id: 3,
    name: "English Tweed",
    price_tier: "premium",
    origin: "United Kingdom",
    weight: "400g/m²",
    description: "Woven in the British Isles, this robust fabric carries centuries of heritage. Rugged yet refined, built for the long haul.",
    best_for: ["Country wear", "Blazers", "Autumn/Winter"],
    care: ["Dry clean recommended", "Brush after wearing", "Air out regularly"],
    image: "https://i.etsystatic.com/25720085/r/il/8056b7/4675062499/il_1080xN.4675062499_mb95.jpg",
    video: null,
    color_swatch: "#8B7355",
  },
  {
    id: 4,
    name: "Egyptian Cotton",
    price_tier: "standard",
    origin: "Egypt",
    weight: "120g/m²",
    description: "Long-staple cotton grown along the Nile. Exceptionally soft against the skin, with a smooth finish that launders beautifully.",
    best_for: ["Dress shirts", "Casual shirts", "Warm climates"],
    care: ["Machine wash cold", "Tumble dry low", "Iron on medium heat"],
    image: "https://fashionsoulintl.com/blog/wp-content/uploads/2025/06/What-Exactly-Is-Egyptian-Cotton-Fabric.jpg",
    video: null,
    color_swatch: "#F5F0E8",
  },
  {
    id: 5,
    name: "Cashmere Blend",
    price_tier: "luxury",
    origin: "Scotland",
    weight: "320g/m²",
    description: "A marriage of cashmere and fine wool. Unrivalled softness with enough structure for tailoring. True cold-weather luxury.",
    best_for: ["Winter suits", "Overcoats", "Evening wear"],
    care: ["Dry clean only", "Store in breathable bag", "Never hang — fold"],
    image: "https://image.made-in-china.com/2f0j00BZYUvfQzsToO/90-Wool-Woolen-10-Cashmere-Double-Face-Coat-Fabric.jpg",
    video: "https://videos.pexels.com/video-files/5698494/5698494-uhd_2560_1440_25fps.mp4",
    color_swatch: "#4A4A4A",
  },
  {
    id: 6,
    name: "Italian Super 150s Wool",
    price_tier: "luxury",
    origin: "Italy",
    weight: "260g/m²",
    description: "Crafted by the historic mills of Biella, this fabric offers an almost silk-like hand feel while retaining the structure essential for fine tailoring.",
    best_for: ["Power suits", "Board meetings", "Special occasions"],
    care: ["Dry clean only", "Cedar blocks for storage", "Press with cloth barrier"],
    image: "https://i.pinimg.com/736x/78/f5/42/78f542ccf7fda2f4a5e910f670751896.jpg", 
    video: null,
    color_swatch: "#2C3E50",
  },
  {
    id: 7,
    name: "British Tweed",
    price_tier: "premium",
    origin: "United Kingdom",
    weight: "380g/m²",
    description: "A classic herringbone weave from the British Isles. Characterful, durable, and deeply traditional — for the man who values permanence.",
    best_for: ["Blazers", "Countryside events", "Heritage styling"],
    care: ["Dry clean recommended", "Brush regularly", "Spot clean minor marks"],
    image: "https://higgsandhiggs.com/wp-content/uploads/2023/09/pile-wool-coating-tweed-fabric-british.jpeg", 
    video: null,
    color_swatch: "#7D6B52",
  },
  {
    id: 8,
    name: "Breathable Performance",
    price_tier: "luxury",
    origin: "Japan",
    weight: "180g/m²",
    description: "Japanese innovation meets Italian aesthetics. This technical fabric wicks moisture and resists wrinkles — for the man who never stops moving.",
    best_for: ["Travel suits", "Active professionals", "Tropical climates"],
    care: ["Machine wash gentle", "Hang dry", "No ironing needed"],
    image: "https://www.airmeshsupply.com/wp-content/uploads/2025/05/%E7%94%BB%E6%9D%BF-105.jpg",
    video: null,
    color_swatch: "#1A1A2E",
  },
  {
    id: 9,
    name: "Cashmere Wool Blend",
    price_tier: "luxury",
    origin: "Scotland",
    weight: "340g/m²",
    description: "A higher cashmere composition for those who demand the finest. Impossibly warm, impossibly light — the definition of understated luxury.",
    best_for: ["Winter overcoats", "Evening dress", "Gift quality"],
    care: ["Dry clean only", "Store flat in dust bag", "Handle with care"],
    image: "https://img.freepik.com/premium-photo/natural-wool-beige-fabric-cashmere-wool-texture-natural-wool-fabric-knitwear_583122-13.jpg?w=2000",
    video: null,
    color_swatch: "#3C3C3C",
  },
];

const tierFilters = [
  { value: 'all', label: 'All Fabrics' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
  { value: 'luxury', label: 'Luxury' },
];

const tierBadgeStyles = {
  standard: 'bg-[#EBE4D8] text-[#2B2B2B]',
  premium:  'bg-[#0E2A47]/10 text-[#0E2A47]',
  luxury:   'bg-[#A88D4B]/15 text-[#A88D4B]',
};

// ── Fabric Overlay with video ──
function FabricOverlay({ fabric, isOpen, onClose }) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const overlayVideoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setVideoPlaying(false);
    } else {
      document.body.style.overflow = 'unset';
      if (overlayVideoRef.current) {
        overlayVideoRef.current.pause();
        overlayVideoRef.current.currentTime = 0;
      }
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, fabric]);

  const toggleVideo = () => {
    if (!overlayVideoRef.current) return;
    if (videoPlaying) {
      overlayVideoRef.current.pause();
      setVideoPlaying(false);
    } else {
      overlayVideoRef.current.play().then(() => setVideoPlaying(true)).catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {isOpen && fabric && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0E2A47]/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[#F5F1E8] z-50 overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-[#EBE4D8] rounded-full transition-colors z-10">
              <X className="w-6 h-6 text-[#0E2A47]" />
            </button>

            {/* Hero — image + optional video toggle */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <img src={fabric.image} alt={fabric.name} className={`w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-0' : 'opacity-100'}`} />

              {fabric.video && (
                <video ref={overlayVideoRef} src={fabric.video} muted loop playsInline preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 h-2" style={{ backgroundColor: fabric.color_swatch }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-4xl text-[#F5F1E8] mb-2">{fabric.name}</h2>
                  <span className={`inline-block px-3 py-1 text-[10px] tracking-[0.25em] uppercase ${tierBadgeStyles[fabric.price_tier]}`}>
                    {fabric.price_tier}
                  </span>
                </div>
                {/* Video toggle button */}
                {fabric.video && (
                  <button
                    onClick={toggleVideo}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm hover:bg-white/30 transition-colors"
                  >
                    {videoPlaying ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4 fill-white" /> Watch Fabric</>}
                  </button>
                )}
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#EBE4D8]">
                  <MapPin className="w-5 h-5 text-[#A88D4B] mb-2" />
                  <span className="text-2xl font-serif text-[#0E2A47] block">{fabric.origin}</span>
                  <p className="text-sm text-[#2B2B2B]/60">Origin</p>
                </div>
                <div className="p-4 bg-white border border-[#EBE4D8]">
                  <Sparkles className="w-5 h-5 text-[#A88D4B] mb-2" />
                  <span className="text-2xl font-serif text-[#0E2A47] block">{fabric.weight}</span>
                  <p className="text-sm text-[#2B2B2B]/60">Weight</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-3">About This Fabric</h3>
                <p className="text-[#2B2B2B]/80 leading-relaxed">{fabric.description}</p>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-3">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {fabric.best_for.map((use, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-[#EBE4D8] text-sm text-[#0E2A47]">{use}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-3">Care Instructions</h3>
                <ul className="space-y-2">
                  {fabric.care.map((tip, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#2B2B2B]/80">
                      <Scissors className="w-4 h-4 text-[#A88D4B] flex-shrink-0" />{tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Fabric Card with video hover ──
function FabricCard({ fabric, index, onClick }) {
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
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-white border border-[#EBE4D8] overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-[#EBE4D8]">
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
            <span className={`flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-wide transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
              <Play className="w-2.5 h-2.5 fill-white" /> Video
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#0E2A47]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-[#A88D4B] text-[10px] tracking-[0.25em] uppercase mb-2">Best For</p>
          <div className="space-y-1 mb-4">
            {fabric.best_for.map((use, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#A88D4B]" />
                <span className="text-white/85 text-xs">{use}</span>
              </div>
            ))}
          </div>
          <span className="text-[#F5F1E8] text-sm tracking-wide">View Details →</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-lg text-[#0E2A47] leading-tight group-hover:text-[#A88D4B] transition-colors">
            {fabric.name}
          </h3>
          <div className="w-5 h-5 rounded-full border border-[#EBE4D8] flex-shrink-0 mt-0.5" style={{ backgroundColor: fabric.color_swatch }} />
        </div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#A88D4B] mb-3">{fabric.weight} · {fabric.origin}</p>
        <p className="text-[#2B2B2B]/65 text-sm leading-relaxed line-clamp-3">{fabric.description}</p>
      </div>
    </motion.div>
  );
}

export default function Fabrics() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedFabric, setSelectedFabric] = useState(null);

  const filteredFabrics = activeFilter === 'all'
    ? allFabrics
    : allFabrics.filter(f => f.price_tier === activeFilter);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-[#F5F1E8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">The Material</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">Our <span className="italic">Fabrics</span></h1>
          <p className="text-[#2B2B2B]/70 leading-relaxed mb-2">
            Every great garment begins with exceptional cloth. Explore our curated selection of the world's finest fabrics.
          </p>
          <p className="text-[#2B2B2B]/50 text-sm flex items-center justify-center gap-1.5">
            Hover cards marked with <span className="inline-flex items-center gap-1 text-[#A88D4B]"><Play className="w-3 h-3 fill-[#A88D4B]" /> Video</span> to see fabric texture in motion
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tierFilters.map(filter => (
            <Button key={filter.value} variant={activeFilter === filter.value ? "default" : "outline"} onClick={() => setActiveFilter(filter.value)}
              className={activeFilter === filter.value ? 'bg-[#0E2A47] text-[#F5F1E8] hover:bg-[#0E2A47]/90' : 'border-[#0E2A47] text-[#0E2A47] hover:bg-[#0E2A47] hover:text-[#F5F1E8]'}
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredFabrics.map((fabric, index) => (
              <FabricCard key={fabric.id} fabric={fabric} index={index} onClick={() => setSelectedFabric(fabric)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredFabrics.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#2B2B2B]/60">No fabrics found in this tier.</p>
          </div>
        )}
      </div>

      <FabricOverlay fabric={selectedFabric} isOpen={!!selectedFabric} onClose={() => setSelectedFabric(null)} />
    </div>
  );
}