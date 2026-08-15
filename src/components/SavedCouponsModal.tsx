'use client';

import React from 'react';
import { X, Heart, Trash2 } from 'lucide-react';
import { Offer } from '@/data/types';
import { COUPONS } from '@/data/coupons';
import { DEALS } from '@/data/deals';
import { CouponCard } from './CouponCard';

interface SavedCouponsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (couponId: string) => void;
  onSelectCoupon: (coupon: Offer) => void;
  onClearAll: () => void;
}

export const SavedCouponsModal: React.FC<SavedCouponsModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onToggleSave,
  onSelectCoupon,
  onClearAll
}) => {
  if (!isOpen) return null;

  const allOffers = [...COUPONS, ...DEALS];
  const savedOffers = allOffers.filter(o => savedIds.includes(o.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Saved Coupons & Deals</h3>
              <p className="text-xs text-slate-500">{savedOffers.length} bookmarked offers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedOffers.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 p-2 hover:bg-rose-50 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {savedOffers.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">No Saved Coupons Yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any coupon or deal card to bookmark it here for quick access later!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedOffers.map((offer) => (
                <CouponCard
                  key={offer.id}
                  coupon={offer}
                  onSelect={(selected) => {
                    onClose();
                    onSelectCoupon(selected);
                  }}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
