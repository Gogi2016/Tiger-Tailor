import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Clock, Globe, Shield } from 'lucide-react';

export default function Shipping() {
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

          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-8">Shipping Policy</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-white border border-[#EBE4D8]">
              <Truck className="w-8 h-8 text-[#A88D4B] mb-4" />
              <h3 className="font-serif text-xl text-[#0E2A47] mb-2">Free Delivery</h3>
              <p className="text-sm text-[#2B2B2B]/70">Complimentary delivery across South Africa on all orders.</p>
            </div>
            <div className="p-6 bg-white border border-[#EBE4D8]">
              <Clock className="w-8 h-8 text-[#A88D4B] mb-4" />
              <h3 className="font-serif text-xl text-[#0E2A47] mb-2">3-5 Business Days</h3>
              <p className="text-sm text-[#2B2B2B]/70">Delivery timeframe after your garment is complete.</p>
            </div>
            <div className="p-6 bg-white border border-[#EBE4D8]">
              <Globe className="w-8 h-8 text-[#A88D4B] mb-4" />
              <h3 className="font-serif text-xl text-[#0E2A47] mb-2">International</h3>
              <p className="text-sm text-[#2B2B2B]/70">We ship worldwide. Contact us for rates and timeframes.</p>
            </div>
            <div className="p-6 bg-white border border-[#EBE4D8]">
              <Shield className="w-8 h-8 text-[#A88D4B] mb-4" />
              <h3 className="font-serif text-xl text-[#0E2A47] mb-2">Fully Insured</h3>
              <p className="text-sm text-[#2B2B2B]/70">All shipments are insured for full value during transit.</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-[#2B2B2B]/80">
            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">Domestic Shipping</h2>
            <p>
              All orders within South Africa are delivered via our trusted courier partners. 
              You'll receive tracking information once your garment ships.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Major cities (Johannesburg, Cape Town, Durban): 2-3 business days</li>
              <li>Other urban areas: 3-4 business days</li>
              <li>Rural areas: 4-5 business days</li>
            </ul>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">International Shipping</h2>
            <p>
              We ship to over 50 countries worldwide. International shipping rates and 
              timeframes vary by destination:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Africa: R500 – R1,200 (5-10 business days)</li>
              <li>Europe: R1,500 – R2,500 (7-14 business days)</li>
              <li>Americas: R2,000 – R3,500 (10-14 business days)</li>
              <li>Asia/Pacific: R2,500 – R4,000 (10-21 business days)</li>
            </ul>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">Packaging</h2>
            <p>
              Your garment arrives in our signature packaging—a breathable garment bag within 
              a protective outer box. Suits are hung on solid wood hangers; shirts are 
              carefully folded with acid-free tissue.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">Customs & Duties</h2>
            <p>
              International orders may be subject to customs duties and taxes in the 
              destination country. These charges are the responsibility of the recipient 
              and are not included in our prices.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}