import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    description: 'Save on top clothing brands, luxury fashion, activewear, sneakers, and designer accessories.',
    iconName: 'Shirt',
    offerCount: 142,
    featured: true,
    buyingGuide: [
      {
        title: 'Timing Your Fashion Purchases',
        text: 'Fashion brands typically run end-of-season clearance events in January/February and July/August with discounts reaching up to 70% off.'
      },
      {
        title: 'Stacking Student & Promo Discounts',
        text: 'Many apparel retailers like Nike and ASOS allow student verification via UNiDAYS or Student Beans to stack an extra 10-15% off coupon codes.'
      }
    ],
    faqs: [
      {
        question: 'Where can I find verified clothing promo codes?',
        answer: 'Dealzios checks and tests apparel codes daily from major retailers including Nike, ASOS, Puma, and Lululemon.'
      },
      {
        question: 'Do fashion coupons work on clearance items?',
        answer: 'Some promo codes apply sitewide including sale items, while others exclude clearance products. Always check the offer terms.'
      }
    ]
  },
  {
    id: 'cat-electronics',
    name: 'Electronics & Tech',
    slug: 'electronics',
    description: 'Discounts on laptops, smart gadgets, TV sets, headphones, audio gear, and home appliances.',
    iconName: 'Laptop',
    offerCount: 198,
    featured: true,
    buyingGuide: [
      {
        title: 'Look Out for Refurbished Deals',
        text: 'Certified refurbished items from Apple, Dell, and Best Buy offer factory warranties with savings up to 40% over retail prices.'
      }
    ],
    faqs: [
      {
        question: 'How often are tech promo codes updated?',
        answer: 'Electronics codes update daily, especially around major sales cycles like Black Friday, Back to School, and Cyber Monday.'
      }
    ]
  },
  {
    id: 'cat-software',
    name: 'Software & SaaS',
    slug: 'software',
    description: 'Exclusive promos for cloud apps, design tools, productivity software, and developer tools.',
    iconName: 'Code',
    offerCount: 115,
    featured: true,
    buyingGuide: [
      {
        title: 'Annual Billing vs Monthly',
        text: 'Most SaaS products offer an automatic 15% to 33% discount when choosing annual billing over monthly subscription plans.'
      }
    ],
    faqs: [
      {
        question: 'Are SaaS coupon codes permanent?',
        answer: 'Most software codes apply to your first payment period or first year of subscription, though lifetime deals occasionally launch.'
      }
    ]
  },
  {
    id: 'cat-travel',
    name: 'Travel & Hotels',
    slug: 'travel',
    description: 'Promo codes for hotel bookings, flights, car rentals, vacation packages, and travel gear.',
    iconName: 'Plane',
    offerCount: 87,
    featured: true,
    buyingGuide: [
      {
        title: 'Mobile App Exclusive Discounts',
        text: 'Booking platforms like Booking.com and Expedia often feature mobile-only promo codes that save an extra 10% on hotel stays.'
      }
    ],
    faqs: [
      {
        question: 'Can I apply travel promo codes on existing reservations?',
        answer: 'Promo codes must be entered during checkout before payment confirmation. Check cancellation policies if you need to rebook.'
      }
    ]
  },
  {
    id: 'cat-food',
    name: 'Food & Restaurants',
    slug: 'food-restaurants',
    description: 'Deals on meal kits, food delivery services, coffee, gourmet dining, and grocery orders.',
    iconName: 'Utensils',
    offerCount: 64,
    featured: false,
    faqs: [
      {
        question: 'Do food delivery promo codes work for existing users?',
        answer: 'Some codes are reserved for new account signups, but targeted promo codes for existing customers are published weekly.'
      }
    ]
  },
  {
    id: 'cat-beauty',
    name: 'Beauty & Skincare',
    slug: 'beauty',
    description: 'Promo codes for makeup, luxury skincare, fragrances, hair care, and wellness products.',
    iconName: 'Sparkles',
    offerCount: 93,
    featured: true,
    faqs: [
      {
        question: 'How do I get free samples with my beauty order?',
        answer: 'Retailers like Sephora and Ulta frequently bundle promo codes that unlock deluxe sample sets when spending above a minimum threshold.'
      }
    ]
  },
  {
    id: 'cat-home',
    name: 'Home & Furniture',
    slug: 'home',
    description: 'Discounts on furniture, bedding, home decor, kitchen appliances, and gardening supplies.',
    iconName: 'Home',
    offerCount: 76,
    featured: false
  },
  {
    id: 'cat-education',
    name: 'Education & Courses',
    slug: 'education',
    description: 'Coupons for online learning platforms, professional certifications, and language learning apps.',
    iconName: 'GraduationCap',
    offerCount: 52,
    featured: false
  },
  {
    id: 'cat-finance',
    name: 'Finance & Tools',
    slug: 'finance',
    description: 'Special offers on tax software, accounting tools, investment platforms, and budgeting apps.',
    iconName: 'Wallet',
    offerCount: 41,
    featured: false
  },
  {
    id: 'cat-subscriptions',
    name: 'Subscriptions & VPNs',
    slug: 'subscriptions',
    description: 'Coupons for streaming services, cybersecurity, VPNs, password managers, and cloud storage.',
    iconName: 'Shield',
    offerCount: 88,
    featured: true
  },
  {
    id: 'cat-gaming',
    name: 'Gaming & Accessories',
    slug: 'gaming',
    description: 'Deals on gaming consoles, PC hardware, video games, headsets, and gaming chairs.',
    iconName: 'Gamepad2',
    offerCount: 69,
    featured: false
  },
  {
    id: 'cat-shopping',
    name: 'Department Stores & Retail',
    slug: 'shopping',
    description: 'Sitewide discount codes for major department stores, marketplaces, and online retailers.',
    iconName: 'ShoppingBag',
    offerCount: 156,
    featured: true
  }
];
