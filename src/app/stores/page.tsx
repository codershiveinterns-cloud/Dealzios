'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Store as StoreIcon, Filter, ArrowUpDown } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { StoreCard } from '@/components/StoreCard';

import { STORES } from '@/data/stores';
import { Offer } from '@/data/types';

export default function StoresDirectoryPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Directory Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'offers'>('popular');

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

  const alphabet = ['ALL', '#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  // Filtering stores
  let filteredStores = STORES.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedLetter === 'ALL') return true;
    if (selectedLetter === '#') return /^[0-9]/.test(store.name);
    return store.name.toUpperCase().startsWith(selectedLetter);
  });

  // Sorting stores
  if (sortBy === 'name') {
    filteredStores.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'offers') {
    filteredStores.sort((a, b) => b.offerCount - a.offerCount);
  } else {
    filteredStores.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Header Title Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs mb-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
            <StoreIcon className="w-4 h-4" /> Store Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Browse All Coupon Stores & Brands
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Find active promo codes, vouchers, and discounts for thousands of popular online merchants.
          </p>

          {/* Directory Search & Sort Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {/* Search input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter stores by name..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors bg-slate-50"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 w-full md:w-auto justify-end">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 outline-none text-slate-900 font-bold"
              >
                <option value="popular">Most Popular</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="offers">Most Offers</option>
              </select>
            </div>
          </div>

          {/* Alphabetical Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pt-2 pb-1 text-xs">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-2.5 py-1 rounded-lg font-extrabold transition-all shrink-0 ${
                  selectedLetter === letter
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Store Grid Result */}
        {filteredStores.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <h3 className="font-bold text-lg text-slate-800">No Stores Found</h3>
            <p className="text-xs text-slate-500">Try searching another keyword or clearing your filter selection.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedLetter('ALL'); }}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
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
