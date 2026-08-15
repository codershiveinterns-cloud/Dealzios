'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Store as StoreIcon, Tag, Percent, ArrowRight, Sparkles } from 'lucide-react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search triggered globally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const matchedStores = cleanQuery
    ? STORES.filter(s => s.name.toLowerCase().includes(cleanQuery) || s.category.toLowerCase().includes(cleanQuery)).slice(0, 4)
    : STORES.filter(s => s.trending).slice(0, 4);

  const matchedCoupons = cleanQuery
    ? COUPONS.filter(c => c.storeName.toLowerCase().includes(cleanQuery) || c.title.toLowerCase().includes(cleanQuery) || c.code?.toLowerCase().includes(cleanQuery)).slice(0, 4)
    : COUPONS.slice(0, 3);

  const matchedDeals = cleanQuery
    ? DEALS.filter(d => d.storeName.toLowerCase().includes(cleanQuery) || d.title.toLowerCase().includes(cleanQuery)).slice(0, 3)
    : DEALS.slice(0, 2);

  const matchedCategories = cleanQuery
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(cleanQuery)).slice(0, 3)
    : CATEGORIES.filter(c => c.featured).slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar Header */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-slate-200 px-4 py-3.5 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores (e.g. Nike, Canva), brands or coupon codes..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60"
          >
            <span className="text-xs font-semibold px-2 py-1 bg-white rounded border border-slate-200 shadow-2xs">ESC</span>
          </button>
        </form>

        {/* Quick Search Pills */}
        <div className="px-4 py-2 bg-slate-100/60 border-b border-slate-200/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" /> Popular:
          </span>
          {['Nike', 'Amazon', 'Adobe', 'Canva', 'NordVPN', 'Booking.com', 'Uber'].map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setQuery(brand)}
              className="bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 px-2.5 py-1 rounded-full border border-slate-200 transition-colors shrink-0 font-medium"
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">

          {/* Stores Match Section */}
          {matchedStores.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-1.5"><StoreIcon className="w-3.5 h-3.5" /> Stores</span>
                <Link href="/stores" onClick={onClose} className="text-indigo-600 hover:underline">View all</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedStores.map((store) => (
                  <Link
                    key={store.id}
                    href={`/store/${store.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
                  >
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 truncate">
                        {store.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {store.offerCount} Offers • <span className="text-emerald-600 font-medium">{store.bestDiscount}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Coupons Match Section */}
          {matchedCoupons.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Coupon Codes</span>
                <Link href="/coupons" onClick={onClose} className="text-indigo-600 hover:underline">View all</Link>
              </div>
              <div className="space-y-2">
                {matchedCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    onClick={() => {
                      onClose();
                      onSelectCoupon(coupon);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-2 py-1 rounded-md shrink-0">
                        {coupon.discount}
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 text-xs sm:text-sm truncate group-hover:text-indigo-600">
                          {coupon.title}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span>{coupon.storeName}</span> • <span>Verified {coupon.verifiedDate}</span>
                        </div>
                      </div>
                    </div>
                    <button className="shrink-0 text-xs font-semibold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                      Show Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {matchedCategories.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Categories
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    {cat.name} ({cat.offerCount})
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Search Modal Footer */}
        {query.trim() && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
            <button
              onClick={handleSearchSubmit}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 mx-auto"
            >
              <span>See all search results for "{query}"</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
