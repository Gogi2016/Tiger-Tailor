import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Search, RefreshCw, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

// ─────────────────────────────────────────────────────────────────
// Change this password to something secure before deploying
// ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'TigerHunt2026!';

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

function OrderRow({ order, onStatusChange }) {
  const [expanded,     setExpanded]     = useState(false);
  const [items,        setItems]        = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [updating,     setUpdating]     = useState(false);
  const [newStatus,    setNewStatus]    = useState(order.status);
  const [notes,        setNotes]        = useState(order.admin_notes || '');

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
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, admin_notes: notes })
      .eq('id', order.id);
    if (error) {
      toast.error('Failed to update order');
    } else {
      toast.success('Order updated');
      onStatusChange(order.id, newStatus, notes);
    }
    setUpdating(false);
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
            <div className="p-4 bg-[#F5F1E8] grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order items */}
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#A88D4B] mb-3">Items</p>
                {loadingItems ? (
                  <p className="text-xs text-[#2B2B2B]/50">Loading…</p>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <div key={i} className="bg-white border border-[#EBE4D8] p-3">
                        <p className="font-serif text-sm text-[#0E2A47] mb-1">
                          {item.product_name} <span className="text-[#2B2B2B]/40 text-xs">({item.product_type})</span>
                        </p>
                        <div className="grid grid-cols-2 gap-1 text-xs text-[#2B2B2B]/60">
                          {item.tailor  && <p><span className="font-medium">Tailor:</span> {item.tailor}</p>}
                          {item.fabric  && <p><span className="font-medium">Fabric:</span> {item.fabric}</p>}
                          {item.chest   && <p><span className="font-medium">Chest:</span> {item.chest}cm</p>}
                          {item.waist   && <p><span className="font-medium">Waist:</span> {item.waist}cm</p>}
                          {item.hips    && <p><span className="font-medium">Hips:</span> {item.hips}cm</p>}
                          {item.height  && <p><span className="font-medium">Height:</span> {item.height}cm</p>}
                          {item.inseam  && <p><span className="font-medium">Inseam:</span> {item.inseam}cm</p>}
                          {item.outseam && <p><span className="font-medium">Outseam:</span> {item.outseam}cm</p>}
                          {item.notes   && <p className="col-span-2"><span className="font-medium">Notes:</span> {item.notes}</p>}
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

  // FIX: loadOrders defined at top level so it's always in scope
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
      // FIX: always reset loading state even if an exception occurs
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

  // ── Login screen ──────────────────────────────────────────────
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

  // ── Dashboard ─────────────────────────────────────────────────
  return (
    // FIX: changed pt-8 → pt-28 to clear the fixed site navbar (~64px tall)
    <div className="min-h-screen bg-[#F5F1E8] pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#0E2A47]">Order Dashboard</h1>
            <p className="text-sm text-[#2B2B2B]/50 mt-1">{orders.length} total orders</p>
          </div>
          {/* FIX: button now correctly calls the top-level loadOrders */}
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