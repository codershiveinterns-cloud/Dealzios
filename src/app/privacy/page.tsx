'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Database, Cookie, Mail } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { Offer } from '@/data/types';

export default function PrivacyPage() {
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
          
          {/* Top Shield Icon */}
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Last updated: August 15, 2026 | Effective Date: January 1, 2026
            </p>
          </div>

          {/* Intro Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-bold block mb-0.5">Privacy Summary</strong>
              Dealzios respects your privacy. We do not sell your personal data, track your browsing across third-party websites, or require user account registration to access verified promo codes.
            </div>
          </div>

          {/* Structured Policy Sections */}
          <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
            
            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                1. Overview & Commitment
              </h2>
              <p>
                At Dealzios (accessible from dealzios.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document details the types of information collected and recorded by Dealzios and how we use, safeguard, and disclose it.
              </p>
              <p>
                By accessing or using Dealzios, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600" />
                2. Information We Collect
              </h2>
              <p>
                We minimize data collection to only what is necessary to operate our free coupon discovery service:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong className="text-slate-900">Automatically Collected Technical Data:</strong> When you browse Dealzios, our servers automatically record standard web log data, including your Internet Protocol (IP) address, browser type, operating system, referring URLs, pages viewed, and timestamps.
                </li>
                <li>
                  <strong className="text-slate-900">Voluntary Information:</strong> If you subscribe to our weekly newsletter, submit a coupon code via our submission form, or contact our support desk, we collect the email address and message details provided by you.
                </li>
                <li>
                  <strong className="text-slate-900">Local Device Storage (localStorage):</strong> When you click the heart icon to save coupons or stores, these saved items are stored locally inside your browser's local storage (`localStorage`). This data never leaves your device unless synced.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                3. How We Use Your Information
              </h2>
              <p>Dealzios uses the collected information for specific, transparent purposes:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>To maintain, optimize, and improve the speed and security of our web application.</li>
                <li>To deliver instant deal search results and measure popular coupon code popularity.</li>
                <li>To send weekly deal digest emails to subscribers (you can opt out at any time via the unsubscribe link).</li>
                <li>To respond to user inquiries, verify submitted promo codes, and prevent fraudulent activity.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Cookie className="w-4 h-4 text-indigo-600" />
                4. Cookies & Web Tracking
              </h2>
              <p>
                Dealzios uses essential cookies and similar tracking technologies to ensure core website functionality, remember session preferences, and calculate affiliate referral statistics when you click through to merchant websites.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you disable cookies, some features of merchant checkout links may not function as intended.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">5. Third-Party Services & Outbound Links</h2>
              <p>
                Dealzios contains links to third-party merchant stores (such as Nike, Amazon, Canva, NordVPN, etc.). Clicking on a deal or store link redirects you to an external merchant site.
              </p>
              <p>
                Please note that we have no control over the content, privacy policies, or practices of third-party websites. We strongly advise you to review the Privacy Policy of every merchant site you visit.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">6. Data Security & Encryption</h2>
              <p>
                The security of your data is important to us. Dealzios uses Secure Sockets Layer (SSL/TLS) encryption to protect information transmitted between your browser and our servers. All contact form submissions and newsletter signups are encrypted end-to-end.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-950">7. Your Data Protection Rights (GDPR & CCPA)</h2>
              <p>
                Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users possess specific privacy rights:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                <li><strong>The right to access:</strong> Request copies of your personal data held by us.</li>
                <li><strong>The right to erasure:</strong> Request that we delete any personal data collected (such as your newsletter email).</li>
                <li><strong>The right to opt-out:</strong> Unsubscribe from marketing emails instantly at any time.</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                8. Contact Our Data Protection Team
              </h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your data privacy rights, please contact our Data Protection Desk at:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
                <div><strong className="text-slate-900">Email:</strong> <a href="mailto:privacy@dealzios.com" className="text-indigo-600 underline font-semibold">privacy@dealzios.com</a></div>
                <div><strong className="text-slate-900">Contact Desk:</strong> <Link href="/contact" className="text-indigo-600 underline font-semibold">Dealzios Support Page</Link></div>
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
