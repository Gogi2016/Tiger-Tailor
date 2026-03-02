import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, Copy, PackageCheck } from 'lucide-react';
import { toast } from 'sonner';

// ─────────────────────────────────────────────────────────────────
// EmailJS credentials — fill in from your dashboard
// ─────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_4pwayaq';
const EMAILJS_TEMPLATE_ID = 'template_2lw9bty';
const EMAILJS_PUBLIC_KEY  = 'U8pqPF9DulJ3KPNo2';

const ADMIN_EMAIL = 'vuyokazigogi@gmail.com';

// Get a free API key at https://api.imgbb.com (free, instant, no credit card)
// Paste your key here:
const IMGBB_API_KEY = '8b259d62120db9611d94904096f197a0';

// ─────────────────────────────────────────────────────────────────
// ACTION REQUIRED IN EMAILJS (one-time fix, takes 10 seconds):
//
//   1. Go to Email Templates → open "Contact Us"
//   2. On the RIGHT side, find the "To Email" field
//   3. Delete "vuyokazigogi@gmail.com" and replace with: {{to_email}}
//   4. Click Save
//
// That's it. Without this change every email goes to admin only,
// never to the customer.
// ─────────────────────────────────────────────────────────────────

async function sendEmail({ toEmail, name, replyTo, subject, message }) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:  EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id:     EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: toEmail,   // → "To Email" field in template must be {{to_email}}
        name:     name,      // → {{name}} in template body
        email:    replyTo,   // → {{email}} / Reply-To in template
        title:    subject,   // → {{title}} in template subject line
        message:  message,   // → {{message}} in template body
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error('EmailJS ' + res.status + ': ' + text);
  }
}

