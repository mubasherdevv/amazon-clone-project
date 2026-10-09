import React from 'react';
import { Menu } from 'lucide-react';

interface SubNavProps {
  onOpenMenu: () => void;
  onSelectCategoryFilter: (filter: string) => void;
  currentView?: 'home' | 'product';
  onGoHome?: () => void;
  onGoProduct?: () => void;
}

const NAV_LINKS = [
  "Today's Deals",
  "Electronics",
  "Audio & Headphones",
  "Best Sellers",
  "Customer Service",
  "Registry",
  "Gift Cards",
  "Sell",
  "Buy Again"
];

export const SubNav: React.FC<SubNavProps> = ({
  onOpenMenu,
  onSelectCategoryFilter,
  currentView = 'product',
  onGoHome,
  onGoProduct
}) => {
  return (
    <div className="bg-[#232f3e] text-white text-xs md:text-sm font-medium flex items-center px-3 md:px-4 py-1.5 overflow-x-auto no-scrollbar gap-2 md:gap-3 select-none border-t border-[#3a4553]">
      {/* "All" Hamburger Button */}
      <button
        onClick={onOpenMenu}
        className="flex items-center gap-1.5 px-2 py-1 rounded hover:ring-1 hover:ring-white cursor-pointer shrink-0 font-bold transition"
      >
        <Menu className="w-4 h-4 text-white" />
        <span>All</span>
      </button>

      {/* Direct Home Link */}
      {onGoHome && (
        <button
          onClick={onGoHome}
          className={`px-2 py-1 rounded hover:ring-1 hover:ring-white whitespace-nowrap transition cursor-pointer font-bold ${
            currentView === 'home' ? 'text-[#febd69] bg-white/10' : 'text-gray-200 hover:text-white'
          }`}
        >
          Home
        </button>
      )}

      {/* Nav Links */}
      <nav className="flex items-center gap-1 md:gap-2 shrink-0">
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => onSelectCategoryFilter(link)}
            className="px-2 py-1 rounded hover:ring-1 hover:ring-white whitespace-nowrap text-gray-200 hover:text-white transition cursor-pointer"
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Right side Prime tech banner and view indicator */}
      <div className="ml-auto hidden md:flex items-center gap-3 text-xs text-gray-300 shrink-0 font-medium">
        {onGoProduct && (
          <button
            onClick={onGoProduct}
            className={`px-2.5 py-1 rounded text-xs transition cursor-pointer flex items-center gap-1 border ${
              currentView === 'product'
                ? 'bg-[#febd69] text-black font-bold border-[#febd69]'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
            }`}
          >
            <span>Product Page (Sony XM5)</span>
          </button>
        )}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-gray-300">
          <span className="text-[#febd69] font-bold">prime</span>
          <span>Free One-Day Delivery on 100M+ Items</span>
        </div>
      </div>
    </div>
  );
};
