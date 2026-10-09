import React from 'react';
import { X, Trash2, CheckCircle2, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/amazon';
import { HeadphoneGraphic, AirPodsMaxGraphic, KindleGraphic, StandAccessoryGraphic } from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const planTotal = item.protectionPlan ? item.protectionPlan.price * item.quantity : 0;
    return sum + itemTotal + planTotal;
  }, 0);

  const renderThumbnail = (image: string, color: string) => {
    if (image === 'apple' || image.includes('airpods')) {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.airpodsMax}
          alt="AirPods Max"
          fallback={<AirPodsMaxGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (image === 'kindle') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.kindle}
          alt="Kindle"
          fallback={<KindleGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (image === 'stand') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.deskStand}
          alt="Headphone Stand"
          fallback={<StandAccessoryGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (image === 'case') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.travelCase}
          alt="Travel Case"
          fallback={<HeadphoneGraphic color="black" view="case" className="w-full h-full object-contain" />}
        />
      );
    }
    const col = color.toLowerCase().includes('silver') ? 'silver' : color.toLowerCase().includes('blue') ? 'blue' : color.toLowerCase().includes('pink') ? 'pink' : 'black';
    return (
      <ProductImage
        src={REAL_PRODUCT_IMAGES.sonyFront}
        alt="Sony WH-1000XM"
        fallback={<HeadphoneGraphic color={col} view="front" className="w-full h-full object-contain" />}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 flex justify-end">
      {/* Slide-out Drawer */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#007185]" />
            <h2 className="font-bold text-base text-[#0f1111]">
              Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-500 hover:text-black hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Callout */}
        <div className="bg-emerald-50 border-b border-emerald-100 p-3 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your order qualifies for <strong>FREE Prime Delivery</strong>!</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-200">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
              <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-sm font-semibold text-gray-800">Your Amazon Cart is empty</p>
              <p className="text-xs text-gray-500 mt-1">Shop today's deals and add items to your cart</p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-semibold py-2 px-5 rounded-full border border-[#fcd200]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-3 text-xs">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 border border-gray-200 rounded p-1.5 bg-white shrink-0 flex items-center justify-center">
                  {renderThumbnail(item.image, item.colorName)}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 leading-snug line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <div className="text-[11px] text-gray-600 mb-1">
                    Color: <strong className="text-black">{item.colorName}</strong>
                  </div>
                  <div className="text-[#007600] font-semibold text-[11px] mb-2">
                    In Stock
                  </div>

                  {item.protectionPlan && (
                    <div className="flex items-center gap-1 text-[11px] text-gray-700 bg-gray-50 p-1 rounded border border-gray-200 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#007185]" />
                      <span>{item.protectionPlan.name} (+${item.protectionPlan.price.toFixed(2)})</span>
                    </div>
                  )}

                  {/* Quantity Stepper & Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded bg-gray-50">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2.5 py-0.5 hover:bg-gray-200 text-gray-700 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 font-semibold text-black bg-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2.5 py-0.5 hover:bg-gray-200 text-gray-700 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1 transition"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <div className="font-bold text-sm text-[#0f1111]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  {item.quantity > 1 && (
                    <div className="text-[10px] text-gray-500">
                      ${item.price.toFixed(2)} each
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Subtotal ({totalItems} items):</span>
              <span className="text-lg font-bold text-[#b12704]">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-black font-semibold py-2.5 px-4 rounded-full shadow-sm border border-[#fcd200] cursor-pointer transition flex items-center justify-center gap-2 text-sm"
            >
              <span>Proceed to checkout ({totalItems} items)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-gray-100 text-gray-700 font-medium py-1.5 px-4 rounded-full border border-gray-300 text-xs transition"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
