import React from 'react';
import { motion } from 'framer-motion';
import { Accordion,  AccordionItem, AccordionTrigger, AccordionContent,} from '@/components/ui/Accordion';
import { Mail, MessageSquare, Bell } from 'lucide-react';

const communicationItems = [
  {
    title: "Consultation Confirmation",
    content: "Receive immediate confirmation of your booking with date, time, and location details. We'll also send a brief questionnaire to help us prepare for your visit."
  },
  {
    title: "Progress Updates",
    content: "Stay informed throughout the crafting process with milestone updates at key stages—pattern creation, first cuts, lining completion, and final assembly. Optional photo updates available."
  },
  {
    title: "Fitting Reminders",
    content: "We'll remind you 48 hours before your fitting appointment with any preparation notes. Easy rescheduling links included if your plans change."
  },
  {
    title: "Ready for Collection",
    content: "Receive notification when your garment is complete and ready for pickup or delivery. Includes care instructions and our fit guarantee details."
  },
  {
    title: "After-Care Check-ins",
    content: "We follow up 30 days after delivery to ensure complete satisfaction. Any adjustments needed are handled promptly under our guarantee."
  }
];

export default function CommunicationSection() {
  return (
    <section className="py-24 md:py-32 bg-[#F5F1E8]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
              Stay Connected
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">
              Communication <span className="italic">Timeline</span>
            </h2>
            <p className="text-[#2B2B2B]/70 leading-relaxed mb-8">
              We believe transparency builds trust. From your first consultation to 
              final delivery, you'll always know exactly where your garment stands.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EBE4D8]">
                <Mail className="w-4 h-4 text-[#A88D4B]" />
                <span className="text-sm text-[#2B2B2B]">Email Updates</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EBE4D8]">
                <MessageSquare className="w-4 h-4 text-[#A88D4B]" />
                <span className="text-sm text-[#2B2B2B]">SMS Alerts</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EBE4D8]">
                <Bell className="w-4 h-4 text-[#A88D4B]" />
                <span className="text-sm text-[#2B2B2B]">WhatsApp Option</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion items={communicationItems} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}