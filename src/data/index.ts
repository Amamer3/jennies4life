// Inline type definitions
interface Product {
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

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  slug: string;
  subcategories?: Subcategory[];
  featured?: boolean;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

interface BlogPost {
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
}

interface Deal {
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

// Sample Products Data
export const products: Product[] = [
  {
    id: '1',
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Active Noise Cancellation, Transparency mode, Spatial audio, and up to 6 hours of listening time.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.8,
    reviewCount: 12847,
    image: '/api/placeholder/400/400',
    category: 'Electronics',
    subcategory: 'Audio',
    brand: 'Apple',
    inStock: true,
    features: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Spatial audio',
      'Up to 6 hours listening time',
      'MagSafe charging case'
    ],
    affiliateLink: 'https://amazon.com/airpods-pro',
    tags: ['wireless', 'noise-cancelling', 'premium'],
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    slug: 'apple-airpods-pro-2nd-gen'
  },
  {
    id: '2',
    name: 'Ninja Foodi Personal Blender',
    description: 'Powerful personal blender perfect for smoothies, protein shakes, and frozen drinks.',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 8934,
    image: '/api/placeholder/400/400',
    category: 'Home',
    subcategory: 'Small Appliances',
    brand: 'Ninja',
    inStock: true,
    features: [
      '18 oz. Nutrient Extraction Cup',
      'Pro Extractor Blades',
      'BPA-free',
      'Dishwasher safe',
      'Compact design'
    ],
    affiliateLink: 'https://amazon.com/ninja-foodi-blender',
    tags: ['kitchen', 'healthy', 'compact'],
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    slug: 'ninja-foodi-personal-blender'
  },
  {
    id: '3',
    name: 'Levi\'s 501 Original Fit Jeans',
    description: 'The original blue jean since 1873. A classic straight fit with a timeless style.',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.4,
    reviewCount: 15672,
    image: '/api/placeholder/400/400',
    category: 'Fashion',
    subcategory: 'Men\'s Clothing',
    brand: 'Levi\'s',
    inStock: true,
    features: [
      '100% Cotton',
      'Classic straight fit',
      'Button fly',
      'Five-pocket styling',
      'Machine washable'
    ],
    affiliateLink: 'https://amazon.com/levis-501-jeans',
    tags: ['denim', 'classic', 'casual'],
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    slug: 'levis-501-original-fit-jeans'
  },
  {
    id: '4',
    name: 'Fitbit Charge 5 Fitness Tracker',
    description: 'Advanced fitness tracker with built-in GPS, stress management tools, and 6+ day battery life.',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 9876,
    image: '/api/placeholder/400/400',
    category: 'Health',
    subcategory: 'Fitness Trackers',
    brand: 'Fitbit',
    inStock: true,
    features: [
      'Built-in GPS',
      'Stress management score',
      '6+ day battery life',
      'Sleep score tracking',
      'Water resistant to 50 meters'
    ],
    affiliateLink: 'https://amazon.com/fitbit-charge-5',
    tags: ['fitness', 'health', 'tracking'],
    isNew: true,
    isBestseller: false,
    isFeatured: true,
    slug: 'fitbit-charge-5-fitness-tracker'
  },
  {
    id: '5',
    name: 'The 7 Habits of Highly Effective People',
    description: 'Stephen Covey\'s timeless classic on personal and professional effectiveness.',
    price: 12.99,
    originalPrice: 16.99,
    discount: 24,
    rating: 4.7,
    reviewCount: 23456,
    image: '/api/placeholder/400/400',
    category: 'Books',
    subcategory: 'Self-Help',
    brand: 'Free Press',
    inStock: true,
    features: [
      '432 pages',
      'Paperback edition',
      'Updated 30th anniversary edition',
      'International bestseller',
      'Practical principles'
    ],
    affiliateLink: 'https://amazon.com/7-habits-effective-people',
    tags: ['self-help', 'productivity', 'bestseller'],
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    slug: '7-habits-highly-effective-people'
  },
  {
    id: '6',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: 'Multi-functional pressure cooker that replaces 7 kitchen appliances in one.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 45678,
    image: '/api/placeholder/400/400',
    category: 'Home',
    subcategory: 'Large Appliances',
    brand: 'Instant Pot',
    inStock: true,
    features: [
      '7-in-1 functionality',
      '6-quart capacity',
      '14 smart programs',
      'Stainless steel inner pot',
      'Safety certified'
    ],
    affiliateLink: 'https://amazon.com/instant-pot-duo',
    tags: ['cooking', 'multi-functional', 'time-saving'],
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    slug: 'instant-pot-duo-7in1'
  },
  {
    id: '7',
    name: 'Yoga Mat Non-Slip',
    description: 'High-density non-slip yoga mat for exercise and fitness.',
    price: 29.99,
    rating: 4.7,
    reviewCount: 1200,
    image: '/api/placeholder/400/400',
    category: 'Sports',
    brand: 'Generic',
    inStock: true,
    features: ['Non-slip', 'Eco-friendly', '6mm thick'],
    affiliateLink: 'https://amazon.com/yoga-mat',
    tags: ['yoga', 'fitness'],
    slug: 'yoga-mat-non-slip'
  },
  {
    id: '8',
    name: 'Vitamin C Serum',
    description: 'Brightening vitamin C serum for face.',
    price: 19.99,
    rating: 4.5,
    reviewCount: 800,
    image: '/api/placeholder/400/400',
    category: 'Beauty',
    brand: 'The Ordinary',
    inStock: true,
    features: ['Antioxidant', 'Brightening', 'Hydrating'],
    affiliateLink: 'https://amazon.com/vitamin-c-serum',
    tags: ['skincare', 'serum'],
    slug: 'vitamin-c-serum'
  },
  {
    id: '9',
    name: 'Protein Powder',
    description: 'Whey protein powder for muscle building.',
    price: 39.99,
    rating: 4.6,
    reviewCount: 1500,
    image: '/api/placeholder/400/400',
    category: 'Health',
    brand: 'Optimum Nutrition',
    inStock: true,
    features: ['24g protein', 'Low carb', 'Gluten free'],
    affiliateLink: 'https://amazon.com/protein-powder',
    tags: ['supplements', 'fitness'],
    slug: 'protein-powder'
  },
  {
    id: '10',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for men and women.',
    price: 69.99,
    rating: 4.4,
    reviewCount: 900,
    image: '/api/placeholder/400/400',
    category: 'Sports',
    brand: 'Nike',
    inStock: true,
    features: ['Cushioned', 'Breathable', 'Lightweight'],
    affiliateLink: 'https://amazon.com/running-shoes',
    tags: ['running', 'shoes'],
    slug: 'running-shoes'
  }
];

// Sample Categories Data
export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets, tech accessories, and electronic devices',
    image: '/api/placeholder/300/200',
    icon: 'Smartphone',
    productCount: 1247,
    slug: 'electronics',
    featured: true,
    subcategories: [
      { id: '1-1', name: 'Smartphones', slug: 'smartphones', productCount: 234 },
      { id: '1-2', name: 'Audio', slug: 'audio', productCount: 189 },
      { id: '1-3', name: 'Computers', slug: 'computers', productCount: 156 },
      { id: '1-4', name: 'Gaming', slug: 'gaming', productCount: 298 }
    ]
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Trendy clothing, accessories, and style essentials',
    image: '/api/placeholder/300/200',
    icon: 'Shirt',
    productCount: 2156,
    slug: 'fashion',
    featured: true,
    subcategories: [
      { id: '2-1', name: 'Men\'s Clothing', slug: 'mens-clothing', productCount: 567 },
      { id: '2-2', name: 'Women\'s Clothing', slug: 'womens-clothing', productCount: 789 },
      { id: '2-3', name: 'Shoes', slug: 'shoes', productCount: 445 },
      { id: '2-4', name: 'Accessories', slug: 'accessories', productCount: 355 }
    ]
  },
  {
    id: '3',
    name: 'Home',
    description: 'Everything for your home, from appliances to decor',
    image: '/api/placeholder/300/200',
    icon: 'Home',
    productCount: 1834,
    slug: 'home',
    featured: true,
    subcategories: [
      { id: '3-1', name: 'Small Appliances', slug: 'small-appliances', productCount: 234 },
      { id: '3-2', name: 'Large Appliances', slug: 'large-appliances', productCount: 89 },
      { id: '3-3', name: 'Home Decor', slug: 'home-decor', productCount: 567 },
      { id: '3-4', name: 'Kitchen Tools', slug: 'kitchen-tools', productCount: 445 }
    ]
  },
  {
    id: '4',
    name: 'Health',
    description: 'Wellness products, fitness equipment, and health supplements',
    image: '/api/placeholder/300/200',
    icon: 'Heart',
    productCount: 892,
    slug: 'health',
    featured: true,
    subcategories: [
      { id: '4-1', name: 'Fitness Equipment', slug: 'fitness-equipment', productCount: 234 },
      { id: '4-2', name: 'Supplements', slug: 'supplements', productCount: 189 },
      { id: '4-3', name: 'Fitness Trackers', slug: 'fitness-trackers', productCount: 156 },
      { id: '4-4', name: 'Wellness', slug: 'wellness', productCount: 313 }
    ]
  },
  {
    id: '5',
    name: 'Books',
    description: 'Educational, entertainment, and inspirational reading materials',
    image: '/api/placeholder/300/200',
    icon: 'Book',
    productCount: 3456,
    slug: 'books',
    featured: false,
    subcategories: [
      { id: '5-1', name: 'Self-Help', slug: 'self-help', productCount: 567 },
      { id: '5-2', name: 'Fiction', slug: 'fiction', productCount: 1234 },
      { id: '5-3', name: 'Business', slug: 'business', productCount: 445 },
      { id: '5-4', name: 'Health', slug: 'health-books', productCount: 234 }
    ]
  },
  {
    id: '6',
    name: 'Beauty',
    description: 'Skincare, makeup, and personal care essentials',
    image: '/api/placeholder/300/200',
    icon: 'Sparkles',
    productCount: 1567,
    slug: 'beauty',
    featured: true,
    subcategories: [
      { id: '6-1', name: 'Skincare', slug: 'skincare', productCount: 445 },
      { id: '6-2', name: 'Makeup', slug: 'makeup', productCount: 567 },
      { id: '6-3', name: 'Hair Care', slug: 'hair-care', productCount: 334 },
      { id: '6-4', name: 'Personal Care', slug: 'personal-care', productCount: 221 }
    ]
  },
  {
    id: '7',
    name: 'Sports',
    description: 'Gear and equipment for all sports and outdoor activities',
    image: '/api/placeholder/300/200',
    icon: 'Dumbbell',
    productCount: 1200,
    slug: 'sports',
    featured: true,
    subcategories: [
      { id: '7-1', name: 'Fitness Gear', slug: 'fitness-gear', productCount: 300 },
      { id: '7-2', name: 'Outdoor Equipment', slug: 'outdoor-equipment', productCount: 250 },
      { id: '7-3', name: 'Team Sports', slug: 'team-sports', productCount: 400 },
      { id: '7-4', name: 'Cycling', slug: 'cycling', productCount: 250 }
    ]
  }
];

