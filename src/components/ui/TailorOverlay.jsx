import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Sparkles, Award, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function TailorOverlay({ tailor, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && tailor && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0E2A47]/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[#F5F1E8] z-50 overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-[#EBE4D8] rounded-full transition-colors z-10"
              aria-label="Close profile"
            >
              <X className="w-6 h-6 text-[#0E2A47]" />
            </button>
            
            <div className="aspect-[4/3] relative">
              <img
                src={tailor.portrait || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"}
                alt={tailor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="font-serif text-4xl text-[#F5F1E8] mb-2">{tailor.name}</h2>
                <p className="text-[#F5F1E8]/80">{tailor.style_focus}</p>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#EBE4D8]">
                  <Sparkles className="w-5 h-5 text-[#A88D4B] mb-2" />
                  <span className="text-2xl font-serif text-[#0E2A47]">{tailor.years_experience}</span>
                  <p className="text-sm text-[#2B2B2B]/60">Years Experience</p>
                </div>
                <div className="p-4 bg-white border border-[#EBE4D8]">
                  <Clock className="w-5 h-5 text-[#A88D4B] mb-2" />
                  <span className="text-2xl font-serif text-[#0E2A47]">{tailor.lead_time_days}</span>
                  <p className="text-sm text-[#2B2B2B]/60">Days Lead Time</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-3">Approach</h3>
                <p className="text-[#2B2B2B]/80 leading-relaxed">{tailor.approach}</p>
              </div>
              
              {tailor.specialties?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {tailor.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-white border border-[#EBE4D8] text-sm text-[#0E2A47]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {tailor.best_suited_for?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-3">Best Suited For</h3>
                  <ul className="space-y-2">
                    {tailor.best_suited_for.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#2B2B2B]/80">
                        <Users className="w-4 h-4 text-[#A88D4B]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {tailor.samples?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-3">Sample Work</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {tailor.samples.slice(0, 6).map((sample, i) => (
                      <img
                        key={i}
                        src={sample}
                        alt={`Sample ${i + 1}`}
                        className="aspect-square object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <Button className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-6 text-base">
                Book Consultation with {tailor.name?.split(' ')[0]}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}