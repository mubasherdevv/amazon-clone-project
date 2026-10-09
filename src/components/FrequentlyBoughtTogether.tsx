import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { HeadphoneGraphic, StandAccessoryGraphic } from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';
import { CartItem } from '../types/amazon';

interface FrequentlyBoughtTogetherProps {
  onAddBundleToCart: (items: CartItem[]) => void;
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({
  onAddBundleToCart
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>({
    'item-main': true,
    'item-case': true,
    'item-stand': true
  });
  const [added, setAdded] = useState(false);

  const bundleItems = [
    {
      id: 'item-main',
      title: 'This item: Sony WH-1000XM5 Wireless Headphones (Black)',
      price: 298.00,
      imageType: 'headphone'
    },
    {
      id: 'item-case',
      title: 'LTGEM Hard EVA Travel Storage Case for Sony WH-1000XM5',
      price: 24.99,
      imageType: 'case'
    },
    {
      id: 'item-stand',
      title: 'NewerKey Premium Aluminum Headphone Desk Stand Hanger',
      price: 19.99,
      imageType: 'stand'
    }
  ];

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeItems = bundleItems.filter(item => checkedItems[item.id]);
  const totalPrice = activeItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddBundle = () => {
    const itemsToAdd: CartItem[] = activeItems.map(item => ({
      id: `${item.id}-${Date.now()}`,
      productId: item.id,
      title: item.title,
      variantName: 'Standard',
      colorName: 'Black',
      price: item.price,
      quantity: 1,
      image: item.imageType
    }));
    onAddBundleToCart(itemsToAdd);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="border-t border-b border-gray-200 py-6 my-6">
      <h2 className="text-lg font-bold text-[#0f1111] mb-4">
        Frequently bought together
      </h2>

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Images Row with Plus icons */}
        <div className="flex items-center gap-3">
          {/* Main Item */}
          <div className="w-24 h-24 p-2 border border-gray-200 rounded bg-white flex items-center justify-center shrink-0 overflow-hidden">
            <ProductImage
              src={REAL_PRODUCT_IMAGES.sonyFront}
              alt="Sony WH-1000XM"
              fallback={<HeadphoneGraphic color="black" view="front" className="w-full h-full object-contain" />}
            />
          </div>

          <Plus className="w-5 h-5 text-gray-400 shrink-0" />

          {/* Case Item */}
          <div className="w-24 h-24 p-2 border border-gray-200 rounded bg-white flex items-center justify-center shrink-0 overflow-hidden">
            <ProductImage
              src={REAL_PRODUCT_IMAGES.travelCase}
              alt="Travel Case"
              fallback={<HeadphoneGraphic color="black" view="case" className="w-full h-full object-contain" />}
            />
          </div>

          <Plus className="w-5 h-5 text-gray-400 shrink-0" />

          {/* Stand Item */}
          <div className="w-24 h-24 p-2 border border-gray-200 rounded bg-white flex items-center justify-center shrink-0 overflow-hidden">
            <ProductImage
              src={REAL_PRODUCT_IMAGES.deskStand}
              alt="Headphone Stand"
              fallback={<StandAccessoryGraphic className="w-full h-full object-contain" />}
            />
          </div>
        </div>

        {/* Bundle Summary & Add Button */}
        <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col justify-center">
          <div className="text-sm text-gray-700 mb-2">
            Total price:{' '}
            <span className="text-xl font-bold text-[#b12704]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={activeItems.length === 0}
            className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-black text-xs font-semibold py-2 px-6 rounded-full shadow-xs border border-[#fcd200] cursor-pointer transition disabled:opacity-50 flex items-center gap-1.5 w-fit"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Bundle Added to Cart!</span>
              </>
            ) : (
              <span>Add all {activeItems.length} to Cart</span>
            )}
          </button>
        </div>
      </div>

      {/* Checkboxes List */}
      <div className="mt-4 space-y-2 text-xs">
        {bundleItems.map(item => (
          <label key={item.id} className="flex items-start gap-2 cursor-pointer text-gray-800">
            <input
              type="checkbox"
              checked={!!checkedItems[item.id]}
              onChange={() => toggleItem(item.id)}
              className="mt-0.5 rounded accent-[#e77600]"
            />
            <span>
              {item.title} — <strong className="text-[#0f1111]">${item.price.toFixed(2)}</strong>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
