'use client';

import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { Offer } from '@/data/types';

export default function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header onOpenSearch={() => setIsSearchOpen(true)} onOpenSubmit={() => setIsSubmitOpen(true)} onOpenSaved={() => setIsSavedOpen(true)} savedCount={0} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> About Dealzios
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Building a trustworthy, modern discount discovery platform.
          </h1>

          <div className="prose prose-slate max-w-none text-sm text-slate-600 space-y-4 leading-relaxed">
            <p>
              Dealzios was built to solve a simple problem: the online web is filled with spammy coupon directories listing expired or fake promo codes that waste shoppers' time.
            </p>

            <h3 className="text-lg font-bold text-slate-900">Our Core Principles</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zero Spam:</strong> We never display fake "100% verified" claims on synthetic codes. Every offer lists clear expiration and update information.</li>
              <li><strong>Modern Experience:</strong> Built with high-performance Web technologies to ensure instant search keystrokes and one-click code copying.</li>
              <li><strong>Community Driven:</strong> Shoppers can report broken codes, vote thumbs up/down, and submit new promotional codes.</li>
            </ul>
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
