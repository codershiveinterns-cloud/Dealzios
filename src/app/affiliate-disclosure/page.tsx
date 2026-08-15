'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenSubmit={() => setIsSubmitOpen(true)} 
        onOpenSaved={() => setIsSavedOpen(true)} 
        savedCount={0} 
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Card Content */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-6">
          {/* Top Shield Icon */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Affiliate Disclosure</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Last updated: August 2026</p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <p>
              Transparency is important to us. This page explains how Dealzios may fund some of its content, resources, guides, comparisons, and recommendations. The short version: Dealzios may participate in affiliate programmes. If you purchase through certain links on our website, we may earn a commission. This comes at no extra cost to you.
            </p>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-950">Our Commitment to Honesty</h2>
              <p>
                Our goal is to provide helpful, practical, and research-based content for people choosing software, deals, SaaS tools, and money-saving coupons. Products and services mentioned on our website should be selected based on usefulness, features, security performance, pricing fit, ease of use, and individual protection needs.
              </p>
              <p>
                We do not accept payment to write fake positive reviews. Affiliate commissions should not control our opinions, comparisons, or recommendations.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-950">How Affiliate Links Work</h2>
              <p>
                When you click an affiliate link on our website to a third-party provider, such as a software service, tool company, password manager, or other provider, a tracking code may be used. This helps the provider know that you came from our website.
              </p>
              <p>
                If you decide to purchase a product or service through that link, Dealzios may receive a referral fee or commission. This can help cover the costs of running this website, creating resources, testing tools, maintaining content, and supporting our business operations.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-950">No Extra Cost to You</h2>
              <p>
                Using an affiliate link does not increase the price you pay. In some cases, affiliate links may provide access to special discounts, offers, or introductory pricing from the provider. Any discount, pricing, or offer is controlled by the third-party provider and may change at any time.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-950">Third-Party Services</h2>
              <p>
                Any third-party product or service you buy is provided by that company, not by Dealzios. Your purchase, account, billing, support, performance, refunds, and service terms are subject to the provider's own terms, privacy policy, and support process.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-950">Limitation of Liability</h2>
              <p>
                We try to keep information accurate and useful, but pricing, features, discounts, availability, and terms for third-party providers can change without notice. We cannot guarantee the performance, security, reliability, pricing, or support quality of any third-party service provider.
              </p>
              <p>
                You should always review the provider's latest pricing, features, terms, privacy policy, and refund policy before making a purchase.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-base font-bold text-slate-950">Questions?</h2>
              <p>
                If you have any questions about our affiliate relationships or how we fund this site, please contact us at{' '}
                <a href="mailto:support@dealzios.com" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                  support@dealzios.com
                </a>
                {' '}or via our{' '}
                <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                  Contact Page
                </Link>.
              </p>
            </div>
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
