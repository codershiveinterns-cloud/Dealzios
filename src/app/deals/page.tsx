'use client';

import React, { useState, useEffect } from 'react';
import { Percent } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { CouponCard } from '@/components/CouponCard';

import { DEALS } from '@/data/deals';
import { CATEGORIES } from '@/data/categories';
import { Offer } from '@/data/types';

export default function DealsDirectoryPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vv_saved_coupons');
      if (stored) setSavedIds(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const handleToggleSave = (couponId: string) => {
    const updated = savedIds.includes(couponId)
      ? savedIds.filter(id => id !== couponId)
      : [...savedIds, couponId];
    setSavedIds(updated);
    try {
      localStorage.setItem('vv_saved_coupons', JSON.stringify(updated));
    } catch (e) {}
  };

  const filteredDeals = DEALS.filter(d => {
    if (selectedCategory === 'all') return true;
    return d.categorySlug === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs mb-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-wider">
            <Percent className="w-4 h-4" /> Sitewide Sales & Deals
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Popular Online Deals & Promotions
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Explore automatic sales, price drops, and member promotions that don't require entering promo codes at checkout.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-slate-100 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories ({DEALS.length})
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map(deal => (
            <CouponCard
              key={deal.id}
              coupon={deal}
              onSelect={setSelectedCoupon}
              isSaved={savedIds.includes(deal.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      </main>

      <Footer onOpenSubmit={() => setIsSubmitOpen(true)} />

      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectCoupon={setSelectedCoupon} />
      <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
      <SubmitCouponModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />
      <SavedCouponsModal isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} savedIds={savedIds} onToggleSave={handleToggleSave} onSelectCoupon={setSelectedCoupon} onClearAll={() => setSavedIds([])} />
    </div>
  );
}
