'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Store as StoreIcon, Tag, Percent, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { CouponCard } from '@/components/CouponCard';
import { StoreCard } from '@/components/StoreCard';

import { STORES } from '@/data/stores';
import { COUPONS } from '@/data/coupons';
import { DEALS } from '@/data/deals';
import { CATEGORIES } from '@/data/categories';
import { Offer } from '@/data/types';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

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

  const cleanQ = query.trim().toLowerCase();

  const matchedStores = cleanQ
    ? STORES.filter(s => s.name.toLowerCase().includes(cleanQ) || s.category.toLowerCase().includes(cleanQ))
    : [];

  const matchedCoupons = cleanQ
    ? COUPONS.filter(c => c.storeName.toLowerCase().includes(cleanQ) || c.title.toLowerCase().includes(cleanQ) || c.code?.toLowerCase().includes(cleanQ))
    : [];

  const matchedDeals = cleanQ
    ? DEALS.filter(d => d.storeName.toLowerCase().includes(cleanQ) || d.title.toLowerCase().includes(cleanQ))
    : [];

  const matchedCategories = cleanQ
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(cleanQ))
    : [];

  const totalResults = matchedStores.length + matchedCoupons.length + matchedDeals.length + matchedCategories.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Search Header Banner with Refined Search Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm mb-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
                <Search className="w-4 h-4" /> Search Discovery
              </div>
              <h1 className="text-3xl font-black text-slate-950">
                Search Results for "{query}"
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Found {totalResults} matching stores, coupon codes, and deals.
              </p>
            </div>

            {/* Refine Search Box */}
            <form onSubmit={handleSearchSubmit} className="w-full md:w-auto min-w-[320px] relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <Search className="w-4 h-4 text-indigo-600 ml-3 mr-2 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Refine your search..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none font-semibold py-1.5"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0 shadow-xs"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {totalResults === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">No offers found for "{query}"</h3>
            <p className="text-xs text-slate-500">
              Try checking your spelling or searching for popular store names like Nike, Canva, or Adobe.
            </p>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl"
            >
              Open Search Bar
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* Matching Stores */}
            {matchedStores.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <StoreIcon className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Matching Stores ({matchedStores.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {matchedStores.map(store => (
                    <StoreCard key={store.id} store={store} />
                  ))}
                </div>
              </div>
            )}

            {/* Matching Coupons */}
            {matchedCoupons.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Matching Coupon Codes ({matchedCoupons.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedCoupons.map(coupon => (
                    <CouponCard
                      key={coupon.id}
                      coupon={coupon}
                      onSelect={setSelectedCoupon}
                      isSaved={savedIds.includes(coupon.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Matching Deals */}
            {matchedDeals.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Percent className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Matching Deals ({matchedDeals.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedDeals.map(deal => (
                    <CouponCard
                      key={deal.id}
                      coupon={deal}
                      onSelect={setSelectedCoupon}
                      isSaved={savedIds.includes(deal.id)}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Matching Categories */}
            {matchedCategories.length > 0 && (
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 mb-4">
                  Matching Categories
                </h2>
                <div className="flex flex-wrap gap-3">
                  {matchedCategories.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-800 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                      {cat.name} ({cat.offerCount})
                    </Link>
                  ))}
                </div>
              </div>
            )}

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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
