import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, ChevronRight, ChevronLeft, CheckCircle, Clock, Star, Users, Scissors, MapPin, Sparkles, Shield, Ruler, Award, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

const allProducts = [
  { id: 1, name: "The Classic Two-Piece", type: "suit", base_price: 15000, images: ["http://uncommonsmart.com/cdn/shop/files/Classic-Two-piece-Men-Suits-White-Blazer-and-Pants-Basic-Slim-Fit-Suit-Jacket-Wedding-Prom.webp?v=1718071075", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=1000&fit=crop", "https://coofandy.com/cdn/shop/files/AMJ008669_GR-2_1400x.jpg?v=1708679572"], video: "https://www.youtube.com/shorts/SgasHFRhV24?feature=share", description: "A timeless silhouette refined for the modern professional. The Classic Two-Piece is the cornerstone of any distinguished wardrobe — built to carry you through boardrooms, celebrations, and everything in between.", features: ["Full canvas construction", "Pick stitching on lapels", "Working buttonholes", "Surgeon's cuffs"], care: "Dry clean only. Store on a wide-shouldered hanger." },
  { id: 2, name: "The Executive Three-Piece", type: "suit", base_price: 22000, images: ["https://i.pinimg.com/originals/5d/83/10/5d8310ab5a0d2049fa60d7f20d56500a.jpg", "https://i.etsystatic.com/21854381/r/il/1afd5c/3096574823/il_1080xN.3096574823_af4z.jpg"], video: "https://www.youtube.com/shorts/jTn1UaTQNSo?feature=share", description: "Authority, elegance, and presence — the three-piece suit is a statement of intent. The matching waistcoat adds a layer of sophistication that sets you apart before you say a word.", features: ["Matching waistcoat included", "Half-canvas construction", "Bespoke lining options", "Horn buttons"], care: "Dry clean only. Rotate with other suits." },
  { id: 3, name: "The Director's Suit", type: "suit", base_price: 28000, images: ["https://i.pinimg.com/originals/48/d4/1c/48d41c69214fa3b8f1bd544028c96988.webp", "https://i.pinimg.com/originals/58/da/70/58da7074a95d7d0f6287fb08ad69abac.jpg"], video: null, description: "Designed for those who shape decisions. The Director's Suit commands the room with a structured shoulder and clean trouser line — a garment that works as hard as you do.", features: ["Structured shoulder", "Double-pleated trousers", "Jetted chest pocket", "AMF stitching throughout"], care: "Dry clean only. Press with a damp cloth." },
  { id: 4, name: "The Wedding Collection", type: "suit", base_price: 35000, images: ["https://marisolexdesigns.com/wp-content/uploads/2024/10/ls-project-2-slide-2.jpg", "https://image.made-in-china.com/2f0j00MkbovHIcCPqE/Business-Wedding-Bespoke-Tailor-Suit-Made-to-Measure-Suit-Clothes-Custom-Men-Suits.jpg", "https://lamilagobespoketailors.com.au/wp-content/uploads/2022/08/adelaid-wedding-suit-tailor.png", "https://i.pinimg.com/originals/b4/a2/40/b4a2405870669876ac73211d8a0aa865.png"], video: null, description: "Your wedding day demands perfection. The Wedding Collection is crafted with extraordinary attention to detail — a garment you will cherish long after the celebration ends.", features: ["Hand-finished buttonholes", "Personalised monogram", "Peak or notch lapel", "Coordinated accessories available"], care: "Dry clean. Store in provided garment bag." },
  { id: 5, name: "The Perfect White Shirt", type: "shirt", base_price: 3500, images: ["https://cdn.suitsupply.com/image/upload/bo_60px_solid_rgb:efefef,b_rgb:efefef,c_pad,dpr_1,w_768,h_1267,f_auto,q_auto,fl_progressive/products/shirts/default/summer/H7104_1.jpg", "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=1000&fit=crop"], video: null, description: "No wardrobe is complete without the perfect white shirt. Ours is cut to sit impeccably under a jacket and stand alone with equal confidence.", features: ["Mother-of-pearl buttons", "Split yoke construction", "French seams", "Gauntlet cuffs"], care: "Machine wash 30°C. Iron while damp." },
  { id: 6, name: "The Business Essential", type: "shirt", base_price: 2800, images: ["https://images.stockcake.com/public/7/5/a/75a5e268-e964-407f-96fb-40e6cc39b7cb_large/classic-menswear-essentials-stockcake.jpg"], video: null, description: "The workhorse of the professional wardrobe. Crafted to hold its shape through back-to-back meetings and long travel days.", features: ["Wrinkle-resistant finish", "Reinforced collar", "Classic barrel cuffs", "Precise collar stays"], care: "Machine wash 30°C. Low iron." },
  { id: 7, name: "The Linen Casual", type: "shirt", base_price: 3200, images: ["https://i.pinimg.com/originals/8e/48/96/8e4896b96e905373bc89eb303c4732a8.jpg"], video: null, description: "Ease, warmth, and effortless style. The Linen Casual moves between smart-casual and resort wear with natural grace.", features: ["Pure linen construction", "Relaxed fit available", "Coconut shell buttons", "Curved hem"], care: "Hand wash or gentle cycle. Iron while damp." },
  { id: 8, name: "The Overcoat", type: "coat", base_price: 18000, images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1000&fit=crop", "https://i5.walmartimages.com/seo/Njoeus-Men-s-Stylish-Double-Breasted-Long-Trench-Coat-Woolen-Blends-Winter-Long-Jacket-Warm-Overcoat_797f6ba8-506d-456c-bbe3-6c9ef7ba0c4e.a80ff091b149f00e33e684593715dded.jpeg"], video: null, description: "Winter calls for substance. The Overcoat is built from heavyweight cloth to wrap you in warmth without sacrificing an ounce of refinement.", features: ["Heavyweight outer cloth", "Fully lined in silk-blend", "Fly front fastening", "Ticket pocket"], care: "Dry clean only. Brush after each wear." },
  { id: 9, name: "The Trench", type: "coat", base_price: 16000, images: ["https://tse4.mm.bing.net/th/id/OIP.LpQvbKiu2q3fJglWp9zViwHaHa?pid=Api&h=220&P=0"], video: null, description: "Born from British military heritage and refined for city life. The Trench transitions from rain to shine with iconic elegance.", features: ["Waterproof outer layer", "Removable storm lining", "D-ring belt", "Gun flap detail"], care: "Dry clean only. Re-wax seasonally." },
  { id: 10, name: "Oxford Brogues", type: "shoes", base_price: 8500, images: ["https://tse2.mm.bing.net/th/id/OIP.GNoAarnWEvLzgeGKdvq7AAHaEc?pid=Api&h=220&P=0", "https://cdn.shopify.com/s/files/1/0437/7837/products/Image6_4c23455c-2e30-4ed2-bac8-d6c24b4b7d56.jpg?v=1578658167"], video: null, description: "Hand-crafted on a classic last, these brogues carry the soul of Northampton in every stitch. They will outlast trends and improve with age.", features: ["Goodyear welted sole", "Full-grain leather upper", "Leather insole", "Hand-finished edges"], care: "Polish regularly. Use cedar shoe trees." },
  { id: 11, name: "Chelsea Boots", type: "shoes", base_price: 9500, images: ["https://assets.timberland.eu/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1713276241/TB0A2PBBEM4-ALT3/Brimfield-Mid-Chelsea-Boot-for-Women-in-Brown.png", "https://images.opumo.com/wordpress/wp-content/uploads/2022/09/2-8.jpg", "https://luxurylondon.co.uk/wp-content/uploads/2022/09/best-chelsea-boots-for-men-crockett-and-jones.jpg"], video: null, description: "The Chelsea boot is the most versatile shoe in a man's wardrobe. Ours is built to last decades and worn to look better for it.", features: ["Elastic side gussets", "Goodyear welted", "Leather lining", "Stacked leather heel"], care: "Polish with matching cream. Condition leather seasonally." },
  { id: 12, name: "Silk Pocket Square Set", type: "accessory", base_price: 1200, images: ["https://m.media-amazon.com/images/I/81fUWpBDFeL._AC_UL1500_.jpg", "https://s.turbifycdn.com/aah/yhst-70124266589865/bold-red-royal-silk-tie-and-pocket-square-set-44.png", "https://i.pinimg.com/originals/08/27/ea/0827eaef30847439d51c99624c328540.jpg"], video: null, description: "The finishing touch that separates the dressed from the well-dressed. Each set is hand-rolled and finished with care.", features: ["100% pure silk", "Hand-rolled edges", "Set of three colourways", "Gift box included"], care: "Dry clean or hand wash cold. Press with cool iron." },
];

const measurementSteps = [
  { title: "Upper Body", fields: [{ name: 'chest', label: 'Chest', min: 70, max: 150, unit: 'cm' }, { name: 'waist', label: 'Waist', min: 60, max: 140, unit: 'cm' }, { name: 'shoulder_width', label: 'Shoulder Width', min: 35, max: 60, unit: 'cm' }, { name: 'neck', label: 'Neck', min: 30, max: 50, unit: 'cm' }] },
  { title: "Arms & Length", fields: [{ name: 'sleeve_length', label: 'Sleeve Length', min: 55, max: 75, unit: 'cm' }, { name: 'jacket_length', label: 'Jacket Length', min: 65, max: 85, unit: 'cm' }] },
  { title: "Lower Body", fields: [{ name: 'hips', label: 'Hips', min: 70, max: 150, unit: 'cm' }, { name: 'inseam', label: 'Inseam', min: 65, max: 95, unit: 'cm' }, { name: 'outseam', label: 'Outseam', min: 90, max: 125, unit: 'cm' }, { name: 'thigh', label: 'Thigh', min: 40, max: 80, unit: 'cm' }] },
  { title: "General Info", fields: [{ name: 'height', label: 'Height', min: 140, max: 220, unit: 'cm' }, { name: 'weight', label: 'Weight', min: 40, max: 200, unit: 'kg' }, { name: 'posture_notes', label: 'Posture Notes', type: 'textarea' }] }
];

const tailors = [
  { id: 1, name: 'James Mokoena', style_focus: 'Classic British Tailoring', portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop", years_experience: 18, specialties: ["Savile Row Techniques", "Canvassed Construction", "Formal Wear"], approach: "I believe in the invisible art of tailoring—when done right, people notice you, not your clothes. Every garment should feel like a second skin.", best_suited_for: ["Corporate executives", "Wedding parties", "Those who appreciate tradition"], lead_time_days: 28 },
  { id: 2, name: 'Sarah van der Berg', style_focus: 'Contemporary Italian', portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop", years_experience: 12, specialties: ["Soft Shoulders", "Lightweight Fabrics", "Modern Silhouettes"], approach: "Fashion evolves, and so should tailoring. I blend Italian elegance with African flair, creating pieces that are both current and timeless.", best_suited_for: ["Creative professionals", "Modern minimalists", "Those seeking understated luxury"], lead_time_days: 21 },
  { id: 3, name: 'David Nkosi', style_focus: 'Power Dressing', portrait: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop", years_experience: 22, specialties: ["Statement Pieces", "Bold Patterns", "Evening Wear"], approach: "Your clothes should announce your arrival before you speak a word. I specialize in creating presence—garments that command attention.", best_suited_for: ["Public figures", "Entrepreneurs", "Those who lead from the front"], lead_time_days: 35 },
  { id: 4, name: 'James Chen', style_focus: 'Modern Minimal', portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop", years_experience: 9, specialties: ["Clean Lines", "Technical Fabrics", "Understated Luxury"], approach: "Less is more. Every seam, every detail is intentional. I create garments that whisper elegance rather than shout it.", best_suited_for: ["Minimalists", "Tech executives", "Those who value quiet luxury"], lead_time_days: 18 },
  { id: 5, name: 'Giovanni Rossi', style_focus: 'Italian Classic', portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop", years_experience: 25, specialties: ["Neapolitan Construction", "Hand Stitching", "Luxury Fabrics"], approach: "My work is a love letter to the great Italian tailoring houses. Every garment is a piece of art, rooted in centuries of craft.", best_suited_for: ["Connoisseurs", "Special occasions", "Those who invest in quality"], lead_time_days: 42 },
  { id: 6, name: 'William Thornton', style_focus: 'British Heritage', portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop", years_experience: 31, specialties: ["Country Wear", "Tweeds & Wools", "Traditional Cuts"], approach: "True British tailoring is about longevity. I make clothes that outlast trends and get better with age, just like a fine wine.", best_suited_for: ["Traditionalists", "Country occasions", "Heirloom-quality seekers"], lead_time_days: 45 },
  { id: 7, name: 'Marcus Chen', style_focus: 'Modern Slim-fit', portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop", years_experience: 8, specialties: ["Athletic Cuts", "Slim Silhouettes", "Performance Fabrics"], approach: "Modern men deserve tailoring that moves with them. I fuse contemporary aesthetics with athletic proportions for the active professional.", best_suited_for: ["Active professionals", "Younger clients", "Those with athletic builds"], lead_time_days: 16 },
  { id: 8, name: 'Sofia Martinez', style_focus: 'Contemporary Luxury', portrait: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop", years_experience: 15, specialties: ["Gender-fluid Designs", "Avant-garde Cuts", "Luxury Detailing"], approach: "I challenge the conventions of menswear while respecting its foundations. My work is for those unafraid to define their own style language.", best_suited_for: ["Fashion-forward clients", "Creative industries", "Those who set trends"], lead_time_days: 24 },
];

const fabrics = [
  { id: 1, name: 'Super 150s Wool', price_tier: 'luxury', origin: 'Italy', weight: '280g/m²', description: 'The pinnacle of worsted wool. Exceptionally fine, with a luminous drape that holds structure through the longest days.', best_for: ['Formal suits', 'Business wear', 'Year-round use'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', color_swatch: '#6B6B6B' },
  { id: 2, name: 'Italian Linen', price_tier: 'premium', origin: 'Italy', weight: '200g/m²', description: 'Breathable and naturally textured. Ideal for warmer climates, it softens with every wear.', best_for: ['Summer suits', 'Casual shirts', 'Resort wear'], image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop', color_swatch: '#C8B89A' },
  { id: 3, name: 'English Tweed', price_tier: 'premium', origin: 'United Kingdom', weight: '400g/m²', description: 'Woven in the British Isles, this robust fabric carries centuries of heritage. Rugged yet refined.', best_for: ['Country wear', 'Blazers', 'Autumn/Winter'], image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop', color_swatch: '#8B7355' },
  { id: 4, name: 'Egyptian Cotton', price_tier: 'standard', origin: 'Egypt', weight: '120g/m²', description: 'Long-staple cotton grown along the Nile. Exceptionally soft against the skin with a smooth finish.', best_for: ['Dress shirts', 'Casual shirts', 'Warm climates'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', color_swatch: '#F5F0E8' },
  { id: 5, name: 'Cashmere Blend', price_tier: 'luxury', origin: 'Scotland', weight: '320g/m²', description: 'A marriage of cashmere and fine wool. Unrivalled softness with enough structure for tailoring.', best_for: ['Winter suits', 'Overcoats', 'Evening wear'], image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', color_swatch: '#4A4A4A' },
  { id: 6, name: 'Italian Super 150s Wool', price_tier: 'luxury', origin: 'Italy', weight: '260g/m²', description: 'Crafted by the historic mills of Biella. Almost silk-like hand feel while retaining essential structure.', best_for: ['Power suits', 'Board meetings', 'Special occasions'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop', color_swatch: '#2C3E50' },
  { id: 7, name: 'British Tweed', price_tier: 'premium', origin: 'United Kingdom', weight: '380g/m²', description: 'A classic herringbone weave. Characterful, durable, and deeply traditional.', best_for: ['Blazers', 'Countryside events', 'Heritage styling'], image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop', color_swatch: '#7D6B52' },
  { id: 8, name: 'Breathable and light', price_tier: 'luxury', origin: 'Japan', weight: '180g/m²', description: 'Japanese innovation meets Italian aesthetics. Wicks moisture and resists wrinkles for the man who never stops moving.', best_for: ['Travel suits', 'Active professionals', 'Tropical climates'], image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop', color_swatch: '#1A1A2E' },
  { id: 9, name: 'Cashmere Wool Blend', price_tier: 'luxury', origin: 'Scotland', weight: '340g/m²', description: 'Higher cashmere composition for those who demand the finest. Impossibly warm, impossibly light.', best_for: ['Winter overcoats', 'Evening dress', 'Gift quality'], image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400&h=400&fit=crop', color_swatch: '#3C3C3C' },
];

const tierBadgeStyles = {
  standard: 'bg-white/10 text-white/70',
  premium:  'bg-white/15 text-white/80',
  luxury:   'bg-[#A88D4B]/25 text-[#A88D4B]',
};

// ── Media Gallery (images + video) ──
function MediaGallery({ images, video }) {
  const [activeIndex, setActiveIndex] = useState(0); // 0..images.length-1 = photo, images.length = video
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const totalItems = images.length + (video ? 1 : 0);
  const isVideoActive = video && activeIndex === images.length;

  useEffect(() => {
    if (!isVideoActive && videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  }, [isVideoActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoPlaying) { videoRef.current.pause(); setVideoPlaying(false); }
    else { videoRef.current.play().then(() => setVideoPlaying(true)).catch(() => {}); }
  };

  return (
    <div className="lg:sticky lg:top-32">
      {/* Main display */}
      <div className="relative aspect-[4/5] bg-[#EBE4D8] overflow-hidden mb-3">
        {/* Images */}
        <AnimatePresence mode="wait">
          {!isVideoActive && (
            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt="product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          )}
        </AnimatePresence>

        {/* Video */}
        {video && (
          <div className={`absolute inset-0 transition-opacity duration-400 ${isVideoActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <video
              ref={videoRef}
              src={video}
              loop
              muted={muted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            />
            {/* Video controls overlay */}
            {isVideoActive && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button onClick={togglePlay}
                  className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white text-sm hover:bg-black/70 transition-colors"
                >
                  {videoPlaying ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4 fill-white" /> Play</>}
                </button>
                <button onClick={() => setMuted(!muted)}
                  className="p-2 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Thumbnail nav arrows for desktop */}
        {totalItems > 1 && (
          <>
            <button onClick={() => setActiveIndex(i => (i - 1 + totalItems) % totalItems)}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#0E2A47]" />
            </button>
            <button onClick={() => setActiveIndex(i => (i + 1) % totalItems)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#0E2A47]" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {totalItems > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-all ${activeIndex === i ? 'border-[#A88D4B]' : 'border-transparent hover:border-[#EBE4D8]'}`}
            >
              <img src={img} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
          {video && (
            <button
              onClick={() => setActiveIndex(images.length)}
              className={`flex-shrink-0 w-16 h-20 overflow-hidden border-2 transition-all relative bg-[#0E2A47] flex items-center justify-center ${activeIndex === images.length ? 'border-[#A88D4B]' : 'border-transparent hover:border-[#EBE4D8]'}`}
            >
              <video src={video} muted playsInline preload="metadata" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-5 h-5 fill-white text-white" />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TailorDetailsCard({ tailor }) {
  return (
    <motion.div initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border border-[#A88D4B]/30 bg-gradient-to-br from-[#0E2A47] to-[#0a1f36]">
      <div className="flex">
        <div className="w-28 flex-shrink-0 relative overflow-hidden">
          <img src={tailor.portrait} alt={tailor.name} className="w-full h-full object-cover object-top" style={{ minHeight: '100%' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E2A47]/60" />
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[#A88D4B] text-[10px] tracking-[0.25em] uppercase mb-1">Your Selected Artisan</p>
              <h4 className="text-white font-serif text-lg leading-tight">{tailor.name}</h4>
              <p className="text-[#A88D4B] text-xs mt-0.5">{tailor.style_focus}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <div className="flex items-center gap-1 justify-end mb-1"><Star className="w-3 h-3 text-[#A88D4B] fill-[#A88D4B]" /><span className="text-white text-xs font-medium">{tailor.years_experience} yrs exp</span></div>
              <div className="flex items-center gap-1 justify-end"><Clock className="w-3 h-3 text-white/50" /><span className="text-white/50 text-xs">{tailor.lead_time_days} day lead</span></div>
            </div>
          </div>
          <p className="text-white/70 text-xs leading-relaxed mb-4 italic border-l-2 border-[#A88D4B]/40 pl-3">"{tailor.approach}"</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-2"><Scissors className="w-3 h-3 text-[#A88D4B]" /><p className="text-[#A88D4B] text-[10px] tracking-[0.2em] uppercase">Specialties</p></div>
              <div className="space-y-1">{tailor.specialties.map((s, i) => (<div key={i} className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-[#A88D4B]/60 flex-shrink-0" /><span className="text-white/65 text-xs">{s}</span></div>))}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-2"><Users className="w-3 h-3 text-[#A88D4B]" /><p className="text-[#A88D4B] text-[10px] tracking-[0.2em] uppercase">Best For</p></div>
              <div className="space-y-1">{tailor.best_suited_for.map((s, i) => (<div key={i} className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-[#A88D4B]/60 flex-shrink-0" /><span className="text-white/65 text-xs">{s}</span></div>))}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FabricDetailsCard({ fabric }) {
  return (
    <motion.div initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border border-[#A88D4B]/30 bg-gradient-to-br from-[#1c1408] to-[#2e2010]">
      <div className="flex">
        <div className="w-28 flex-shrink-0 relative overflow-hidden">
          <img src={fabric.image} alt={fabric.name} className="w-full h-full object-cover" style={{ minHeight: '100%' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1.5" style={{ backgroundColor: fabric.color_swatch }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1c1408]/70" />
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[#A88D4B] text-[10px] tracking-[0.25em] uppercase mb-1">Your Selected Fabric</p>
              <h4 className="text-white font-serif text-lg leading-tight">{fabric.name}</h4>
              <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase ${tierBadgeStyles[fabric.price_tier]}`}>{fabric.price_tier}</span>
            </div>
            <div className="text-right flex-shrink-0 ml-4 space-y-1.5">
              <div className="flex items-center gap-1 justify-end"><MapPin className="w-3 h-3 text-[#A88D4B]" /><span className="text-white text-xs">{fabric.origin}</span></div>
              <div className="flex items-center gap-1 justify-end"><Sparkles className="w-3 h-3 text-white/40" /><span className="text-white/50 text-xs">{fabric.weight}</span></div>
            </div>
          </div>
          <p className="text-white/70 text-xs leading-relaxed mb-4 italic border-l-2 border-[#A88D4B]/40 pl-3">{fabric.description}</p>
          <div>
            <div className="flex items-center gap-1.5 mb-2"><Scissors className="w-3 h-3 text-[#A88D4B]" /><p className="text-[#A88D4B] text-[10px] tracking-[0.2em] uppercase">Best For</p></div>
            <div className="flex flex-wrap gap-1.5">{fabric.best_for.map((use, i) => (<span key={i} className="px-2.5 py-1 bg-white/10 text-white/70 text-[10px] tracking-wide border border-white/10">{use}</span>))}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductDetail() {
  const location = useLocation();
  const productId = parseInt(new URLSearchParams(location.search).get('id'), 10);

  const [product, setProduct] = useState(null);
  const [selectedTailorName, setSelectedTailorName] = useState('');
  const [selectedFabricName, setSelectedFabricName] = useState('');
  const [notes, setNotes] = useState('');
  const [measurements, setMeasurements] = useState({});
  const [measurementStep, setMeasurementStep] = useState(0);
  const [measurementErrors, setMeasurementErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const selectedTailor = tailors.find(t => t.name === selectedTailorName) || null;
  const selectedFabric = fabrics.find(f => f.name === selectedFabricName) || null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setProduct(allProducts.find(p => p.id === productId) || null);
  }, [productId]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(price);

  const validateField = (field, value) => {
    if (field.type === 'textarea') return true;
    if (!value) return false;
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (field.min && num < field.min) return false;
    if (field.max && num > field.max) return false;
    return true;
  };

  const validateMeasurementStep = () => {
    const currentFields = measurementSteps[measurementStep].fields;
    const newErrors = {};
    let isValid = true;
    currentFields.forEach(field => {
      if (field.name === 'posture_notes') return;
      if (!measurements[field.name] || !validateField(field, measurements[field.name])) {
        newErrors[field.name] = `Enter valid ${field.label.toLowerCase()} (${field.min}-${field.max}${field.unit})`;
        isValid = false;
      }
    });
    setMeasurementErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateMeasurementStep()) {
      setMeasurementStep(prev => Math.min(prev + 1, measurementSteps.length - 1));
      setMeasurementErrors({});
    }
  };

  const handleAddToCart = async () => {
    if (!selectedTailorName || !selectedFabricName) { toast.error('Please select a tailor and fabric'); return; }
    if (!validateMeasurementStep()) { toast.error('Please complete all required measurements'); return; }
    setIsAdding(true);
    try {
      const newItem = {
        id: Date.now(),
        product_id: product.id.toString(),
        product_name: product.name,
        product_type: product.type,
        base_price: product.base_price,
        quantity: 1,
        status: 'cart',
        customizations: { tailor: selectedTailorName, fabric: selectedFabricName, notes },
        measurements,
      };
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      existingCart.push(newItem);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.name} added to cart 🛒`);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
        setSelectedTailorName('');
        setSelectedFabricName('');
        setNotes('');
        setMeasurements({});
        setMeasurementStep(0);
        setMeasurementErrors({});
        setFormKey(k => k + 1);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F5F1E8] pt-32 flex items-center justify-center">
        <p className="text-[#2B2B2B]/60">Product not found</p>
      </motion.div>
    );
  }

  const progress = ((measurementStep + 1) / measurementSteps.length) * 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-[#F5F1E8] pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── SECTION 1: Product Details with media gallery ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Media Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <MediaGallery images={product.images || []} video={product.video || null} />
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-8">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-3">{product.type}</span>
              <h1 className="font-serif text-4xl text-[#0E2A47] mb-4">{product.name}</h1>
              <p className="text-3xl font-serif text-[#0E2A47] mb-6">From {formatPrice(product.base_price)}</p>
              <p className="text-[#2B2B2B]/70 leading-relaxed text-base">{product.description}</p>
            </div>

            {product.features && (
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-4">Included Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white border border-[#EBE4D8]">
                      <Award className="w-4 h-4 text-[#A88D4B] flex-shrink-0" />
                      <span className="text-sm text-[#0E2A47]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.care && (
              <div className="flex items-start gap-3 p-4 bg-white border border-[#EBE4D8]">
                <Shield className="w-5 h-5 text-[#A88D4B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A88D4B] mb-1">Care Instructions</p>
                  <p className="text-sm text-[#2B2B2B]/70">{product.care}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white border border-[#EBE4D8]">
                <Ruler className="w-5 h-5 text-[#A88D4B] mx-auto mb-1" />
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#0E2A47]">Made to Measure</p>
              </div>
              <div className="text-center p-3 bg-white border border-[#EBE4D8]">
                <Award className="w-5 h-5 text-[#A88D4B] mx-auto mb-1" />
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#0E2A47]">Master Crafted</p>
              </div>
              <div className="text-center p-3 bg-white border border-[#EBE4D8]">
                <Shield className="w-5 h-5 text-[#A88D4B] mx-auto mb-1" />
                <p className="text-[10px] tracking-[0.15em] uppercase text-[#0E2A47]">Guaranteed Fit</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-16"
        >
          <div className="flex-1 h-px bg-[#EBE4D8]" />
          <div className="text-center px-4">
            <p className="text-xs tracking-[0.3em] uppercase text-[#A88D4B]">Customise Your Order</p>
            <p className="text-sm text-[#2B2B2B]/50 mt-1">Select your tailor, fabric and measurements below</p>
          </div>
          <div className="flex-1 h-px bg-[#EBE4D8]" />
        </motion.div>

        {/* ── SECTION 2: Order Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div key={formKey} className="space-y-4">

            {/* Tailor */}
            <div className="space-y-2">
              <Label>Select Tailor *</Label>
              <Select value={selectedTailorName} onValueChange={setSelectedTailorName}>
                <SelectTrigger><SelectValue placeholder="Choose your tailor" /></SelectTrigger>
                <SelectContent>{tailors.map(t => (<SelectItem key={t.id} value={t.name}>{t.name} — {t.style_focus}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <AnimatePresence mode="wait">
              {selectedTailor && <TailorDetailsCard key={selectedTailor.id} tailor={selectedTailor} />}
            </AnimatePresence>

            {/* Fabric */}
            <div className="space-y-2">
              <Label>Select Fabric *</Label>
              <Select value={selectedFabricName} onValueChange={setSelectedFabricName}>
                <SelectTrigger><SelectValue placeholder="Choose your fabric" /></SelectTrigger>
                <SelectContent>{fabrics.map(f => (<SelectItem key={f.id} value={f.name}>{f.name} — {f.price_tier}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <AnimatePresence mode="wait">
              {selectedFabric && <FabricDetailsCard key={selectedFabric.id} fabric={selectedFabric} />}
            </AnimatePresence>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any specific requests..." rows={2} />
            </div>

            {/* Measurements */}
            <div className="bg-white border border-[#EBE4D8] p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg text-[#0E2A47]">Your Measurements *</h3>
                  <a href="#/MeasurementGuide" className="flex items-center gap-1.5 text-xs text-[#A88D4B] border-b border-[#A88D4B]/40 pb-0.5 hover:border-[#A88D4B] transition-colors">
                    <span>📏</span> How to measure?
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm text-[#2B2B2B]/60 mb-3">
                  <span>Step {measurementStep + 1} of {measurementSteps.length}</span>
                  <span>{measurementSteps[measurementStep].title}</span>
                </div>
                <div className="h-2 bg-[#EBE4D8] rounded-full overflow-hidden">
                  <motion.div className="h-full bg-[#A88D4B]" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={measurementStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-4">
                  {measurementSteps[measurementStep].fields.map(field => (
                    <div key={field.name} className="space-y-1">
                      <Label className="text-[#0E2A47] text-sm">{field.label} {field.unit && `(${field.unit})`}</Label>
                      {field.type === 'textarea' ? (
                        <Textarea value={measurements[field.name] || ''} onChange={e => setMeasurements({ ...measurements, [field.name]: e.target.value })} rows={2} placeholder="Optional notes" />
                      ) : (
                        <>
                          <Input type="number" step="0.1" value={measurements[field.name] || ''} onChange={e => setMeasurements({ ...measurements, [field.name]: e.target.value })} placeholder={`${field.min}-${field.max}`} className={measurementErrors[field.name] ? 'border-red-500' : ''} />
                          {measurementErrors[field.name] && <p className="text-xs text-red-500">{measurementErrors[field.name]}</p>}
                        </>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-6">
                {measurementStep > 0 && (
                  <Button variant="outline" onClick={() => { setMeasurementStep(p => p - 1); setMeasurementErrors({}); }} className="flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                )}
                {measurementStep < measurementSteps.length - 1 ? (
                  <Button onClick={handleNextStep} className="bg-[#0E2A47] text-[#F5F1E8] ml-auto flex items-center gap-2">
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} disabled={isAdding} className={`ml-auto flex items-center gap-2 transition-all duration-300 ${addedToCart ? 'bg-green-600 hover:bg-green-600 text-white' : 'bg-[#0E2A47] text-[#F5F1E8]'}`}>
                    {addedToCart ? <><CheckCircle className="w-5 h-5" /> Added to Cart!</> : isAdding ? 'Adding...' : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
                  </Button>
                )}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}