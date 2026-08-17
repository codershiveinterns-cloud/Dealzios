'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ShieldCheck, 
  ExternalLink, 
  Tag, 
  Percent, 
  Clock, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Sparkles,
  Info
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

import { STORES } from '@/data/stores';
import { COUPONS } from '@/data/coupons';
import { DEALS } from '@/data/deals';
import { Offer } from '@/data/types';

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export default function StorePage({ params }: StorePageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const store = STORES.find(s => s.slug === slug);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
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

  if (!store) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSubmit={() => setIsSubmitOpen(true)}
          onOpenSaved={() => setIsSavedOpen(true)}
          savedCount={savedIds.length}
        />
        <div className="max-w-md mx-auto my-20 text-center space-y-4 px-4">
          <div className="w-16 h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">404</div>
          <h1 className="text-2xl font-bold text-slate-900">Store Not Found</h1>
          <p className="text-sm text-slate-500">We couldn't find a store matching "{slug}".</p>
          <Link href="/stores" className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
            Browse All Stores
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const storeCoupons = COUPONS.filter(c => c.storeSlug === store.slug);
  const storeDeals = DEALS.filter(d => d.storeSlug === store.slug);
  const similarStores = STORES.filter(s => s.categorySlug === store.categorySlug && s.slug !== store.slug).slice(0, 4);

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
    { name: 'Stores', url: 'https://dealzios.com/stores' },
    { name: store.name, url: `https://dealzios.com/store/${store.slug}` }
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
          <Link href="/stores" className="hover:text-indigo-600">Stores</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{store.name}</span>
        </nav>

        {/* Store Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-slate-200 p-2.5 shrink-0 shadow-xs flex items-center justify-center">
              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {store.name} Coupons & Promo Codes
                </h1>
                <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
                {store.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {store.rating} ({store.reviewCount.toLocaleString()} ratings)
                </span>
                <span>•</span>
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{store.offerCount} Active Coupon Codes</span>
                </span>
              </div>
            </div>
          </div>

          {/* Store Stats Pillar */}
          <div className="flex md:flex-col items-center justify-around w-full md:w-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-4 gap-4 shrink-0 text-center">
            <div>
              <div className="text-xl font-extrabold text-indigo-950">{store.offerCount}</div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Active Offers</div>
            </div>
            <div className="w-full h-px bg-slate-200 hidden md:block" />
            <div>
              <div className="text-xl font-extrabold text-emerald-600">{store.bestDiscount}</div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Max Discount</div>
            </div>
          </div>

        </div>

        {/* Coupons List Section */}
        <div className="space-y-12">
          
          {/* Promo Codes */}
          {storeCoupons.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Tag className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-extrabold text-slate-950">
                  Best {store.name} Coupon Codes ({storeCoupons.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeCoupons.map((coupon) => (
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

          {/* Sitewide Deals */}
          {storeDeals.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Percent className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-extrabold text-slate-950">
                  {store.name} Deals & Sales Promotions ({storeDeals.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeDeals.map((deal) => (
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

          {/* Savings Tips Section */}
          {store.savingsTips && store.savingsTips.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-lg">
                <Sparkles className="w-5 h-5" />
                <h2>How to Save Money at {store.name}</h2>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                {store.savingsTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQs Section */}
          {store.faqs && store.faqs.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
              <h2 className="text-xl font-extrabold text-slate-950">
                {store.name} Coupon FAQs
              </h2>
              <div className="space-y-3">
                {store.faqs.map((faq, i) => {
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

          {/* Similar Stores */}
          {similarStores.length > 0 && (
            <div>
              <h2 className="text-xl font-extrabold text-slate-950 mb-4">
                Similar Stores in {store.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {similarStores.map((s) => (
                  <StoreCard key={s.id} store={s} />
                ))}
              </div>
            </div>
          )}

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
