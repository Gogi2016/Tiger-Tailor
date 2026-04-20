import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Play } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: "The Classic Two-Piece",
    type: "suit",
    base_price: 15000,
    images: ["https://coofandy.com/cdn/shop/files/AMJ008669_GR-2_1400x.jpg?v=1708679572"],
    video: "https://videos.pexels.com/video-files/5698494/5698494-uhd_2560_1440_25fps.mp4",
    description: "Timeless elegance for the modern professional"
  },
  {
    id: 2,
    name: "The Executive Three-Piece",
    type: "suit",
    base_price: 22000,
    images: ["https://i.etsystatic.com/21854381/r/il/1afd5c/3096574823/il_1080xN.3096574823_af4z.jpg"],
    video: "https://videos.pexels.com/video-files/4065462/4065462-uhd_2560_1440_25fps.mp4",
    description: "Command the room with confidence"
  },
  {
    id: 3,
    name: "The Perfect White Shirt",
    type: "shirt",
    base_price: 3500,
    images: ["https://cdn.suitsupply.com/image/upload/bo_60px_solid_rgb:efefef,b_rgb:efefef,c_pad,dpr_1,w_768,h_1267,f_auto,q_auto,fl_progressive/products/shirts/default/summer/H7104_1.jpg"],
    video: null,
    description: "The foundation of every great wardrobe"
  },
  {
    id: 4,
    name: "The Overcoat",
    type: "coat",
    base_price: 18000,
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop"],
    video: null,
    description: "Winter sophistication, uncompromised"
  },
];

function FeaturedProductCard({ product, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(p);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && product.video) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
    >
      <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#EBE4D8] mb-5">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered && product.video ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          />
          {product.video && (
            <video ref={videoRef} src={product.video} muted loop playsInline preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          {product.video && (
            <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[0.15em] uppercase transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
              <Play className="w-2.5 h-2.5 fill-white" /> Video
            </div>
          )}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-[#F5F1E8] text-[#0E2A47] text-[10px] tracking-[0.2em] uppercase">{product.type}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-[#F5F1E8]/80 text-sm leading-relaxed">{product.description}</p>
            <span className="text-[#A88D4B] text-xs tracking-[0.2em] uppercase mt-2 block">View & Customise →</span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-serif text-xl text-[#0E2A47] group-hover:text-[#A88D4B] transition-colors duration-300 mb-1">{product.name}</h3>
            <p className="text-[#2B2B2B]/50 text-xs tracking-[0.15em] uppercase">{product.type}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#2B2B2B]/50 mb-0.5">from</p>
            <p className="font-serif text-lg text-[#0E2A47]">{formatPrice(product.base_price)}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 md:py-32 bg-[#F5F1E8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">Our Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] leading-[1.2]">Crafted for <span className="italic">You</span></h2>
            <p className="text-[#2B2B2B]/50 text-sm mt-3 flex items-center gap-1.5">
              Hover cards marked with <span className="inline-flex items-center gap-1 text-[#A88D4B] font-medium"><Play className="w-3 h-3 fill-[#A88D4B]" /> video</span> to see them in motion
            </p>
          </div>
          <Link to={createPageUrl('Products')} className="text-sm text-[#0E2A47] border-b border-[#0E2A47] pb-1 hover:text-[#A88D4B] hover:border-[#A88D4B] transition-colors whitespace-nowrap">
            View All Products →
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <FeaturedProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}