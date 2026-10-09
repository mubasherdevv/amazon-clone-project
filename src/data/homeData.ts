export interface HomeHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  targetProductId: string;
  bgGradient: string;
  graphicType: 'headphone' | 'airpods' | 'kindle';
  color: 'black' | 'silver' | 'blue' | 'pink';
}

export interface HomeCardItem {
  id: string;
  title: string;
  linkText: string;
  type: 'quad' | 'single' | 'account';
  targetProductId?: string;
  quadItems?: {
    id: string;
    label: string;
    productId: string;
    imageType: 'headphone' | 'case' | 'stand' | 'airpods' | 'kindle';
    color?: 'black' | 'silver' | 'blue' | 'pink';
    price?: number;
  }[];
  singleItem?: {
    label: string;
    description: string;
    price: number;
    listPrice: number;
    discountPercent: number;
    productId: string;
    imageType: 'headphone' | 'airpods' | 'kindle';
    color?: 'black' | 'silver' | 'blue' | 'pink';
  };
}

export interface LightningDealItem {
  id: string;
  title: string;
  productId: string;
  price: number;
  listPrice: number;
  discountPercent: number;
  claimedPercent: number;
  rating: number;
  ratingsCount: number;
  imageType: 'headphone' | 'case' | 'stand' | 'airpods' | 'kindle';
  color?: 'black' | 'silver' | 'blue' | 'pink';
  timeLeft: string;
}

export const HERO_SLIDES: HomeHeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    subtitle: 'Industry-leading noise cancellation. Up to 30 hours of battery life with quick charge.',
    badge: 'Deal of the Day · Save 25%',
    ctaText: 'Shop the Sony Store',
    targetProductId: 'sony-wh1000xm5',
    bgGradient: 'from-[#0b1c2e] via-[#102a45] to-[#1f4068]',
    graphicType: 'headphone',
    color: 'black'
  },
  {
    id: 'slide-2',
    title: 'Apple AirPods Max — High-Fidelity Audio',
    subtitle: 'Active Noise Cancellation with Transparency mode and cinematic spatial audio.',
    badge: 'Best Seller in Over-Ear',
    ctaText: 'Explore AirPods Max',
    targetProductId: 'apple-airpods-max',
    bgGradient: 'from-[#1a1c20] via-[#2d3238] to-[#3f454d]',
    graphicType: 'airpods',
    color: 'silver'
  },
  {
    id: 'slide-3',
    title: 'All-New Kindle Paperwhite (16 GB)',
    subtitle: 'Now with a 6.8" glare-free display and adjustable warm light for effortless reading.',
    badge: 'Amazon Choice · Only $149.99',
    ctaText: 'Shop Kindle E-readers',
    targetProductId: 'kindle-paperwhite-16gb',
    bgGradient: 'from-[#0d2a23] via-[#164438] to-[#1f5f4f]',
    graphicType: 'kindle',
    color: 'black'
  }
];

