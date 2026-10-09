import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 select-none text-white text-xs">
      {/* Back to top banner */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-3.5 text-center font-semibold text-xs tracking-wide transition cursor-pointer text-white"
      >
        Back to top
      </button>

      {/* Main 4-Column Directory */}
      <div className="bg-[#232f3e] py-10 px-6 border-b border-[#3a4553]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Amazon Newsletter</li>
              <li className="hover:underline cursor-pointer">About Amazon</li>
              <li className="hover:underline cursor-pointer">Accessibility</li>
              <li className="hover:underline cursor-pointer">Sustainability</li>
              <li className="hover:underline cursor-pointer">Amazon Devices</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell products on Amazon</li>
              <li className="hover:underline cursor-pointer">Sell on Amazon Business</li>
              <li className="hover:underline cursor-pointer">Sell apps on Amazon</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
              <li className="hover:underline cursor-pointer">Self-Publish with Us</li>
              <li className="hover:underline cursor-pointer">Host an Amazon Hub</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Amazon Payment Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Amazon Visa</li>
              <li className="hover:underline cursor-pointer">Amazon Store Card</li>
              <li className="hover:underline cursor-pointer">Amazon Secured Card</li>
              <li className="hover:underline cursor-pointer">Shop with Points</li>
              <li className="hover:underline cursor-pointer">Reload Your Balance</li>
              <li className="hover:underline cursor-pointer">Amazon Currency Converter</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Amazon and Prime</li>
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Your Orders</li>
              <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
              <li className="hover:underline cursor-pointer">Returns & Replacements</li>
              <li className="hover:underline cursor-pointer">Manage Devices</li>
              <li className="hover:underline cursor-pointer">Help & Customer Support</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Middle Brand and Settings Bar */}
      <div className="bg-[#232f3e] py-7 px-6 border-b border-[#3a4553] flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
        <div className="flex items-center">
          <span className="text-xl font-extrabold text-white tracking-tighter">amazon</span>
          <span className="text-[10px] text-[#febd69] font-bold ml-0.5">.com</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="border border-gray-500 rounded px-3 py-1 flex items-center gap-1.5 cursor-pointer hover:border-white">
            <Globe className="w-3.5 h-3.5" />
            <span>English</span>
          </div>
          <div className="border border-gray-500 rounded px-3 py-1 cursor-pointer hover:border-white">
            <span>$ USD - U.S. Dollar</span>
          </div>
          <div className="border border-gray-500 rounded px-3 py-1 flex items-center gap-1.5 cursor-pointer hover:border-white">
            <span>🇺🇸 United States</span>
          </div>
        </div>
      </div>

      {/* Sub-footer Links & Copyright */}
      <div className="bg-[#131921] py-8 px-6 text-center text-[11px] text-gray-400">
        <div className="flex flex-wrap justify-center gap-6 mb-3 text-gray-300">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Consumer Health Data Privacy Disclosure</span>
          <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
        </div>
        <p>© 1996–2026, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};
