'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileCheck, ShieldAlert, Scale, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { Offer } from '@/data/types';

export default function TermsPage() {
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

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Card Content Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8">
          
          {/* Top Scale Icon */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Scale className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Terms of Service</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Last updated: August 15, 2026 | Version 2.4
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Terms Summary</strong>
              Welcome to Dealzios. By using our website, you agree to these Terms of Service. Dealzios is a free coupon aggregator helping shoppers find promotional discounts. Third-party merchant codes are subject to merchant terms.
            </div>
          </div>

          {/* Structured Policy Sections */}
          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            
            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">1. Acceptance of Agreement</h2>
              <p>
                These Terms of Service ("Agreement") govern your access to and use of Dealzios (located at dealzios.com), including any subdomains, mobile views, features, and tools provided by Dealzios Inc.
              </p>
              <p>
                By accessing, browsing, or using Dealzios, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree to these terms, please discontinue using the service immediately.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">2. Description of Service</h2>
              <p>
                Dealzios provides a digital deal aggregator platform that curates, tests, and lists promotional coupon codes, sales discounts, and merchant deals for third-party online retailers.
              </p>
              <p>
                Dealzios provides this service 100% free of charge to users. We do not process payments for retail products directly on our website.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">3. Use of Coupon Codes & Merchant Pricing</h2>
              <p>
                All promotional offers, coupon codes, and discounts listed on Dealzios are provided for informational and money-saving purposes. Please note:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong className="text-slate-900">Merchant Discretion:</strong> Third-party store merchants (such as Nike, Amazon, Canva, etc.) reserve the right to alter, discontinue, or revoke promo codes, pricing, or promotion dates at any time without notice.
                </li>
                <li>
                  <strong className="text-slate-900">No Guarantee:</strong> Dealzios does not guarantee merchant product availability, inventory stock, order fulfillment, or acceptance of any promo code during checkout on merchant websites.
                </li>
                <li>
                  <strong className="text-slate-900">Code Exclusions:</strong> Certain promo codes may require minimum cart order values, brand exclusions, or single-use account limits dictated by the merchant.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">4. User Submissions & Code Reporting</h2>
              <p>
                Dealzios allows users to submit promo codes via our submission tool. By submitting a coupon code or offer to Dealzios, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li>The promotional offer is genuine, publicly accessible, and legally sharable.</li>
                <li>The submission does not contain malicious links, spam, malware, or proprietary code.</li>
                <li>You grant Dealzios a non-exclusive, royalty-free license to publish, display, and verify the submitted code.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">5. Intellectual Property Rights</h2>
              <p>
                The Dealzios platform, including original code, design tokens, logo, branding, and original content guides, is protected by copyright and intellectual property laws.
              </p>
              <p>
                All third-party brand names, logos, trademarks, and store images referenced on Dealzios belong exclusively to their respective owners (e.g., Nike, Amazon, Adobe, Canva). Their presence does not imply direct endorsement or sponsorship unless specified.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-indigo-600" />
                6. Limitation of Liability & Disclaimer of Warranties
              </h2>
              <p>
                Dealzios is provided on an "AS IS" and "AS AVAILABLE" basis. To the maximum extent permitted by applicable law, Dealzios disclaims all warranties, express or implied, including fitness for a particular purpose or non-infringement.
              </p>
              <p>
                In no event shall Dealzios Inc., its founders, or team members be liable for any indirect, incidental, or consequential damages arising out of your reliance on merchant promo codes or transactions completed on third-party merchant sites.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">7. Third-Party Links & Affiliate Disclosure</h2>
              <p>
                Dealzios contains outbound affiliate referral links. When you click on a store link or coupon CTA button and complete a purchase, Dealzios may receive a referral commission from the merchant at no additional cost to you. For full details, please review our{' '}
                <Link href="/affiliate-disclosure" className="text-indigo-600 underline font-semibold">
                  Affiliate Link Disclosure
                </Link>.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">8. Governing Law & Updates to Terms</h2>
              <p>
                These Terms shall be governed and construed in accordance with the applicable laws of India. We reserve the right to modify or replace these Terms at any time. Continued use of Dealzios after changes constitutes acceptance of the new terms.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                9. Questions or Concerns?
              </h2>
              <p>
                If you have any questions regarding these Terms of Service, please reach out to our team at:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
                <div><strong className="text-slate-900">Email:</strong> <a href="mailto:support@dealzios.com" className="text-indigo-600 underline font-semibold">support@dealzios.com</a></div>
                <div><strong className="text-slate-900">Support Desk:</strong> <Link href="/contact" className="text-indigo-600 underline font-semibold">Contact Dealzios Team</Link></div>
              </div>
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
