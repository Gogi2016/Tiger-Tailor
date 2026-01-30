import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function Returns() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to={createPageUrl('Home')} 
            className="inline-flex items-center gap-2 text-sm text-[#0E2A47] hover:text-[#A88D4B] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-8">Returns & Fit Guarantee</h1>
          
          <div className="bg-[#0E2A47] p-8 mb-12">
            <h2 className="font-serif text-2xl text-[#F5F1E8] mb-4">Our Fit Guarantee</h2>
            <p className="text-[#F5F1E8]/80 leading-relaxed">
              We stand behind every garment we create. If your bespoke piece doesn't fit 
              perfectly, we'll alter it free of charge until you're completely satisfied. 
              This guarantee is valid for 30 days from delivery.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-[#2B2B2B]/80">
            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">Bespoke Garments</h2>
            <p>
              Due to the custom nature of bespoke tailoring, we cannot accept returns on 
              made-to-measure garments. However, our fit guarantee ensures you'll receive 
              a garment that fits perfectly:
            </p>
            <div className="space-y-3 mt-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A88D4B] mt-0.5 flex-shrink-0" />
                <span>Complimentary alterations within 30 days of delivery</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A88D4B] mt-0.5 flex-shrink-0" />
                <span>Multiple fittings until you're 100% satisfied</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#A88D4B] mt-0.5 flex-shrink-0" />
                <span>Lifetime alterations at preferential rates</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">Ready-to-Wear & Accessories</h2>
            <p>
              Non-customized items (accessories, ready-made items) may be returned within 
              14 days of delivery if:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items are unworn with original tags attached</li>
              <li>Original packaging is intact</li>
              <li>Proof of purchase is provided</li>
            </ul>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">Defects & Quality Issues</h2>
            <p>
              In the rare event of a manufacturing defect or quality issue:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us within 7 days of discovering the issue</li>
              <li>We'll arrange inspection and repair at no cost</li>
              <li>If repair isn't possible, we'll remake the garment</li>
              <li>Shipping costs for returns due to defects are covered by Tiger Hunt</li>
            </ul>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">How to Request Alterations</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact us at alterations@tigerhunt.co.za or call +27 11 234 5678</li>
              <li>Describe the fit issues you're experiencing</li>
              <li>Schedule an in-studio fitting or send photos if remote</li>
              <li>We'll complete alterations within 5-7 business days</li>
            </ol>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">Refunds</h2>
            <p>
              Approved refunds for ready-to-wear items are processed within 7 business days 
              to the original payment method. Shipping costs are non-refundable unless the 
              return is due to our error.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}