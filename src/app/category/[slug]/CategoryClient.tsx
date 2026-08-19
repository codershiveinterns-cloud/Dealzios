'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shirt, 
  Laptop, 
  Code, 
  Plane, 
  Utensils, 
  Sparkles, 
  Home as HomeIcon, 
  GraduationCap, 
  Wallet, 
  Shield, 
  Gamepad2, 
  ShoppingBag,
  ChevronDown, 
  ChevronUp, 
  Tag, 
  Store as StoreIcon
} from 'lucide-react';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { CouponCard } from '@/components/CouponCard';
import { StoreCard } from '@/components/StoreCard';
import { SEOJsonLd } from '@/components/SEOJsonLd';

import { CATEGORIES } from '@/data/categories';
import { STORES } from '@/data/stores';
import { COUPONS } from '@/data/coupons';
import { DEALS } from '@/data/deals';
import { Offer } from '@/data/types';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Shirt, Laptop, Code, Plane, Utensils, Sparkles, Home: HomeIcon, GraduationCap, Wallet, Shield, Gamepad2, ShoppingBag
};

interface CategoryClientProps {
  slug: string;
}

export default function CategoryClient({ slug }: CategoryClientProps) {
  const category = CATEGORIES.find(c => c.slug === slug);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [faqIndex, setFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vv_saved_coupons');
      if (stored) setSavedIds(JSON.parse(stored));
    } catch (e) {}
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header onOpenSearch={() => setIsSearchOpen(true)} onOpenSubmit={() => setIsSubmitOpen(true)} onOpenSaved={() => setIsSavedOpen(true)} savedCount={savedIds.length} />
        <div className="max-w-md mx-auto my-20 text-center space-y-4 px-4">
          <h1 className="text-2xl font-bold text-slate-900">Category Not Found</h1>
          <p className="text-sm text-slate-500">We couldn't find a category matching "{slug}".</p>
          <Link href="/#categories" className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
            Browse All Categories
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComponent = ICON_MAP[category.iconName] || ShoppingBag;

  const categoryStores = STORES.filter(s => s.categorySlug === category.slug);
  const categoryCoupons = COUPONS.filter(c => c.categorySlug === category.slug);
  const categoryDeals = DEALS.filter(d => d.categorySlug === category.slug);
  const allCategoryOffers = [...categoryCoupons, ...categoryDeals];

  const handleToggleSave = (couponId: string) => {
    const updated = savedIds.includes(couponId)
      ? savedIds.filter(id => id !== couponId)
      : [...savedIds, couponId];
    setSavedIds(updated);
    try {
      localStorage.setItem('vv_saved_coupons', JSON.stringify(updated));
    } catch (e) {}
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://dealzios.com' },
    { name: 'Categories', url: 'https://dealzios.com/#categories' },
    { name: category.name, url: `https://dealzios.com/category/${category.slug}` }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <SEOJsonLd type="breadcrumb" data={breadcrumbs} />

      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link href="/#categories" className="hover:text-indigo-600">Categories</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Best {category.name} Coupons & Deals
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                {category.description}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-center shrink-0 w-full sm:w-auto">
            <div className="text-2xl font-black text-indigo-950">{allCategoryOffers.length}</div>
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Active Offers</div>
          </div>
        </div>

        {/* Stores in Category Grid */}
        {categoryStores.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <StoreIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-extrabold text-slate-950">
                Top Stores in {category.name} ({categoryStores.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryStores.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        )}

        {/* Offers Grid */}
        {allCategoryOffers.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-extrabold text-slate-950">
                Featured {category.name} Discount Offers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCategoryOffers.map(offer => (
                <CouponCard
                  key={offer.id}
                  coupon={offer}
                  onSelect={setSelectedCoupon}
                  isSaved={savedIds.includes(offer.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          </div>
        )}

        {/* Category Buying Guide */}
        {category.buyingGuide && category.buyingGuide.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-2xs mb-12 space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950">
              {category.name} Shopping & Savings Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.buyingGuide.map((guide, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <h3 className="font-bold text-sm text-indigo-950">{guide.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{guide.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category FAQs */}
        {category.faqs && category.faqs.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-2xs mb-12 space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950">
              {category.name} Coupon FAQs
            </h2>
            <div className="space-y-3">
              {category.faqs.map((faq, i) => {
                const isOpen = faqIndex === i;
                return (
                  <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setFaqIndex(isOpen ? null : i)}
                      className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-600 border-t border-slate-100 pt-2 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <Footer onOpenSubmit={() => setIsSubmitOpen(true)} />

      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectCoupon={setSelectedCoupon} />
      <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
      <SubmitCouponModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />
      <SavedCouponsModal isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} savedIds={savedIds} onToggleSave={handleToggleSave} onSelectCoupon={setSelectedCoupon} onClearAll={() => setSavedIds([])} />
    </div>
  );
}
