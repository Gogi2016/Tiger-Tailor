import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StepBlock from '@/components/ui/StepBlock';

const steps = [
  {
    title: "Consultation",
    description: "Begin with a personal consultation where we understand your style, lifestyle, and needs. We'll discuss fabrics, fits, and designs that align with your vision."
  },
  {
    title: "Measurement",
    description: "Our master tailors take over 30 precise measurements to ensure a perfect fit. We analyze your posture, proportions, and preferences to create your unique pattern."
  },
  {
    title: "Design & Fabric",
    description: "Select from our curated collection of premium fabrics and finalize every detail—from lapel style to button choice. Every element is your decision."
  },
  {
    title: "Craftsmanship",
    description: "Watch your garment come to life through skilled hands using time-honored techniques. Each piece takes 40-60 hours of dedicated craftsmanship."
  },
  {
    title: "Fitting & Refinement",
    description: "Experience your creation in a private fitting session. We make any necessary adjustments to achieve absolute perfection."
  },
  {
    title: "Delivery",
    description: "Receive your finished garment, pressed and presented in our signature packaging. Welcome to a new standard of personal style."
  }
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const stepIndex = Math.min(Math.floor(value * steps.length), steps.length - 1);
      setActiveStep(stepIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="process" ref={sectionRef} className="relative min-h-[300vh] bg-[#EBE4D8]">
      <div className="sticky top-0 min-h-screen flex items-center py-24">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
                  The Journey
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] leading-[1.2]">
                  Your Tailoring <span className="italic">Experience</span>
                </h2>
              </motion.div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="h-1 bg-[#F5F1E8] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#A88D4B]"
                    style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-[#2B2B2B]/50">
                  <span>Start</span>
                  <span>Complete</span>
                </div>
              </div>

              <div className="space-y-0">
                {steps.map((step, index) => (
                  <StepBlock 
                    key={index} 
                    step={step} 
                    index={index} 
                    isActive={index === activeStep}
                  />
                ))}
              </div>
            </div>

            {/* Right - Image */}
           <div className="relative hidden lg:block">
  <div className="sticky top-32">
    <motion.div 
      className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Image */}
      <div className="relative w-full h-full">
        <img
          src="https://c8.alamy.com/comp/2J9F2M4/colorful-tailoring-infographic-concept-with-taking-measurement-process-and-professional-equipment-tools-accessories-vector-illustration-2J9F2M4.jpg"
          alt="Tailoring process"
          className="w-full h-full object-cover scale-105"
        />

        {/* Dark luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70" />

        {/* Glass overlay card */}
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl">
            <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-2">
              The Craft
            </p>
            <h3 className="text-2xl font-serif text-white mb-3">
              Precision in Every Detail
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              From first consultation to final delivery, each garment is shaped
              through expert craftsmanship, premium fabrics, and meticulous
              attention to fit and form.
            </p>
          </div>
        </div>

        {/* Elegant border glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      </div>
    </motion.div>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}