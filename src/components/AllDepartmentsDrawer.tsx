import React from 'react';
import { X, UserCircle, ChevronRight, Tv, Music, Smartphone, Laptop, Home, Gift, Headphones, HelpCircle } from 'lucide-react';

interface AllDepartmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDepartment: (dept: string) => void;
}

export const AllDepartmentsDrawer: React.FC<AllDepartmentsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectDepartment
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 flex">
      {/* Drawer */}
      <div className="w-80 md:w-96 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200 text-[#0f1111]">
        {/* Amazon User Top Header */}
        <div className="bg-[#232f3e] text-white px-7 py-3.5 flex items-center gap-3">
          <UserCircle className="w-7 h-7 text-gray-200" />
          <span className="font-bold text-lg">Hello, Alex</span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-3 text-sm divide-y divide-gray-200">
          {/* Digital Content & Devices */}
          <div className="py-2">
            <h4 className="font-bold text-base px-7 py-2 text-gray-900">
              Digital Content & Devices
            </h4>
            <button 
              onClick={() => { onSelectDepartment('Prime Video'); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Tv className="w-4 h-4 text-gray-500" />
                <span>Prime Video</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectDepartment('Amazon Music'); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Music className="w-4 h-4 text-gray-500" />
                <span>Amazon Music</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectDepartment('Echo & Alexa'); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4 text-gray-500" />
                <span>Echo & Alexa</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Shop by Category */}
          <div className="py-2">
            <h4 className="font-bold text-base px-7 py-2 text-gray-900">
              Shop by Department
            </h4>
            <button 
              onClick={() => { onSelectDepartment('Electronics'); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-900 font-semibold bg-amber-50/50"
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4 text-[#e77600]" />
                <span>Electronics & Headphones</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectDepartment('Computers'); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Laptop className="w-4 h-4 text-gray-500" />
                <span>Computers & Laptops</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => { onSelectDepartment('Smart Home'); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-gray-500" />
                <span>Smart Home</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Programs & Features */}
          <div className="py-2">
            <h4 className="font-bold text-base px-7 py-2 text-gray-900">
              Programs & Features
            </h4>
            <button 
              onClick={() => { onSelectDepartment("Today's Deals"); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-gray-500" />
                <span>Today's Deals & Savings</span>
              </div>
            </button>
            <button 
              onClick={() => { onSelectDepartment('Gift Cards'); onClose(); }}
              className="w-full flex items-center justify-between px-7 py-2.5 hover:bg-gray-100 text-left text-gray-700"
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-gray-500" />
                <span>Gift Cards & Registry</span>
              </div>
            </button>
          </div>

          {/* Help & Settings */}
          <div className="py-2">
            <h4 className="font-bold text-base px-7 py-2 text-gray-900">
              Help & Settings
            </h4>
            <div className="px-7 py-2 text-gray-700 hover:text-black cursor-pointer">Your Account</div>
            <div className="px-7 py-2 text-gray-700 hover:text-black cursor-pointer">Customer Service</div>
            <div className="px-7 py-2 text-gray-700 hover:text-black cursor-pointer">Sign Out</div>
          </div>
        </div>
      </div>

      {/* Close button outside drawer */}
      <button
        onClick={onClose}
        className="p-3 text-white hover:text-gray-300 self-start cursor-pointer"
        title="Close menu"
      >
        <X className="w-8 h-8" />
      </button>
    </div>
  );
};
