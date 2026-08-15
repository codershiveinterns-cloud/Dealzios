'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { Offer } from '@/data/types';

export default function AffiliateDisclosurePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header onOpenSearch={() => setIsSearchOpen(true)} onOpenSubmit={() => setIsSubmitOpen(true)} onOpenSaved={() => setIsSavedOpen(true)} savedCount={0} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xs space-y-6">
          <h1 className="text-3xl font-black text-slate-950">Affiliate Link Disclosure</h1>
          <p className="text-xs text-slate-400">Last updated: August 15, 2026</p>

          <div className="prose prose-slate text-sm text-slate-600 space-y-4 leading-relaxed">
            <p>Dealzios believes in full transparency with our community regarding how our business is funded.</p>
            <h3 className="font-bold text-slate-900">Affiliate Links & Monetization</h3>
            <p>When you click on store links or "Shop Now / Get Deal" CTA buttons on Dealzios and complete a purchase on a merchant website, we may receive an affiliate referral commission from the merchant at no additional cost to you.</p>
            <p>Affiliate compensation does not influence our editorial rankings or coupon verification standards. We prioritize active, genuine discounts for our users.</p>
          </div>
        </div>
      </main>

      <Footer onOpenSubmit={() => setIsSubmitOpen(true)} />
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectCoupon={setSelectedCoupon} />
      <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
      <SubmitCouponModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />
      <SavedCouponsModal isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} savedIds={[]} onToggleSave={() => {}} onSelectCoupon={setSelectedCoupon} onClearAll={() => {}} />
    </div>
  );
}
