import React from 'react';
import { Sparkles, User, Package, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { HOMEPAGE_CARDS, HomeCardItem } from '../data/homeData';
import { HeadphoneGraphic, AirPodsMaxGraphic, KindleGraphic, StandAccessoryGraphic } from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';

interface HomeCardGridProps {
  onSelectProduct: (productId: string) => void;
}

export const HomeCardGrid: React.FC<HomeCardGridProps> = ({ onSelectProduct }) => {
  const renderItemGraphic = (type: string, color?: 'black' | 'silver' | 'blue' | 'pink') => {
    if (type === 'airpods') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.airpodsMax}
          alt="AirPods Max"
          fallback={<AirPodsMaxGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (type === 'kindle') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.kindle}
          alt="Kindle"
          fallback={<KindleGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (type === 'case') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.travelCase}
          alt="Travel Case"
          fallback={<HeadphoneGraphic color="black" view="case" className="w-full h-full object-contain" />}
        />
      );
    }
    if (type === 'stand') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.deskStand}
          alt="Headphone Stand"
          fallback={<StandAccessoryGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    return (
      <ProductImage
        src={REAL_PRODUCT_IMAGES.sonyFront}
        alt="Sony WH-1000XM"
        fallback={<HeadphoneGraphic color={color || 'black'} view="front" className="w-full h-full object-contain" />}
      />
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 -mt-24 md:-mt-36 relative z-20 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {HOMEPAGE_CARDS.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-white rounded-xs p-5 shadow-sm border border-[#d5d9d9] flex flex-col justify-between hover:shadow-md transition text-[#0f1111]"
            >
              <div>
                <h3 className="font-bold text-lg leading-snug mb-3 text-[#0f1111]">
                  {card.title}
                </h3>

                {/* 1. Single Item Spotlight Card */}
                {card.type === 'single' && card.singleItem && (
                  <div
                    onClick={() => onSelectProduct(card.singleItem!.productId)}
                    className="cursor-pointer group"
                  >
                    <div className="w-full aspect-square max-h-56 bg-gray-50 rounded border border-gray-100 p-4 mb-3 flex items-center justify-center overflow-hidden">
                      <div className="w-44 h-44 group-hover:scale-105 transition-transform duration-200">
                        {renderItemGraphic(card.singleItem.imageType, card.singleItem.color)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                        -{card.singleItem.discountPercent}% off
                      </span>
                      <span className="text-[11px] text-[#cc0c39] font-bold">Deal of the Day</span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-xl font-bold">${card.singleItem.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 line-through">
                        ${card.singleItem.listPrice.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2">
                      {card.singleItem.description}
                    </p>
                  </div>
                )}

                {/* 2. 4-Quadrant Item Grid */}
                {card.type === 'quad' && card.quadItems && (
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    {card.quadItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectProduct(item.productId)}
                        className="cursor-pointer group flex flex-col"
                      >
                        <div className="w-full aspect-square bg-gray-50 rounded border border-gray-100 p-2 flex items-center justify-center mb-1 group-hover:bg-gray-100 transition">
                          <div className="w-16 h-16 group-hover:scale-105 transition-transform">
                            {renderItemGraphic(item.imageType, item.color)}
                          </div>
                        </div>
                        <span className="text-xs text-gray-700 font-medium group-hover:text-[#007185] truncate">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Account / Prime Card */}
                {card.type === 'account' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-amber-50/60 rounded border border-amber-200">
                      <div className="w-10 h-10 rounded-full bg-[#131921] text-white flex items-center justify-center font-bold text-sm">
                        AP
                      </div>
                      <div className="text-xs">
                        <div className="font-bold text-gray-900">Alex Parker</div>
                        <div className="text-[#007185] font-semibold">Prime Member since 2018</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-gray-700">
                      <div 
                        onClick={() => onSelectProduct('sony-wh1000xm5')}
                        className="p-2.5 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#e77600]" />
                          <span>Recently viewed: Sony XM5</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>

                      <div 
                        onClick={() => onSelectProduct('apple-airpods-max')}
                        className="p-2.5 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer flex items-center justify-between border border-gray-200"
                      >
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-emerald-600" />
                          <span>Track Your Orders (1 In-Transit)</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Link */}
              <button
                onClick={() => onSelectProduct(card.targetProductId || 'sony-wh1000xm5')}
                className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-semibold mt-3 text-left cursor-pointer"
              >
                {card.linkText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
