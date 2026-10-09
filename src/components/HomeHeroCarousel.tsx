import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { HERO_SLIDES, HomeHeroSlide } from '../data/homeData';
import { HeadphoneGraphic, AirPodsMaxGraphic, KindleGraphic } from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';

interface HomeHeroCarouselProps {
  onSelectProduct: (productId: string) => void;
}

export const HomeHeroCarousel: React.FC<HomeHeroCarouselProps> = ({ onSelectProduct }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[currentIdx];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const renderGraphic = (slide: HomeHeroSlide) => {
    if (slide.graphicType === 'airpods') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.airpodsMax}
          alt={slide.title}
          imageClassName="w-full h-full object-contain filter drop-shadow-2xl rounded-lg"
          fallback={<AirPodsMaxGraphic className="w-full h-full object-contain filter drop-shadow-2xl" />}
        />
      );
    }
    if (slide.graphicType === 'kindle') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.kindle}
          alt={slide.title}
          imageClassName="w-full h-full object-contain filter drop-shadow-2xl rounded-lg"
          fallback={<KindleGraphic className="w-full h-full object-contain filter drop-shadow-2xl" />}
        />
      );
    }
    return (
      <ProductImage
        src={REAL_PRODUCT_IMAGES.sonyFront}
        alt={slide.title}
        imageClassName="w-full h-full object-contain filter drop-shadow-2xl rounded-lg"
        fallback={
          <HeadphoneGraphic
            color={slide.color}
            view="front"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        }
      />
    );
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Background Hero Banner Container */}
      <div
        onClick={() => onSelectProduct(currentSlide.targetProductId)}
        className={`w-full min-h-[380px] md:min-h-[440px] lg:min-h-[500px] bg-gradient-to-r ${currentSlide.bgGradient} text-white cursor-pointer transition-all duration-700 relative flex items-center px-6 md:px-16 pt-8 pb-36`}
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-[#febd69] text-black text-xs font-bold px-3 py-1 rounded shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide.badge}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
              {currentSlide.title}
            </h1>

            <p className="text-gray-200 text-sm md:text-base max-w-xl leading-relaxed">
              {currentSlide.subtitle}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(currentSlide.targetProductId);
                }}
                className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-black font-bold text-xs md:text-sm py-2.5 px-6 rounded-full shadow-md border border-[#fcd200] cursor-pointer transition inline-flex items-center gap-2"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Product Graphic Column */}
          <div className="md:col-span-5 flex justify-center items-center h-64 md:h-80">
            <div className="w-64 h-64 md:w-80 md:h-80 transform hover:scale-105 transition-transform duration-300">
              {renderGraphic(currentSlide)}
            </div>
          </div>
        </div>

        {/* Amazon's iconic bottom gradient overlay that smoothly fades into the #eaeded page background */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#eaeded] via-[#eaeded]/80 to-transparent pointer-events-none" />
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/3 -translate-y-1/2 z-20 p-2 md:p-3 rounded bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs cursor-pointer transition focus:outline-none ring-1 ring-white/30"
        title="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/3 -translate-y-1/2 z-20 p-2 md:p-3 rounded bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs cursor-pointer transition focus:outline-none ring-1 ring-white/30"
        title="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute top-4 right-6 z-20 flex items-center gap-1.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx(idx);
            }}
            className={`h-2 rounded-full transition-all ${
              currentIdx === idx ? 'w-6 bg-[#febd69]' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
