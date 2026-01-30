import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import ProblemSection from '@/components/home/ProblemSection';
import ProductsSection from '@/components/home/ProductsSection';
import ProcessSection from '@/components/home/ProcessSection';
import TailorsSection from '@/components/home/TailorsSection';
import CommunicationSection from '@/components/home/CommunicationSection';
import TrustSection from '@/components/home/TrustSection';
import VisionSection from '@/components/home/VisionSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PhilosophySection />
      <ProblemSection />
      <ProductsSection />
      <ProcessSection />
      <TailorsSection />
      <CommunicationSection />
      <TrustSection />
      <VisionSection />
    </div>
  );
}