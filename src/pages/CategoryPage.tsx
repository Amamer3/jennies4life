import React, { useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, List, Star, Heart, ShoppingBag, Search, SlidersHorizontal, ExternalLink, Sparkles, Zap, Filter, TrendingUp, Award, Eye, Share2, Tag, Gift, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';

// Mock data (replace with actual implementation)
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  subcategories?: { id: string; name: string; slug: string; productCount: number }[];
}

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
  category: string;
  brand: string;
  inStock: boolean;
  features: string[];
  affiliateLink: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  slug: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Health & Wellness',
    slug: 'health',
    description: 'Supplements, fitness gear, and wellness products for a healthier lifestyle.',
    productCount: 245,
    subcategories: [
      { id: 's1', name: 'Supplements', slug: 'supplements', productCount: 80 },
      { id: 's2', name: 'Fitness Gear', slug: 'fitness-gear', productCount: 100 },
    ],
  },
  {
    id: '2',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, smart devices, and tech accessories.',
    productCount: 189,
    subcategories: [
      { id: 's3', name: 'Smartphones', slug: 'smartphones', productCount: 45 },
      { id: 's4', name: 'Laptops', slug: 'laptops', productCount: 32 },
      { id: 's5', name: 'Accessories', slug: 'accessories', productCount: 112 },
    ],
  },
  {
    id: '3',
    name: 'Fashion & Style',
    slug: 'fashion',
    description: 'Trending clothing, accessories, and style essentials.',
    productCount: 312,
    subcategories: [
      { id: 's6', name: 'Clothing', slug: 'clothing', productCount: 180 },
      { id: 's7', name: 'Accessories', slug: 'fashion-accessories', productCount: 132 },
    ],
  },
  {
    id: '4',
    name: 'Home & Garden',
    slug: 'home',
    description: 'Home decor, kitchen essentials, and garden tools.',
    productCount: 156,
    subcategories: [
      { id: 's8', name: 'Kitchen', slug: 'kitchen', productCount: 78 },
      { id: 's9', name: 'Decor', slug: 'decor', productCount: 78 },
    ],
  },
  {
    id: '5',
    name: 'Sports & Fitness',
    slug: 'sports',
    description: 'Workout equipment, athletic wear, and fitness accessories.',
    productCount: 198,
    subcategories: [
      { id: 's10', name: 'Equipment', slug: 'equipment', productCount: 89 },
      { id: 's11', name: 'Athletic Wear', slug: 'athletic-wear', productCount: 109 },
    ],
  },
  {
    id: '6',
    name: 'Beauty & Care',
    slug: 'beauty',
    description: 'Skincare, makeup, and personal care products.',
    productCount: 167,
    subcategories: [
      { id: 's12', name: 'Skincare', slug: 'skincare', productCount: 89 },
      { id: 's13', name: 'Makeup', slug: 'makeup', productCount: 78 },
    ],
  },
];

