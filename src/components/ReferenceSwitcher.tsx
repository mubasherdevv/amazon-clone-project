import React from 'react';
import { Home, Layers, Sparkles } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/mockProducts';

interface ReferenceSwitcherProps {
  activeProductId: string;
  onSelectProduct: (productId: string) => void;
  currentView?: 'home' | 'product';
  onGoHome?: () => void;
}

export const ReferenceSwitcher: React.FC<ReferenceSwitcherProps> = ({
  activeProductId,
  onSelectProduct,
  currentView = 'product',
  onGoHome
}) => {
  return (
    <div className="bg-[#f0f2f2] border-b border-[#d5d9d9] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="font-bold text-[#0f1111] flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#007185]" />
          Amazon.com Experience:
        </span>
        <span className="text-gray-600 hidden sm:inline">
          Full interactive Homepage + Live Reference Product Detail Page (Sony WH-1000XM5).
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        {onGoHome && (
          <button
            onClick={onGoHome}
            className={`px-3 py-1 rounded text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              currentView === 'home'
                ? 'bg-[#131921] text-white shadow-sm ring-1 ring-[#131921]'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#febd69]" />
            <span>Amazon Homepage</span>
          </button>
        )}

        <span className="text-gray-400">|</span>
        <span className="text-gray-500 font-medium hidden md:inline">Live PDP:</span>

        {ALL_PRODUCTS.map((prod) => {
          const isActive = currentView === 'product' && prod.id === activeProductId;
          return (
            <button
              key={prod.id}
              onClick={() => onSelectProduct(prod.id)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-[#131921] text-white shadow-sm ring-1 ring-[#131921]'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {isActive && <Sparkles className="w-3 h-3 text-[#febd69]" />}
              <span>{prod.brand} {prod.id === 'sony-wh1000xm5' ? 'WH-1000XM5 (Live)' : prod.id === 'apple-airpods-max' ? 'AirPods Max' : 'Kindle'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

