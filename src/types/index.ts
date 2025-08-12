import type { ReactNode } from 'react';

// Product Types
export interface Product {
  createdAt: number;
  createdAt: number;
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  brand: string;
  inStock: boolean;
  features: string[];
  specifications?: { [key: string]: string };
  affiliateLink: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  slug: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  icon: ReactNode;
  productCount: number;
  slug?: string;
  color?: string;
  gradient?: string;
  path: string;
  subcategories?: Subcategory[];
  featured?: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: Author;
  publishDate: string;
  lastModified?: string;
  readTime: string;
  image: string;
  slug: string;
  featured?: boolean;
  seo?: SEOData;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  website?: string;
}

// SEO Types
export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
}

// Deal Types
export interface Deal {
  id: string;
  title: string;
  description: string;
  product: Product;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  type: 'flash' | 'daily' | 'weekly' | 'seasonal';
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
  showWishlist?: boolean;
  className?: string;
}

export interface CategoryCardProps {
  category: Category;
  showProductCount?: boolean;
  className?: string;
}

export interface BlogCardProps {
  post: BlogPost;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  className?: string;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';