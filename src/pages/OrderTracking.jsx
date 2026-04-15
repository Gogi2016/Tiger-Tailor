import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, Clock, CheckCircle, Truck, Star, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const statusSteps = [
  { key: 'Pending Payment',    label: 'Pending Payment',    icon: Clock,       description: 'We have received your order and are awaiting payment verification.' },
  { key: 'Payment Verified',   label: 'Payment Verified',   icon: CheckCircle, description: 'Your payment has been confirmed. Production is about to begin.' },
  { key: 'In Production',      label: 'In Production',      icon: Star,        description: 'Our master tailor is crafting your bespoke garment.' },
  { key: 'Ready for Delivery', label: 'Ready for Delivery', icon: Package,     description: 'Your order is complete and ready to be dispatched.' },
  { key: 'Delivered',          label: 'Delivered',          icon: Truck,       description: 'Your order has been delivered. Enjoy your garment!' },
];

const statusColors = {
  'Pending Payment':    'text-yellow-600 bg-yellow-50 border-yellow-200',
  'Payment Verified':   'text-blue-600 bg-blue-50 border-blue-200',
  'In Production':      'text-[#A88D4B] bg-[#A88D4B]/10 border-[#A88D4B]/30',
  'Ready for Delivery': 'text-purple-600 bg-purple-50 border-purple-200',
  'Delivered':          'text-green-600 bg-green-50 border-green-200',
  'Cancelled':          'text-red-600 bg-red-50 border-red-200',
};

