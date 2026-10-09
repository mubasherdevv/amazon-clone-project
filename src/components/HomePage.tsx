import React from 'react';
import { HomeHeroCarousel } from './HomeHeroCarousel';
import { HomeCardGrid } from './HomeCardGrid';
import { LightningDealsCarousel } from './LightningDealsCarousel';
import { BestSellersRow } from './BestSellersRow';
import { Headphones, Laptop, BookOpen, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface HomePageProps {
  onSelectProduct: (productId: string) => void;
  onAddToCartDirect: (item: { title: string; price: number; id: string; imageType: string; color?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onAddToCartDirect
}) => {
  return (
    <div className="bg-[#eaeded] min-h-screen pb-8">
      {/* 1. Hero Promo Carousel */}
      <HomeHeroCarousel onSelectProduct={onSelectProduct} />

      {/* 2. Iconic 4-Column Overlapping Card Grid */}
      <HomeCardGrid onSelectProduct={onSelectProduct} />

      {/* 3. Lightning Deals & Limited-Time Savings Row */}
      <LightningDealsCarousel
        onSelectProduct={onSelectProduct}
        onAddToCartDirect={onAddToCartDirect}
      />

      {/* 4. Best Sellers Row */}
      <BestSellersRow
        onSelectProduct={onSelectProduct}
        onAddToCartDirect={onAddToCartDirect}
      />

      {/* 5. Trust & Prime Value Props Bar */}
      <div className="max-w-[1440px] mx-auto px-4 mb-6">
        <div className="bg-white border border-[#d5d9d9] p-6 rounded-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 rounded-full text-[#e77600]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Fast, Free Prime Delivery</h4>
              <p className="text-gray-500">Convenient delivery options on millions of items</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-full text-[#007185]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Safe & Secure Transactions</h4>
              <p className="text-gray-500">Industry-standard encryption and fraud protection</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Hassle-Free 30-Day Returns</h4>
              <p className="text-gray-500">Easy drop-offs at thousands of convenient locations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
