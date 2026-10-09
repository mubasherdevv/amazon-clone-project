import React, { useState } from 'react';
import { 
  MapPin, 
  Lock, 
  ShieldCheck, 
  ChevronDown, 
  Check,
  Gift
} from 'lucide-react';
import { ProductData, ProductVariant } from '../types/amazon';

interface BuyBoxProps {
  product: ProductData;
  selectedVariant: ProductVariant;
  selectedConfigPrice: number;
  deliveryLocation: { city: string; zip: string };
  onAddToCart: (quantity: number, protectionPlan?: { name: string; price: number }) => void;
  onBuyNow: (quantity: number, protectionPlan?: { name: string; price: number }) => void;
}

export const BuyBox: React.FC<BuyBoxProps> = ({
  product,
  selectedVariant,
  selectedConfigPrice,
  deliveryLocation,
  onAddToCart,
  onBuyNow
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<'none' | '2year' | '3year'>('none');
  const [isGift, setIsGift] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const finalUnitPrice = selectedConfigPrice || selectedVariant.price;

  const handleAdd = () => {
    let plan = undefined;
    if (selectedPlan === '2year') {
      plan = { name: '2-Year Protection Plan', price: 34.99 };
    } else if (selectedPlan === '3year') {
      plan = { name: '3-Year Protection Plan', price: 49.99 };
    }
    onAddToCart(quantity, plan);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleBuy = () => {
    let plan = undefined;
    if (selectedPlan === '2year') {
      plan = { name: '2-Year Protection Plan', price: 34.99 };
    } else if (selectedPlan === '3year') {
      plan = { name: '3-Year Protection Plan', price: 49.99 };
    }
    onBuyNow(quantity, plan);
  };

  return (
    <div className="border border-[#d5d9d9] rounded-lg p-4 bg-white shadow-xs text-xs text-[#0f1111] sticky top-16">
      {/* Price Header */}
      <div className="flex items-start text-xl md:text-2xl font-semibold mb-2">
        <span className="text-xs font-normal mt-1 mr-0.5">$</span>
        <span>{Math.floor(finalUnitPrice)}</span>
        <span className="text-xs font-normal mt-1">
          {(finalUnitPrice % 1).toFixed(2).substring(2)}
        </span>
      </div>

      {/* Prime & Delivery Time */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-[#007185]">
          <span className="bg-[#007185] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">prime</span>
          <span className="text-[#0f1111] font-medium">FREE Returns</span>
        </div>
        <p className="text-gray-800 leading-tight">
          FREE delivery <strong className="text-black">Tomorrow, Oct 10</strong>. Order within{' '}
          <strong className="text-[#007600]">4 hrs 21 mins</strong>
        </p>
      </div>

      {/* Delivery Destination */}
      <div className="flex items-center gap-1.5 text-xs text-[#007185] mb-3 hover:text-[#c7511f] cursor-pointer">
        <MapPin className="w-3.5 h-3.5 text-gray-700 shrink-0" />
        <span className="truncate">Deliver to {deliveryLocation.city} {deliveryLocation.zip}</span>
      </div>

      {/* Stock Status */}
      <div className="text-lg font-bold text-[#007600] mb-3">
        In Stock
      </div>

      {/* Quantity Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Quantity:</label>
        <div className="relative inline-block w-full">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] rounded-md py-1.5 px-3 pr-8 font-semibold text-gray-800 shadow-xs appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#e77600]"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>
                Qty: {n}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Action Buttons: Add to Cart & Buy Now */}
      <div className="space-y-2 mb-4">
        <button
          onClick={handleAdd}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-black font-medium py-2 px-4 rounded-full shadow-xs border border-[#fcd200] cursor-pointer transition flex items-center justify-center gap-2"
        >
          {isAddedFeedback ? (
            <>
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>

        <button
          onClick={handleBuy}
          className="w-full bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e67a00] text-black font-medium py-2 px-4 rounded-full shadow-xs border border-[#ff8f00] cursor-pointer transition"
        >
          Buy Now
        </button>
      </div>

      {/* Seller & Fulfillment Information */}
      <div className="grid grid-cols-2 gap-y-1.5 border-t border-b border-gray-200 py-3 mb-3 text-xs text-gray-600">
        <div>Ships from</div>
        <div className="font-semibold text-gray-900">{product.shipsFrom}</div>
        <div>Sold by</div>
        <div className="font-semibold text-gray-900">{product.soldBy}</div>
        <div>Returns</div>
        <div className="text-[#007185] hover:underline cursor-pointer">30-day refund/replacement</div>
        <div>Payment</div>
        <div className="text-[#007185] hover:underline cursor-pointer flex items-center gap-1">
          <Lock className="w-3 h-3 text-gray-500" />
          <span>Secure transaction</span>
        </div>
      </div>

      {/* Optional Protection Plan */}
      <div className="mb-3 bg-gray-50 p-2.5 rounded border border-gray-200">
        <div className="font-bold text-gray-900 mb-1.5 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#007185]" />
          <span>Add a Protection Plan:</span>
        </div>
        <div className="space-y-1.5">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="protection"
              checked={selectedPlan === '2year'}
              onChange={() => setSelectedPlan(selectedPlan === '2year' ? 'none' : '2year')}
              className="mt-0.5 accent-[#e77600]"
            />
            <span className="text-[11px] leading-tight text-gray-700">
              <strong>2-Year Protection Plan</strong> for <span className="text-[#b12704]">$34.99</span>
            </span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="protection"
              checked={selectedPlan === '3year'}
              onChange={() => setSelectedPlan(selectedPlan === '3year' ? 'none' : '3year')}
              className="mt-0.5 accent-[#e77600]"
            />
            <span className="text-[11px] leading-tight text-gray-700">
              <strong>3-Year Protection Plan</strong> for <span className="text-[#b12704]">$49.99</span>
            </span>
          </label>
        </div>
      </div>

      {/* Gift Options */}
      <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 mb-3">
        <input
          type="checkbox"
          checked={isGift}
          onChange={(e) => setIsGift(e.target.checked)}
          className="rounded accent-[#e77600]"
        />
        <span className="flex items-center gap-1">
          <Gift className="w-3 h-3 text-gray-500" />
          Add a gift receipt for easy returns
        </span>
      </label>

      {/* Add to List */}
      <div className="border-t border-gray-200 pt-3">
        <button
          type="button"
          className="w-full bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] rounded py-1.5 px-3 text-xs font-medium text-gray-800 shadow-xs cursor-pointer text-left flex items-center justify-between"
        >
          <span>Add to Wish List</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};
