'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  ArrowLeft, 
  Users, 
  Zap, 
  Tag, 
  TrendingUp, 
  CheckCircle2, 
  PlusCircle, 
  Award, 
  Globe 
} from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenSubmit={() => setIsSubmitOpen(true)} 
        onOpenSaved={() => setIsSavedOpen(true)} 
        savedCount={0} 
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Banner Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm relative overflow-hidden space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>ABOUT DEALZIOS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight max-w-3xl leading-[1.15]">
            Building a trustworthy, modern discount discovery platform.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            Dealzios was created to eliminate the frustration of fake, expired promo codes on bloated websites. We empower smart shoppers with 100% verified discounts, transparent details, and instant savings.
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600">45,000+</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Active Shoppers</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">1,400+</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Verified Promo Codes</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">300+</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Partner Stores</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-2xl sm:text-3xl font-black text-violet-600">$2.4M+</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">User Savings</div>
            </div>
          </div>
        </div>

        {/* Our Story & Mission */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Why We Started Dealzios
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every online shopper has experienced the disappointment of copying a promo code at checkout, only to see <span className="text-rose-600 font-semibold">"Invalid or Expired Code"</span>. Traditional coupon websites collect thousands of unverified codes simply to trap search traffic, leading to wasted time and broken trust.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We set out to build Dealzios on three simple principles: <strong className="text-slate-900">real verification</strong>, <strong className="text-slate-900">speed</strong>, and <strong className="text-slate-900">community transparency</strong>.
            </p>
          </div>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 text-base">Zero Spam & Verified Codes</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We test codes continuously and display exact verification timestamps. No fake "100% working" badges on expired offers.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 text-base">Lightning-Fast Experience</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Built with modern Web technologies so search keystrokes, filter tabs, and one-click code copy respond instantly.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-violet-50/50 border border-violet-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-950 text-base">Community Driven</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Shoppers report broken codes, vote thumbs up/down, and submit working promo codes to help everyone save together.
              </p>
            </div>
          </div>
        </div>

        {/* How We Verify Coupons Step-by-Step */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              How We Verify Discounts
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Our 3-layer verification process ensures you never waste time at checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Merchant Feed Aggregation</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  We partner directly with brand affiliates, merchant newsletters, and official store feeds to collect active promo codes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Cart Checkout Testing</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Our system verifies code validity against cart minimums, regional restrictions, and category exclusions before publishing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Community Voting & Auditing</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Shoppers provide real-time feedback. If a code fails multiple times, it is automatically demoted or archived.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Coupon Community CTA */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-indigo-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold tracking-tight">Know a working coupon code?</h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg">
              Share your discount code with over 45,000 smart shoppers. Help our community save money every day!
            </p>
          </div>
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit a Coupon</span>
          </button>
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