const mockProducts: Product[] = [
  // Health & Wellness
  {
    id: 'p1',
    name: 'Protein Powder',
    description: 'High-quality whey protein for muscle recovery.',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 1247,
    image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg',
    category: 'health',
    brand: 'Optimum Nutrition',
    inStock: true,
    features: ['20g protein', 'Low carb'],
    affiliateLink: 'https://example.com/protein',
    tags: ['protein', 'fitness'],
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    slug: 'protein-powder',
  },
  {
    id: 'p2',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for all fitness levels.',
    price: 19.99,
    rating: 4.5,
    reviewCount: 892,
    image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
    category: 'health',
    brand: 'Gaiam',
    inStock: true,
    features: ['Non-slip', 'Eco-friendly'],
    affiliateLink: 'https://example.com/yoga-mat',
    tags: ['yoga', 'fitness'],
    isFeatured: true,
    slug: 'yoga-mat',
  },
  // Electronics
  {
    id: 'p3',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 2156,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    category: 'electronics',
    brand: 'Sony',
    inStock: true,
    features: ['Noise cancelling', '30hr battery'],
    affiliateLink: 'https://example.com/headphones',
    tags: ['audio', 'wireless'],
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    slug: 'wireless-headphones',
  },
  {
    id: 'p4',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking smartwatch.',
    price: 299.99,
    rating: 4.6,
    reviewCount: 1834,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'electronics',
    brand: 'Apple',
    inStock: true,
    features: ['GPS', 'Heart rate monitor'],
    affiliateLink: 'https://example.com/smartwatch',
    tags: ['fitness', 'smart'],
    isFeatured: true,
    slug: 'smart-watch',
  },
  // Fashion & Style
  {
    id: 'p5',
    name: 'Designer Handbag',
    description: 'Elegant leather handbag for everyday use.',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.9,
    reviewCount: 567,
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    category: 'fashion',
    brand: 'Michael Kors',
    inStock: true,
    features: ['Genuine leather', 'Multiple compartments'],
    affiliateLink: 'https://example.com/handbag',
    tags: ['accessories', 'leather'],
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    slug: 'designer-handbag',
  },
  {
    id: 'p6',
    name: 'Casual T-Shirt',
    description: 'Comfortable cotton t-shirt for daily wear.',
    price: 24.99,
    rating: 4.4,
    reviewCount: 892,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    category: 'fashion',
    brand: 'Uniqlo',
    inStock: true,
    features: ['100% cotton', 'Machine washable'],
    affiliateLink: 'https://example.com/tshirt',
    tags: ['casual', 'cotton'],
    isFeatured: true,
    slug: 'casual-tshirt',
  },
  // Home & Garden
  {
    id: 'p7',
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with thermal carafe.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 1245,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
    category: 'home',
    brand: 'Cuisinart',
    inStock: true,
    features: ['Programmable', 'Thermal carafe'],
    affiliateLink: 'https://example.com/coffee-maker',
    tags: ['kitchen', 'coffee'],
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    slug: 'coffee-maker',
  },
  {
    id: 'p8',
    name: 'Decorative Vase',
    description: 'Modern ceramic vase for home decoration.',
    price: 39.99,
    rating: 4.3,
    reviewCount: 234,
    image: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    category: 'home',
    brand: 'West Elm',
    inStock: true,
    features: ['Ceramic', 'Modern design'],
    affiliateLink: 'https://example.com/vase',
    tags: ['decor', 'ceramic'],
    isFeatured: true,
    slug: 'decorative-vase',
  },
  // Sports & Fitness
  {
    id: 'p9',
    name: 'Resistance Bands Set',
    description: 'Complete resistance bands set for home workouts.',
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    rating: 4.6,
    reviewCount: 1567,
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg',
    category: 'sports',
    brand: 'Bodylastics',
    inStock: true,
    features: ['5 resistance levels', 'Door anchor included'],
    affiliateLink: 'https://example.com/resistance-bands',
    tags: ['fitness', 'home-workout'],
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    slug: 'resistance-bands',
  },
  {
    id: 'p10',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with superior cushioning.',
    price: 129.99,
    rating: 4.7,
    reviewCount: 2341,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'sports',
    brand: 'Nike',
    inStock: true,
    features: ['Lightweight', 'Superior cushioning'],
    affiliateLink: 'https://example.com/running-shoes',
    tags: ['running', 'shoes'],
    isFeatured: true,
    slug: 'running-shoes',
  },
  // Beauty & Care
  {
    id: 'p11',
    name: 'Moisturizing Cream',
    description: 'Hydrating face cream for all skin types.',
    price: 45.99,
    originalPrice: 59.99,
    discount: 23,
    rating: 4.8,
    reviewCount: 1892,
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
    category: 'beauty',
    brand: 'CeraVe',
    inStock: true,
    features: ['Hyaluronic acid', 'All skin types'],
    affiliateLink: 'https://example.com/moisturizer',
    tags: ['skincare', 'moisturizer'],
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    slug: 'moisturizing-cream',
  },
  {
    id: 'p12',
    name: 'Lipstick Set',
    description: 'Long-lasting matte lipstick collection.',
    price: 32.99,
    rating: 4.5,
    reviewCount: 756,
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg',
    category: 'beauty',
    brand: 'MAC',
    inStock: true,
    features: ['Long-lasting', 'Matte finish'],
    affiliateLink: 'https://example.com/lipstick',
    tags: ['makeup', 'lipstick'],
    isFeatured: true,
    slug: 'lipstick-set',
  },
];

