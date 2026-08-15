'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/data/types';
import { 
  Shirt, 
  Laptop, 
  Code, 
  Plane, 
  Utensils, 
  Sparkles, 
  Home, 
  GraduationCap, 
  Wallet, 
  Shield, 
  Gamepad2, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Shirt,
  Laptop,
  Code,
  Plane,
  Utensils,
  Sparkles,
  Home,
  GraduationCap,
  Wallet,
  Shield,
  Gamepad2,
  ShoppingBag
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const IconComponent = ICON_MAP[category.iconName] || ShoppingBag;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all duration-300 mb-3 shadow-2xs group-hover:scale-110 group-hover:rotate-3">
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-4 text-xs relative z-10">
        <span className="font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
          {category.offerCount} Active Offers
        </span>
        <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
