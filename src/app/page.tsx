'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShieldCheck, 
  RefreshCw, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  TrendingUp, 
  Percent, 
  Store as StoreIcon, 
  Grid,
  Activity,
  Flame,
  Award
} from 'lucide-react';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickSearchModal } from '@/components/QuickSearchModal';
import { CouponModal } from '@/components/CouponModal';
import { SubmitCouponModal } from '@/components/SubmitCouponModal';
import { SavedCouponsModal } from '@/components/SavedCouponsModal';
import { CouponCard } from '@/components/CouponCard';
import { StoreCard } from '@/components/StoreCard';
import { CategoryCard } from '@/components/CategoryCard';
import { SEOJsonLd } from '@/components/SEOJsonLd';

import { STORES } from '@/data/stores';
import { COUPONS } from '@/data/coupons';
import { DEALS } from '@/data/deals';
import { CATEGORIES } from '@/data/categories';
import { SEASONAL_CAMPAIGNS } from '@/data/seasonal';
import { Offer } from '@/data/types';

export default function HomePage() {
  const router = useRouter();
  const [heroQuery, setHeroQuery] = useState('');
  
  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Offer | null>(null);

  // Saved items state
  const [savedIds, setSavedIds] = useState<string[]>([]);
  
  // Tabs filter for coupons section
  const [activeTab, setActiveTab] = useState<'all' | 'coupons' | 'deals'>('all');

  // Accordion FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Expandable SEO Content section state
  const [seoExpanded, setSeoExpanded] = useState(false);

  // Load saved items from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dealzios_saved_coupons');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleSave = (couponId: string) => {
    let updated: string[];
    if (savedIds.includes(couponId)) {
      updated = savedIds.filter(id => id !== couponId);
    } else {
      updated = [...savedIds, couponId];
    }
    setSavedIds(updated);
    try {
      localStorage.setItem('dealzios_saved_coupons', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearSaved = () => {
    setSavedIds([]);
    try {
      localStorage.removeItem('dealzios_saved_coupons');
    } catch (e) {
      console.error(e);
    }
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(heroQuery.trim())}`);
    }
  };

  // Filter coupons for Today's Best Coupons section
  const allOffers = [...COUPONS, ...DEALS];
  const filteredOffers = allOffers.filter(offer => {
    if (activeTab === 'coupons') return offer.type === 'coupon';
    if (activeTab === 'deals') return offer.type === 'deal';
    return true;
  });

  const trendingStores = STORES.filter(s => s.trending);
  const popularDeals = DEALS.slice(0, 4);
  const popularStores = STORES.slice(0, 12);

  // FAQ Data
  const faqData = [
    {
      question: 'What is a coupon code?',
      answer: 'A coupon code (also called a promo code or discount code) is a code consisting of letters or numbers that online shoppers can enter during checkout to receive a discount on their purchase, free shipping, or a bonus promotional gift.'
    },
    {
      question: 'How do I use a promo code?',
      answer: 'Simply copy the promo code from Dealzios, click through to the merchant store, add your items to the shopping cart, and paste the code into the "Promo Code", "Coupon", or "Discount Code" field at checkout before completing payment.'
    },
    {
      question: 'How do I know if a coupon works?',
      answer: 'Our community and verification tools regularly check listed codes. Each coupon lists a verification timestamp showing when it was last checked and tested.'
    },
    {
      question: 'Are these coupons free to use?',
      answer: 'Yes! Dealzios is 100% free for all shoppers. You never need to pay or create a subscription to access our verified promo codes and deals.'
    },
    {
      question: 'Can I submit a coupon code?',
      answer: 'Absolutely! Click the "Submit a Coupon" button in the header to share a working promo code with our community. All submissions are tested by our team before going live.'
    },
    {
      question: 'What is the difference between a coupon and a deal?',
      answer: 'A coupon requires copying an alphanumeric code to enter at checkout. A deal represents a direct sale or promotional price drop applied automatically on the store\'s website without needing any manual code input.'
    },
    {
      question: 'Why did my coupon code not work?',
      answer: 'Coupon codes may fail if they have reached their expiration date, require a minimum order total, exclude sale/clearance items, or are restricted to specific geographic regions or first-time customer accounts.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <SEOJsonLd type="website" data={{}} />
      <SEOJsonLd type="organization" data={{}} />
      <SEOJsonLd type="faq" data={faqData} />

      {/* Header Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
        savedCount={savedIds.length}
      />

      <main className="flex-1">

        {/* 1. ANIMATED HERO SECTION */}
        <section className="relative bg-gradient-to-b from-white via-indigo-50/50 to-slate-50 border-b border-slate-200/80 pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
          
          {/* Animated Ambient Gradient Blobs */}
          <div className="absolute top-[-5rem] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-300/40 via-violet-300/30 to-emerald-200/30 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-glow" />
          <div className="absolute top-32 left-[-10%] w-[350px] h-[350px] bg-indigo-200/30 blur-3xl rounded-full pointer-events-none -z-10 animate-float" />
          <div className="absolute top-48 right-[-10%] w-[350px] h-[350px] bg-violet-200/30 blur-3xl rounded-full pointer-events-none -z-10 animate-float-delayed" />

          {/* Floating Teaser Pill Left */}
          <div className="hidden xl:flex items-center gap-3 absolute top-32 left-[5%] glass-card p-3 rounded-2xl shadow-xl border border-indigo-200/80 animate-float pointer-events-auto cursor-pointer hover:scale-105 transition-transform" onClick={() => setSelectedCoupon(COUPONS[0])}>
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">25%</div>
            <div>
              <div className="text-xs font-bold text-slate-900">Nike Promo Code</div>
              <div className="text-[10px] text-emerald-600 font-semibold">✓ Tested 10m ago</div>
            </div>
          </div>

          {/* Floating Teaser Pill Right */}
          <div className="hidden xl:flex items-center gap-3 absolute top-40 right-[5%] glass-card p-3 rounded-2xl shadow-xl border border-emerald-200/80 animate-float-delayed pointer-events-auto cursor-pointer hover:scale-105 transition-transform" onClick={() => setSelectedCoupon(COUPONS[5])}>
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">72%</div>
            <div>
              <div className="text-xs font-bold text-slate-900">NordVPN Special</div>
              <div className="text-[10px] text-indigo-600 font-semibold">⚡ Verified Today</div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            {/* Live Activity Ticker Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-indigo-100 shadow-md text-xs font-semibold text-slate-800 mb-6 hover:border-indigo-300 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>⚡ <strong className="text-indigo-600">1,420+</strong> promo codes verified in the last hour</span>
            </div>

            {/* Main Animated Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 max-w-4xl mx-auto leading-[1.1]">
              Find coupons that <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent inline-block hover:scale-[1.01] transition-transform">actually save you money.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Discover verified promo codes, exclusive deals, and discounts from thousands of popular stores.
            </p>

            {/* Large Search Box with Glowing Gradient Ring */}
            <div className="mt-8 max-w-2xl mx-auto relative">
              <div className="p-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 shadow-2xl shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/35">
                <form onSubmit={handleHeroSearch} className="relative flex items-center bg-white rounded-[22px] p-2 shadow-inner group">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center ml-1 shrink-0 font-bold group-focus-within:bg-indigo-600 group-focus-within:text-white transition-all duration-200">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={heroQuery}
                    onChange={(e) => setHeroQuery(e.target.value)}
                    placeholder="Search stores, brands or promo codes (e.g. Nike, Canva, NordVPN)..."
                    className="w-full px-3.5 py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent outline-none font-semibold"
                  />
                  {heroQuery && (
                    <button
                      type="button"
                      onClick={() => setHeroQuery('')}
                      className="p-1 text-slate-400 hover:text-slate-600 mr-2 text-xs font-bold"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 shrink-0 flex items-center gap-2"
                  >
                    <span>Find Coupon Codes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Hero Instant Auto-Suggestion Dropdown */}
              {heroQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 z-40 text-left space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-2">
                    Matching Stores & Coupon Codes
                  </div>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {/* Matching Stores */}
                    {STORES.filter(s => s.name.toLowerCase().includes(heroQuery.toLowerCase()) || s.slug.toLowerCase().includes(heroQuery.toLowerCase())).slice(0, 3).map(store => (
                      <Link
                        key={store.id}
                        href={`/store/${store.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-indigo-50/60 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={store.logo} alt={store.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                          <div>
                            <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600">{store.name}</div>
                            <div className="text-[11px] text-slate-500">{store.offerCount} Offers Available</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          {store.bestDiscount}
                        </span>
                      </Link>
                    ))}

                    {/* Matching Coupon Codes */}
                    {[...COUPONS, ...DEALS].filter(c => 
                      c.storeName.toLowerCase().includes(heroQuery.toLowerCase()) ||
                      c.title.toLowerCase().includes(heroQuery.toLowerCase()) ||
                      (c.code ? c.code.toLowerCase().includes(heroQuery.toLowerCase()) : false)
                    ).slice(0, 3).map(offer => (
                      <div
                        key={offer.id}
                        onClick={() => setSelectedCoupon(offer)}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-indigo-50/60 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={offer.storeLogo} alt={offer.storeName} className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0" />
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-xs truncate group-hover:text-indigo-600">{offer.title}</div>
                            <div className="text-[11px] text-indigo-600 font-mono font-bold">{offer.code}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md shrink-0">
                          Show Code
                        </span>
                      </div>
                    ))}

                    {STORES.filter(s => s.name.toLowerCase().includes(heroQuery.toLowerCase())).length === 0 && 
                     [...COUPONS, ...DEALS].filter(c => c.storeName.toLowerCase().includes(heroQuery.toLowerCase()) || c.title.toLowerCase().includes(heroQuery.toLowerCase()) || c.code?.toLowerCase().includes(heroQuery.toLowerCase())).length === 0 && (
                      <div className="p-3 text-xs text-slate-500 text-center">
                        Press Enter to view all results for "{heroQuery}"
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleHeroSearch}
                    className="w-full pt-2 border-t border-slate-100 text-center text-xs font-bold text-indigo-600 hover:underline flex items-center justify-center gap-1"
                  >
                    <span>View all results for "{heroQuery}"</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Popular Quick Searches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mr-1">
                Popular:
              </span>
              {['Amazon', 'Nike', 'Walmart', 'Adobe', 'Canva', 'NordVPN', 'Booking.com', 'Uber'].map((brand) => (
                <Link
                  key={brand}
                  href={`/store/${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                  className="bg-white hover:bg-indigo-600 text-slate-700 hover:text-white px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-2xs transition-all font-semibold hover:scale-105 hover:shadow-md hover:shadow-indigo-500/10"
                >
                  {brand}
                </Link>
              ))}
            </div>

            {/* Animated Live Stats Bar */}
            <div className="mt-12 max-w-3xl mx-auto grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/60">
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
                <div className="text-xl sm:text-2xl font-black text-indigo-950">30+</div>
                <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Top Brands</div>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
                <div className="text-xl sm:text-2xl font-black text-emerald-600">60+</div>
                <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Verified Codes</div>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-indigo-300 transition-colors">
                <div className="text-xl sm:text-2xl font-black text-violet-600">100%</div>
                <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Free Savings</div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. TRENDING STORES SECTION */}
        <section id="trending" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-1">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>Trending Right Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Trending Stores
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Popular stores shoppers are searching for right now.
              </p>
            </div>
            <Link
              href="/stores"
              className="text-indigo-600 hover:text-indigo-800 font-bold text-xs sm:text-sm flex items-center gap-1 shrink-0 group"
            >
              <span>View all 30+ stores</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        {/* 3. TODAY'S BEST COUPONS SECTION */}
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-emerald-600 mb-1">
                  <Award className="w-4 h-4 text-emerald-500" /> Tested Today
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Today's Best Coupons
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Hand-tested promo codes & discounts ready for instant redemption.
                </p>
              </div>

              {/* Tabs Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto border border-slate-200/60">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all transform active:scale-95 ${
                    activeTab === 'all' ? 'bg-white text-indigo-600 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Offers ({allOffers.length})
                </button>
                <button
                  onClick={() => setActiveTab('coupons')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all transform active:scale-95 ${
                    activeTab === 'coupons' ? 'bg-white text-indigo-600 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Promo Codes ({COUPONS.length})
                </button>
                <button
                  onClick={() => setActiveTab('deals')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all transform active:scale-95 ${
                    activeTab === 'deals' ? 'bg-white text-indigo-600 shadow-2xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Deals ({DEALS.length})
                </button>
              </div>
            </div>

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.slice(0, 6).map((offer) => (
                <CouponCard
                  key={offer.id}
                  coupon={offer}
                  onSelect={setSelectedCoupon}
                  isSaved={savedIds.includes(offer.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/coupons"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:scale-105 transition-all group"
              >
                <span>Browse All Working Coupons & Deals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>

        {/* 4. "WHY TRUST US?" TRUST SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Stop wasting time on expired coupon codes.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              We focus on active discount offers so you never get stuck with invalid codes at checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-950 text-lg">1. Verified Offers</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Prioritize active and recently checked offers tested by real community shoppers.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-950 text-lg">2. Updated Deals</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Keep listings fresh with expiration and update information clear on every offer.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-950 text-lg">3. Easy to Use</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Find a discount, copy the code with one click, and shop directly at merchant websites.
              </p>
            </div>

          </div>
        </section>

        {/* 5. POPULAR DEALS RIGHT NOW SECTION */}
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  <Sparkles className="w-4 h-4" /> Direct Store Sales
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Popular Deals Right Now
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  High-value sitewide promotions that don't require entering a code.
                </p>
              </div>

              <Link
                href="/deals"
                className="text-indigo-400 hover:text-indigo-300 font-bold text-xs sm:text-sm flex items-center gap-1 shrink-0 group"
              >
                <span>View all deals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between hover:border-indigo-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={deal.storeLogo}
                          alt={deal.storeName}
                          className="w-10 h-10 rounded-xl object-contain bg-white p-1"
                        />
                        <span className="font-bold text-sm text-slate-300">{deal.storeName}</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold px-3 py-1 rounded-full">
                        {deal.discount}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xl text-white group-hover:text-indigo-300 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {deal.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Exp: {deal.expirationDate}</span>
                    <button
                      onClick={() => setSelectedCoupon(deal)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Get Deal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CATEGORIES SECTION */}
        <section id="categories" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Browse Savings by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore discount offers across 12 distinct shopping categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* 7. SEASONAL DEALS CAMPAIGNS WITH MOVING GRADIENT */}
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Seasonal Sales & Events
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore curated sales events throughout the year.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SEASONAL_CAMPAIGNS.map((campaign) => (
                <div
                  key={campaign.id}
                  className={`rounded-3xl bg-gradient-to-r ${campaign.bgGradient} p-8 text-white shadow-xl flex flex-col justify-between space-y-4 animate-gradient-move hover:scale-[1.01] transition-transform`}
                >
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wider">
                      {campaign.badge}
                    </span>
                    <h3 className="text-2xl font-black">{campaign.title}</h3>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      {campaign.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-white/80">{campaign.offerCount} Offers Available</span>
                    <Link
                      href="/deals"
                      className="px-4 py-2 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all hover:scale-105 flex items-center gap-1.5"
                    >
                      <span>Explore Deals</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. HOW IT WORKS SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              How Dealzios Works
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Start saving money on your online orders in 3 quick steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-2xs text-center space-y-3 relative hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="text-4xl font-black text-indigo-600/20 group-hover:text-indigo-600/40 transition-colors mb-2">01</div>
              <h3 className="font-extrabold text-slate-900 text-lg">1. Search</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Find your favorite store or brand using our live search header.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-2xs text-center space-y-3 relative hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="text-4xl font-black text-indigo-600/20 group-hover:text-indigo-600/40 transition-colors mb-2">02</div>
              <h3 className="font-extrabold text-slate-900 text-lg">2. Choose</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Pick the best available verified coupon code or sitewide deal.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-2xs text-center space-y-3 relative hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="text-4xl font-black text-indigo-600/20 group-hover:text-indigo-600/40 transition-colors mb-2">03</div>
              <h3 className="font-extrabold text-slate-900 text-lg">3. Save</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Copy your promo code with one click and complete checkout at the store.
              </p>
            </div>

          </div>
        </section>

        {/* 9. POPULAR STORES LIST */}
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">Popular Stores</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Top brand discounts tested by shoppers.</p>
              </div>
              <Link href="/stores" className="text-xs font-bold text-indigo-600 hover:underline">
                View All Stores &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {popularStores.map((store) => (
                <Link
                  key={store.id}
                  href={`/store/${store.slug}`}
                  className="p-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 rounded-xl flex flex-col items-center text-center transition-all hover:scale-105 group"
                >
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-10 h-10 object-contain rounded-lg mb-2 bg-white p-1 border border-slate-200 group-hover:border-indigo-300 transition-colors"
                  />
                  <span className="font-bold text-xs text-slate-800 group-hover:text-indigo-600 line-clamp-1">
                    {store.name}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                    {store.bestDiscount}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 10. SEO CONTENT SECTION */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-2xs space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Your guide to saving more online
            </h2>

            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>
                Online shopping offers unprecedented convenience, but paying full retail price is rarely necessary. Retailers regularly publish promotional codes, limited-time coupon vouchers, and sitewide flash sales to incentivize shoppers.
              </p>

              <h3 className="text-base sm:text-lg font-bold text-slate-900">What are promo codes and how do they work?</h3>
              <p>
                A promotional code (also referred to as a coupon code, discount code, or promo voucher) is an alphanumeric string generated by an e-commerce store. When entered during the payment checkout step, the merchant's shopping cart recalculates your total price by deducting a fixed dollar amount or percentage discount.
              </p>

              <h3 className="text-base sm:text-lg font-bold text-slate-900">Difference between coupons and deals</h3>
              <p>
                Understanding the distinction helps you maximize savings:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Coupon Codes:</strong> Require copying a specific code (e.g. <code>NIKE25SPRING</code>) and pasting it into the checkout promo code box.</li>
                <li><strong>Deals / Sales:</strong> Direct price drops applied directly to items on the merchant website without requiring code entry.</li>
              </ul>

              {seoExpanded && (
                <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">How to identify expired or invalid coupons</h3>
                  <p>
                    Invalid coupon codes usually occur because:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>The promotion reached its scheduled expiration date.</li>
                    <li>Your cart subtotal falls below the minimum order threshold required for the discount.</li>
                    <li>Certain brand items or clearance products are explicitly excluded in the terms.</li>
                    <li>The coupon is restricted to first-time customer accounts or verified student profiles.</li>
                  </ol>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Pro strategies for stacking discounts</h3>
                  <p>
                    To get the lowest possible checkout total, combine a sitewide clearance deal with an active promo code, then select free shipping thresholds or join free store loyalty rewards programs for extra perks.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 focus:outline-none pt-2"
            >
              <span>{seoExpanded ? 'Show Less' : 'Read Full Savings Guide'}</span>
              {seoExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </section>

        {/* 11. HOMEPAGE FAQ ACCORDION SECTION */}
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Everything you need to know about using Dealzios.
              </p>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:text-indigo-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 border-t border-slate-200/60 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onOpenSubmit={() => setIsSubmitOpen(true)} />

      {/* Modals */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCoupon={setSelectedCoupon}
      />

      <CouponModal
        coupon={selectedCoupon}
        onClose={() => setSelectedCoupon(null)}
      />

      <SubmitCouponModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />

      <SavedCouponsModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        onSelectCoupon={setSelectedCoupon}
        onClearAll={handleClearSaved}
      />
    </div>
  );
}
