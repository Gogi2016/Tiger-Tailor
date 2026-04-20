import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Search, RefreshCw, ChevronDown, ChevronUp, Eye, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

const ADMIN_PASSWORD = 'TigerHunt2026!';

const EMAILJS_SERVICE_ID  = 'service_4pwayaq';
const EMAILJS_TEMPLATE_ID = 'template_2lw9bty';
const EMAILJS_PUBLIC_KEY  = 'U8pqPF9DulJ3KPNo2';

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

const STATUS_OPTIONS = [
  'Pending Payment',
  'Payment Verified',
  'In Production',
  'Ready for Delivery',
  'Delivered',
  'Cancelled',
];

const statusColors = {
  'Pending Payment':    'bg-yellow-100 text-yellow-700',
  'Payment Verified':   'bg-blue-100 text-blue-700',
  'In Production':      'bg-[#A88D4B]/15 text-[#A88D4B]',
  'Ready for Delivery': 'bg-purple-100 text-purple-700',
  'Delivered':          'bg-green-100 text-green-700',
  'Cancelled':          'bg-red-100 text-red-700',
};

const statusEmailContent = {
  'Pending Payment': {
    subject: (ref) => `Order #${ref} — Awaiting Payment`,
    body: (name, ref) =>
      `Dear ${name},\n\nWe have received your order and are currently awaiting payment verification.\n\nOnce your payment is confirmed, we will begin production immediately.\n\nOrder Reference: ${ref}\n\nIf you have already made payment, please allow 24–48 hours for verification.\n\nBest regards,\nTiger Hunt Team\nPhone: +27 11 234 5678 | hello@tigerhunt.co.za`,
  },
  'Payment Verified': {
    subject: (ref) => `Order #${ref} — Payment Confirmed ✓`,
    body: (name, ref) =>
      `Dear ${name},\n\nGreat news! Your payment for order #${ref} has been verified and confirmed.\n\nOur master tailor will begin crafting your bespoke garment shortly.\n\nOrder Reference: ${ref}\n\nWe'll notify you again as soon as your order is in production.\n\nBest regards,\nTiger Hunt Team\nPhone: +27 11 234 5678 | hello@tigerhunt.co.za`,
  },
  'In Production': {
    subject: (ref) => `Order #${ref} — Now In Production 🧵`,
    body: (name, ref) =>
      `Dear ${name},\n\nExciting news! Your bespoke order #${ref} is now being crafted by our master tailor.\n\nWe take great care to ensure every detail meets our exacting standards. This process typically takes 2–3 weeks depending on the complexity of your order.\n\nOrder Reference: ${ref}\n\nWe'll be in touch as soon as your garment is ready for delivery.\n\nBest regards,\nTiger Hunt Team\nPhone: +27 11 234 5678 | hello@tigerhunt.co.za`,
  },
  'Ready for Delivery': {
    subject: (ref) => `Order #${ref} — Ready for Delivery! 📦`,
    body: (name, ref) =>
      `Dear ${name},\n\nWonderful news! Your bespoke order #${ref} is complete and ready to be dispatched.\n\nOur team will contact you shortly to arrange delivery or collection at a time that suits you.\n\nOrder Reference: ${ref}\n\nPlease ensure someone is available to receive your order at the agreed time.\n\nBest regards,\nTiger Hunt Team\nPhone: +27 11 234 5678 | hello@tigerhunt.co.za`,
  },
  'Delivered': {
    subject: (ref) => `Order #${ref} — Delivered! Enjoy Your Garment 🎉`,
    body: (name, ref) =>
      `Dear ${name},\n\nYour order #${ref} has been delivered. We hope you are absolutely delighted with your bespoke garment!\n\nIf you have any questions or require any adjustments, please don't hesitate to get in touch with us.\n\nOrder Reference: ${ref}\n\nThank you for choosing Tiger Hunt. We look forward to crafting for you again.\n\nWarm regards,\nTiger Hunt Team\nPhone: +27 11 234 5678 | hello@tigerhunt.co.za`,
  },
  'Cancelled': {
    subject: (ref) => `Order #${ref} — Order Cancelled`,
    body: (name, ref) =>
      `Dear ${name},\n\nWe regret to inform you that your order #${ref} has been cancelled.\n\nIf you believe this is an error or would like to discuss further, please contact us as soon as possible.\n\nOrder Reference: ${ref}\n\nEmail: hello@tigerhunt.co.za\nPhone: +27 11 234 5678\n\nWe apologise for any inconvenience caused.\n\nBest regards,\nTiger Hunt Team`,
  },
};

