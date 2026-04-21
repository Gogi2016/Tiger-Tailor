import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Phone, Mail, Clock, Info, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// ── EmailJS credentials (same as Checkout) ──
const EMAILJS_SERVICE_ID  = 'service_4pwayaq';
const EMAILJS_TEMPLATE_ID = 'template_2lw9bty';
const EMAILJS_PUBLIC_KEY  = 'U8pqPF9DulJ3KPNo2';
const ADMIN_EMAIL         = 'vuyokazigogi@gmail.com';

async function sendEmail({ toEmail, name, replyTo, subject, message }) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:  EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id:     EMAILJS_PUBLIC_KEY,
      template_params: { to_email: toEmail, name, email: replyTo, title: subject, message },
    }),
  });
  if (!res.ok) throw new Error('EmailJS ' + res.status + ': ' + await res.text());
}

const tailors = [
  { id: 1, name: 'James Mokoena',      style_focus: 'Classic British Tailoring',  years_experience: 18 },
  { id: 2, name: 'Sarah van der Berg', style_focus: 'Contemporary Italian',        years_experience: 12 },
  { id: 3, name: 'David Nkosi',        style_focus: 'Power Dressing',              years_experience: 22 },
  { id: 4, name: 'James Chen',         style_focus: 'Modern Minimal',              years_experience: 9  },
  { id: 5, name: 'Giovanni Rossi',     style_focus: 'Italian Classic',             years_experience: 25 },
  { id: 6, name: 'William Thornton',   style_focus: 'British Heritage',            years_experience: 31 },
  { id: 7, name: 'Marcus Chen',        style_focus: 'Modern Slim-fit',             years_experience: 8  },
  { id: 8, name: 'Sofia Martinez',     style_focus: 'Contemporary Luxury',         years_experience: 15 },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name:          '',
    email:         '',
    phone:         '',
    service:       '',
    tailor:        '',
    preferredDate: null,
    message:       '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTailor = tailors.find(t => t.name === formData.tailor) || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.service) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const dateStr = formData.preferredDate
        ? format(formData.preferredDate, 'PPP')
        : 'No preference';

      const tailorStr = formData.tailor
        ? `${formData.tailor} (${selectedTailor?.style_focus})`
        : 'No preference — assign best available';

      // ── Customer confirmation email ──
      await sendEmail({
        toEmail: formData.email,
        name:    'Tiger Hunt',
        replyTo: 'hello@tigerhunt.co.za',
        subject: 'Consultation Booked — Tiger Hunt',
        message:
          `Dear ${formData.name},\n\n` +
          `Thank you for booking a consultation at Tiger Hunt.\n\n` +
          `Here is a summary of your request:\n` +
          `──────────────────────────────\n` +
          `Service       : ${formData.service}\n` +
          `Preferred Tailor : ${tailorStr}\n` +
          `Preferred Date   : ${dateStr}\n` +
          (formData.phone ? `Phone         : ${formData.phone}\n` : '') +
          (formData.message ? `Your Notes    : ${formData.message}\n` : '') +
          `──────────────────────────────\n\n` +
          `A member of our team will contact you within 24 hours to confirm your appointment.\n\n` +
          `Studio Address:\n123 Fashion District, Sandton, Johannesburg 2196\n` +
          `Mon–Fri: 9:00–18:00 | Sat: 10:00–15:00 (by appointment)\n\n` +
          `Best regards,\nTiger Hunt Team\nhello@tigerhunt.co.za | +27 11 234 5678`,
      });

      // ── Admin notification email ──
      await sendEmail({
        toEmail: ADMIN_EMAIL,
        name:    formData.name,
        replyTo: formData.email,
        subject: `📅 New Consultation Request from ${formData.name}`,
        message:
          `📅 NEW CONSULTATION REQUEST\n\n` +
          `──────────────────────────────\n` +
          `CUSTOMER DETAILS\n` +
          `──────────────────────────────\n` +
          `Name    : ${formData.name}\n` +
          `Email   : ${formData.email}\n` +
          `Phone   : ${formData.phone || 'Not provided'}\n\n` +
          `──────────────────────────────\n` +
          `APPOINTMENT DETAILS\n` +
          `──────────────────────────────\n` +
          `Service          : ${formData.service}\n` +
          `Preferred Tailor : ${tailorStr}\n` +
          `Preferred Date   : ${dateStr}\n` +
          `Message          : ${formData.message || 'None'}\n\n` +
          `──────────────────────────────\n` +
          `Reply to this email to contact the customer directly.`,
      });

      toast.success("Consultation request sent! We'll be in touch within 24 hours.");

      setFormData({
        name: '', email: '', phone: '', service: '',
        tailor: '', preferredDate: null, message: '',
      });

    } catch (error) {
      console.error(error);
      toast.error('Could not send your request. Please email us directly at hello@tigerhunt.co.za');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-[#F5F1E8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">Get In Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-6 leading-[1.2]">
            Book Your <span className="italic">Consultation</span>
          </h1>
          <p className="text-[#2B2B2B]/70 leading-relaxed">
            Begin your bespoke journey. Schedule a complimentary consultation 
            with us to discuss your style aspirations, tailoring needs, and how we can craft the perfect pieces for you. We look forward to welcoming you.
          </p>
        </motion.div>

        {/* Notice */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="max-w-3xl mx-auto mb-12">
          <div className="flex items-start gap-4 bg-[#0E2A47]/5 border border-[#0E2A47]/15 px-6 py-5">
            <Info className="w-5 h-5 text-[#A88D4B] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#0E2A47] mb-1">In-Person Visits Only</p>
              <p className="text-sm text-[#2B2B2B]/70 leading-relaxed">
                The booking form and phone line below are exclusively for clients who wish to 
                consult. If you'd like to come in for a fitting, measurement or 
                consultation, please use the form or give us a call to arrange your appointment.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-6">Visit Our Studio</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Address</p>
                    <p className="text-[#2B2B2B]/70 text-sm">123 Fashion District<br />Sandton, Johannesburg 2196</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Hours</p>
                    <p className="text-[#2B2B2B]/70 text-sm">Mon – Fri: 9:00 – 18:00<br />Sat: 10:00 – 15:00 (By appointment)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Phone</p>
                    <a href="tel:+27112345678" className="text-[#2B2B2B]/70 text-sm hover:text-[#0E2A47]">+27 11 234 5678</a>
                    <p className="text-[#2B2B2B]/45 text-xs mt-1">Fory visit bookings only</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#A88D4B] mt-1" />
                  <div>
                    <p className="text-[#0E2A47] font-medium">Email</p>
                    <a href="mailto:hello@tigerhunt.co.za" className="text-[#2B2B2B]/70 text-sm hover:text-[#0E2A47]">hello@tigerhunt.co.za</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected tailor preview */}
            {selectedTailor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0E2A47] p-5"
              >
                <p className="text-[#A88D4B] text-[10px] tracking-[0.25em] uppercase mb-3">Your Selected Tailor</p>
                <p className="text-white font-serif text-lg">{selectedTailor.name}</p>
                <p className="text-[#A88D4B] text-xs mb-3">{selectedTailor.style_focus}</p>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#A88D4B]" />
                  <span className="text-white/60 text-xs">{selectedTailor.years_experience} years experience</span>
                </div>
              </motion.div>
            )}

            <div className="pt-8 border-t border-[#EBE4D8]">
              <p className="text-sm text-[#2B2B2B]/60 italic">
                "From the moment I walked in, I knew this was different. 
                The attention to detail, the expertise — Tiger Hunt has 
                redefined my wardrobe."
              </p>
              <p className="text-sm text-[#0E2A47] mt-3">— Michael S., CEO</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-[#EBE4D8]">

              <div className="mb-8 pb-6 border-b border-[#EBE4D8]">
                <h2 className="font-serif text-xl text-[#0E2A47] mb-1">Book a Studio Visit</h2>
                <p className="text-sm text-[#2B2B2B]/60">
                  Complete the form to arrange your in-person appointment. 
                  We'll confirm your booking within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Full Name *</label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="border-[#EBE4D8] focus:border-[#A88D4B]" placeholder="John Smith" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Email Address *</label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="border-[#EBE4D8] focus:border-[#A88D4B]" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Phone Number</label>
                  <Input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="border-[#EBE4D8] focus:border-[#A88D4B]" placeholder="+27 82 123 4567" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#0E2A47]">Service Interest *</label>
                  <Select value={formData.service} onValueChange={value => setFormData({...formData, service: value})} required>
                    <SelectTrigger className="border-[#EBE4D8]"><SelectValue placeholder="Select a service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bespoke Suit">Bespoke Suit</SelectItem>
                      <SelectItem value="Custom Shirts">Custom Shirts</SelectItem>
                      <SelectItem value="Overcoat">Overcoat</SelectItem>
                      <SelectItem value="Alterations">Alterations</SelectItem>
                      <SelectItem value="Wedding Party">Wedding Party</SelectItem>
                      <SelectItem value="General Consultation">General Consultation</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ── Tailor Selection ── */}
              <div className="space-y-2 mb-6">
                <label className="text-sm text-[#0E2A47]">Preferred Tailor</label>
                <Select value={formData.tailor} onValueChange={value => setFormData({...formData, tailor: value})}>
                  <SelectTrigger className="border-[#EBE4D8]"><SelectValue placeholder="Choose a tailor (optional)" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No preference">No preference — assign best available</SelectItem>
                    {tailors.map(t => (
                      <SelectItem key={t.id} value={t.name}>
                        {t.name} — {t.style_focus} ({t.years_experience} yrs)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-[#2B2B2B]/45">Optional — we'll match you with the best tailor for your needs if you have no preference.</p>
              </div>

              {/* Date picker */}
              <div className="space-y-2 mb-6">
                <label className="text-sm text-[#0E2A47]">Preferred Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal border-[#EBE4D8] hover:border-[#A88D4B]">
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#A88D4B]" />
                      {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.preferredDate}
                      onSelect={date => setFormData({...formData, preferredDate: date})}
                      disabled={date => date < new Date() || date.getDay() === 0}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Message */}
              <div className="space-y-2 mb-8">
                <label className="text-sm text-[#0E2A47]">Message</label>
                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="border-[#EBE4D8] focus:border-[#A88D4B] resize-none" placeholder="Tell us about your tailoring needs..." />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-6 text-base">
                {isSubmitting ? 'Sending...' : 'Request Studio Appointment'}
              </Button>

              <p className="text-xs text-[#2B2B2B]/50 text-center mt-4">
                We respond to all inquiries within 24 hours. Both you and our team will receive a confirmation email.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}