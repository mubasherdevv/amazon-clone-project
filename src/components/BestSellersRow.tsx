import React from 'react';
import { Star, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { HeadphoneGraphic, AirPodsMaxGraphic, KindleGraphic, StandAccessoryGraphic } from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';

interface BestSellersRowProps {
  onSelectProduct: (productId: string) => void;
  onAddToCartDirect: (item: { title: string; price: number; id: string; imageType: string; color?: string }) => void;
}

export const BestSellersRow: React.FC<BestSellersRowProps> = ({
  onSelectProduct,
  onAddToCartDirect
}) => {
  const items = [
    {
      rank: 1,
      id: 'sony-wh1000xm5',
      title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones (Black)',
      price: 298.00,
      rating: 4.6,
      ratingsCount: '28,492',
      badge: '#1 Best Seller in Over-Ear Headphones',
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonyFront}
          alt="Sony WH-1000XM5"
          className="w-28 h-28 object-contain"
          fallback={<HeadphoneGraphic color="black" view="front" className="w-28 h-28 object-contain" />}
        />
      ),
      imageType: 'headphone',
      color: 'black'
    },
    {
      rank: 2,
      id: 'apple-airpods-max',
      title: 'Apple AirPods Max Wireless Over-Ear Headphones (Space Gray)',
      price: 499.00,
      rating: 4.6,
      ratingsCount: '19,830',
      badge: '#2 Best Seller in Over-Ear Headphones',
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.airpodsMax}
          alt="Apple AirPods Max"
          className="w-28 h-28 object-contain"
          fallback={<AirPodsMaxGraphic className="w-28 h-28 object-contain" />}
        />
      ),
      imageType: 'airpods',
      color: 'silver'
    },
    {
      rank: 3,
      id: 'kindle-paperwhite-16gb',
      title: 'Amazon Kindle Paperwhite (16 GB) – 6.8" Warm Light Display',
      price: 149.99,
      rating: 4.7,
      ratingsCount: '65,420',
      badge: '#1 Best Seller in E-Readers',
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.kindle}
          alt="Amazon Kindle Paperwhite"
          className="w-28 h-28 object-contain"
          fallback={<KindleGraphic className="w-28 h-28 object-contain" />}
        />
      ),
      imageType: 'kindle'
    },
    {
      rank: 4,
      id: 'sony-wh1000xm5',
      title: 'Sony WH-1000XM5 in Platinum Silver Finish',
      price: 298.00,
      rating: 4.6,
      ratingsCount: '28,492',
      badge: '#1 in Platinum Audio',
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonySide}
          alt="Sony WH-1000XM5 Platinum Silver"
          className="w-28 h-28 object-contain"
          fallback={<HeadphoneGraphic color="silver" view="front" className="w-28 h-28 object-contain" />}
        />
      ),
      imageType: 'headphone',
      color: 'silver'
    }
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 mb-8">
      <div className="bg-white p-5 rounded-xs border border-[#d5d9d9] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#c7511f]" />
            <h2 className="font-bold text-xl text-[#0f1111]">
              Best Sellers in Consumer Electronics & Tech
            </h2>
          </div>
          <button
            onClick={() => onSelectProduct('sony-wh1000xm5')}
            className="text-xs text-[#007185] hover:text-[#c7511f] hover:underline font-semibold"
          >
            See full best sellers list ›
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.rank}
              className="border border-gray-200 rounded p-4 flex flex-col justify-between hover:shadow-md transition relative group bg-white"
            >
              {/* Rank Badge */}
              <div className="absolute top-2 left-2 bg-[#e77600] text-white font-extrabold text-xs px-2 py-0.5 rounded shadow-xs">
                #{item.rank}
              </div>

              <div
                onClick={() => onSelectProduct(item.id)}
                className="cursor-pointer"
              >
                <div className="h-40 flex items-center justify-center p-2 mb-2 bg-gray-50 rounded">
                  <div className="group-hover:scale-105 transition-transform duration-200">
                    {item.graphic}
                  </div>
                </div>

                <div className="text-[10px] text-[#007185] font-bold uppercase mb-1">
                  {item.badge}
                </div>

                <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug mb-1 hover:text-[#007185]">
                  {item.title}
                </h4>

                <div className="flex items-center gap-1 text-[11px] text-[#de7921] mb-2">
                  <Star className="w-3 h-3 fill-[#de7921]" />
                  <span className="font-bold text-gray-900">{item.rating}</span>
                  <span className="text-gray-400">({item.ratingsCount})</span>
                </div>

                <div className="text-base font-bold text-[#b12704] mb-3">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onSelectProduct(item.id)}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-800 text-xs font-semibold py-1.5 rounded-full border border-gray-300 cursor-pointer transition text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => onAddToCartDirect({
                    id: `${item.id}-${item.rank}`,
                    title: item.title,
                    price: item.price,
                    imageType: item.imageType,
                    color: item.color
                  })}
                  className="flex-1 bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-semibold py-1.5 rounded-full border border-[#fcd200] cursor-pointer transition text-center"
                >
                  Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
