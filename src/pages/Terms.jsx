import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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

          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-[#2B2B2B]/80">
            <p className="text-sm text-[#2B2B2B]/50 mb-8">Last updated: January 2025</p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">1. Order Process</h2>
            <p>
              All orders are subject to acceptance by Tiger Hunt. A binding contract is formed 
              when we confirm your order and receive your deposit payment.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">2. Pricing & Payment</h2>
            <p>
              Prices are quoted in South African Rand (ZAR) and exclude delivery unless stated 
              otherwise. A 50% deposit is required to begin production, with the balance due 
              upon completion.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">3. Measurements & Fittings</h2>
            <p>
              Accurate measurements are essential for bespoke garments. While we take every 
              care, Tiger Hunt cannot be held responsible for fit issues arising from 
              measurements provided by the client without an in-person fitting.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">4. Delivery Timeframes</h2>
            <p>
              Standard production time is 4-6 weeks from confirmation of measurements and 
              fabric selection. While we make every effort to meet agreed dates, delays may 
              occur due to fabric availability or unforeseen circumstances.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">5. Alterations & Fit Guarantee</h2>
            <p>
              All bespoke garments include complimentary alterations within 30 days of 
              delivery to ensure perfect fit. Alterations due to body changes after this 
              period are available at preferential rates.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">6. Cancellations</h2>
            <p>
              Orders may be cancelled within 48 hours of confirmation for a full refund. 
              After production begins, cancellations may incur charges for materials and 
              work completed.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              All designs, patterns, and branding remain the property of Tiger Hunt. 
              Photography of your completed garments may be used for marketing purposes 
              unless you opt out.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}