export type OfferType = 'coupon' | 'deal';
export type DiscountType = 'percent' | 'fixed' | 'shipping' | 'deal';

export interface Store {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  category: string;
  categorySlug: string;
  description: string;
  offerCount: number;
  couponCount: number;
  dealCount: number;
  bestDiscount: string;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  featured?: boolean;
  trending?: boolean;
  savingsTips?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface Offer {
  id: string;
  storeId: string;
  storeName: string;
  storeSlug: string;
  storeLogo: string;
  title: string;
  description: string;
  code?: string; // Optional for deal type
  discount: string;
  discountType: DiscountType;
  type: OfferType;
  category: string;
  categorySlug: string;
  verified: boolean;
  verifiedDate?: string;
  expirationDate: string;
  terms?: string;
  affiliateUrl: string;
  merchantUrl: string;
  clickCount: number;
  upvotes: number;
  downvotes: number;
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  offerCount: number;
  featured?: boolean;
  buyingGuide?: { title: string; text: string }[];
  faqs?: { question: string; answer: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage?: string;
}

export interface SeasonalCampaign {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  badge: string;
  offerCount: number;
  bgGradient: string;
  accentColor: string;
}
