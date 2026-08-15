'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Tag, 
  Percent, 
  Store as StoreIcon, 
  Grid, 
  TrendingUp, 
  PlusCircle, 
  Heart, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSubmit: () => void;
  onOpenSaved: () => void;
  savedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSubmit,
  onOpenSaved,
  savedCount = 0
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Banner with Pulse Animation */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800 relative z-50">
        <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-indigo-500/30 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} /> 
          Back to School Sale
        </span>
        <span className="hidden sm:inline text-slate-300">Save up to 75% on laptops, software, and student apparel today!</span>
        <Link 
          href="/deals" 
          className="inline-flex items-center gap-1 underline hover:text-white transition-colors ml-1 font-bold text-white group"
        >
          <span>Explore Deals</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ${
          isScrolled ? 'shadow-md py-2.5 border-slate-200/90' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            
            {/* Brand Logo with Rotate & Glow Animation */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-110 transition-all duration-300">
                <Tag className="w-5 h-5 -rotate-45 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors">
                  Deal<span className="text-indigo-600 group-hover:text-violet-600 transition-colors">zios</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-500/80 -mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Verified Codes
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Animated Underlines & Hover Pills */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
              
              {/* Coupons Link */}
              <Link 
                href="/coupons" 
                className="nav-link-animated px-3 py-1.5 rounded-xl hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 flex items-center gap-1.5 group"
              >
                <Tag className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-200" />
                <span>Coupons</span>
              </Link>

              {/* Deals Link */}
              <Link 
                href="/deals" 
                className="nav-link-animated px-3 py-1.5 rounded-xl hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 flex items-center gap-1.5 group"
              >
                <Percent className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-200" />
                <span>Deals</span>
              </Link>

              {/* Stores Link */}
              <Link 
                href="/stores" 
                className="nav-link-animated px-3 py-1.5 rounded-xl hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 flex items-center gap-1.5 group"
              >
                <StoreIcon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-200" />
                <span>Stores</span>
              </Link>

              {/* Categories Link */}
              <Link 
                href="/#categories" 
                className="nav-link-animated px-3 py-1.5 rounded-xl hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 flex items-center gap-1.5 group"
              >
                <Grid className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-200" />
                <span>Categories</span>
              </Link>

              {/* Trending Link */}
              <Link 
                href="/#trending" 
                className="nav-link-animated px-3 py-1.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 flex items-center gap-1.5 group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-slate-900 font-bold group-hover:text-emerald-700">Trending</span>
              </Link>

              {/* Affiliate Disclosure with Hover Popover Entrance Animation */}
              <div className="relative group px-1 py-1">
                <Link 
                  href="/affiliate-disclosure"
                  className="nav-link-animated px-3 py-1.5 rounded-xl hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 flex items-center gap-1.5 font-semibold text-slate-700"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Affiliate Disclosure</span>
                </Link>
                
                {/* Popover Preview Box on Hover with Scale & Fade */}
                <div className="absolute top-full right-1/2 translate-x-1/2 mt-2.5 w-80 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xl transition-all duration-300 transform origin-top group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 opacity-0 invisible scale-95 group-hover:scale-100 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-t border-l border-slate-200 rotate-45"></div>
                  <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-[11px] uppercase tracking-wider mb-1.5 relative z-10">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Transparency</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed relative z-10 font-normal">
                    Some links on this site are affiliate links. We may earn a commission at no extra cost to you. Our content remains independent and research-based.
                  </p>
                </div>
              </div>

            </nav>

            {/* Desktop Search Bar Trigger */}
            <div className="hidden md:flex flex-1 max-w-md mx-2">
              <button
                onClick={onOpenSearch}
                className="w-full bg-slate-100/80 hover:bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 rounded-full px-3.5 py-1.5 text-sm text-slate-500 flex items-center justify-between group transition-all duration-300"
                aria-label="Search stores, brands or coupon codes"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-slate-500 group-hover:text-slate-900 text-xs sm:text-sm font-semibold transition-colors">Search stores, brands or promo codes...</span>
                </div>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 bg-white text-slate-500 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs group-hover:border-indigo-300 group-hover:text-indigo-600 transition-colors">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              
              {/* Mobile Search Button */}
              <button
                onClick={onOpenSearch}
                className="md:hidden p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 transition-all"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5 text-indigo-600" />
              </button>

              {/* Saved Coupons Button with Heart Animation */}
              <button
                onClick={onOpenSaved}
                className="relative p-2.5 rounded-xl text-slate-700 bg-slate-100/90 hover:bg-rose-50 hover:text-rose-600 active:scale-95 transition-all group"
                title="Saved Coupons & Stores"
                aria-label="Saved Items"
              >
                <Heart className={`w-5 h-5 text-rose-500 fill-rose-100 group-hover:fill-rose-500 transition-all ${savedCount > 0 ? 'animate-heart-pulse text-rose-600 fill-rose-500' : 'group-hover:scale-125'}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Submit Coupon Button with Rotate Animation & Shimmer */}
              <button
                onClick={onOpenSubmit}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all hover:scale-105 active:scale-95 shrink-0 group shimmer-effect"
              >
                <PlusCircle className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
                <span>Submit Coupon</span>
              </button>

              {/* Mobile Hamburger Drawer Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-indigo-600" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer with Staggered Scale Items */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full bg-slate-100 border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-medium text-slate-600 flex items-center justify-between shadow-2xs active:scale-98 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-slate-800">Search stores, brands or promo codes...</span>
              </div>
              <span className="bg-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-2xs">SEARCH</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2 text-sm font-bold text-slate-800">
              <Link 
                href="/coupons" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 active:scale-95 transition-all"
              >
                <Tag className="w-4 h-4 text-indigo-600" />
                <span>Coupons</span>
              </Link>
              <Link 
                href="/deals" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 active:scale-95 transition-all"
              >
                <Percent className="w-4 h-4 text-indigo-600" />
                <span>Deals</span>
              </Link>
              <Link 
                href="/stores" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 active:scale-95 transition-all"
              >
                <StoreIcon className="w-4 h-4 text-indigo-600" />
                <span>Stores</span>
              </Link>
              <Link 
                href="/affiliate-disclosure" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Affiliate Disclosure</span>
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 active:scale-95 transition-all col-span-2"
              >
                <Tag className="w-4 h-4 text-indigo-600" />
                <span>Contact Us</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSubmit();
                }}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Submit a Coupon</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
