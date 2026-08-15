'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Send, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenSubmit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubmit }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      
      {/* Newsletter Bar */}
      <div className="border-b border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="max-w-xl space-y-2 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold rounded-full">
                <Mail className="w-3.5 h-3.5" /> Weekly Savings Digest
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Get the best deals directly in your inbox.
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Join over 45,000+ smart shoppers. Weekly coupon drops, exclusive promo codes, and money-saving alerts. No spam ever.
              </p>
            </div>

            <div className="w-full md:w-auto min-w-[300px] z-10">
              {subscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-3.5 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> You're subscribed! Check your inbox for top deals.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl outline-none w-full min-w-[220px]"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                <Tag className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Deal<span className="text-indigo-400">zios</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dealzios is a modern, trustworthy coupon and deals platform helping online shoppers discover verified promo codes, exclusive discounts, and store sales.
            </p>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Thousands of deals updated and checked regularly.</span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/coupons" className="hover:text-white transition-colors">Latest Coupons</Link></li>
              <li><Link href="/deals" className="hover:text-white transition-colors">Popular Deals</Link></li>
              <li><Link href="/stores" className="hover:text-white transition-colors">Store Directory</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/#trending" className="hover:text-white transition-colors">Trending Stores</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources & Content */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog" className="hover:text-white transition-colors">Savings Blog & Guides</Link></li>
              <li><Link href="/blog/how-to-find-working-coupon-codes" className="hover:text-white transition-colors">Coupon How-To Guide</Link></li>
              <li><Link href="/blog/ultimate-back-to-school-student-discounts" className="hover:text-white transition-colors">Student Discounts</Link></li>
              <li><Link href="/blog/coupons-vs-deals-difference" className="hover:text-white transition-colors">Coupons vs Deals</Link></li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li>
                <button onClick={onOpenSubmit} className="hover:text-white transition-colors text-left">
                  Submit a Coupon
                </button>
              </li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Legal Bar */}
        <div className="pt-8 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Dealzios Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
