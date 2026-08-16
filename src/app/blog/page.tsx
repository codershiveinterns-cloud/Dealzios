'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Search, 
  User, 
  Tag, 
  TrendingUp, 
  Mail, 
  CheckCircle2, 
  ShieldCheck,
  Filter
} from 'lucide-react';
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
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  
  // Blog Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Newsletter Subscribe state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dealzios_saved_coupons');
      if (stored) setSavedIds(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const categories = ['All', 'Coupon Guide', 'Student Savings', 'Smart Shopping', 'SaaS & Tech', 'Shopping Hacks', 'Holiday Deals'];

  // Filter posts by category and search query
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const leadPost = BLOG_POSTS[0];
  const gridPosts = selectedCategory === 'All' && !searchQuery.trim() 
    ? BLOG_POSTS.slice(1) 
    : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        
        {/* Editorial Hero Header Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Ambient Glow background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-[11px] uppercase tracking-wider rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>SAVINGS JOURNAL & EDITORIAL</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Smart Shopping Guides & Consumer Insights
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
              In-depth research on verified promo codes, student discounts, SaaS subscription savings, and e-commerce shopping strategies.
            </p>

            {/* Live Search & Filter Inputs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic, brand or guide..."
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-indigo-500 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none relative z-10">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-indigo-400" /> Topic:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Featured Article Showcase (When No Search Query and All Category) */}
        {selectedCategory === 'All' && !searchQuery.trim() && leadPost && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Editor's Choice</h2>
              </div>
            </div>

            <Link
              href={`/blog/${leadPost.slug}`}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden group hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 block"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 overflow-hidden bg-slate-100 relative">
                  <img
                    src={leadPost.coverImage}
                    alt={leadPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Must Read Guide
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="bg-indigo-50 text-indigo-600 font-extrabold px-3 py-1 rounded-full border border-indigo-100">
                      {leadPost.category}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" /> {leadPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 leading-snug group-hover:text-indigo-600 transition-colors">
                    {leadPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {leadPost.excerpt}
                  </p>

                  <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={leadPost.author.avatar}
                        alt={leadPost.author.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{leadPost.author.name}</div>
                        <div className="text-[10px] text-slate-400">{leadPost.author.role}</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 group-hover:translate-x-1.5 transition-transform duration-200">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Main Editorial Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              {selectedCategory === 'All' ? 'Latest Guides & Articles' : `${selectedCategory} Articles`} ({gridPosts.length})
            </h2>
            {searchQuery && (
              <span className="text-xs text-slate-500 font-medium">
                Showing results for "{searchQuery}"
              </span>
            )}
          </div>

          {gridPosts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">No articles found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No articles match your current search "{searchQuery}". Try clearing filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  <div>
                    {post.coverImage && (
                      <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-indigo-600 font-extrabold text-[11px] px-3 py-1 rounded-xl border border-slate-200/90 shadow-2xs">
                          {post.category}
                        </div>
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 font-semibold text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" /> {post.readTime}
                        </span>
                        <span>{post.publishedAt}</span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-950 group-hover:text-indigo-600 transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-xs font-bold text-slate-800">{post.author.name}</span>
                    </div>

                    <span className="text-xs font-extrabold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Savings Digest Newsletter Bar */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-indigo-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-full">
              <Mail className="w-3.5 h-3.5" /> Weekly Savings Digest
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get the best money-saving guides in your inbox.
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg">
              Join over 45,000+ smart shoppers. Weekly coupon drops, exclusive promo codes, and shopping strategies. No spam ever.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[300px]">
            {newsletterSubscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-3.5 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> You're subscribed! Check your inbox for top guides.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl outline-none w-full min-w-[220px]"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
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
