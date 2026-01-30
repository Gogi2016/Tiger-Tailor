import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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

          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-[#2B2B2B]/80">
            <p className="text-sm text-[#2B2B2B]/50 mb-8">Last updated: January 2025</p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, including your name, email address, 
              phone number, physical measurements, and payment details when you place an order 
              or request a consultation.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Store your measurements for future orders</li>
              <li>Communicate about your order status</li>
              <li>Send promotional offers (with your consent)</li>
              <li>Improve our services</li>
            </ul>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">3. Data Protection (POPIA)</h2>
            <p>
              In compliance with the Protection of Personal Information Act (POPIA), we ensure 
              that your personal information is processed lawfully and protected against 
              unauthorized access. You have the right to access, correct, or delete your 
              personal information at any time.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">4. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our 
              services and comply with legal obligations. Measurement data is kept indefinitely 
              to facilitate future orders unless you request deletion.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">5. Third-Party Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with trusted 
              service providers who assist in operating our business, subject to 
              confidentiality agreements.
            </p>

            <h2 className="font-serif text-2xl text-[#0E2A47] mt-8 mb-4">6. Contact Us</h2>
            <p>
              For privacy-related inquiries, contact our Information Officer at 
              privacy@tigerhunt.co.za or +27 11 234 5678.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}