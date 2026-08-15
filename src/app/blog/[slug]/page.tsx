'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';

import { BLOG_POSTS } from '@/data/blog';
import { Offer } from '@/data/types';

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const post = BLOG_POSTS.find(p => p.slug === slug);

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

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header onOpenSearch={() => setIsSearchOpen(true)} onOpenSubmit={() => setIsSubmitOpen(true)} onOpenSaved={() => setIsSavedOpen(true)} savedCount={savedIds.length} />
        <div className="max-w-md mx-auto my-20 text-center space-y-4 px-4">
          <h1 className="text-2xl font-bold text-slate-900">Article Not Found</h1>
          <p className="text-sm text-slate-500">We couldn't find an article matching "{slug}".</p>
          <Link href="/blog" className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
            Back to Savings Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
          
          <div className="space-y-3">
            <div className="inline-block bg-indigo-50 text-indigo-600 font-extrabold text-xs px-3 py-1 rounded-full">
              {post.category}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-snug">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                <span className="font-bold text-slate-900">{post.author.name}</span>
                <span className="text-slate-400">({post.author.role})</span>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>
          </div>

          {post.coverImage && (
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img src={post.coverImage} alt={post.title} className="w-full h-auto max-h-96 object-cover" />
            </div>
          )}

          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {post.content}
          </div>

        </article>
      </main>

      <Footer onOpenSubmit={() => setIsSubmitOpen(true)} />

      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectCoupon={setSelectedCoupon} />
      <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
      <SubmitCouponModal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} />
      <SavedCouponsModal isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} savedIds={savedIds} onToggleSave={() => {}} onSelectCoupon={setSelectedCoupon} onClearAll={() => {}} />
    </div>
  );
}
