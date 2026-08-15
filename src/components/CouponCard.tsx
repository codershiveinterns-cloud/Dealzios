'use client';

import React from 'react';
import Link from 'next/link';
import { Offer } from '@/data/types';
import { ShieldCheck, Clock, Copy, ExternalLink, Heart, Tag, Percent, Sparkles } from 'lucide-react';

interface CouponCardProps {
  coupon: Offer;
  onSelect: (coupon: Offer) => void;
  isSaved?: boolean;
  onToggleSave?: (couponId: string) => void;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  onSelect,
  isSaved = false,
  onToggleSave
}) => {
  const isCoupon = coupon.type === 'coupon';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-5 flex flex-col justify-between relative group hover:border-indigo-300">
      
      {/* Subtle Glow Backdrop on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/5 via-violet-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Top Bar: Store Logo & Saved Toggle */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Link href={`/store/${coupon.storeSlug}`} className="flex items-center gap-3 group/store">
            <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs group-hover/store:border-indigo-400 group-hover/store:scale-105 transition-all">
              <img
                src={coupon.storeLogo}
                alt={coupon.storeName}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm group-hover/store:text-indigo-600 transition-colors line-clamp-1">
                {coupon.storeName}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                {isCoupon ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                    <Tag className="w-3 h-3 text-indigo-500" /> Code
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                    <Percent className="w-3 h-3 text-emerald-600" /> Deal
                  </span>
                )}
                {coupon.verified && (
                  <span className="inline-flex items-center gap-0.5 text-emerald-600 font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Save Button */}
          {onToggleSave && (
            <button
              onClick={() => onToggleSave(coupon.id)}
              className={`p-1.5 rounded-lg border transition-all transform active:scale-90 ${
                isSaved
                  ? 'bg-rose-50 border-rose-200 text-rose-600 scale-105 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save coupon'}
            >
              <Heart className={`w-4 h-4 transition-transform ${isSaved ? 'fill-rose-500 text-rose-500' : 'group-hover:scale-110'}`} />
            </button>
          )}
        </div>

        {/* Discount Badge & Title */}
        <div className="mb-3">
          <div className="inline-block font-black text-xl text-indigo-950 mb-1 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent group-hover:scale-105 inline-block transition-transform">
              {coupon.discount}
            </span>
          </div>
          <h4 
            onClick={() => onSelect(coupon)}
            className="font-bold text-slate-900 text-sm sm:text-base leading-snug cursor-pointer hover:text-indigo-600 transition-colors line-clamp-2"
          >
            {coupon.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {coupon.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Expiry & Action CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-2 relative z-10">
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Exp: {coupon.expirationDate}</span>
        </div>

        {isCoupon ? (
          <button
            onClick={() => onSelect(coupon)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all group/btn hover:scale-105 active:scale-95 shimmer-effect"
          >
            <Copy className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
            <span>Show Code</span>
          </button>
        ) : (
          <button
            onClick={() => onSelect(coupon)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <span>Get Deal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
