import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: { city: string; zip: string };
  onUpdateLocation: (location: { city: string; zip: string }) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onUpdateLocation
}) => {
  const [zipInput, setZipInput] = useState(currentLocation.zip);

  if (!isOpen) return null;

  const presets = [
    { city: 'Seattle', zip: '98101' },
    { city: 'New York', zip: '10001' },
    { city: 'San Francisco', zip: '94102' },
    { city: 'Austin', zip: '73301' },
    { city: 'Chicago', zip: '60601' }
  ];

  const handleApplyZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;
    const match = presets.find(p => p.zip === zipInput.trim());
    const city = match ? match.city : 'Metro Area';
    onUpdateLocation({ city, zip: zipInput.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-xs text-[#0f1111]">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#007185]" />
            <span>Choose your delivery location</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Delivery options and delivery speeds may vary for different locations.
        </p>

        {/* Enter US Zip code */}
        <form onSubmit={handleApplyZip} className="mb-4">
          <label className="block font-bold text-gray-700 mb-1">Enter a US ZIP Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={5}
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              placeholder="e.g. 98101"
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#e77600]"
            />
            <button
              type="submit"
              className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold px-4 py-1.5 rounded-full border border-[#fcd200] cursor-pointer"
            >
              Apply
            </button>
          </div>
        </form>

        <div className="border-t border-gray-200 pt-3">
          <div className="text-[11px] font-bold text-gray-500 uppercase mb-2">Or select a city</div>
          <div className="space-y-1">
            {presets.map(p => (
              <button
                key={p.zip}
                onClick={() => {
                  onUpdateLocation(p);
                  onClose();
                }}
                className={`w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 flex justify-between items-center ${
                  currentLocation.zip === p.zip ? 'font-bold text-[#007185] bg-blue-50/50' : 'text-gray-700'
                }`}
              >
                <span>{p.city}, WA {p.zip}</span>
                {currentLocation.zip === p.zip && <span className="text-[10px] text-[#007600]">Current</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
