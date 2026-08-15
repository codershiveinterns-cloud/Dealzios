'use client';

import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { Offer } from '@/data/types';

export default function SubmitCouponPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const [storeName, setStoreName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
            <PlusCircle className="w-4 h-4" /> Share A Deal
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
              Submit a Coupon Code
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Found a working promo code or store sale? Share it with the Dealzios community.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 text-xl">Submission Received!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Our content verification team will test your code. Submitted offers are reviewed before appearing publicly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Store / Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Nike, Canva"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Store Website URL</label>
                  <input
                    type="url"
                    value={storeUrl}
                    onChange={(e) => setStoreUrl(e.target.value)}
                    placeholder="https://merchant.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Coupon Code (Leave empty if deal)</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. SAVE25"
                    className="w-full px-3.5 py-2.5 text-sm font-mono uppercase border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Discount Title / Amount *</label>
                  <input
                    type="text"
                    required
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="e.g. 25% Off Select Footwear"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Offer Expiration Date</label>
                <input
                  type="date"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Offer Terms & Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide any minimum spending thresholds or excluded items."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Contact Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-600 transition-colors"
                />
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Submitted offers are reviewed before appearing publicly to maintain platform quality and prevent fake codes.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all"
              >
                Submit Coupon
              </button>
            </form>
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
