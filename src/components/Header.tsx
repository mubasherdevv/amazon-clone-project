import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  ChevronDown, 
  Menu, 
  X,
  Check
} from 'lucide-react';
import { CartItem } from '../types/amazon';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onOpenLocation: () => void;
  onGoHome?: () => void;
  deliveryLocation: { city: string; zip: string };
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

const CATEGORIES = [
  'All Departments',
  'Electronics',
  'Headphones & Audio',
  'Computers & Accessories',
  'Cell Phones & Accessories',
  'Smart Home',
  'Video Games',
  'Deals & Bargains'
];

const SEARCH_SUGGESTIONS = [
  'sony wh-1000xm5',
  'sony headphones noise canceling',
  'over ear headphones wireless',
  'apple airpods max',
  'bose quietcomfort ultra',
  'kindle paperwhite 16gb',
  'bluetooth headphones with mic',
  'headphone travel case'
];

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onOpenMenu,
  onOpenLocation,
  onGoHome,
  deliveryLocation,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedCategory,
  onCategoryChange
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : SEARCH_SUGGESTIONS.slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="bg-[#131921] text-white text-sm select-none sticky top-0 z-40 shadow-md">
      {/* Main Top Nav Bar */}
      <div className="flex items-center gap-2 md:gap-4 px-3 py-1.5 md:px-4">
        {/* Amazon Logo with Iconic Arrow Smile */}
        <div 
          onClick={() => {
            onSearchChange('');
            if (onGoHome) {
              onGoHome();
            } else {
              onSearchSubmit('');
            }
          }}
          className="flex items-center p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer shrink-0 transition"
        >
          <div className="flex flex-col items-start leading-none">
            <div className="flex items-baseline">
              <span className="text-xl md:text-2xl font-extrabold tracking-tighter text-white">amazon</span>
              <span className="text-xs font-semibold text-[#febd69] ml-0.5">.com</span>
            </div>
            {/* The signature curved smile vector */}
            <svg width="68" height="14" viewBox="0 0 80 18" fill="none" className="-mt-1">
              <path
                d="M 6 4 C 28 16, 52 16, 74 5"
                stroke="#ff9900"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 68 8 L 76 5 L 75 14"
                fill="#ff9900"
              />
            </svg>
          </div>
        </div>

        {/* Deliver To Location Widget */}
        <button
          onClick={onOpenLocation}
          className="hidden sm:flex items-center p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer text-left transition shrink-0"
        >
          <MapPin className="w-4 h-4 text-white mr-1 mt-1 shrink-0" />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-gray-300">Deliver to</span>
            <span className="font-bold text-white whitespace-nowrap">{deliveryLocation.city} {deliveryLocation.zip}</span>
          </div>
        </button>

        {/* Omni Search Bar */}
        <div ref={searchContainerRef} className="flex-1 relative mx-1 md:mx-2">
          <form onSubmit={handleSubmit} className="flex h-10 w-full rounded focus-within:ring-3 focus-within:ring-[#f90]">
            {/* Category Dropdown */}
            <div className="relative shrink-0 hidden md:flex items-center bg-[#e6e6e6] hover:bg-[#d4d4d4] text-[#0f1111] text-xs font-medium rounded-l px-2.5 cursor-pointer border-r border-[#cdcdcd]">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="bg-transparent text-[#0f1111] appearance-none pr-4 cursor-pointer focus:outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-white text-black text-sm">
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1 pointer-events-none text-gray-600" />
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search Amazon"
              className="flex-1 bg-white text-[#0f1111] text-sm px-3 md:px-4 py-2 focus:outline-none placeholder:text-gray-500 rounded-l md:rounded-l-none"
            />

            {/* Clear button if text */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  setShowSearchDropdown(false);
                }}
                className="bg-white text-gray-400 hover:text-gray-700 px-2 flex items-center"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Search Submit Button */}
            <button
              type="submit"
              className="bg-[#febd69] hover:bg-[#f3a847] active:bg-[#dd9235] text-[#111] px-4 md:px-5 flex items-center justify-center rounded-r cursor-pointer transition shrink-0"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Autocomplete / Search Suggestions Flyout */}
          {showSearchDropdown && (
            <div className="absolute top-11 left-0 right-0 bg-white text-[#0f1111] border border-gray-200 rounded-b shadow-xl z-50 overflow-hidden">
              <div className="text-[11px] font-semibold text-gray-500 uppercase px-3 py-1.5 bg-gray-50 border-b border-gray-100">
                Recommended Searches
              </div>
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  onClick={() => {
                    onSearchChange(suggestion);
                    onSearchSubmit(suggestion);
                    setShowSearchDropdown(false);
                  }}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm gap-2.5 transition"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="font-medium text-gray-900">{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div 
          className="relative hidden lg:block"
          onMouseEnter={() => setShowLangMenu(true)}
          onMouseLeave={() => setShowLangMenu(false)}
        >
          <div className="flex items-center gap-1 p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer">
            <span className="text-base">🇺🇸</span>
            <span className="font-bold text-xs uppercase">EN</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          {showLangMenu && (
            <div className="absolute top-full right-0 mt-1 w-44 bg-white text-[#0f1111] border border-gray-200 rounded shadow-xl p-3 z-50">
              <div className="text-xs font-bold mb-2 text-gray-700">Language Settings</div>
              <label className="flex items-center gap-2 text-xs py-1 cursor-pointer font-semibold text-[#007185]">
                <input type="radio" name="lang" defaultChecked className="accent-[#e77600]" />
                <span>English - EN</span>
              </label>
              <label className="flex items-center gap-2 text-xs py-1 cursor-pointer text-gray-600 hover:text-black">
                <input type="radio" name="lang" className="accent-[#e77600]" />
                <span>Español - ES</span>
              </label>
              <label className="flex items-center gap-2 text-xs py-1 cursor-pointer text-gray-600 hover:text-black">
                <input type="radio" name="lang" className="accent-[#e77600]" />
                <span>Deutsch - DE</span>
              </label>
            </div>
          )}
        </div>

        {/* Account & Lists Flyout */}
        <div 
          className="relative hidden sm:block"
          onMouseEnter={() => setShowAccountMenu(true)}
          onMouseLeave={() => setShowAccountMenu(false)}
        >
          <div className="flex items-center p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer text-left leading-tight">
            <div>
              <div className="text-xs text-gray-300">Hello, Alex</div>
              <div className="text-xs font-bold text-white flex items-center gap-0.5">
                Account & Lists
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>

          {showAccountMenu && (
            <div className="absolute top-full right-0 mt-1 w-80 bg-white text-[#0f1111] border border-gray-200 rounded shadow-2xl p-4 z-50">
              <div className="bg-amber-50 p-2.5 rounded border border-amber-200 text-center mb-3">
                <div className="text-xs text-gray-700 mb-1.5">You are browsing as <strong>Alex (Prime Member)</strong></div>
                <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-semibold py-1.5 rounded shadow-sm">
                  Manage Prime Benefits
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-3 text-xs">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Your Lists</h4>
                  <ul className="space-y-1.5 text-gray-600">
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Create a List</li>
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Find a Wish List</li>
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Tech Wishlist (3 items)</li>
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Baby & Wedding Registry</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Your Account</h4>
                  <ul className="space-y-1.5 text-gray-600">
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Account Settings</li>
                    <li className="hover:text-[#007185] hover:underline cursor-pointer font-medium text-black">Your Orders</li>
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Recommendations</li>
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Keep Shopping For</li>
                    <li className="hover:text-[#007185] hover:underline cursor-pointer">Memberships & Subscriptions</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <div className="hidden md:flex flex-col p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer text-left leading-tight shrink-0">
          <span className="text-xs text-gray-300">Returns</span>
          <span className="text-xs font-bold text-white">& Orders</span>
        </div>

        {/* Cart Icon with Dynamic Count Badge */}
        <button
          onClick={onOpenCart}
          className="flex items-center gap-1.5 p-1.5 rounded hover:ring-1 hover:ring-white cursor-pointer relative shrink-0 transition"
          aria-label={`Cart with ${totalCartCount} items`}
        >
          <div className="relative">
            <ShoppingCart className="w-8 h-8 text-white" />
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 font-bold text-[#f08804] text-sm tabular-nums">
              {totalCartCount}
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-xs mt-3">Cart</span>
        </button>
      </div>
    </header>
  );
};
