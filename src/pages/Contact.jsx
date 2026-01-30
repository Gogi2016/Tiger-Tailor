import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Thank you! We\'ll be in touch within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      preferredDate: null,
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-[#F5F1E8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">
            Book Your <span className="italic">Consultation</span>
          </h1>
          <p className="text-[#2B2B2B]/70 leading-relaxed">
            Begin your bespoke journey. Schedule a complimentary consultation 
            at our Johannesburg studio or request a virtual appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-6">
                Visit Our Studio
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Address</p>
                    <p className="text-[#2B2B2B]/70 text-sm">
                      123 Fashion District<br />
                      Sandton, Johannesburg 2196
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Hours</p>
                    <p className="text-[#2B2B2B]/70 text-sm">
                      Mon – Fri: 9:00 – 18:00<br />
                      Sat: 10:00 – 15:00 (By appointment)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Phone</p>
                    <a href="tel:+27112345678" className="text-[#2B2B2B]/70 text-sm hover:text-[#0E2A47]">
                      +27 11 234 5678
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Email</p>
                    <a href="mailto:hello@tigerhunt.co.za" className="text-[#2B2B2B]/70 text-sm hover:text-[#0E2A47]">
                      hello@tigerhunt.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#EBE4D8]">
              <p className="text-sm text-[#2B2B2B]/60 italic">
                "From the moment I walked in, I knew this was different. 
                The attention to detail, the expertise—Tiger Hunt has 
                redefined my wardrobe."
              </p>
              <p className="text-sm text-[#0E2A47] mt-3">— Michael S., CEO</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-[#EBE4D8]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="border-[#EBE4D8] focus:border-[#A88D4B] focus:ring-[#A88D4B]/20"
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="border-[#EBE4D8] focus:border-[#A88D4B] focus:ring-[#A88D4B]/20"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="border-[#EBE4D8] focus:border-[#A88D4B] focus:ring-[#A88D4B]/20"
                    placeholder="+27 82 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Service Interest *</label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({...formData, service: value})}
                    required
                  >
                    <SelectTrigger className="border-[#EBE4D8] focus:border-[#A88D4B] focus:ring-[#A88D4B]/20">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suit">Bespoke Suit</SelectItem>
                      <SelectItem value="shirt">Custom Shirts</SelectItem>
                      <SelectItem value="coat">Overcoat</SelectItem>
                      <SelectItem value="alterations">Alterations</SelectItem>
                      <SelectItem value="wedding">Wedding Party</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm text-[#0E2A47]">Preferred Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-[#EBE4D8] hover:border-[#A88D4B]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#A88D4B]" />
                      {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.preferredDate}
                      onSelect={(date) => setFormData({...formData, preferredDate: date})}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm text-[#0E2A47]">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className="border-[#EBE4D8] focus:border-[#A88D4B] focus:ring-[#A88D4B]/20 resize-none"
                  placeholder="Tell us about your tailoring needs..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-6 text-base"
              >
                {isSubmitting ? 'Sending...' : 'Request Consultation'}
              </Button>

              <p className="text-xs text-[#2B2B2B]/50 text-center mt-4">
                We respond to all inquiries within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}