// Sample Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'What Are the Latest Trends in Virtual Reality Headsets?',
    excerpt: 'Embark on a journey into the future of VR headsets with cutting-edge technologies that are revolutionizing entertainment and productivity.',
    content: 'Full blog content would go here...',
    category: 'Electronics',
    tags: ['VR', 'technology', 'gaming', 'innovation'],
    author: {
      id: '1',
      name: 'Tech Expert',
      bio: 'Technology enthusiast with 10+ years of experience in consumer electronics.',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-01-15',
    readTime: '5 min read',
    image: '/api/placeholder/600/400',
    slug: 'latest-vr-headset-trends',
    featured: true
  },
  {
    id: '2',
    title: 'How Do I Establish a Bedtime Routine for My Baby?',
    excerpt: 'Optimize your baby\'s sleep routine with a consistent bedtime and soothing techniques that promote better rest for the whole family.',
    content: 'Full blog content would go here...',
    category: 'Baby & Kids',
    tags: ['parenting', 'baby care', 'sleep', 'routine'],
    author: {
      id: '2',
      name: 'Parenting Specialist',
      bio: 'Certified pediatric sleep consultant and mother of three.',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-01-12',
    readTime: '7 min read',
    image: '/api/placeholder/600/400',
    slug: 'baby-bedtime-routine-guide',
    featured: false
  },
  {
    id: '3',
    title: 'What Are the Best Books for Escaping Reality?',
    excerpt: 'Nestle into worlds of wonder and enchantment with the best books for escaping reality and finding your next literary adventure.',
    content: 'Full blog content would go here...',
    category: 'Books',
    tags: ['reading', 'fiction', 'escapism', 'literature'],
    author: {
      id: '3',
      name: 'Literary Critic',
      bio: 'Award-winning book reviewer and literature professor.',
      avatar: '/api/placeholder/100/100'
    },
    publishDate: '2024-01-10',
    readTime: '6 min read',
    image: '/api/placeholder/600/400',
    slug: 'best-escapist-books',
    featured: false
  }
];

// Sample Deals Data
export const deals: Deal[] = [
  {
    id: '1',
    title: 'Flash Sale: Apple AirPods Pro',
    description: 'Limited time offer on the latest AirPods Pro with active noise cancellation.',
    product: products[0],
    discountPercentage: 20,
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-17T23:59:59Z',
    isActive: true,
    type: 'flash'
  },
  {
    id: '2',
    title: 'Daily Deal: Ninja Blender',
    description: 'Today only - save big on this powerful personal blender.',
    product: products[1],
    discountPercentage: 20,
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-15T23:59:59Z',
    isActive: true,
    type: 'daily'
  }
];

// Helper functions
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.isBestseller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getFeaturedCategories = (): Category[] => {
  return categories.filter(category => category.featured);
};

export const getFeaturedBlogPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase().replace(/\s+/g, '-') === categorySlug.toLowerCase()
  );
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug.toLowerCase() === slug.toLowerCase());
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug.toLowerCase() === slug.toLowerCase());
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getActiveDeals = (): Deal[] => {
  const now = new Date();
  return deals.filter(deal => {
    const startDate = new Date(deal.startDate);
    const endDate = new Date(deal.endDate);
    return deal.isActive && now >= startDate && now <= endDate;
  });
};