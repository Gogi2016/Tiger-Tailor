import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, ChevronRight, ChevronLeft } from 'lucide-react';

// Local products data (copy exactly from Products.jsx)
const allProducts = [
  { id: 1, name: "The Classic Two-Piece", type: "suit", base_price: 15000, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"] },
  { id: 2, name: "The Executive Three-Piece", type: "suit", base_price: 22000, images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop"] },
  { id: 3, name: "The Director's Suit", type: "suit", base_price: 28000, images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=750&fit=crop"] },
  { id: 4, name: "The Wedding Collection", type: "suit", base_price: 35000, images: ["https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=750&fit=crop"] },
  { id: 5, name: "The Perfect White Shirt", type: "shirt", base_price: 3500, images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop"] },
  { id: 6, name: "The Business Essential", type: "shirt", base_price: 2800, images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=750&fit=crop"] },
  { id: 7, name: "The Linen Casual", type: "shirt", base_price: 3200, images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop"] },
  { id: 8, name: "The Overcoat", type: "coat", base_price: 18000, images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop"] },
  { id: 9, name: "The Trench", type: "coat", base_price: 16000, images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=750&fit=crop"] },
  { id: 10, name: "Oxford Brogues", type: "shoes", base_price: 8500, images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=750&fit=crop"] },
  { id: 11, name: "Chelsea Boots", type: "shoes", base_price: 9500, images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=750&fit=crop"] },
  { id: 12, name: "Silk Pocket Square Set", type: "accessory", base_price: 1200, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"] },
];

const measurementSteps = [
  {
    title: "Upper Body",
    fields: [
      { name: 'chest', label: 'Chest', min: 70, max: 150, unit: 'cm' },
      { name: 'waist', label: 'Waist', min: 60, max: 140, unit: 'cm' },
      { name: 'shoulder_width', label: 'Shoulder Width', min: 35, max: 60, unit: 'cm' },
      { name: 'neck', label: 'Neck', min: 30, max: 50, unit: 'cm' },
    ]
  },
  {
    title: "Arms & Length",
    fields: [
      { name: 'sleeve_length', label: 'Sleeve Length', min: 55, max: 75, unit: 'cm' },
      { name: 'jacket_length', label: 'Jacket Length', min: 65, max: 85, unit: 'cm' },
    ]
  },
  {
    title: "Lower Body",
    fields: [
      { name: 'hips', label: 'Hips', min: 70, max: 150, unit: 'cm' },
      { name: 'inseam', label: 'Inseam', min: 65, max: 95, unit: 'cm' },
      { name: 'outseam', label: 'Outseam', min: 90, max: 125, unit: 'cm' },
      { name: 'thigh', label: 'Thigh', min: 40, max: 80, unit: 'cm' },
    ]
  },
  {
    title: "General Info",
    fields: [
      { name: 'height', label: 'Height', min: 140, max: 220, unit: 'cm' },
      { name: 'weight', label: 'Weight', min: 40, max: 200, unit: 'kg' },
      { name: 'posture_notes', label: 'Posture Notes', type: 'textarea' },
    ]
  }
];

export default function ProductDetail() {
  const location = useLocation();
  const productId = parseInt(new URLSearchParams(location.search).get('id'), 10); // convert to number

  const [product, setProduct] = useState(null);
  const [selectedTailor, setSelectedTailor] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('');
  const [notes, setNotes] = useState('');
  const [measurements, setMeasurements] = useState({});
  const [measurementStep, setMeasurementStep] = useState(0);
  const [measurementErrors, setMeasurementErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const tailors = [
    { id: 1, name: 'James Mokoena', style_focus: 'Classic British Tailoring' },
    { id: 2, name: 'Sarah van der Berg', style_focus: 'Contemporary Italian' },
    { id: 3, name: 'David Nkosi', style_focus: 'Power Dressing' },
    { id: 4, name: 'James Chen', style_focus: 'Modern Minimal' },
    { id: 5, name: 'Giovanni Rossi', style_focus: 'Italian Classic' },
    { id: 6, name: 'William Thornton', style_focus: 'British Heritage' },
    { id: 7, name: 'Marcus Chen', style_focus: 'Modern Slim-fit' },
    { id: 8, name: 'Sofia Martinez', style_focus: 'Contemporary Luxury' },

  ];

  const fabrics = [
    { id: 1, name: 'Super 150s Wool', price_tier: 'luxury' },
    { id: 2, name: 'Italian Linen', price_tier: 'premium' },
    { id: 3, name: 'English Tweed ', price_tier: 'premium' },
    { id: 4, name: 'Egyptian Cotton', price_tier: 'standard' },
    { id: 5, name: 'Cashmere Blend', price_tier: 'luxury' },
    { id: 6, name: 'Italian Super 150s Wool', price_tier: 'luxury' },
    { id: 7, name: 'British Tweedt', price_tier: 'premium' },
    { id: 8, name: 'Breathable and light', price_tier: 'luxury' }, 
    { id: 9, name: 'Cashmere Wool Blend', price_tier: 'luxury' },
    { id: 10, name: 'Super 150s Wool', price_tier: 'luxury' },
    { id: 11, name: 'Egyptian Cotton', price_tier: 'premium' },
    { id: 12, name: 'Italian Linen', price_tier: 'premium' },
    
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct || null);
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

  const handleAddToCart = () => {
    if (!selectedTailor || !selectedFabric) {
      alert('Please select a tailor and fabric');
      return;
    }
    if (!validateMeasurementStep()) {
      alert('Please complete all required measurements');
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      alert(`Added ${product.name} to cart!`);
      setIsAdding(false);
    }, 500);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[4/5] bg-[#EBE4D8] overflow-hidden">
              <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Product Info & Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-3">{product.type}</span>
              <h1 className="font-serif text-4xl text-[#0E2A47] mb-4">{product.name}</h1>
              <p className="text-2xl font-serif text-[#0E2A47] mb-4">From {formatPrice(product.base_price)}</p>
            </div>

            {/* Tailor & Fabric Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Tailor *</Label>
                <Select value={selectedTailor} onValueChange={setSelectedTailor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your tailor" />
                  </SelectTrigger>
                  <SelectContent>
                    {tailors.map(t => <SelectItem key={t.id} value={t.name}>{t.name} - {t.style_focus}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Fabric *</Label>
                <Select value={selectedFabric} onValueChange={setSelectedFabric}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your fabric" />
                  </SelectTrigger>
                  <SelectContent>
                    {fabrics.map(f => <SelectItem key={f.id} value={f.name}>{f.name} - {f.price_tier}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any specific requests..." rows={2} />
              </div>
            </div>

            {/* Measurements */}
            <div className="bg-white border border-[#EBE4D8] p-6">
              <div className="mb-4">
                <h3 className="font-serif text-lg text-[#0E2A47] mb-2">Your Measurements *</h3>
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
                        <Textarea value={measurements[field.name] || ''} onChange={e => setMeasurements({...measurements, [field.name]: e.target.value})} rows={2} placeholder="Optional notes" />
                      ) : (
                        <>
                          <Input type="number" step="0.1" value={measurements[field.name] || ''} onChange={e => setMeasurements({...measurements, [field.name]: e.target.value})} placeholder={`${field.min}-${field.max}`} className={measurementErrors[field.name] ? 'border-red-500' : ''} />
                          {measurementErrors[field.name] && <p className="text-xs text-red-500">{measurementErrors[field.name]}</p>}
                        </>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-6">
                {measurementStep > 0 && (
                  <Button variant="outline" onClick={() => { setMeasurementStep(prev => prev - 1); setMeasurementErrors({}); }} className="flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>
                )}
                {measurementStep < measurementSteps.length - 1 ? (
                  <Button onClick={handleNextStep} className="bg-[#0E2A47] text-[#F5F1E8] ml-auto flex items-center gap-2">
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} disabled={isAdding} className="bg-[#0E2A47] text-[#F5F1E8] ml-auto flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> {isAdding ? 'Adding...' : 'Add to Cart'}
                  </Button>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
