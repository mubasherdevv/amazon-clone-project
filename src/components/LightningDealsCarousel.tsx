import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap, Star, Clock } from 'lucide-react';
import { LIGHTNING_DEALS, LightningDealItem } from '../data/homeData';
import { HeadphoneGraphic, AirPodsMaxGraphic, KindleGraphic, StandAccessoryGraphic } from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';

interface LightningDealsCarouselProps {
  onSelectProduct: (productId: string) => void;
  onAddToCartDirect: (item: { title: string; price: number; id: string; imageType: string; color?: string }) => void;
}

export const LightningDealsCarousel: React.FC<LightningDealsCarouselProps> = ({
  onSelectProduct,
  onAddToCartDirect
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const renderGraphic = (deal: LightningDealItem) => {
    if (deal.imageType === 'airpods') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.airpodsMax}
          alt={deal.title}
          fallback={<AirPodsMaxGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (deal.imageType === 'kindle') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.kindle}
          alt={deal.title}
          fallback={<KindleGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (deal.imageType === 'case') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.travelCase}
          alt={deal.title}
          fallback={<HeadphoneGraphic color="black" view="case" className="w-full h-full object-contain" />}
        />
      );
    }
    if (deal.imageType === 'stand') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.deskStand}
          alt={deal.title}
          fallback={<StandAccessoryGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    return (
      <ProductImage
        src={REAL_PRODUCT_IMAGES.sonyFront}
        alt={deal.title}
        fallback={<HeadphoneGraphic color={deal.color || 'black'} view="front" className="w-full h-full object-contain" />}
      />
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 mb-8">
      <div className="bg-white p-5 rounded-xs border border-[#d5d9d9] shadow-xs relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#e77600] fill-[#e77600]" />
            <h2 className="font-bold text-xl text-[#0f1111]">
              Today's Lightning Deals & Featured Savings
            </h2>
          </div>
          <button
            onClick={() => onSelectProduct('sony-wh1000xm5')}
            className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-semibold"
          >
            See all deals ›
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-16 bg-white/95 hover:bg-white border border-gray-300 shadow-md rounded flex items-center justify-center cursor-pointer transition focus:outline-none"
            title="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Items Horizontal Scroll Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
          >
            {LIGHTNING_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="w-56 shrink-0 flex flex-col justify-between p-3 border border-gray-200 rounded hover:shadow-md transition bg-white"
              >
                <div 
                  onClick={() => onSelectProduct(deal.productId)}
                  className="cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-full h-40 bg-gray-50 rounded p-2 flex items-center justify-center mb-2 overflow-hidden">
                    <div className="w-32 h-32 hover:scale-105 transition-transform duration-200">
                      {renderGraphic(deal)}
                    </div>
                  </div>

                  {/* Deal Badge */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-[#cc0c39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      -{deal.discountPercent}% off
                    </span>
                    <span className="text-[10px] text-[#cc0c39] font-bold">Limited time</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-1 text-sm font-bold text-[#0f1111]">
                    <span>${deal.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 line-through font-normal">
                      ${deal.listPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs text-gray-800 line-clamp-2 leading-snug mb-2 font-medium hover:text-[#007185]">
                    {deal.title}
                  </h4>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 text-[11px] text-[#de7921] mb-2">
                    <Star className="w-3 h-3 fill-[#de7921]" />
                    <span className="font-bold text-gray-900">{deal.rating}</span>
                    <span className="text-gray-400">({deal.ratingsCount.toLocaleString()})</span>
                  </div>

                  {/* Claimed progress bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                      <span>{deal.claimedPercent}% claimed</span>
                      <span className="flex items-center gap-0.5 text-gray-400">
                        <Clock className="w-2.5 h-2.5" />
                        {deal.timeLeft}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e77600] rounded-full"
                        style={{ width: `${deal.claimedPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCartDirect({
                    id: deal.id,
                    title: deal.title,
                    price: deal.price,
                    imageType: deal.imageType,
                    color: deal.color
                  })}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-black text-xs font-semibold py-1.5 rounded-full border border-[#fcd200] cursor-pointer transition shadow-2xs"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-16 bg-white/95 hover:bg-white border border-gray-300 shadow-md rounded flex items-center justify-center cursor-pointer transition focus:outline-none"
            title="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};