function OrderStatus({ order, items }) {
  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);
  const isCancelled = order.status === 'Cancelled';
  const formatPrice = (p) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(p);
  const formatDate  = (d) => new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">

      {/* Header */}
      <div className="bg-white border border-[#EBE4D8] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-1">Order Reference</p>
            <h2 className="font-serif text-2xl text-[#0E2A47]">{order.reference}</h2>
          </div>
          <span className={`px-3 py-1.5 text-xs tracking-[0.15em] uppercase border font-medium self-start ${statusColors[order.status] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
            {order.status}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#EBE4D8]">
          <div><p className="text-xs text-[#2B2B2B]/50 mb-1">Customer</p><p className="text-sm text-[#0E2A47] font-medium">{order.customer_name}</p></div>
          <div><p className="text-xs text-[#2B2B2B]/50 mb-1">Order Date</p><p className="text-sm text-[#0E2A47] font-medium">{formatDate(order.created_at)}</p></div>
          <div><p className="text-xs text-[#2B2B2B]/50 mb-1">Total</p><p className="text-sm text-[#0E2A47] font-medium">{formatPrice(order.total)}</p></div>
          <div><p className="text-xs text-[#2B2B2B]/50 mb-1">Deposit Paid</p><p className="text-sm text-[#0E2A47] font-medium">{formatPrice(order.deposit)}</p></div>
        </div>
      </div>

      {/* Progress */}
      {!isCancelled && (
        <div className="bg-white border border-[#EBE4D8] p-6">
          <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-6">Order Progress</h3>
          <div className="space-y-0">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent   = index === currentStepIndex;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${isCompleted ? 'bg-[#0E2A47] border-[#0E2A47]' : 'bg-white border-[#EBE4D8]'}`}>
                      <Icon className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-[#2B2B2B]/30'}`} />
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ${isCompleted && index < currentStepIndex ? 'bg-[#0E2A47]' : 'bg-[#EBE4D8]'}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${isCompleted ? 'text-[#0E2A47]' : 'text-[#2B2B2B]/40'}`}>
                      {step.label}
                      {isCurrent && <span className="ml-2 text-[10px] tracking-[0.15em] uppercase text-[#A88D4B] bg-[#A88D4B]/10 px-2 py-0.5">Current</span>}
                    </p>
                    {isCurrent && <p className="text-xs text-[#2B2B2B]/60 mt-1 leading-relaxed">{step.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="bg-red-50 border border-red-200 p-6 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-700">Order Cancelled</p>
            <p className="text-xs text-red-600 mt-1">Please contact hello@tigerhunt.co.za or +27 11 234 5678.</p>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="bg-white border border-[#EBE4D8] p-6">
        <h3 className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] mb-4">Items Ordered</h3>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="pb-4 border-b border-[#EBE4D8] last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-serif text-[#0E2A47]">{item.product_name}</p>
                  <p className="text-xs text-[#2B2B2B]/50 uppercase tracking-wide">{item.product_type}</p>
                </div>
                <p className="font-medium text-[#0E2A47]">{formatPrice(item.base_price * item.quantity)}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {item.tailor && <p className="text-xs text-[#2B2B2B]/60"><span className="font-medium">Tailor:</span> {item.tailor}</p>}
                {item.fabric && <p className="text-xs text-[#2B2B2B]/60"><span className="font-medium">Fabric:</span> {item.fabric}</p>}
                {item.chest  && <p className="text-xs text-[#2B2B2B]/60"><span className="font-medium">Chest:</span> {item.chest}cm</p>}
                {item.waist  && <p className="text-xs text-[#2B2B2B]/60"><span className="font-medium">Waist:</span> {item.waist}cm</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-[#0E2A47] p-6">
        <p className="text-[#A88D4B] text-xs tracking-[0.3em] uppercase mb-2">Need Help?</p>
        <p className="text-white/70 text-sm mb-1">Email: hello@tigerhunt.co.za</p>
        <p className="text-white/70 text-sm">Phone: +27 11 234 5678</p>
        <p className="text-white/40 text-xs mt-3">Quote your reference: {order.reference}</p>
      </div>
    </motion.div>
  );
}

export default function OrderTracking() {
  const [reference, setReference] = useState('');
  const [order,     setOrder]     = useState(null);
  const [items,     setItems]     = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState('');

  const handleTrack = async () => {
    const ref = reference.trim().toUpperCase();
    if (!ref) { setError('Please enter your order reference number.'); return; }
    setIsLoading(true); setError(''); setOrder(null); setItems([]);
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders').select('*').eq('reference', ref).single();
      if (orderError || !orderData) {
        setError('No order found with reference "' + ref + '". Please check and try again.');
        setIsLoading(false); return;
      }
      const { data: itemsData } = await supabase
        .from('order_items').select('*').eq('order_id', orderData.id);
      setOrder(orderData);
      setItems(itemsData || []);
    } catch {
      setError('Something went wrong. Please try again or contact hello@tigerhunt.co.za');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-24 md:pt-32 pb-16">
      <div className="max-w-[680px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-4">Order Tracking</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-4 leading-[1.2]">
            Track Your <span className="italic">Order</span>
          </h1>
          <p className="text-[#2B2B2B]/65 leading-relaxed">
            Enter the reference number from your confirmation email to see your order status.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-[#EBE4D8] p-6 mb-8"
        >
          <label className="text-xs tracking-[0.3em] uppercase text-[#A88D4B] block mb-3">Order Reference</label>
          <div className="flex gap-3">
            <Input
              value={reference}
              onChange={(e) => { setReference(e.target.value.toUpperCase()); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              placeholder="e.g. TH12345678"
              className="border-[#EBE4D8] focus:border-[#A88D4B] font-mono tracking-widest text-[#0E2A47]"
            />
            <Button onClick={handleTrack} disabled={isLoading}
              className="bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] px-6 flex items-center gap-2 flex-shrink-0"
            >
              {isLoading
                ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                : <><Search className="w-4 h-4" /> Track</>}
            </Button>
          </div>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 mt-3">{error}</motion.p>}
        </motion.div>

        <AnimatePresence>
          {order && <OrderStatus order={order} items={items} />}
        </AnimatePresence>
      </div>
    </div>
  );
}