'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Store as StoreIcon, Tag, Percent, ArrowRight, Sparkles, Grid, ShieldCheck, CornerDownLeft } from 'lucide-react';
import { STORES } from '@/data/stores';
import { COUPONS } from '@/data/coupons';
import { DEALS } from '@/data/deals';
import { CATEGORIES } from '@/data/categories';
import { Offer } from '@/data/types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCoupon: (coupon: Offer) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCoupon
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'stores' | 'coupons' | 'deals' | 'categories'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveFilter('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const matchesOffer = (offer: Offer) => {
    if (!cleanQuery) return true;
    return (
      offer.storeName.toLowerCase().includes(cleanQuery) ||
      offer.storeSlug.toLowerCase().includes(cleanQuery) ||
      offer.title.toLowerCase().includes(cleanQuery) ||
      offer.description.toLowerCase().includes(cleanQuery) ||
      (offer.code ? offer.code.toLowerCase().includes(cleanQuery) : false) ||
      (offer.discount ? offer.discount.toLowerCase().includes(cleanQuery) : false)
    );
  };

  const matchedStores = cleanQuery
    ? STORES.filter(s => s.name.toLowerCase().includes(cleanQuery) || s.category.toLowerCase().includes(cleanQuery) || s.slug.toLowerCase().includes(cleanQuery)).slice(0, 6)
    : STORES.filter(s => s.trending).slice(0, 4);

  const matchedCoupons = cleanQuery
    ? COUPONS.filter(matchesOffer).slice(0, 6)
    : COUPONS.slice(0, 3);

  const matchedDeals = cleanQuery
    ? DEALS.filter(matchesOffer).slice(0, 6)
    : DEALS.slice(0, 2);

  const matchedCategories = cleanQuery
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(cleanQuery) || c.slug.toLowerCase().includes(cleanQuery)).slice(0, 4)
    : CATEGORIES.filter(c => c.featured).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularBrands = [
    { name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80' },
    { name: 'Amazon', logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&auto=format&fit=crop&q=80' },
    { name: 'Adobe', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80' },
    { name: 'Canva', logo: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&auto=format&fit=crop&q=80' },
    { name: 'NordVPN', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=80' },
    { name: 'Uber', logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-start justify-center pt-12 sm:pt-20 px-4 animate-in fade-in duration-200">
      
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[82vh] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Spotlight Top Gradient Accent */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 w-full" />

        {/* Search Bar Header */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-slate-100 px-5 py-4 bg-white">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100/80 flex items-center justify-center mr-3.5 shrink-0 shadow-2xs">
            <Search className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores, promo codes, deals or categories..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-base sm:text-lg outline-none font-semibold"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 mr-2 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            {query.trim() && (
              <button
                type="submit"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <span>Search</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span className="text-[11px] font-extrabold px-2 py-1 bg-slate-100 border border-slate-200/80 rounded-lg text-slate-500 shadow-2xs">ESC</span>
            </button>
          </div>
        </form>

        {/* Category Filter Tabs */}
        <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] mr-1 shrink-0">
            Filter:
          </span>
          {[
            { id: 'all', label: 'All Results' },
            { id: 'stores', label: `Stores (${matchedStores.length})` },
            { id: 'coupons', label: `Coupons (${matchedCoupons.length})` },
            { id: 'deals', label: `Deals (${matchedDeals.length})` },
            { id: 'categories', label: `Categories (${matchedCategories.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 rounded-full font-bold transition-all shrink-0 text-xs ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Popular Brand Quick Pills */}
        {!cleanQuery && (
          <div className="px-5 py-3 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Trending:
            </span>
            {popularBrands.map((brand) => (
              <button
                key={brand.name}
                type="button"
                onClick={() => setQuery(brand.name)}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 hover:text-indigo-600 px-3 py-1 rounded-xl border border-slate-200/90 transition-all shrink-0 font-semibold group"
              >
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Results Container */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">

          {/* Stores Section */}
          {(activeFilter === 'all' || activeFilter === 'stores') && matchedStores.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                <span className="flex items-center gap-1.5 text-slate-900">
                  <StoreIcon className="w-4 h-4 text-indigo-600" /> Stores
                </span>
                <Link href="/stores" onClick={onClose} className="text-indigo-600 hover:underline">
                  View all stores ({STORES.length})
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {matchedStores.map((store) => (
                  <Link
                    key={store.id}
                    href={`/store/${store.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 shadow-2xs hover:shadow-md transition-all group"
                  >
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200/80 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-950 text-sm group-hover:text-indigo-600 truncate">
                        {store.name}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span>{store.offerCount} Offers</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">{store.bestDiscount}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Coupons Match Section */}
          {(activeFilter === 'all' || activeFilter === 'coupons') && matchedCoupons.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                <span className="flex items-center gap-1.5 text-slate-900">
                  <Tag className="w-4 h-4 text-indigo-600" /> Coupon Codes
                </span>
                <Link href="/coupons" onClick={onClose} className="text-indigo-600 hover:underline">
                  View all coupons
                </Link>
              </div>
              <div className="space-y-2.5">
                {matchedCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    onClick={() => {
                      onClose();
                      onSelectCoupon(coupon);
                    }}
                    className="p-3 rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-xs px-2.5 py-1.5 rounded-xl shrink-0">
                        {coupon.discount}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-950 text-xs sm:text-sm truncate group-hover:text-indigo-600">
                          {coupon.title}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-slate-600">{coupon.storeName}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" /> Verified {coupon.verifiedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="shrink-0 text-xs font-extrabold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white px-3.5 py-2 rounded-xl transition-all shadow-xs">
                      Get Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deals Section */}
          {(activeFilter === 'all' || activeFilter === 'deals') && matchedDeals.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                <span className="flex items-center gap-1.5 text-slate-900">
                  <Percent className="w-4 h-4 text-emerald-600" /> Exclusive Deals
                </span>
                <Link href="/deals" onClick={onClose} className="text-indigo-600 hover:underline">
                  View all deals
                </Link>
              </div>
              <div className="space-y-2.5">
                {matchedDeals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => {
                      onClose();
                      onSelectCoupon(deal);
                    }}
                    className="p-3 rounded-2xl border border-slate-200/80 bg-white hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-black text-xs px-2.5 py-1.5 rounded-xl shrink-0">
                        {deal.discount}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-950 text-xs sm:text-sm truncate group-hover:text-emerald-600">
                          {deal.title}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-slate-600">{deal.storeName}</span>
                          <span>•</span>
                          <span>Auto-Applied Deal</span>
                        </div>
                      </div>
                    </div>
                    <button className="shrink-0 text-xs font-extrabold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white px-3.5 py-2 rounded-xl transition-all shadow-xs">
                      Get Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {(activeFilter === 'all' || activeFilter === 'categories') && matchedCategories.length > 0 && (
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5 text-slate-900">
                <Grid className="w-4 h-4 text-indigo-600" /> Categories
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-2xs transition-all flex items-center gap-1.5"
                  >
                    <Grid className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{cat.name}</span>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      {cat.offerCount}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty Search State */}
          {cleanQuery && matchedStores.length === 0 && matchedCoupons.length === 0 && matchedDeals.length === 0 && matchedCategories.length === 0 && (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">No results found for "{query}"</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Try searching for popular stores like Nike, Amazon, Canva, or software categories.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        {query.trim() && (
          <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={handleSearchSubmit}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1.5 mx-auto group"
            >
              <span>See all full search results for "{query}"</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
