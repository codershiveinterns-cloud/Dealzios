'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';

import { BLOG_POSTS } from '@/data/blog';
import { Offer } from '@/data/types';

export default function BlogIndexPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vv_saved_coupons');
      if (stored) setSavedIds(JSON.parse(stored));
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs mb-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Smart Shopping Guides
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Money-Saving Tips & Coupon Guides
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Expert strategies on finding valid promotional codes, avoiding expired vouchers, and maximizing online savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {post.coverImage && (
                  <div className="h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="bg-indigo-50 text-indigo-600 font-bold px-2.5 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs border-t border-slate-100 mt-4">
                <span className="text-slate-400 font-medium">{post.publishedAt}</span>
                <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer onOpenSubmit={() => setIsSubmitOpen(true)} />

      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectCoupon={setSelectedCoupon} />
      <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
      <SubmitCouponModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />
      <SavedCouponsModal isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} savedIds={savedIds} onToggleSave={() => {}} onSelectCoupon={setSelectedCoupon} onClearAll={() => {}} />
    </div>
  );
}
