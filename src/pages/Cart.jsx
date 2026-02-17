import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => base44.entities.Cart.filter({ status: 'cart' }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Cart.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Item removed from cart');
    },
  });

  const handleCheckout = () => {
    if (!customerEmail || !customerPhone || !customerName) {
      toast.error('Please fill in your contact details');
      return;
    }

    navigate(createPageUrl('Checkout'), {
      state: {
        cartItems,
        customerEmail,
        customerPhone,
        customerName,
        total
      }
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.base_price * item.quantity), 0);
  const total = subtotal;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] pt-32 flex items-center justify-center">
        <p className="text-[#2B2B2B]/60">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-[#0E2A47] mb-4">Shopping Cart</h1>
          <p className="text-[#2B2B2B]/70">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16 bg-white border border-[#EBE4D8]"
          >
            <ShoppingBag className="w-16 h-16 text-[#A88D4B] mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-[#0E2A47] mb-4">Your cart is empty</h2>
            <p className="text-[#2B2B2B]/60 mb-8">Start building your bespoke wardrobe</p>
            <Link to={createPageUrl('Products')}>
              <Button className="bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8]">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-[#EBE4D8] p-6"
                >
                  <div className="flex gap-6">
                    <div className="w-24 h-32 bg-[#EBE4D8] flex-shrink-0" />
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-serif text-xl text-[#0E2A47]">{item.product_name}</h3>
                          <p className="text-sm text-[#2B2B2B]/60 uppercase">{item.product_type}</p>
                        </div>
                        <button
                          onClick={() => deleteMutation.mutate(item.id)}
                          className="text-[#2B2B2B]/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-1 mb-4">
                        <p className="text-sm text-[#2B2B2B]/70">
                          <span className="font-medium">Tailor:</span> {item.customizations?.tailor}
                        </p>
                        <p className="text-sm text-[#2B2B2B]/70">
                          <span className="font-medium">Fabric:</span> {item.customizations?.fabric}
                        </p>
                        {item.measurements?.chest && (
                          <p className="text-sm text-[#2B2B2B]/70">
                            <span className="font-medium">Measurements:</span> Chest {item.measurements.chest}cm, Waist {item.measurements.waist}cm
                          </p>
                        )}
                        {item.customizations?.notes && (
                          <p className="text-sm text-[#2B2B2B]/70">
                            <span className="font-medium">Notes:</span> {item.customizations.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2B2B2B]/60">Qty: {item.quantity}</span>
                        <span className="font-serif text-xl text-[#0E2A47]">
                          {formatPrice(item.base_price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white border border-[#EBE4D8] p-8 sticky top-32">
                <h2 className="font-serif text-2xl text-[#0E2A47] mb-6">Contact Details</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name" className="text-[#0E2A47]">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="John Doe"
                      className="border-[#EBE4D8]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#0E2A47]">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="border-[#EBE4D8]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#0E2A47]">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+27 123 456 789"
                      className="border-[#EBE4D8]"
                    />
                  </div>
                </div>

                <h2 className="font-serif text-2xl text-[#0E2A47] mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#2B2B2B]/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#2B2B2B]/70">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-4 border-t border-[#EBE4D8] flex justify-between">
                    <span className="font-serif text-xl text-[#0E2A47]">Total</span>
                    <span className="font-serif text-xl text-[#0E2A47]">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#0E2A47] hover:bg-[#0E2A47]/90 text-[#F5F1E8] py-6 text-base flex items-center justify-center gap-2 mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <div className="text-xs text-[#2B2B2B]/50 space-y-1">
                  <p>• 50% deposit required to begin</p>
                  <p>• Balance due upon completion</p>
                  <p>• 4-6 weeks production time</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}