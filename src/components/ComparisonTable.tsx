import React from 'react';
import { Star } from 'lucide-react';
import { HeadphoneGraphic, AirPodsMaxGraphic } from '../utils/productImages';
import { REAL_PRODUCT_IMAGES } from '../utils/realImages';
import { ProductImage } from './ProductImage';

interface ComparisonTableProps {
  onSelectProduct: (productId: string) => void;
  onAddToCartDirect: (item: { title: string; price: number; id: string }) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  onSelectProduct,
  onAddToCartDirect
}) => {
  const comparisonItems = [
    {
      id: 'sony-wh1000xm5',
      name: 'Sony WH-1000XM5 (This item)',
      rating: 4.6,
      ratingsCount: '28,492',
      price: 298.00,
      anc: 'Auto NC Optimizer (8 Mics + 2 Processors)',
      battery: '30 hours (ANC on)',
      weight: '8.8 oz (250g)',
      multipoint: 'Yes (2 devices)',
      fastCharge: '3 min = 3 hrs',
      case: 'Collapsible magnetic case',
      current: true,
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonyFront}
          alt="Sony WH-1000XM5"
          className="w-20 h-20 mx-auto overflow-hidden"
          fallback={<HeadphoneGraphic color="black" view="front" className="w-20 h-20 object-contain mx-auto" />}
        />
      )
    },
    {
      id: 'apple-airpods-max',
      name: 'Apple AirPods Max',
      rating: 4.6,
      ratingsCount: '19,830',
      price: 499.00,
      anc: 'Active Noise Cancellation + Transparency',
      battery: '20 hours (ANC on)',
      weight: '13.6 oz (384g)',
      multipoint: 'Yes (Apple iCloud devices)',
      fastCharge: '5 min = 1.5 hrs',
      case: 'Smart Case',
      current: false,
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.airpodsMax}
          alt="Apple AirPods Max"
          className="w-20 h-20 mx-auto overflow-hidden"
          fallback={<AirPodsMaxGraphic className="w-20 h-20 object-contain mx-auto" />}
        />
      )
    },
    {
      id: 'bose-qc-ultra',
      name: 'Bose QuietComfort Ultra',
      rating: 4.5,
      ratingsCount: '11,200',
      price: 379.00,
      anc: 'CustomTune Audio + Immersive Mode',
      battery: '24 hours (ANC on)',
      weight: '9.0 oz (254g)',
      multipoint: 'Yes (2 devices)',
      fastCharge: '15 min = 2 hrs',
      case: 'Hard zippered case',
      current: false,
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonySide}
          alt="Bose QC Ultra"
          className="w-20 h-20 mx-auto overflow-hidden"
          fallback={<HeadphoneGraphic color="blue" view="front" className="w-20 h-20 object-contain mx-auto" />}
        />
      )
    },
    {
      id: 'sennheiser-m4',
      name: 'Sennheiser Momentum 4',
      rating: 4.4,
      ratingsCount: '8,410',
      price: 269.95,
      anc: 'Adaptive Hybrid Noise Cancellation',
      battery: '60 hours (ANC on)',
      weight: '10.3 oz (293g)',
      multipoint: 'Yes (2 devices)',
      fastCharge: '10 min = 6 hrs',
      case: 'Slim hard case',
      current: false,
      graphic: (
        <ProductImage
          src={REAL_PRODUCT_IMAGES.sonySurface}
          alt="Sennheiser Momentum 4"
          className="w-20 h-20 mx-auto overflow-hidden"
          fallback={<HeadphoneGraphic color="silver" view="front" className="w-20 h-20 object-contain mx-auto" />}
        />
      )
    }
  ];

  return (
    <div className="border-t border-b border-gray-200 py-6 my-6 overflow-x-auto">
      <h2 className="text-lg font-bold text-[#0f1111] mb-4">
        Compare with similar items
      </h2>

      <table className="w-full text-xs text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="p-3 w-40 text-gray-500 font-medium bg-gray-50">Item</th>
            {comparisonItems.map(item => (
              <th key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/50 font-bold' : ''}`}>
                <div className="mb-2 h-24 flex items-center justify-center">
                  {item.graphic}
                </div>
                <div className="font-semibold text-gray-900 line-clamp-2 h-8">{item.name}</div>
                <div className="text-sm font-bold text-[#b12704] mt-1">${item.price.toFixed(2)}</div>
                <button
                  onClick={() => {
                    if (item.id === 'apple-airpods-max') {
                      onSelectProduct('apple-airpods-max');
                    } else {
                      onAddToCartDirect({ title: item.name, price: item.price, id: item.id });
                    }
                  }}
                  className={`mt-2 w-full py-1 px-3 rounded-full text-xs font-semibold cursor-pointer transition ${
                    item.current
                      ? 'bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200]'
                      : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                  }`}
                >
                  {item.current ? 'Add to Cart' : item.id === 'apple-airpods-max' ? 'View Item' : 'Add to Cart'}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="p-3 font-semibold text-gray-700 bg-gray-50">Customer Rating</td>
            {comparisonItems.map(item => (
              <td key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/30' : ''}`}>
                <div className="flex items-center justify-center gap-1 text-[#de7921]">
                  <Star className="w-3.5 h-3.5 fill-[#de7921]" />
                  <span className="font-bold text-gray-900">{item.rating}</span>
                  <span className="text-gray-500">({item.ratingsCount})</span>
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-700 bg-gray-50">Noise Cancellation</td>
            {comparisonItems.map(item => (
              <td key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/30 font-medium' : ''}`}>
                {item.anc}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-700 bg-gray-50">Battery Life</td>
            {comparisonItems.map(item => (
              <td key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/30 font-medium' : ''}`}>
                {item.battery}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-700 bg-gray-50">Weight</td>
            {comparisonItems.map(item => (
              <td key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/30' : ''}`}>
                {item.weight}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-700 bg-gray-50">Multipoint Pairing</td>
            {comparisonItems.map(item => (
              <td key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/30' : ''}`}>
                {item.multipoint}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-700 bg-gray-50">Fast Charging</td>
            {comparisonItems.map(item => (
              <td key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/30' : ''}`}>
                {item.fastCharge}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 font-semibold text-gray-700 bg-gray-50">Carrying Case</td>
            {comparisonItems.map(item => (
              <td key={item.id} className={`p-3 text-center ${item.current ? 'bg-amber-50/30' : ''}`}>
                {item.case}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
