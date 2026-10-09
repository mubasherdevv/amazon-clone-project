import React, { useState } from 'react';
import { CheckCircle2, Lock, ShieldCheck, Truck, CreditCard, ChevronRight, X } from 'lucide-react';
import { CartItem } from '../types/amazon';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderCompleted: () => void;
  deliveryLocation: { city: string; zip: string };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderCompleted,
  deliveryLocation
}) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = cart.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const planTotal = item.protectionPlan ? item.protectionPlan.price * item.quantity : 0;
    return sum + itemTotal + planTotal;
  }, 0);

  const estimatedTax = itemsSubtotal * 0.0825;
  const orderTotal = itemsSubtotal + estimatedTax;

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      const generatedId = `114-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`;
      setOrderId(generatedId);
      setIsPlacingOrder(false);
      setOrderConfirmed(true);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full shadow-2xl border border-gray-200 overflow-hidden text-xs text-[#0f1111]">
        {/* Amazon Checkout Clean Minimal Header */}
        <div className="bg-gradient-to-b from-[#f7f8f8] to-[#e7e9ec] px-6 py-3 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-[#131921]">amazon</span>
            <span className="text-base font-semibold text-gray-700">Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Secure Checkout</span>
          </div>
        </div>

        {orderConfirmed ? (
          /* Order Confirmed Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold text-[#0f1111]">
              Order Placed, thank you!
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Confirmation will be sent to your email. We'll send tracking information once your package has shipped.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Number:</span>
                <span className="font-bold text-gray-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guaranteed Delivery:</span>
                <span className="font-bold text-[#007600]">Tomorrow by 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping To:</span>
                <span className="font-semibold text-gray-900">Alex Parker, {deliveryLocation.city} {deliveryLocation.zip}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-sm">
                <span>Total Paid:</span>
                <span className="text-[#b12704]">${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-2 px-8 rounded-full border border-[#fcd200] cursor-pointer text-sm shadow-xs"
              >
                Return to Product Page
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Steps Form */
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Steps Left 2 Cols */}
            <div className="md:col-span-2 space-y-4">
              {/* Step 1: Shipping Address */}
              <div className="border border-gray-200 rounded p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-[#0f1111]">1. Shipping address</h3>
                  <button className="text-[#007185] hover:underline font-semibold">Change</button>
                </div>
                <div className="text-gray-700 leading-relaxed pl-4 border-l-2 border-[#e77600]">
                  <p className="font-semibold text-gray-900">Alex Parker</p>
                  <p>1200 4th Ave, Suite 500</p>
                  <p>{deliveryLocation.city}, WA {deliveryLocation.zip}</p>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="border border-gray-200 rounded p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-[#0f1111]">2. Payment method</h3>
                  <button className="text-[#007185] hover:underline font-semibold">Change</button>
                </div>
                <div className="flex items-center gap-2 pl-4 border-l-2 border-[#e77600] text-gray-800">
                  <CreditCard className="w-4 h-4 text-[#007185]" />
                  <span><strong>Amazon Prime Rewards Visa Signature</strong> ending in 4920</span>
                </div>
              </div>

              {/* Step 3: Review Items & Delivery Speed */}
              <div className="border border-gray-200 rounded p-4 bg-white">
                <h3 className="font-bold text-sm text-[#0f1111] mb-2">3. Review items and shipping</h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded p-2.5 mb-3 flex items-center gap-2 text-emerald-900">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Guaranteed delivery: <strong>Tomorrow, Oct 10</strong> with FREE Prime Delivery</span>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <div className="truncate mr-2">
                        <span className="font-semibold text-gray-900">{item.title}</span>
                        <span className="text-gray-500 ml-1">({item.colorName}) x{item.quantity}</span>
                      </div>
                      <span className="font-bold shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Box */}
            <div className="border border-gray-300 rounded p-4 bg-gray-50 h-fit space-y-3">
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-black font-bold py-2.5 px-4 rounded-full shadow-sm border border-[#fcd200] cursor-pointer transition text-xs disabled:opacity-50"
              >
                {isPlacingOrder ? 'Placing your order...' : 'Place your order'}
              </button>
              <p className="text-[10px] text-gray-500 text-center">
                By placing your order, you agree to Amazon's privacy notice and conditions of use.
              </p>

              <div className="border-t border-gray-200 pt-3 space-y-1.5 text-gray-700">
                <h4 className="font-bold text-gray-900 mb-1">Order Summary</h4>
                <div className="flex justify-between">
                  <span>Items ({totalItems}):</span>
                  <span>${itemsSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & handling:</span>
                  <span className="text-[#007600] font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated tax to be collected:</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 pt-2 text-sm font-bold text-[#b12704]">
                  <span>Order total:</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 text-[11px] text-gray-500 space-y-1">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Amazon A-to-z Guarantee protection</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full text-center text-gray-600 hover:text-black py-1 cursor-pointer font-medium"
              >
                Cancel and return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
