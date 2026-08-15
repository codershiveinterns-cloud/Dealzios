'use client';

import React from 'react';
import Link from 'next/link';
import { Store } from '@/data/types';
import { ArrowRight, Tag } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link
      href={`/store/${store.slug}`}
      className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 flex items-center justify-between group relative overflow-hidden"
    >
      <div className="flex items-center gap-3.5 min-w-0 z-10">
        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-2 shrink-0 shadow-2xs group-hover:border-indigo-300 group-hover:scale-105 transition-all flex items-center justify-center">
          <img
            src={store.logo}
            alt={store.name}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">
            {store.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Tag className="w-3 h-3 text-indigo-500" />
              {store.offerCount} Offers
            </span>
            <span>•</span>
            <span className="text-emerald-600 font-bold text-[11px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
              {store.bestDiscount}
            </span>
          </div>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all shrink-0 ml-2 group-hover:translate-x-1 shadow-2xs z-10">
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};
