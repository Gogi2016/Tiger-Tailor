import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Upload, CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  
  const { cartItems, customerEmail, customerPhone, customerName, total } = location.state || {};
  
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate(createPageUrl('Cart'));
    }
  }, [cartItems, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setProofOfPayment(file_url);
      toast.success('Proof of payment uploaded');
    } catch (error) {
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (!proofOfPayment) {
      toast.error('Please upload proof of payment');
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare order details first
      const orderDetails = cartItems.map(item => `
Product: ${item.product_name} (${item.product_type})
Tailor: ${item.customizations?.tailor || 'Not specified'}
Fabric: ${item.customizations?.fabric || 'Not specified'}
Price: ${formatPrice(item.base_price * item.quantity)}
Measurements: Chest ${item.measurements?.chest || 'N/A'}cm, Waist ${item.measurements?.waist || 'N/A'}cm, Height ${item.measurements?.height || 'N/A'}cm
${item.customizations?.notes ? `Notes: ${item.customizations.notes}` : ''}
      `).join('\n---\n');

      const orderSummary = `
ORDER CONFIRMATION

Customer Details:
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}

Order Items:
${orderDetails}

Total Amount: ${formatPrice(total)}

Payment Proof: ${proofOfPayment}
      `;

      // Send emails in parallel
      await Promise.all([
        // Send email to admin
        base44.integrations.Core.SendEmail({
          from_name: 'Tiger Hunt Orders',
          to: 'vuyokaziviora@gmail.com',
          subject: `New Order from ${customerName} - ${formatPrice(total)}`,
          body: orderSummary
        }),
        // Send email to business email
        base44.integrations.Core.SendEmail({
          from_name: 'Tiger Hunt Orders',
          to: 'hello@tigerhunt.co.za',
          subject: `New Order from ${customerName} - ${formatPrice(total)}`,
          body: orderSummary
        }),
        // Send confirmation email to customer
        base44.integrations.Core.SendEmail({
          from_name: 'Tiger Hunt',
          to: customerEmail,
          subject: 'Order Successfully Placed - Tiger Hunt',
          body: `
Dear ${customerName},

Thank you for your order! 🎉

Your order has been successfully placed and we have received your payment proof. 

Your Order Details:
${orderDetails}

Total: ${formatPrice(total)}

Your Contact Details:
Email: ${customerEmail}
Phone: ${customerPhone}

Our team will review your payment and contact you within 24-48 hours to confirm the details and production timeline.

We appreciate your business and look forward to crafting your bespoke garments.

Best regards,
Tiger Hunt Team

Contact Us:
Phone: +27 11 234 5678
Email: hello@tigerhunt.co.za
        `
        })
      ]);

      // Delete cart items after emails sent successfully
      await Promise.all(cartItems.map(item => base44.entities.Cart.delete(item.id)));

      // Invalidate cart query to refresh
      queryClient.invalidateQueries(['cart']);
      
      toast.success('🎉 Order placed successfully! Confirmation emails sent.', {
        duration: 5000
      });
      
      setTimeout(() => {
        navigate(createPageUrl('Home'));
      }, 2500);
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to submit order: ' + (error.message || 'Please try again'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const reference = `TH${Date.now().toString().slice(-8)}`;

  if (!cartItems) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-16">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-4">Complete Payment</h1>
          <p className="text-[#2B2B2B]/70 mb-12">
            Please transfer the amount to our bank account and upload proof of payment
          </p>

          <div className="space-y-6">
            {/* Payment Details */}
            <div className="bg-white border border-[#EBE4D8] p-8">
              <h2 className="font-serif text-2xl text-[#0E2A47] mb-6">Bank Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#EBE4D8]">
                  <span className="text-[#2B2B2B]/60">Bank</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#0E2A47]">First National Bank (FNB)</span>
                    <button
                      onClick={() => copyToClipboard('First National Bank')}
                      className="p-1 hover:bg-[#EBE4D8] rounded"
                    >
                      <Copy className="w-4 h-4 text-[#A88D4B]" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-[#EBE4D8]">
                  <span className="text-[#2B2B2B]/60">Account Name</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#0E2A47]">Tiger Hunt Tailoring</span>
                    <button
                      onClick={() => copyToClipboard('Tiger Hunt Tailoring')}
                      className="p-1 hover:bg-[#EBE4D8] rounded"
                    >
                      <Copy className="w-4 h-4 text-[#A88D4B]" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-[#EBE4D8]">
                  <span className="text-[#2B2B2B]/60">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#0E2A47]">62847291056</span>
                    <button
                      onClick={() => copyToClipboard('62847291056')}
                      className="p-1 hover:bg-[#EBE4D8] rounded"
                    >
                      <Copy className="w-4 h-4 text-[#A88D4B]" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-[#EBE4D8]">
                  <span className="text-[#2B2B2B]/60">Branch Code</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#0E2A47]">250655</span>
                    <button
                      onClick={() => copyToClipboard('250655')}
                      className="p-1 hover:bg-[#EBE4D8] rounded"
                    >
                      <Copy className="w-4 h-4 text-[#A88D4B]" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-[#EBE4D8]">
                  <span className="text-[#2B2B2B]/60">Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#0E2A47]">{reference}</span>
                    <button
                      onClick={() => copyToClipboard(reference)}
                      className="p-1 hover:bg-[#EBE4D8] rounded"
                    >
                      <Copy className="w-4 h-4 text-[#A88D4B]" />
                    </button>
                  </div>
                </div>

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
                  <div className="relative">
                    <Input
                      id="proof"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="border-[#EBE4D8]"
                      disabled={isUploading}
                    />
                  </div>
                  {isUploading && (
                    <p className="text-sm text-[#A88D4B] mt-2">Uploading...</p>
                  )}
                  {proofOfPayment && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Payment proof uploaded successfully
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={!proofOfPayment || isSubmitting}
                  className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-6 text-base flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting Order...' : 'Complete Order'}
                  <Upload className="w-5 h-5" />
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