// Uploads base64 image to ImgBB and returns a public URL
// Falls back gracefully if upload fails — email still sends, just without image link
async function uploadProofToImgbb(base64DataUrl) {
  if (IMGBB_API_KEY === '8b259d62120db9611d94904096f197a0') return null;

  // ImgBB expects raw base64 without the data:image/...;base64, prefix
  const base64 = base64DataUrl.split(',')[1];
  if (!base64) return null;

  const formData = new FormData();
  formData.append('key', IMGBB_API_KEY);
  formData.append('image', base64);
  formData.append('expiration', 15552000); // 6 months

  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data?.data?.url || null;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, customerEmail, customerPhone, customerName, total } = location.state || {};

  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [proofFileName,  setProofFileName]  = useState('');
  const [isUploading,    setIsUploading]    = useState(false);
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [orderComplete,  setOrderComplete]  = useState(false);

  const reference = useRef('TH' + Date.now().toString().slice(-8)).current;

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate(createPageUrl('Cart'));
    }
  }, [cartItems, navigate]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-ZA', {
      style: 'currency', currency: 'ZAR', minimumFractionDigits: 0,
    }).format(price);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setProofOfPayment(reader.result);
      setProofFileName(file.name);
      toast.success('Proof of payment ready ✓');
      setIsUploading(false);
    };
    reader.onerror = () => {
      toast.error('Failed to read file. Please try again.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitOrder = async () => {
    if (!proofOfPayment) { toast.error('Please upload proof of payment'); return; }

    if (
      EMAILJS_SERVICE_ID  === 'YOUR_SERVICE_ID'  ||
      EMAILJS_TEMPLATE_ID === 'YOUR_CONTACT_US_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY  === 'YOUR_PUBLIC_KEY'
    ) {
      toast.error('Please fill in your EmailJS credentials in Checkout.jsx');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload proof of payment to ImgBB to get a shareable link for the email
      let proofUrl = null;
      try {
        proofUrl = await uploadProofToImgbb(proofOfPayment);
      } catch (imgErr) {
        console.warn('ImgBB upload failed, continuing without image link:', imgErr);
      }

      // Shared order details block
      const orderDetails = cartItems.map((item, i) =>
        'Item ' + (i + 1) + ': ' + item.product_name + ' (' + item.product_type + ')\n' +
        '  Tailor      : ' + (item.customizations?.tailor  || 'Not specified') + '\n' +
        '  Fabric      : ' + (item.customizations?.fabric  || 'Not specified') + '\n' +
        '  Price       : ' + formatPrice(item.base_price * item.quantity) + '\n' +
        '  Measurements: Chest '  + (item.measurements?.chest   || 'N/A') + 'cm, ' +
                        'Waist '  + (item.measurements?.waist   || 'N/A') + 'cm, ' +
                        'Height ' + (item.measurements?.height  || 'N/A') + 'cm' +
        (item.customizations?.notes ? '\n  Notes       : ' + item.customizations.notes : '')
      ).join('\n\n');

      // ── CUSTOMER EMAIL ──────────────────────────────────────────
      const customerMessage =
        'Dear ' + customerName + ',\n\n' +
        'Thank you for your order! 🎉\n\n' +
        'Your order has been successfully placed and we have received your payment proof.\n\n' +
        'Your Order Details:\n' +
        '──────────────────────────────\n' +
        orderDetails + '\n' +
        '──────────────────────────────\n\n' +
        'Order Reference : ' + reference + '\n' +
        'Total           : ' + formatPrice(total) + '\n\n' +
        'Your Contact Details:\n' +
        'Email : ' + customerEmail + '\n' +
        'Phone : ' + customerPhone + '\n\n' +
        'Our team will review your payment and contact you within 24-48 hours to confirm the details and production timeline.\n\n' +
        'We appreciate your business and look forward to crafting your bespoke garments.\n\n' +
        'Best regards,\n' +
        'Tiger Hunt Team\n\n' +
        'Contact Us:\n' +
        'Phone : +27 11 234 5678\n' +
        'Email : hello@tigerhunt.co.za';

      await sendEmail({
        toEmail:  customerEmail,           // goes TO the customer
        name:     'Tiger Hunt',
        replyTo:  'hello@tigerhunt.co.za', // customer can reply to the business
        subject:  'Order Confirmed #' + reference + ' — Tiger Hunt',
        message:  customerMessage,
      });

      // ── ADMIN EMAIL ─────────────────────────────────────────────
      const adminMessage =
        '🛎️ NEW ORDER RECEIVED — Action Required\n\n' +
        'A new order has been placed on Tiger Hunt.\n' +
        'Please review the payment proof and confirm with the customer.\n\n' +
        '──────────────────────────────\n' +
        'CUSTOMER DETAILS\n' +
        '──────────────────────────────\n' +
        'Name  : ' + customerName + '\n' +
        'Email : ' + customerEmail + '\n' +
        'Phone : ' + customerPhone + '\n\n' +
        '──────────────────────────────\n' +
        'ORDER DETAILS\n' +
        '──────────────────────────────\n' +
        orderDetails + '\n' +
        '──────────────────────────────\n\n' +
        'Order Reference : ' + reference + '\n' +
        'Total           : ' + formatPrice(total) + '\n' +
        'Deposit (50%)   : ' + formatPrice(total * 0.5) + '\n\n' +
        'Payment Proof   : ' + proofFileName + '\n' +
        (proofUrl
          ? 'View Proof      : ' + proofUrl + '\n'
          : '(Image link unavailable — add IMGBB_API_KEY to Checkout.jsx)\n') +
        '\n' +
        '──────────────────────────────\n' +
        'WHAT TO DO NEXT\n' +
        '──────────────────────────────\n' +
        '1. Verify the proof of payment\n' +
        '2. Reply to this email or contact the customer directly:\n' +
        '   Email: ' + customerEmail + '\n' +
        '   Phone: ' + customerPhone + '\n' +
        '3. Confirm production timeline (4–6 weeks)\n\n' +
        'Tiger Hunt Automated Order System';

      await sendEmail({
        toEmail:  ADMIN_EMAIL,    // goes TO admin
        name:     customerName,
        replyTo:  customerEmail,  // admin can hit Reply to reach customer directly
        subject:  '🛎️ New Order [' + reference + '] from ' + customerName + ' — ' + formatPrice(total),
        message:  adminMessage,
      });

      // ── Clear cart & show success ───────────────────────────────
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      setOrderComplete(true);
      toast.success('🎉 Order placed! Check your email for confirmation.', { duration: 5000 });
      setTimeout(() => navigate(createPageUrl('Home')), 5000);

    } catch (error) {
      console.error('Order error:', error);
      toast.error('Could not send order: ' + error.message + '. Please contact hello@tigerhunt.co.za directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => { navigator.clipboard.writeText(text); toast.success('Copied!'); };

  if (!cartItems) return null;

  // ── Success screen ─────────────────────────────────────────────
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-[#EBE4D8] p-12 max-w-md w-full text-center mx-6"
        >
          <PackageCheck className="w-16 h-16 text-[#A88D4B] mx-auto mb-6" />
          <h2 className="font-serif text-3xl text-[#0E2A47] mb-4">Order Placed!</h2>
          <p className="text-[#2B2B2B]/70 mb-3">
            Thank you, <strong>{customerName}</strong>. Your order has been received.
          </p>
          <p className="text-sm text-[#2B2B2B]/60">
            Reference: <strong>{reference}</strong><br /><br />
            A confirmation has been sent to <strong>{customerEmail}</strong>.<br />
            We'll be in touch within 24–48 hours.
          </p>
          <p className="text-xs text-[#2B2B2B]/40 mt-6">Redirecting you home shortly…</p>
        </motion.div>
      </div>
    );
  }

  // ── Main page ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-16">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-4">Complete Payment</h1>
          <p className="text-[#2B2B2B]/70 mb-12">
            Transfer the amount below to our bank account, then upload your proof of payment.
          </p>

          <div className="space-y-6">
            {/* Bank Details */}
            <div className="bg-white border border-[#EBE4D8] p-8">
              <h2 className="font-serif text-2xl text-[#0E2A47] mb-6">Bank Details</h2>
              <div className="space-y-4">
                {[
                  { label: 'Bank',           value: 'First National Bank (FNB)' },
                  { label: 'Account Name',   value: 'Tiger Hunt Tailoring'      },
                  { label: 'Account Number', value: '62847291056'               },
                  { label: 'Branch Code',    value: '250655'                    },
                  { label: 'Reference',      value: reference                   },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center pb-3 border-b border-[#EBE4D8]">
                    <span className="text-[#2B2B2B]/60">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#0E2A47]">{value}</span>
                      <button onClick={() => copyToClipboard(value)} className="p-1 hover:bg-[#EBE4D8] rounded">
                        <Copy className="w-4 h-4 text-[#A88D4B]" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4">
                  <span className="font-serif text-xl text-[#0E2A47]">Amount to Pay</span>
                  <span className="font-serif text-2xl text-[#0E2A47]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Upload Proof */}
            <div className="bg-white border border-[#EBE4D8] p-8">
              <h2 className="font-serif text-2xl text-[#0E2A47] mb-6">Upload Proof of Payment</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="proof" className="text-[#0E2A47] mb-2 block">
                    Upload your payment slip or screenshot *
                  </Label>
                  <Input
                    id="proof"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="border-[#EBE4D8]"
                    disabled={isUploading}
                  />
                  {isUploading && <p className="text-sm text-[#A88D4B] mt-2">Reading file…</p>}
                  {proofOfPayment && !isUploading && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>{proofFileName} — ready to submit</span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={!proofOfPayment || isSubmitting || isUploading}
                  className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-6 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Sending Order…
                    </>
                  ) : (
                    <>Complete Order <Upload className="w-5 h-5" /></>
                  )}
                </Button>

                <p className="text-xs text-[#2B2B2B]/50 text-center">
                  Your order will be processed once we verify your payment
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
