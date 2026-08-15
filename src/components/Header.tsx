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
  Sparkles
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
      {/* Top Announcement Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
        <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-indigo-500/30">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Back to School Sale
        </span>
        <span className="hidden sm:inline">Save up to 75% on laptops, software, and student apparel today!</span>
        <Link href="/deals" className="underline hover:text-white transition-colors ml-1 font-semibold text-white">
          Explore Deals &rarr;
        </Link>
      </div>

      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 ${
          isScrolled ? 'shadow-sm py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Tag className="w-5 h-5 -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors">
                  Deal<span className="text-indigo-600">zios</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 -mt-1">
                  Verified Codes
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link 
                href="/coupons" 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1"
              >
                <Tag className="w-4 h-4 text-slate-400" />
                <span>Coupons</span>
              </Link>
              <Link 
                href="/deals" 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1"
              >
                <Percent className="w-4 h-4 text-slate-400" />
                <span>Deals</span>
              </Link>
              <Link 
                href="/stores" 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1"
              >
                <StoreIcon className="w-4 h-4 text-slate-400" />
                <span>Stores</span>
              </Link>
              <Link 
                href="/#categories" 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1"
              >
                <Grid className="w-4 h-4 text-slate-400" />
                <span>Categories</span>
              </Link>
              <Link 
                href="/#trending" 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1"
              >
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-900 font-semibold">Trending</span>
              </Link>

              {/* Affiliate Disclosure with Hover Popover */}
              <div className="relative group py-1">
                <Link 
                  href="/affiliate-disclosure"
                  className="flex items-center gap-1 hover:text-indigo-600 transition-colors font-medium"
                >
                  <span>Affiliate Disclosure</span>
                </Link>
                
                {/* Popover Preview Box on Hover */}
                <div className="absolute top-full right-1/2 translate-x-1/2 mt-2 w-72 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200 rotate-45"></div>
                  <p className="text-xs text-slate-600 leading-relaxed relative z-10">
                    Some links on this site are affiliate links. We may earn a commission at no extra cost to you. Our content remains independent and research-based.
                  </p>
                </div>
              </div>
            </nav>

            {/* Desktop Search Bar Trigger */}
            <div className="hidden md:flex flex-1 max-w-md mx-2">
              <button
                onClick={onOpenSearch}
                className="w-full bg-slate-100/80 hover:bg-slate-100 border border-slate-200/90 rounded-full px-4 py-2 text-sm text-slate-400 flex items-center justify-between group transition-all"
                aria-label="Search stores, brands or coupon codes"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <span className="text-slate-500 text-xs sm:text-sm">Search stores, brands or promo codes...</span>
                </div>
                <kbd className="hidden sm:inline-block bg-white text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              
              {/* Mobile Search Button */}
              <button
                onClick={onOpenSearch}
                className="md:hidden p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5 text-indigo-600" />
              </button>

              {/* Saved Coupons Button */}
              <button
                onClick={onOpenSaved}
                className="relative p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
                title="Saved Coupons & Stores"
                aria-label="Saved Items"
              >
                <Heart className="w-5 h-5 text-rose-500 fill-rose-50" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Submit Coupon Button */}
              <button
                onClick={onOpenSubmit}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Submit Coupon</span>
              </button>

              {/* Mobile Hamburger Drawer Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full bg-slate-100 border border-slate-200/90 rounded-xl px-4 py-3 text-xs font-medium text-slate-600 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>Search stores, brands or coupon codes...</span>
              </div>
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">SEARCH</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2 text-sm font-semibold text-slate-800">
              <Link 
                href="/coupons" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Tag className="w-4 h-4 text-indigo-600" />
                <span>Coupons</span>
              </Link>
              <Link 
                href="/deals" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Percent className="w-4 h-4 text-indigo-600" />
                <span>Deals</span>
              </Link>
              <Link 
                href="/stores" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <StoreIcon className="w-4 h-4 text-indigo-600" />
                <span>Stores</span>
              </Link>
              <Link 
                href="/affiliate-disclosure" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Affiliate Disclosure</span>
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
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
                className="w-full py-3 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
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
