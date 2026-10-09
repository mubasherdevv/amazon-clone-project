/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { SubNav } from './components/SubNav';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ReferenceSwitcher } from './components/ReferenceSwitcher';
import { HomePage } from './components/HomePage';
import { ProductGallery } from './components/ProductGallery';
import { ProductDetails } from './components/ProductDetails';
import { BuyBox } from './components/BuyBox';
import { FrequentlyBoughtTogether } from './components/FrequentlyBoughtTogether';
import { ComparisonTable } from './components/ComparisonTable';
import { ProductDescription } from './components/ProductDescription';
import { TechnicalDetails } from './components/TechnicalDetails';
import { CustomerQA } from './components/CustomerQA';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AllDepartmentsDrawer } from './components/AllDepartmentsDrawer';
import { LocationModal } from './components/LocationModal';

import { ALL_PRODUCTS, SONY_XM5_PRODUCT } from './data/mockProducts';
import { CartItem, ProductData } from './types/amazon';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');
  const [activeProductId, setActiveProductId] = useState<string>('sony-wh1000xm5');
  const [activeProduct, setActiveProduct] = useState<ProductData>(SONY_XM5_PRODUCT);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('var-black');
  const [selectedConfigId, setSelectedConfigId] = useState<string>('cfg-standard');

  // Interactive Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState({ city: 'Seattle', zip: '98101' });

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Departments');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [recentlyAddedNotification, setRecentlyAddedNotification] = useState<string | null>(null);

  // Go to homepage
  const handleGoHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch product helper (leads into Product Detail Page)
  const handleSelectProduct = (productId: string) => {
    const found = ALL_PRODUCTS.find(p => p.id === productId);
    if (found) {
      setActiveProductId(productId);
      setActiveProduct(found);
      setSelectedVariantId(found.variants[0]?.id || '');
      setSelectedConfigId(found.configurations[0]?.id || '');
      setCurrentView('product');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Search handler
  const handleSearchSubmit = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('airpod') || q.includes('apple')) {
      handleSelectProduct('apple-airpods-max');
    } else if (q.includes('kindle') || q.includes('book') || q.includes('paperwhite')) {
      handleSelectProduct('kindle-paperwhite-16gb');
    } else if (q.includes('sony') || q.includes('headphone') || q.includes('noise')) {
      handleSelectProduct('sony-wh1000xm5');
    } else if (q.includes('deal') || q.includes('home')) {
      handleGoHome();
    } else {
      handleSelectProduct('sony-wh1000xm5');
    }
  };

  // Active Variant and Configuration calculations
  const selectedVariant = activeProduct.variants.find(v => v.id === selectedVariantId) || activeProduct.variants[0];
  const activeConfig = activeProduct.configurations.find(c => c.id === selectedConfigId);
  const finalPrice = activeConfig ? activeConfig.price : selectedVariant.price;

  // Add to cart from Buy Box
  const handleAddToCart = (quantity: number, protectionPlan?: { name: string; price: number }) => {
    const newItem: CartItem = {
      id: `${activeProduct.id}-${selectedVariant.id}-${Date.now()}`,
      productId: activeProduct.id,
      title: activeProduct.title,
      variantName: activeConfig ? activeConfig.label : selectedVariant.name,
      colorName: selectedVariant.name,
      price: finalPrice,
      quantity: quantity,
      image: activeProduct.id === 'sony-wh1000xm5' ? selectedVariant.imageThumbnail : activeProduct.id.includes('airpods') ? 'apple' : 'kindle',
      protectionPlan
    };

    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.productId === newItem.productId && 
        item.variantName === newItem.variantName && 
        item.colorName === newItem.colorName &&
        !item.protectionPlan && !newItem.protectionPlan
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [newItem, ...prev];
    });

    setRecentlyAddedNotification(`${quantity}x ${selectedVariant.name} added to cart`);
    setTimeout(() => {
      setRecentlyAddedNotification(null);
    }, 4000);
  };

  // Direct add from Homepage Lightning Deals or Best Sellers
  const handleDirectAddFromHome = (item: { title: string; price: number; id: string; imageType: string; color?: string }) => {
    const newItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      productId: item.id,
      title: item.title,
      variantName: 'Standard',
      colorName: item.color || 'Black',
      price: item.price,
      quantity: 1,
      image: item.imageType
    };
    setCart(prev => [newItem, ...prev]);
    setRecentlyAddedNotification(`${item.title} added to cart`);
    setTimeout(() => setRecentlyAddedNotification(null), 3000);
  };

  // Buy Now immediate express checkout
  const handleBuyNow = (quantity: number, protectionPlan?: { name: string; price: number }) => {
    handleAddToCart(quantity, protectionPlan);
    setIsCheckoutOpen(true);
  };

  // Add bundle items to cart
  const handleAddBundleToCart = (bundleItems: CartItem[]) => {
    setCart(prev => [...bundleItems, ...prev]);
    setRecentlyAddedNotification(`${bundleItems.length} items added from bundle`);
    setTimeout(() => setRecentlyAddedNotification(null), 3000);
  };

  // Add direct item from comparison table
  const handleAddDirectItem = (item: { title: string; price: number; id: string }) => {
    const newItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      productId: item.id,
      title: item.title,
      variantName: 'Standard',
      colorName: 'Standard',
      price: item.price,
      quantity: 1,
      image: item.id.includes('airpods') ? 'apple' : 'headphone'
    };
    setCart(prev => [newItem, ...prev]);
    setRecentlyAddedNotification(`${item.title} added to cart`);
    setTimeout(() => setRecentlyAddedNotification(null), 3000);
  };

  // Cart operations
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: nextQty };
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const scrollToReviews = () => {
    const el = document.getElementById('customer-reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToQuestions = () => {
    const el = document.getElementById('customer-qa-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#0f1111] flex flex-col font-sans antialiased selection:bg-[#ffd814] selection:text-black">
      {/* 1. Amazon Top Omni Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuDrawerOpen(true)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        onGoHome={handleGoHome}
        deliveryLocation={deliveryLocation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 2. SubNav Category & Deals Bar */}
      <SubNav
        currentView={currentView}
        onGoHome={handleGoHome}
        onGoProduct={() => setCurrentView('product')}
        onOpenMenu={() => setIsMenuDrawerOpen(true)}
        onSelectCategoryFilter={(cat) => {
          if (cat === "Today's Deals" || cat === "Best Sellers") {
            handleGoHome();
          } else if (cat === 'Electronics' || cat === 'Audio & Headphones') {
            handleSelectProduct('sony-wh1000xm5');
          }
        }}
      />

      {/* 3. Experience & Reference Switcher Bar */}
      <ReferenceSwitcher
        activeProductId={activeProductId}
        onSelectProduct={handleSelectProduct}
        currentView={currentView}
        onGoHome={handleGoHome}
      />

      {/* Toast Notification when adding items to cart */}
      {recentlyAddedNotification && (
        <div className="fixed top-16 right-4 z-50 bg-[#131921] text-white py-3 px-5 rounded-lg shadow-2xl flex items-center gap-3 border border-gray-700 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-emerald-400">Added to Cart: </span>
            <span>{recentlyAddedNotification}</span>
          </div>
          <button
            onClick={() => {
              setRecentlyAddedNotification(null);
              setIsCartOpen(true);
            }}
            className="ml-3 bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-bold py-1 px-3 rounded-full flex items-center gap-1 cursor-pointer"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* CONDITIONAL VIEW: HOMEPAGE vs PRODUCT DETAIL PAGE */}
      {currentView === 'home' ? (
        <HomePage
          onSelectProduct={handleSelectProduct}
          onAddToCartDirect={handleDirectAddFromHome}
        />
      ) : (
        /* PRODUCT DETAIL PAGE VIEW */
        <div className="flex-1 bg-white">
          {/* Breadcrumbs */}
          <Breadcrumbs
            category="Electronics"
            subCategory="Headphones, Earbuds & Accessories"
            itemType={activeProduct.brand + ' ' + (activeProduct.id === 'sony-wh1000xm5' ? 'WH-1000XM5' : activeProduct.id.includes('airpods') ? 'AirPods Max' : 'Paperwhite')}
          />

          <main className="max-w-[1480px] w-full mx-auto px-4 py-4">
            {/* Top Product Section: 3-Column Layout (Gallery / Details / BuyBox) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
              {/* Left Column: Interactive Image Gallery */}
              <div className="lg:col-span-5">
                <ProductGallery
                  productId={activeProduct.id}
                  selectedColorName={selectedVariant.name}
                />
              </div>

              {/* Center Column: Product Information, Specs & Variants */}
              <div className="lg:col-span-4">
                <ProductDetails
                  product={activeProduct}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariantId}
                  selectedConfigId={selectedConfigId}
                  onSelectConfig={setSelectedConfigId}
                  onScrollToReviews={scrollToReviews}
                  onScrollToQuestions={scrollToQuestions}
                />
              </div>

              {/* Right Column: Amazon Buy Box */}
              <div className="lg:col-span-3">
                <BuyBox
                  product={activeProduct}
                  selectedVariant={selectedVariant}
                  selectedConfigPrice={finalPrice}
                  deliveryLocation={deliveryLocation}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              </div>
            </div>

            {/* Frequently Bought Together Bundle */}
            {activeProduct.frequentlyBoughtTogether.length > 0 && (
              <FrequentlyBoughtTogether
                onAddBundleToCart={handleAddBundleToCart}
              />
            )}

            {/* Compare with similar items Table */}
            <ComparisonTable
              onSelectProduct={handleSelectProduct}
              onAddToCartDirect={handleAddDirectItem}
            />

            {/* Product Description & A+ Feature Showcase */}
            <ProductDescription />

            {/* Technical Details & Specifications Table */}
            <TechnicalDetails product={activeProduct} />

            {/* Customer Questions & Answers */}
            <CustomerQA initialQuestions={activeProduct.questions} />

            {/* Customer Reviews & 5-Star Breakdown */}
            <CustomerReviews
              initialReviews={activeProduct.reviews}
              averageRating={activeProduct.rating}
              totalRatingsCount={activeProduct.ratingsCount}
            />
          </main>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Cart Drawer Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Full Simulated Amazon Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderCompleted={() => setCart([])}
        deliveryLocation={deliveryLocation}
      />

      {/* Amazon "All" Side Departments Drawer */}
      <AllDepartmentsDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        onSelectDepartment={(dept) => {
          if (dept === 'Electronics') {
            handleSelectProduct('sony-wh1000xm5');
          } else {
            handleGoHome();
          }
        }}
      />

      {/* Choose Delivery Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={deliveryLocation}
        onUpdateLocation={setDeliveryLocation}
      />
    </div>
  );
}