const MEASUREMENT_FIELDS = [
  { key: 'chest',          label: 'Chest',          unit: 'cm' },
  { key: 'waist',          label: 'Waist',          unit: 'cm' },
  { key: 'hips',           label: 'Hips',           unit: 'cm' },
  { key: 'shoulder_width', label: 'Shoulder Width', unit: 'cm' },
  { key: 'neck',           label: 'Neck',           unit: 'cm' },
  { key: 'sleeve_length',  label: 'Sleeve Length',  unit: 'cm' },
  { key: 'jacket_length',  label: 'Jacket Length',  unit: 'cm' },
  { key: 'inseam',         label: 'Inseam',         unit: 'cm' },
  { key: 'outseam',        label: 'Outseam',        unit: 'cm' },
  { key: 'thigh',          label: 'Thigh',          unit: 'cm' },
  { key: 'height',         label: 'Height',         unit: 'cm' },
  { key: 'weight',         label: 'Weight',         unit: 'kg' },
  { key: 'posture_notes',  label: 'Posture Notes',  unit: ''   },
];

function OrderRow({ order, onStatusChange }) {
  const [expanded,       setExpanded]       = useState(false);
  const [items,          setItems]          = useState([]);
  const [loadingItems,   setLoadingItems]   = useState(false);
  const [updating,       setUpdating]       = useState(false);
  const [newStatus,      setNewStatus]      = useState(order.status);
  const [notes,          setNotes]          = useState(order.admin_notes || '');
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(p);
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const loadItems = async () => {
    if (items.length > 0) { setExpanded(!expanded); return; }
    setLoadingItems(true);
    const { data } = await supabase.from('order_items').select('*').eq('order_id', order.id);
    setItems(data || []);
    setLoadingItems(false);
    setExpanded(true);
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, admin_notes: notes })
        .eq('id', order.id);

      if (error) {
        toast.error('Failed to update order');
        setUpdating(false);
        return;
      }

      const statusChanged = newStatus !== order.status;
      if (statusChanged && notifyCustomer && order.customer_email) {
        const emailContent = statusEmailContent[newStatus];
        if (emailContent) {
          try {
            await sendEmail({
              toEmail: order.customer_email,
              name:    'Tiger Hunt',
              replyTo: 'hello@tigerhunt.co.za',
              subject: emailContent.subject(order.reference),
              message: emailContent.body(order.customer_name, order.reference),
            });
            toast.success(`Order updated & ${order.customer_name} notified via email ✓`);
          } catch (emailErr) {
            toast.warning('Order updated, but email notification failed. Please notify customer manually.');
            console.error('Email error:', emailErr);
          }
        } else {
          toast.success('Order updated ✓');
        }
      } else {
        toast.success(statusChanged ? 'Order updated (no email sent)' : 'Notes saved ✓');
      }

      onStatusChange(order.id, newStatus, notes);
    } catch (err) {
      toast.error('Unexpected error: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white border border-[#EBE4D8] overflow-hidden">
      {/* Row */}
      <div className="p-4 grid grid-cols-12 gap-3 items-center">
        <div className="col-span-2">
          <p className="font-mono text-sm text-[#0E2A47] font-medium">{order.reference}</p>
          <p className="text-xs text-[#2B2B2B]/50">{formatDate(order.created_at)}</p>
        </div>
        <div className="col-span-3">
          <p className="text-sm text-[#0E2A47] font-medium">{order.customer_name}</p>
          <p className="text-xs text-[#2B2B2B]/50">{order.customer_email}</p>
          <p className="text-xs text-[#2B2B2B]/50">{order.customer_phone}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-medium text-[#0E2A47]">{formatPrice(order.total)}</p>
          <p className="text-xs text-[#2B2B2B]/50">Deposit: {formatPrice(order.deposit)}</p>
        </div>
        <div className="col-span-2">
          <span className={`px-2 py-1 text-[10px] tracking-[0.1em] uppercase rounded ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
            {order.status}
          </span>
        </div>
        <div className="col-span-2">
          {order.proof_url
            ? <a href={order.proof_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#A88D4B] underline flex items-center gap-1"><Eye className="w-3 h-3" /> View Proof</a>
            : <p className="text-xs text-[#2B2B2B]/40">{order.proof_file_name || 'No proof'}</p>}
        </div>
        <div className="col-span-1 flex justify-end">
          <button onClick={loadItems} className="p-1.5 hover:bg-[#EBE4D8] rounded transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4 text-[#0E2A47]" /> : <ChevronDown className="w-4 h-4 text-[#0E2A47]" />}
          </button>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#EBE4D8]"
          >
            <div className="p-4 bg-[#F5F1E8] space-y-4">

              {/* Delivery Address — full width */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#A88D4B] mb-2">Delivery Address</p>
                <div className="bg-white border border-[#EBE4D8] px-4 py-3 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A88D4B] flex-shrink-0 mt-0.5" />
                  {order.delivery_address ? (
                    <p className="text-sm text-[#0E2A47] whitespace-pre-line leading-relaxed">
                      {order.delivery_address}
                    </p>
                  ) : (
                    <p className="text-sm text-[#2B2B2B]/40 italic">No delivery address provided</p>
                  )}
                </div>
              </div>

              {/* Items + Update Status — two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Order items */}
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A88D4B] mb-3">Items</p>
                  {loadingItems ? (
                    <p className="text-xs text-[#2B2B2B]/50">Loading…</p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item, i) => (
                        <div key={i} className="bg-white border border-[#EBE4D8] p-3">
                          <p className="font-serif text-sm text-[#0E2A47] mb-1">
                            {item.product_name} <span className="text-[#2B2B2B]/40 text-xs">({item.product_type})</span>
                          </p>
                          {item.tailor && (
                            <p className="text-xs text-[#2B2B2B]/60 mb-0.5"><span className="font-medium">Tailor:</span> {item.tailor}</p>
                          )}
                          {item.fabric && (
                            <p className="text-xs text-[#2B2B2B]/60 mb-0.5"><span className="font-medium">Fabric:</span> {item.fabric}</p>
                          )}
                          {item.notes && (
                            <p className="text-xs text-[#2B2B2B]/60 mb-2"><span className="font-medium">Notes:</span> {item.notes}</p>
                          )}

                          <div className="mt-2 pt-2 border-t border-[#EBE4D8]">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-[#A88D4B] mb-2">Measurements</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                              {MEASUREMENT_FIELDS.filter(f => f.key !== 'posture_notes').map(({ key, label, unit }) =>
                                item[key] != null && item[key] !== '' ? (
                                  <p key={key} className="text-xs text-[#2B2B2B]/70">
                                    <span className="font-medium text-[#0E2A47]">{label}:</span>{' '}
                                    {item[key]}{unit}
                                  </p>
                                ) : null
                              )}
                            </div>
                            {item.posture_notes && (
                              <p className="text-xs text-[#2B2B2B]/70 mt-1">
                                <span className="font-medium text-[#0E2A47]">Posture Notes:</span> {item.posture_notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Update status */}
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A88D4B] mb-3">Update Order</p>
                  <div className="bg-white border border-[#EBE4D8] p-4 space-y-3">
                    <div>
                      <label className="text-xs text-[#0E2A47] mb-1 block">Status</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full border border-[#EBE4D8] text-sm text-[#0E2A47] p-2 bg-white focus:outline-none focus:border-[#A88D4B]"
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#0E2A47] mb-1 block">Admin Notes</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Internal notes about this order…"
                        className="w-full border border-[#EBE4D8] text-sm text-[#0E2A47] p-2 resize-none focus:outline-none focus:border-[#A88D4B]"
                      />
                    </div>

                    {/* Notify toggle */}
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div
                        onClick={() => setNotifyCustomer(!notifyCustomer)}
                        className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 flex items-center px-0.5 ${notifyCustomer ? 'bg-[#0E2A47]' : 'bg-[#EBE4D8]'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${notifyCustomer ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                      <span className="text-xs text-[#2B2B2B]/70">
                        Notify customer by email
                        {newStatus !== order.status
                          ? <span className="ml-1 text-[#A88D4B]">(status changing to "{newStatus}")</span>
                          : <span className="ml-1 text-[#2B2B2B]/40">(no status change)</span>}
                      </span>
                    </label>

                    <Button
                      onClick={handleUpdate}
                      disabled={updating}
                      className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-2 text-sm"
                    >
                      {updating ? 'Saving…' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password,        setPassword]        = useState('');
  const [passwordError,   setPasswordError]   = useState('');
  const [orders,          setOrders]          = useState([]);
  const [isLoading,       setIsLoading]       = useState(false);
  const [searchTerm,      setSearchTerm]      = useState('');
  const [statusFilter,    setStatusFilter]    = useState('all');

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        toast.error('Failed to load orders');
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      toast.error('Unexpected error loading orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
      loadOrders();
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleStatusChange = (orderId, newStatus, newNotes) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: newStatus, admin_notes: newNotes } : o)
    );
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      !searchTerm ||
      o.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = orders.filter(o => o.status === s).length;
    return acc;
  }, {});

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E2A47] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#F5F1E8] p-10 w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <Lock className="w-10 h-10 text-[#A88D4B] mx-auto mb-4" />
            <h1 className="font-serif text-2xl text-[#0E2A47] mb-1">Admin Dashboard</h1>
            <p className="text-sm text-[#2B2B2B]/60">Tiger Hunt — Internal Use Only</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-[#0E2A47] block mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
                className="border-[#EBE4D8] focus:border-[#A88D4B]"
              />
              {passwordError && <p className="text-xs text-red-500 mt-2">{passwordError}</p>}
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-5"
            >
              Enter Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#0E2A47]">Order Dashboard</h1>
            <p className="text-sm text-[#2B2B2B]/50 mt-1">{orders.length} total orders</p>
          </div>
          <Button
            onClick={loadOrders}
            disabled={isLoading}
            variant="outline"
            className="border-[#0E2A47] text-[#0E2A47] flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={`p-3 border text-left transition-colors ${
                statusFilter === s
                  ? 'border-[#A88D4B] bg-[#A88D4B]/10'
                  : 'border-[#EBE4D8] bg-white hover:border-[#A88D4B]/40'
              }`}
            >
              <p className="text-2xl font-serif text-[#0E2A47]">{statusCounts[s] || 0}</p>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#2B2B2B]/50 mt-1 leading-tight">{s}</p>
            </button>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2B2B2B]/40" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by reference, name or email…"
              className="pl-9 border-[#EBE4D8] focus:border-[#A88D4B]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#EBE4D8] text-sm text-[#0E2A47] px-3 py-2 bg-white focus:outline-none focus:border-[#A88D4B]"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Table header */}
        <div className="bg-[#0E2A47] text-[#F5F1E8] p-4 grid grid-cols-12 gap-3 text-[10px] tracking-[0.15em] uppercase mb-1">
          <div className="col-span-2">Reference</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Proof</div>
          <div className="col-span-1"></div>
        </div>

        {/* Orders */}
        {isLoading ? (
          <div className="bg-white border border-[#EBE4D8] p-12 text-center">
            <span className="animate-spin inline-block w-8 h-8 border-4 border-[#EBE4D8] border-t-[#0E2A47] rounded-full" />
            <p className="text-sm text-[#2B2B2B]/50 mt-4">Loading orders…</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white border border-[#EBE4D8] p-12 text-center">
            <p className="text-[#2B2B2B]/50">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredOrders.map(order => (
              <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}