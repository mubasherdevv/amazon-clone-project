import React, { useState } from 'react';
import { 
  Star, 
  ChevronDown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Info
} from 'lucide-react';
import { ProductData, ProductVariant } from '../types/amazon';

interface ProductDetailsProps {
  product: ProductData;
  selectedVariant: ProductVariant;
  onSelectVariant: (variantId: string) => void;
  selectedConfigId: string;
  onSelectConfig: (configId: string) => void;
  onScrollToReviews: () => void;
  onScrollToQuestions: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  selectedVariant,
  onSelectVariant,
  selectedConfigId,
  onSelectConfig,
  onScrollToReviews,
  onScrollToQuestions
}) => {
  const [showRatingsFlyout, setShowRatingsFlyout] = useState(false);

  // Ratings percentage distribution
  const ratingDistribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 12 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 3 }
  ];

  return (
    <div className="flex flex-col text-[#0f1111] pr-0 lg:pr-4">
      {/* Brand Store Link */}
      <div className="flex items-center gap-2 mb-1">
        <a
          href={product.brandStoreUrl}
          className="text-[#007185] hover:text-[#c7511f] hover:underline text-xs font-semibold"
        >
          Visit the {product.brand} Store
        </a>
      </div>

      {/* Product Title */}
      <h1 className="text-xl md:text-2xl font-normal leading-snug tracking-tight text-[#0f1111] mb-2 font-sans">
        {product.title}
      </h1>

      {/* Rating & Q&A Row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs border-b border-gray-200 pb-2 mb-3">
        {/* Rating Stars with Flyout */}
        <div 
          className="relative inline-block"
          onMouseEnter={() => setShowRatingsFlyout(true)}
          onMouseLeave={() => setShowRatingsFlyout(false)}
        >
          <button 
            onClick={onScrollToReviews}
            className="flex items-center gap-1 hover:text-[#007185] cursor-pointer"
          >
            <span className="font-bold text-gray-900">{product.rating}</span>
            <div className="flex items-center text-[#de7921]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#de7921]'
                      : i < product.rating
                      ? 'fill-[#de7921]/60'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>

          {/* Interactive Rating Breakdown Flyout */}
          {showRatingsFlyout && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded shadow-xl p-4 z-40 text-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#de7921]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#de7921]" />
                  ))}
                </div>
                <span className="font-bold text-sm text-gray-900">{product.rating} out of 5</span>
              </div>
              <p className="text-gray-500 mb-3">{product.ratingsCount.toLocaleString()} global ratings</p>

              {/* Bar breakdown */}
              <div className="space-y-1.5 mb-3">
                {ratingDistribution.map((r) => (
                  <div 
                    key={r.stars} 
                    onClick={onScrollToReviews}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <span className="w-10 text-gray-600 group-hover:text-[#007185] group-hover:underline">
                      {r.stars} star
                    </span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                      <div 
                        className="h-full bg-[#ffa41c] rounded-full" 
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-gray-600 group-hover:text-[#007185]">
                      {r.pct}%
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onScrollToReviews}
                className="w-full text-center text-[#007185] hover:text-[#c7511f] hover:underline font-semibold pt-2 border-t border-gray-100 block"
              >
                See all customer reviews ›
              </button>
            </div>
          )}
        </div>

        <span className="text-gray-300">|</span>

        {/* Ratings Count Link */}
        <button
          onClick={onScrollToReviews}
          className="text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer"
        >
          {product.ratingsCount.toLocaleString()} ratings
        </button>

        <span className="text-gray-300">|</span>

        {/* Answered Questions */}
        <button
          onClick={onScrollToQuestions}
          className="text-[#007185] hover:text-[#c7511f] hover:underline cursor-pointer"
        >
          {product.answeredQuestionsCount.toLocaleString()} answered questions
        </button>
      </div>

      {/* Badges Row (Overall Pick + Social Proof) */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {product.badge && (
          <div className="bg-[#232f3e] text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
            <span>{product.badge}</span>
            <span className="text-gray-400 font-normal">for "noise canceling headphones"</span>
          </div>
        )}

        <div className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded">
          {product.boughtPastMonth}
        </div>
      </div>

      {/* Price Section */}
      <div className="border-b border-gray-200 pb-3 mb-3">
        <div className="flex items-baseline gap-2">
          {product.discountPercent > 0 && (
            <span className="text-2xl md:text-3xl font-light text-[#cc0c39]">
              -{product.discountPercent}%
            </span>
          )}
          <div className="flex items-start text-[#0f1111]">
            <span className="text-sm font-normal mt-0.5">$</span>
            <span className="text-3xl md:text-4xl font-semibold tracking-tight">
              {Math.floor(selectedVariant.price)}
            </span>
            <span className="text-sm font-normal mt-0.5">
              {(selectedVariant.price % 1).toFixed(2).substring(2)}
            </span>
          </div>
        </div>

        {/* Typical List Price */}
        {selectedVariant.listPrice > selectedVariant.price && (
          <div className="text-xs text-gray-500 mt-1">
            Typical price: <span className="line-through">${selectedVariant.listPrice.toFixed(2)}</span>
          </div>
        )}

        {/* Prime logo line & returns */}
        <div className="flex items-center gap-2 text-xs mt-2 text-[#007185]">
          <span className="bg-[#007185] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">prime</span>
          <span className="text-[#0f1111]">One-Day Free Delivery & </span>
          <span className="hover:underline cursor-pointer">FREE Returns</span>
        </div>
      </div>

      {/* Color Variant Selector */}
      <div className="mb-4">
        <div className="text-xs text-gray-700 mb-2">
          Color: <span className="font-bold text-black">{selectedVariant.name}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const isSelected = v.id === selectedVariant.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelectVariant(v.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs cursor-pointer transition ${
                  isSelected
                    ? 'border-[#e77600] ring-2 ring-[#e77600] bg-amber-50/30'
                    : 'border-gray-300 hover:border-gray-500 bg-white'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-gray-400 shrink-0"
                  style={{ backgroundColor: v.hexCode }}
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{v.name}</div>
                  <div className="text-[11px] text-gray-500">${v.price.toFixed(2)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Configuration / Bundle Selector */}
      {product.configurations.length > 1 && (
        <div className="mb-4">
          <div className="text-xs text-gray-700 mb-2">
            Configuration: <span className="font-bold text-black">
              {product.configurations.find(c => c.id === selectedConfigId)?.label}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.configurations.map((cfg) => {
              const isSelected = cfg.id === selectedConfigId;
              return (
                <button
                  key={cfg.id}
                  onClick={() => onSelectConfig(cfg.id)}
                  className={`px-3 py-1.5 rounded border text-xs cursor-pointer transition text-left ${
                    isSelected
                      ? 'border-[#e77600] ring-2 ring-[#e77600] bg-amber-50/30'
                      : 'border-gray-300 hover:border-gray-500 bg-white'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{cfg.label}</div>
                  <div className="text-[11px] text-gray-500">${cfg.price.toFixed(2)}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Key Specifications Grid */}
      <div className="border-t border-gray-200 pt-3 mb-4 text-xs">
        <h3 className="font-bold text-gray-900 mb-2">Key Specifications</h3>
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-gray-700">
          {Object.entries(product.specifications).slice(0, 6).map(([key, val]) => (
            <div key={key} className="flex flex-col py-0.5 border-b border-gray-100">
              <dt className="text-gray-500 font-medium">{key}</dt>
              <dd className="font-semibold text-gray-900 truncate">{val}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* "About this item" Bullet Points */}
      <div className="border-t border-gray-200 pt-3 text-xs">
        <h3 className="font-bold text-gray-900 text-sm mb-2">About this item</h3>
        <ul className="space-y-2 list-disc list-outside pl-4 text-gray-800 leading-relaxed">
          {product.features.map((feature, idx) => (
            <li key={idx}>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
