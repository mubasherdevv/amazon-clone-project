export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  hexCode: string;
  price: number;
  listPrice: number;
  inStock: boolean;
  imageThumbnail: string;
}

export interface ProductBundleItem {
  id: string;
  title: string;
  price: number;
  checked: boolean;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  title: string;
  content: string;
  helpfulCount: number;
  variantInfo?: string;
  images?: string[];
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  author: string;
  date: string;
  votes: number;
}

export interface ProductData {
  id: string;
  asin: string;
  brand: string;
  brandStoreUrl: string;
  title: string;
  badge?: string;
  rating: number;
  ratingsCount: number;
  answeredQuestionsCount: number;
  boughtPastMonth: string;
  price: number;
  listPrice: number;
  discountPercent: number;
  primeEligible: boolean;
  deliveryTime: string;
  inStock: boolean;
  stockCount: number;
  shipsFrom: string;
  soldBy: string;
  variants: ProductVariant[];
  selectedVariantId: string;
  configurations: {
    id: string;
    label: string;
    price: number;
  }[];
  selectedConfigId: string;
  features: string[];
  specifications: Record<string, string>;
  technicalDetails: Record<string, string>;
  whatsInTheBox: string[];
  frequentlyBoughtTogether: ProductBundleItem[];
  reviews: ReviewItem[];
  questions: QuestionAnswer[];
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  variantName: string;
  colorName: string;
  price: number;
  quantity: number;
  image: string;
  protectionPlan?: {
    name: string;
    price: number;
  };
}
