import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Play } from 'lucide-react';

const allProducts = [
  { id: 1, name: "The Classic Two-Piece", type: "suit", base_price: 15000, images: ["https://coofandy.com/cdn/shop/files/AMJ008669_GR-2_1400x.jpg?v=1708679572"], video: "https://www.youtube.com/shorts/SgasHFRhV24?feature=share" },
  { id: 2, name: "The Executive Three-Piece", type: "suit", base_price: 22000, images: ["https://i.etsystatic.com/21854381/r/il/1afd5c/3096574823/il_1080xN.3096574823_af4z.jpg"], video: "https://www.youtube.com/shorts/jTn1UaTQNSo?feature=share" },
  { id: 3, name: "The Director's Suit", type: "suit", base_price: 28000, images: ["https://i.pinimg.com/originals/58/da/70/58da7074a95d7d0f6287fb08ad69abac.jpg"], video: null },
  { id: 4, name: "The Wedding Collection", type: "suit", base_price: 35000, images: ["https://marisolexdesigns.com/wp-content/uploads/2024/10/ls-project-2-slide-2.jpg"], video: null },
  { id: 5, name: "The Perfect White Shirt", type: "shirt", base_price: 3500, images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"], video: null },
  { id: 6, name: "The Business Essential", type: "shirt", base_price: 2800, images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=750&fit=crop"], video: null },
  { id: 7, name: "The Linen Casual", type: "shirt", base_price: 3200, images: ["https://i.pinimg.com/originals/8e/48/96/8e4896b96e905373bc89eb303c4732a8.jpg"], video: null },
  { id: 8, name: "The Overcoat", type: "coat", base_price: 18000, images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop"], video: null },
  { id: 9, name: "The Trench", type: "coat", base_price: 16000, images: ["https://tse4.mm.bing.net/th/id/OIP.LpQvbKiu2q3fJglWp9zViwHaHa?pid=Api&h=220&P=0"], video: null },
  { id: 10, name: "Oxford Brogues", type: "shoes", base_price: 8500, images: ["https://tse2.mm.bing.net/th/id/OIP.GNoAarnWEvLzgeGKdvq7AAHaEc?pid=Api&h=220&P=0"], video: null },
  { id: 11, name: "Chelsea Boots", type: "shoes", base_price: 9500, images: ["https://assets.timberland.eu/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1713276241/TB0A2PBBEM4-ALT3/Brimfield-Mid-Chelsea-Boot-for-Women-in-Brown.png"], video: null },
  { id: 12, name: "Silk Pocket Square Set", type: "accessory", base_price: 1200, images: ["https://m.media-amazon.com/images/I/81fUWpBDFeL._AC_UL1500_.jpg"], video: null },
];

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'suit', label: 'Suits' },
  { value: 'shirt', label: 'Shirts' },
  { value: 'coat', label: 'Coats' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'accessory', label: 'Accessories' },
];

function ProductCard({ product, index }) {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
    >
      <Link to={`${createPageUrl('ProductDetail')}?id=${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#EBE4D8] mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered && product.video ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-105'}`}
          />
          {product.video && (
            <video ref={videoRef} src={product.video} muted loop playsInline preload="none"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          {product.video && (
            <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[0.15em] uppercase transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
              <Play className="w-2.5 h-2.5 fill-white" /> Video
            </div>
          )}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 bg-[#F5F1E8] text-[#0E2A47] text-[10px] tracking-[0.2em] uppercase">{product.type}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
            <span className="text-[#A88D4B] text-xs tracking-[0.2em] uppercase">Customise →</span>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <h3 className="font-serif text-lg text-[#0E2A47] group-hover:text-[#A88D4B] transition-colors duration-300 leading-tight">{product.name}</h3>
          <p className="font-serif text-lg text-[#0E2A47] flex-shrink-0 ml-3">{formatPrice(product.base_price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.type === activeCategory);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-[#F5F1E8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">Our Collection</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">Bespoke <span className="italic">Creations</span></h1>
          <p className="text-[#2B2B2B]/70 leading-relaxed mb-2">Each piece begins as a conversation and ends as a masterwork.</p>
          <p className="text-[#2B2B2B]/50 text-sm flex items-center justify-center gap-1.5">
            Hover cards marked with <span className="inline-flex items-center gap-1 text-[#A88D4B]"><Play className="w-3 h-3 fill-[#A88D4B]" /> Video</span> to see them in motion
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map(cat => (
            <Button key={cat.value} variant={activeCategory === cat.value ? "default" : "outline"} onClick={() => setActiveCategory(cat.value)}
              className={activeCategory === cat.value ? 'bg-[#0E2A47] text-[#F5F1E8] hover:bg-[#0E2A47]/90' : 'border-[#0E2A47] text-[#0E2A47] hover:bg-[#0E2A47] hover:text-[#F5F1E8]'}
            >
              {cat.label}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}