export const HOMEPAGE_CARDS: HomeCardItem[] = [
  {
    id: 'card-spotlight',
    title: 'Deal of the Day: Sony WH-1000XM5',
    linkText: 'See all deals in Audio',
    type: 'single',
    targetProductId: 'sony-wh1000xm5',
    singleItem: {
      label: 'Sony WH-1000XM5 (Black)',
      description: 'Industry-leading noise canceling with 8 microphones & Auto NC Optimizer.',
      price: 298.00,
      listPrice: 399.99,
      discountPercent: 25,
      productId: 'sony-wh1000xm5',
      imageType: 'headphone',
      color: 'black'
    }
  },
  {
    id: 'card-quad-audio',
    title: 'Top categories in Electronics & Audio',
    linkText: 'Explore all electronics',
    type: 'quad',
    quadItems: [
      {
        id: 'q1',
        label: 'Noise Canceling',
        productId: 'sony-wh1000xm5',
        imageType: 'headphone',
        color: 'black'
      },
      {
        id: 'q2',
        label: 'Travel Cases',
        productId: 'sony-wh1000xm5',
        imageType: 'case',
        color: 'black'
      },
      {
        id: 'q3',
        label: 'Desk Stands',
        productId: 'sony-wh1000xm5',
        imageType: 'stand'
      },
      {
        id: 'q4',
        label: 'Silver Edition',
        productId: 'sony-wh1000xm5',
        imageType: 'headphone',
        color: 'silver'
      }
    ]
  },
  {
    id: 'card-quad-devices',
    title: 'Premium Sound & E-Readers',
    linkText: 'Shop featured devices',
    type: 'quad',
    quadItems: [
      {
        id: 'qd1',
        label: 'AirPods Max',
        productId: 'apple-airpods-max',
        imageType: 'airpods'
      },
      {
        id: 'qd2',
        label: 'Kindle 16GB',
        productId: 'kindle-paperwhite-16gb',
        imageType: 'kindle'
      },
      {
        id: 'qd3',
        label: 'Midnight Blue',
        productId: 'sony-wh1000xm5',
        imageType: 'headphone',
        color: 'blue'
      },
      {
        id: 'qd4',
        label: 'Smoky Pink',
        productId: 'sony-wh1000xm5',
        imageType: 'headphone',
        color: 'pink'
      }
    ]
  },
  {
    id: 'card-account',
    title: 'Welcome back, Alex',
    linkText: 'Manage your Prime benefits',
    type: 'account',
    targetProductId: 'sony-wh1000xm5'
  }
];

export const LIGHTNING_DEALS: LightningDealItem[] = [
  {
    id: 'deal-1',
    title: 'Sony WH-1000XM5 Flagship Noise Canceling Headphones (Black)',
    productId: 'sony-wh1000xm5',
    price: 298.00,
    listPrice: 399.99,
    discountPercent: 25,
    claimedPercent: 78,
    rating: 4.6,
    ratingsCount: 28492,
    imageType: 'headphone',
    color: 'black',
    timeLeft: '04:18:22'
  },
  {
    id: 'deal-2',
    title: 'Apple AirPods Max Wireless Over-Ear Headphones (Space Gray)',
    productId: 'apple-airpods-max',
    price: 499.00,
    listPrice: 549.00,
    discountPercent: 9,
    claimedPercent: 62,
    rating: 4.6,
    ratingsCount: 19830,
    imageType: 'airpods',
    color: 'silver',
    timeLeft: '06:45:10'
  },
  {
    id: 'deal-3',
    title: 'Amazon Kindle Paperwhite (16 GB) with 6.8" Glare-Free Screen',
    productId: 'kindle-paperwhite-16gb',
    price: 149.99,
    listPrice: 169.99,
    discountPercent: 12,
    claimedPercent: 89,
    rating: 4.7,
    ratingsCount: 65420,
    imageType: 'kindle',
    timeLeft: '02:11:45'
  },
  {
    id: 'deal-4',
    title: 'Sony WH-1000XM5 in Platinum Silver Finish',
    productId: 'sony-wh1000xm5',
    price: 298.00,
    listPrice: 399.99,
    discountPercent: 25,
    claimedPercent: 54,
    rating: 4.6,
    ratingsCount: 28492,
    imageType: 'headphone',
    color: 'silver',
    timeLeft: '05:32:00'
  },
  {
    id: 'deal-5',
    title: 'LTGEM Hard EVA Travel Storage Case for Over-Ear Headphones',
    productId: 'sony-wh1000xm5',
    price: 24.99,
    listPrice: 32.99,
    discountPercent: 24,
    claimedPercent: 41,
    rating: 4.8,
    ratingsCount: 4120,
    imageType: 'case',
    timeLeft: '08:15:30'
  },
  {
    id: 'deal-6',
    title: 'NewerKey Premium Aluminum Headphone Stand Hanger',
    productId: 'sony-wh1000xm5',
    price: 19.99,
    listPrice: 29.99,
    discountPercent: 33,
    claimedPercent: 92,
    rating: 4.7,
    ratingsCount: 3890,
    imageType: 'stand',
    timeLeft: '01:50:18'
  }
];