const getCategoryBySlug = (slug: string): Category | null =>
  mockCategories.find((category) => category.slug === slug) || null;

const getProductsByCategory = (slug: string): Product[] =>
  mockProducts.filter((product) => product.category === slug);

const CategoryPage: React.FC = () => {
  const { category: slug } = useParams<{ category: string }>();
  const category = slug ? getCategoryBySlug(slug) : null;
  const allProducts = slug ? getProductsByCategory(slug) : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Debounced search handler
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  // Get unique brands
  const brands = useMemo(() => Array.from(new Set(allProducts.map((product) => product.brand))), [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(
    () =>
      allProducts
        .filter((product) => {
          const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
          const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
          return matchesSearch && matchesPrice && matchesBrand;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'rating':
              return b.rating - a.rating;
            case 'newest':
              return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            case 'popular':
              return b.reviewCount - a.reviewCount;
            default:
              return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
          }
        }),
    [allProducts, searchTerm, priceRange, selectedBrands, sortBy]
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange({ min: 0, max: 1000 });
    setSelectedBrands([]);
    setCurrentPage(1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
        aria-hidden="true"
      />
    ));
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 relative ${
        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
      }`}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFFACD]/20 to-[#F0E68C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      {/* Product Image */}
      <div
        className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-full sm:w-48 flex-shrink-0' : 'aspect-square'
        }`}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
            >
              <Sparkles className="w-3 h-3" />
              New
            </motion.span>
          )}
          {product.isBestseller && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
            >
              <Flame className="w-3 h-3" />
              Bestseller
            </motion.span>
          )}
          {product.discount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
            >
              <Tag className="w-3 h-3" />
              -{product.discount}%
            </motion.span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
            aria-label="Share product"
          >
            <Share2 className="h-4 w-4 text-gray-600 hover:text-blue-500 transition-colors" />
          </motion.button>
        </div>
        
        {/* View Count Badge */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            <Eye className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 1000) + 100}</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="relative p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full"
          >
            <Award className="w-3 h-3" />
            {product.brand}
          </motion.span>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500 font-medium">({product.rating.toFixed(1)})</span>
          </div>
        </div>
        
        <motion.h3
          whileHover={{ x: 5 }}
          className={`font-bold text-gray-900 mb-3 group-hover:text-[#F0E68C] transition-colors duration-300 ${
            viewMode === 'list' ? 'text-lg sm:text-xl line-clamp-2' : 'text-base sm:text-lg line-clamp-2'
          }`}
        >
          <Link to={`/product/${product.slug}`} aria-label={`View product: ${product.name}`}>
            {product.name}
          </Link>
        </motion.h3>
        
        {viewMode === 'list' && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-[#FFFACD]/30 text-[#F0E68C] text-xs font-medium rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-bold text-gray-900 text-lg"
            >
              ${product.price.toFixed(2)}
            </motion.span>
            {product.originalPrice && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            )}
          </div>
          
          <motion.a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#F0E68C] to-[#FFD700] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative"
            aria-label={`Buy ${product.name}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 group-hover:animate-bounce" />
              <span>Buy Now</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </div>
        
        {/* Social Engagement */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{product.reviewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{Math.floor(product.reviewCount * 0.3)}</span>
            </div>
          </div>
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 text-green-600 text-xs font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-red-600 text-xs font-semibold">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link
            to="/"
            className="text-[#FFFACD] hover:text-primary-600 text-sm sm:text-base transition-colors"
            aria-label="Return to homepage"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="relative bg-gradient-to-br from-[#FFFACD] via-[#F0E68C] to-[#FFD700] text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/10 rounded-full"
          />
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
            role="region"
            aria-labelledby="category-title"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>

            <motion.h1
              id="category-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6"
            >
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {category.name}
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {category.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/80 text-sm sm:text-base mb-8"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{category.productCount} Products</span>
              </div>
              <span aria-hidden="true" className="hidden sm:block">•</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Expert Curated</span>
              </div>
              <span aria-hidden="true" className="hidden sm:block">•</span>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4" />
                <span>Best Deals</span>
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-3 bg-white text-[#F0E68C] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-3 bg-white/20 text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                View Deals
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 sm:mb-12"
            role="region"
            aria-labelledby="subcategories-title"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 bg-gradient-to-r from-[#FFFACD] to-[#F0E68C] rounded-lg"
              >
                <Filter className="w-5 h-5 text-white" />
              </motion.div>
              <h2 id="subcategories-title" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Shop by Category
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {category.subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Link
                    to={`/category/${category.slug}/${subcategory.slug}`}
                    className="relative block p-4 bg-white border border-gray-200 rounded-xl text-center hover:border-[#FFFACD] hover:shadow-lg transition-all duration-300 overflow-hidden"
                    aria-label={`View subcategory: ${subcategory.name}`}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFFACD]/20 to-[#F0E68C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="w-8 h-8 mx-auto mb-2 p-1.5 bg-gradient-to-r from-[#FFFACD] to-[#F0E68C] rounded-lg"
                      >
                        <TrendingUp className="w-full h-full text-white" />
                      </motion.div>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#F0E68C] transition-colors duration-200 mb-1">
                        {subcategory.name}
                      </h3>
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 group-hover:bg-[#FFFACD]/20 text-xs text-gray-600 group-hover:text-[#F0E68C] rounded-full transition-all duration-200">
                        {subcategory.productCount} items
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:w-72 space-y-6 ${showFilters ? 'block' : 'hidden sm:block'} lg:sticky lg:top-4`}
            role="region"
            aria-labelledby="filters-title"
          >
            <h2 id="filters-title" className="sr-only">
              Product Filters
            </h2>
            
            {/* Filters Header */}
            <div className="bg-gradient-to-r from-[#FFFACD] to-[#F0E68C] p-6 rounded-xl text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <SlidersHorizontal className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-bold">Filter Products</h3>
              </div>
              <p className="text-white/80 text-sm mt-2">Find exactly what you're looking for</p>
            </div>
            
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-[#F0E68C]" />
                <h3 className="text-lg font-semibold text-gray-900">Search Products</h3>
              </div>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFFACD] focus:border-transparent transition-all duration-200 hover:border-[#F0E68C]"
                  aria-label="Search products"
                />
              </div>
            </motion.div>

            {/* Price Range */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-[#F0E68C]" />
                <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Min Price</label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={priceRange.min || ''}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFFACD] focus:border-transparent transition-all duration-200 hover:border-[#F0E68C]"
                    aria-label="Minimum price"
                  />
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mt-5">
                  <span className="text-gray-500 text-sm font-medium">to</span>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Max Price</label>
                  <input
                    type="number"
                    placeholder="$1000"
                    value={priceRange.max || ''}
                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) || 1000 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFFACD] focus:border-transparent transition-all duration-200 hover:border-[#F0E68C]"
                    aria-label="Maximum price"
                  />
                </div>
              </div>
            </motion.div>

            {/* Brands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-[#F0E68C]" />
                <h3 className="text-lg font-semibold text-gray-900">Brands</h3>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {brands.map((brand, index) => (
                  <motion.label
                    key={brand}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#FFFACD]/10 transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) =>
                        setSelectedBrands((prev) =>
                          e.target.checked ? [...prev, brand] : prev.filter((b) => b !== brand)
                        )
                      }
                      className="w-4 h-4 rounded border-2 border-gray-300 text-[#F0E68C] focus:ring-[#FFFACD] focus:ring-2 transition-colors duration-200"
                      aria-label={`Filter by brand: ${brand}`}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#F0E68C] transition-colors duration-200 font-medium">
                      {brand}
                    </span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Reset Filters */}
            <AnimatePresence>
              {(searchTerm || priceRange.min !== 0 || priceRange.max !== 1000 || selectedBrands.length > 0) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetFilters}
                  className="group w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                  aria-label="Reset all filters"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    <span>Reset Filters</span>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 overflow-hidden"
            >
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F0E68C]/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-full translate-y-12 -translate-x-12" />
              
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="sm:hidden inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#F0E68C] to-[#FFD700] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    aria-label={showFilters ? 'Hide filters' : 'Show filters'}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#F0E68C]/10 to-[#FFD700]/10 rounded-xl border border-[#F0E68C]/20"
                  >
                    <TrendingUp className="w-5 h-5 text-[#F0E68C]" />
                    <p className="text-sm font-semibold text-gray-700">
                      Showing <span className="text-[#F0E68C]">{(currentPage - 1) * productsPerPage + 1}-{Math.min(currentPage * productsPerPage, filteredProducts.length)}</span> of <span className="text-[#F0E68C]">{filteredProducts.length}</span> products
                    </p>
                  </motion.div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">View:</span>
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <motion.button
                        onClick={() => setViewMode('grid')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                          viewMode === 'grid' 
                            ? 'bg-white text-[#F0E68C] shadow-md' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        aria-label="Grid view"
                      >
                        <Grid className="h-4 w-4" />
                        <span className="text-xs font-medium hidden sm:inline">Grid</span>
                      </motion.button>
                      <motion.button
                        onClick={() => setViewMode('list')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                          viewMode === 'list' 
                            ? 'bg-white text-[#F0E68C] shadow-md' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                        aria-label="List view"
                      >
                        <List className="h-4 w-4" />
                        <span className="text-xs font-medium hidden sm:inline">List</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#F0E68C]" />
                    <label htmlFor="sort" className="text-sm font-semibold text-gray-700">
                      Sort by:
                    </label>
                  </div>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F0E68C] focus:border-[#F0E68C] transition-all duration-200 hover:border-[#F0E68C]/50"
                    aria-label="Sort products"
                  >
                    {[
                      { value: 'featured', label: 'Featured' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest Rated' },
                      { value: 'newest', label: 'Newest' },
                      { value: 'popular', label: 'Most Popular' },
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
            </motion.div>

            {/* Products Grid/List */}
            {paginatedProducts.length === 0 ? (
              <div
                className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md border border-gray-100"
                role="alert"
                aria-live="polite"
              >
                <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-xs sm:text-sm text-gray-800 mb-3 sm:mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-primary-600 transition-all duration-200"
                  aria-label="Reset filters to view all products"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
                    : 'space-y-4'
                }
                role="region"
                aria-labelledby="products-title"
              >
                <h2 id="products-title" className="sr-only">
                  Products
                </h2>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center mt-12"
                role="navigation"
                aria-label="Pagination"
              >
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 overflow-hidden">
                  {/* Background Elements */}
                  <div className="absolute top-0 left-1/2 w-20 h-20 bg-gradient-to-br from-[#F0E68C]/10 to-transparent rounded-full -translate-y-10 -translate-x-10" />
                  
                  <div className="relative flex items-center gap-2">
                    <motion.button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                      whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                      className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 rounded-xl hover:bg-[#F0E68C] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-600"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        let page;
                        if (totalPages <= 7) {
                          page = i + 1;
                        } else if (currentPage <= 4) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 3) {
                          page = totalPages - 6 + i;
                        } else {
                          page = currentPage - 3 + i;
                        }
                        
                        return (
                          <motion.button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-xl transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-[#F0E68C] to-[#FFD700] text-white shadow-lg'
                                : 'text-gray-700 bg-gray-100 hover:bg-[#F0E68C]/20 hover:text-[#F0E68C]'
                            }`}
                            aria-current={currentPage === page ? 'page' : undefined}
                            aria-label={`Go to page ${page}`}
                          >
                            {page}
                          </motion.button>
                        );
                      })}
                    </div>
                    
                    <motion.button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                      whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                      className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 rounded-xl hover:bg-[#F0E68C] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-gray-600"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                  
                  {/* Page Info */}
                  <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-600 font-medium">
                      Page <span className="text-[#F0E68C] font-bold">{currentPage}</span> of <span className="text-[#F0E68C] font-bold">{totalPages}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;