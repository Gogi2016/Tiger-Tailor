import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, Copy, PackageCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

const EMAILJS_SERVICE_ID  = 'service_4pwayaq';
const EMAILJS_TEMPLATE_ID = 'template_2lw9bty';
const EMAILJS_PUBLIC_KEY  = 'U8pqPF9DulJ3KPNo2';
const ADMIN_EMAIL         = 'vuyokazigogi@gmail.com';
const IMGBB_API_KEY       = '8b259d62120db9611d94904096f197a0';

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

async function uploadProofToImgbb(base64DataUrl) {
  try {
    const base64 = base64DataUrl.split(',')[1];
    if (!base64) return null;
    const formData = new FormData();
    formData.append('key', IMGBB_API_KEY);
    formData.append('image', base64);
    formData.append('expiration', 15552000);
    const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.url || null;
  } catch { return null; }
}

async function saveOrderToSupabase({ reference, customerName, customerEmail, customerPhone, total, cartItems, proofFileName, proofUrl }) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      reference,
      status:          'Pending Payment',
      customer_name:   customerName,
      customer_email:  customerEmail,
      customer_phone:  customerPhone,
      total,
      deposit:         total * 0.5,
      proof_file_name: proofFileName,
      proof_url:       proofUrl,
    })
    .select()
    .single();

  if (orderError) throw new Error('Failed to save order: ' + orderError.message);

  const items = cartItems.map(item => ({
    order_id:       order.id,
    product_name:   item.product_name,
    product_type:   item.product_type,
    base_price:     item.base_price,
    quantity:       item.quantity,
    tailor:         item.customizations?.tailor         || null,
    fabric:         item.customizations?.fabric         || null,
    notes:          item.customizations?.notes          || null,
    chest:          item.measurements?.chest            || null,
    waist:          item.measurements?.waist            || null,
    hips:           item.measurements?.hips             || null,
    shoulder_width: item.measurements?.shoulder_width   || null,
    neck:           item.measurements?.neck             || null,
    sleeve_length:  item.measurements?.sleeve_length    || null,
    jacket_length:  item.measurements?.jacket_length    || null,
    inseam:         item.measurements?.inseam           || null,
    outseam:        item.measurements?.outseam          || null,
    thigh:          item.measurements?.thigh            || null,
    height:         item.measurements?.height           || null,
    weight:         item.measurements?.weight           || null,
    posture_notes:  item.measurements?.posture_notes    || null,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(items);
  if (itemsError) throw new Error('Failed to save order items: ' + itemsError.message);

  return order;
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
    if (!cartItems || cartItems.length === 0) navigate(createPageUrl('Cart'));
  }, [cartItems, navigate]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(price);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload  = () => { setProofOfPayment(reader.result); setProofFileName(file.name); toast.success('Proof of payment ready ✓'); setIsUploading(false); };
    reader.onerror = () => { toast.error('Failed to read file.'); setIsUploading(false); };
    reader.readAsDataURL(file);
  };

  const handleSubmitOrder = async () => {
    if (!proofOfPayment) { toast.error('Please upload proof of payment'); return; }
    setIsSubmitting(true);
    try {
      // 1. Upload proof image to get shareable link
      let proofUrl = null;
      try { proofUrl = await uploadProofToImgbb(proofOfPayment); } catch {}

      // 2. Save order to Supabase database
      await saveOrderToSupabase({ reference, customerName, customerEmail, customerPhone, total, cartItems, proofFileName, proofUrl });

      // 3. Build order details text
      const orderDetails = cartItems.map((item, i) =>
        'Item ' + (i + 1) + ': ' + item.product_name + ' (' + item.product_type + ')\n' +
        '  Tailor      : ' + (item.customizations?.tailor  || 'Not specified') + '\n' +
        '  Fabric      : ' + (item.customizations?.fabric  || 'Not specified') + '\n' +
        '  Price       : ' + formatPrice(item.base_price * item.quantity) + '\n' +
        '  Measurements: Chest '  + (item.measurements?.chest  || 'N/A') + 'cm, ' +
                        'Waist '  + (item.measurements?.waist  || 'N/A') + 'cm, ' +
                        'Height ' + (item.measurements?.height || 'N/A') + 'cm' +
        (item.customizations?.notes ? '\n  Notes: ' + item.customizations.notes : '')
      ).join('\n\n');

      // 4. Customer confirmation email
      await sendEmail({
        toEmail: customerEmail,
        name:    'Tiger Hunt',
        replyTo: 'hello@tigerhunt.co.za',
        subject: 'Order Confirmed #' + reference + ' — Tiger Hunt',
        message:
          'Dear ' + customerName + ',\n\n' +
          'Thank you for your order! 🎉\n\n' +
          'Your Order Details:\n──────────────────────────────\n' +
          orderDetails + '\n──────────────────────────────\n\n' +
          'Order Reference : ' + reference + '\n' +
          'Total           : ' + formatPrice(total) + '\n\n' +
          'Track your order anytime — visit our website and go to Track Order.\n' +
          'Use your reference number: ' + reference + '\n\n' +
          'Our team will review your payment within 24–48 hours.\n\n' +
          'Best regards,\nTiger Hunt Team\n' +
          'Phone: +27 11 234 5678 | hello@tigerhunt.co.za',
      });

      // 5. Admin notification email
      await sendEmail({
        toEmail: ADMIN_EMAIL,
        name:    customerName,
        replyTo: customerEmail,
        subject: '🛎️ New Order [' + reference + '] from ' + customerName + ' — ' + formatPrice(total),
        message:
          '🛎️ NEW ORDER RECEIVED\n\n' +
          'Customer : ' + customerName + '\n' +
          'Email    : ' + customerEmail + '\n' +
          'Phone    : ' + customerPhone + '\n\n' +
          'ORDER DETAILS\n──────────────────────────────\n' +
          orderDetails + '\n──────────────────────────────\n\n' +
          'Reference : ' + reference + '\n' +
          'Total     : ' + formatPrice(total) + '\n' +
          'Deposit   : ' + formatPrice(total * 0.5) + '\n' +
          'Proof     : ' + proofFileName + '\n' +
          (proofUrl ? 'View      : ' + proofUrl + '\n' : '') +
          '\nManage this order in your admin dashboard.',
      });

      // 6. Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      setOrderComplete(true);
      toast.success('🎉 Order placed! Check your email for confirmation.', { duration: 5000 });
      setTimeout(() => navigate(createPageUrl('Home')), 5000);

    } catch (error) {
      console.error('Order error:', error);
      toast.error('Could not place order: ' + error.message + '. Please contact hello@tigerhunt.co.za');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => { navigator.clipboard.writeText(text); toast.success('Copied!'); };

  if (!cartItems) return null;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-16 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="bg-white border border-[#EBE4D8] p-12 max-w-md w-full text-center mx-6"
        >
          <PackageCheck className="w-16 h-16 text-[#A88D4B] mx-auto mb-6" />
          <h2 className="font-serif text-3xl text-[#0E2A47] mb-4">Order Placed!</h2>
          <p className="text-[#2B2B2B]/70 mb-3">Thank you, <strong>{customerName}</strong>. Your order has been received.</p>
          <p className="text-sm text-[#2B2B2B]/60 mb-4">
            Reference: <strong>{reference}</strong><br /><br />
            A confirmation has been sent to <strong>{customerEmail}</strong>.<br />
            We'll be in touch within 24–48 hours.
          </p>
          <p className="text-xs text-[#2B2B2B]/40">Redirecting you home shortly…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-16">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-4">Complete Payment</h1>
          <p className="text-[#2B2B2B]/70 mb-12">Transfer the amount below to our bank account, then upload your proof of payment.</p>

          <div className="space-y-6">
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

            <div className="bg-white border border-[#EBE4D8] p-8">
              <h2 className="font-serif text-2xl text-[#0E2A47] mb-6">Upload Proof of Payment</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="proof" className="text-[#0E2A47] mb-2 block">Upload your payment slip or screenshot *</Label>
                  <Input id="proof" type="file" onChange={handleFileChange} accept="image/*,.pdf" className="border-[#EBE4D8]" disabled={isUploading} />
                  {isUploading && <p className="text-sm text-[#A88D4B] mt-2">Reading file…</p>}
                  {proofOfPayment && !isUploading && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" /><span>{proofFileName} — ready to submit</span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSubmitOrder}
                  disabled={!proofOfPayment || isSubmitting || isUploading}
                  className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-6 text-base flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting
                    ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />Sending Order…</>
                    : <>Complete Order <Upload className="w-5 h-5" /></>}
                </Button>
                <p className="text-xs text-[#2B2B2B]/50 text-center">Your order will be processed once we verify your payment</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}