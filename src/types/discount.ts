export interface Discount {
  id: string;
  name: string;
  category: Category;
  discountAmount: string;
  description: string;
  howToRedeem: string;
  verificationRequired: 'Yes' | 'No' | 'Sometimes';
  websiteUrl: string;
  locationSpecific: boolean;
  status: 'Active' | 'Inactive' | 'Seasonal';
  logo?: string;
}

export type Category =
  | 'Food Delivery'
  | 'Entertainment'
  | 'Cultural'
  | 'Transportation'
  | 'Shopping'
  | 'Wellness'
  | 'Software'
  | 'News/Media';

export const CATEGORIES: Category[] = [
  'Food Delivery',
  'Entertainment',
  'Cultural',
  'Transportation',
  'Shopping',
  'Wellness',
  'Software',
  'News/Media',
];
