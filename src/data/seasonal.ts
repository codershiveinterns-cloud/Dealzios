import { SeasonalCampaign } from './types';

export const SEASONAL_CAMPAIGNS: SeasonalCampaign[] = [
  {
    id: 'back-to-school',
    title: 'Back to School 2026',
    slug: 'back-to-school',
    subtitle: 'Gear up for the new semester',
    description: 'Save on laptops, student software, backpack fashion, dorm essentials, and stationery.',
    badge: 'LIVE NOW',
    offerCount: 84,
    bgGradient: 'from-indigo-600 via-purple-600 to-pink-600',
    accentColor: 'bg-indigo-500'
  },
  {
    id: 'black-friday',
    title: 'Black Friday Sneak Peek',
    slug: 'black-friday',
    subtitle: 'The biggest shopping event of the year',
    description: 'Early bird promo codes and doorbuster deals across electronics, appliances, and luxury fashion.',
    badge: 'UPCOMING',
    offerCount: 156,
    bgGradient: 'from-slate-900 via-neutral-900 to-indigo-950',
    accentColor: 'bg-amber-500'
  },
  {
    id: 'cyber-monday',
    title: 'Cyber Monday Deals',
    slug: 'cyber-monday',
    subtitle: 'Exclusive digital & tech discounts',
    description: 'Deep savings on web hosting, VPN subscriptions, SaaS tools, and computer hardware.',
    badge: 'PREVIEW',
    offerCount: 112,
    bgGradient: 'from-blue-600 via-indigo-700 to-cyan-600',
    accentColor: 'bg-cyan-400'
  },
  {
    id: 'summer-sale',
    title: 'Summer Travel & Savings',
    slug: 'summer-sale',
    subtitle: 'Hot discounts for sunny days',
    description: 'Flight deals, hotel promo codes, swimwear, outdoor patio gear, and sunglasses.',
    badge: 'SEASONAL',
    offerCount: 98,
    bgGradient: 'from-amber-500 via-orange-500 to-rose-500',
    accentColor: 'bg-orange-500'
  }
];
