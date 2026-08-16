'use client';

import React, { useState } from 'react';
import { Offer } from '@/data/types';
import { X, Copy, Check, ThumbsUp, ThumbsDown, ShieldCheck, Clock, AlertCircle, Tag } from 'lucide-react';

interface CouponModalProps {
  coupon: Offer | null;
  onClose: () => void;
}

export const CouponModal: React.FC<CouponModalProps> = ({ coupon, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [userVoted, setUserVoted] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState<number>(coupon?.upvotes || 0);

  if (!coupon) return null;

  const handleCopyCode = () => {
    if (coupon.code) {
      try {
        navigator.clipboard.writeText(coupon.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 3500);
      } catch (e) {}
    }
  };

  const handleVote = (type: 'up' | 'down') => {
    if (userVoted === type) return;
    if (type === 'up') {
      setUpvoteCount(prev => prev + 1);
    }
    setUserVoted(type);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-2 mx-auto shadow-sm flex items-center justify-center">
            <img
              src={coupon.storeLogo}
              alt={coupon.storeName}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Coupon • Tested Recently</span>
          </div>

          <h3 className="text-xl font-extrabold text-slate-950 leading-snug">
            {coupon.title}
          </h3>

          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            {coupon.description}
          </p>
        </div>

        {/* Coupon Code Action Box */}
        <div className="p-6 space-y-5 bg-white">
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              <span>Copy Promo Code and Paste at Checkout:</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-200">
              <span className="font-mono text-xl sm:text-2xl font-black tracking-widest text-indigo-950 px-2 select-all">
                {coupon.code || 'DEALZIOS20'}
              </span>

              <button
                onClick={handleCopyCode}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all shadow-md active:scale-95 ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-indigo-600/25 hover:scale-105'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Code Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Verification & Expiry Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Expires {coupon.expirationDate}
            </span>
            <span className="text-slate-400">
              {coupon.clickCount.toLocaleString()} uses this week
            </span>
          </div>

          {/* Feedback Section */}
          <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Did this coupon work for you?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('up')}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  userVoted === 'up'
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Yes ({upvoteCount})</span>
              </button>

              <button
                onClick={() => handleVote('down')}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  userVoted === 'down'
                    ? 'bg-rose-100 border-rose-300 text-rose-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Terms Snippet */}
          {coupon.terms && (
            <div className="text-[11px] text-slate-400 bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{coupon.terms}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
