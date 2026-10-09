import React from 'react';
import { ProductData } from '../types/amazon';

interface TechnicalDetailsProps {
  product: ProductData;
}

export const TechnicalDetails: React.FC<TechnicalDetailsProps> = ({ product }) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <h2 className="text-xl font-bold text-[#0f1111] mb-4">
        Technical Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
        {Object.entries(product.technicalDetails).map(([key, val], idx) => (
          <div 
            key={key} 
            className={`flex py-2 px-3 border-b border-gray-100 ${
              idx % 2 === 0 ? 'bg-gray-50/70' : 'bg-white'
            }`}
          >
            <span className="w-1/2 font-semibold text-gray-700">{key}</span>
            <span className="w-1/2 text-gray-900 font-normal">{val}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded text-xs text-gray-600 flex items-center justify-between">
        <span><strong>Warranty:</strong> 1-Year Limited Manufacturer Warranty included</span>
        <button className="text-[#007185] hover:underline font-semibold cursor-pointer">
          Download PDF User Manual
        </button>
      </div>
    </div>
  );
};
