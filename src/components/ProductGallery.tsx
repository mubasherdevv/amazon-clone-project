import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  Rotate3d, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  Volume2,
  Camera
} from 'lucide-react';
import { 
  HeadphoneGraphic, 
  AirPodsMaxGraphic, 
  KindleGraphic 
} from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';

interface ProductGalleryProps {
  productId: string;
  selectedColorName: string;
}

type GalleryView = 'front' | 'side' | 'case' | 'lifestyle' | 'driver' | '360';

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  productId,
  selectedColorName
}) => {
  const [activeView, setActiveView] = useState<GalleryView>('front');
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const isDragging360 = useRef(false);
  const startDragX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map color name to graphic prop
  const normalizedColor = selectedColorName.toLowerCase().includes('silver') 
    ? 'silver'
    : selectedColorName.toLowerCase().includes('blue')
    ? 'blue'
    : selectedColorName.toLowerCase().includes('pink')
    ? 'pink'
    : 'black';

  const thumbnails: { view: GalleryView; label: string }[] = [
    { view: 'front', label: 'Main Packshot (Real Photo)' },
    { view: 'side', label: 'Earcups & Profile (Real Photo)' },
    { view: 'case', label: 'Travel Case (Real Photo)' },
    { view: 'lifestyle', label: 'Folded & Swivel (Real Photo)' },
    { view: 'driver', label: 'Precision Detail (Real Photo)' },
    { view: '360', label: '360° Interactive View' }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeView === '360') return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomCoords({ x, y });
  };

  // 360 degree drag handler
  const handleMouseDown360 = (e: React.MouseEvent) => {
    if (activeView !== '360') return;
    isDragging360.current = true;
    startDragX.current = e.clientX;
  };

  const handleMouseMove360 = (e: React.MouseEvent) => {
    if (!isDragging360.current || activeView !== '360') return;
    const deltaX = e.clientX - startDragX.current;
    setRotationAngle(prev => (prev + deltaX * 0.8) % 360);
    startDragX.current = e.clientX;
  };

  const handleMouseUp360 = () => {
    isDragging360.current = false;
  };

  const renderProductGraphic = (view: GalleryView, isModal = false) => {
    if (productId === 'apple-airpods-max') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.airpodsMax}
          alt="Apple AirPods Max Genuine Photography"
          fallback={<AirPodsMaxGraphic className="w-full h-full object-contain" />}
        />
      );
    }
    if (productId === 'kindle-paperwhite-16gb') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.kindle}
          alt="Amazon Kindle Genuine Photography"
          fallback={<KindleGraphic className="w-full h-full object-contain" />}
        />
      );
    }

    if (view === '360') {
      return (
        <div 
          className="relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown360}
          onMouseMove={handleMouseMove360}
          onMouseUp={handleMouseUp360}
          onMouseLeave={handleMouseUp360}
        >
          <div 
            className="w-full h-full transition-transform duration-75 flex items-center justify-center"
            style={{ transform: `rotateY(${rotationAngle}deg)` }}
          >
            <ProductImage
              src={REAL_PRODUCT_IMAGES.sonyFront}
              alt="Sony WH-1000XM 360 view"
              fallback={<HeadphoneGraphic color={normalizedColor} view="front" className="w-full h-full object-contain" />}
            />
          </div>
          <div className="absolute bottom-4 bg-black/75 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow pointer-events-none">
            <Rotate3d className="w-3.5 h-3.5 animate-spin" />
            <span>Drag horizontally to rotate 360°</span>
          </div>
        </div>
      );
    }

    if (view === 'front') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonyFront}
          alt="Sony WH-1000XM Front Packshot"
          fallback={<HeadphoneGraphic color={normalizedColor} view="front" className="w-full h-full object-contain" />}
        />
      );
    }

    if (view === 'side') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonySide}
          alt="Sony WH-1000XM Side Cushion & Headband"
          fallback={<HeadphoneGraphic color={normalizedColor} view="side" className="w-full h-full object-contain" />}
        />
      );
    }

    if (view === 'case') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.travelCase}
          alt="Sony WH-1000XM Travel Carrying Case"
          fallback={<HeadphoneGraphic color={normalizedColor} view="case" className="w-full h-full object-contain" />}
        />
      );
    }

    if (view === 'lifestyle') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonyFolded}
          alt="Sony WH-1000XM Folded & Swivel View"
          fallback={<HeadphoneGraphic color={normalizedColor} view="lifestyle" className="w-full h-full object-contain" />}
        />
      );
    }

    if (view === 'driver') {
      return (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonyDetail}
          alt="Sony WH-1000XM Driver & Earcup Detail"
          fallback={<HeadphoneGraphic color={normalizedColor} view="driver" className="w-full h-full object-contain" />}
        />
      );
    }

    return (
      <HeadphoneGraphic 
        color={normalizedColor} 
        view="front" 
        className="w-full h-full object-contain" 
      />
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 relative select-none">
      {/* Left Thumbnail Track */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0">
        {thumbnails.map((t) => {
          const isSelected = activeView === t.view;
          return (
            <button
              key={t.view}
              onMouseEnter={() => setActiveView(t.view)}
              onClick={() => setActiveView(t.view)}
              className={`w-12 h-12 md:w-14 md:h-14 p-1 rounded border transition cursor-pointer flex items-center justify-center bg-white ${
                isSelected
                  ? 'border-[#e77600] ring-1 ring-[#e77600] shadow-sm'
                  : 'border-[#d5d9d9] hover:border-gray-500'
              }`}
              title={t.label}
            >
              {t.view === '360' ? (
                <div className="flex flex-col items-center justify-center text-[9px] text-[#007185] font-bold leading-tight">
                  <Rotate3d className="w-4 h-4 text-[#e77600]" />
                  <span>360°</span>
                </div>
              ) : (
                <div className="w-full h-full pointer-events-none">
                  {renderProductGraphic(t.view)}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Large Stage */}
      <div className="flex-1 order-1 md:order-2">
        <div
          ref={containerRef}
          onMouseEnter={() => activeView !== '360' && setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => activeView !== '360' && setIsLightBoxOpen(true)}
          className="relative w-full aspect-square max-h-[480px] bg-white rounded border border-[#e7e7e7] flex items-center justify-center p-4 cursor-crosshair overflow-hidden group shadow-xs"
        >
          {/* Main Visual */}
          <div className="w-full h-full flex items-center justify-center">
            {renderProductGraphic(activeView)}
          </div>

          {/* Interactive Zoom Lens Rect Box */}
          {isZooming && activeView !== '360' && (
            <div
              className="absolute pointer-events-none border border-[#e77600] bg-[#febd69]/20"
              style={{
                width: '140px',
                height: '140px',
                top: `calc(${zoomCoords.y}% - 70px)`,
                left: `calc(${zoomCoords.x}% - 70px)`
              }}
            />
          )}

          {/* Full Screen Expand Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightBoxOpen(true);
            }}
            className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow border border-gray-200 opacity-80 hover:opacity-100 transition"
            title="Click to expand view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Badge indicator on image */}
          <div className="absolute top-3 left-3 bg-[#131921]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
            SONY 1000X
          </div>
        </div>

        {/* Amazon "Roll over image to zoom in" footer caption */}
        <div className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center gap-1.5">
          <ZoomIn className="w-3.5 h-3.5 text-gray-400" />
          <span>Roll over image to zoom in · Click to open expanded view</span>
        </div>
      </div>

      {/* Floating High-Resolution Desktop Zoom Window (Classic Amazon Experience) */}
      {isZooming && activeView !== '360' && (
        <div 
          className="hidden xl:block absolute left-[102%] top-0 w-[480px] h-[480px] bg-white border border-[#d5d9d9] shadow-2xl z-50 overflow-hidden rounded pointer-events-none"
        >
          <div
            className="w-[1000px] h-[1000px] absolute"
            style={{
              top: `-${zoomCoords.y * 5}px`,
              left: `-${zoomCoords.x * 5}px`
            }}
          >
            {renderProductGraphic(activeView)}
          </div>
        </div>
      )}

      {/* Full Screen High-Res Lightbox Modal */}
      {isLightBoxOpen && (
        <div className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-sm text-[#0f1111]">
                Sony WH-1000XM5 ({selectedColorName}) — Image Gallery
              </h3>
              <button
                onClick={() => setIsLightBoxOpen(false)}
                className="p-1 text-gray-500 hover:text-black rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-8 flex items-center justify-center max-h-[600px] overflow-hidden">
              <div className="w-[450px] h-[450px]">
                {renderProductGraphic(activeView, true)}
              </div>
            </div>

            {/* Modal Footer Thumbnails */}
            <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center justify-center gap-3">
              {thumbnails.map(t => (
                <button
                  key={t.view}
                  onClick={() => setActiveView(t.view)}
                  className={`w-14 h-14 p-1 rounded border bg-white cursor-pointer ${
                    activeView === t.view ? 'border-[#e77600] ring-2 ring-[#e77600]' : 'border-gray-300'
                  }`}
                >
                  <div className="w-full h-full pointer-events-none">
                    {renderProductGraphic(t.view)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
