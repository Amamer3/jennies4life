import React, { useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, List, Star, Heart, ShoppingBag, Search, SlidersHorizontal, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
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
];

const mockProducts: Product[] = [
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
      }`}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Product Image */}
      <div
        className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-full sm:w-48 flex-shrink-0' : 'aspect-square'
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1.5">
          {product.isNew && (
            <span className="bg-[#FFA500] text-white text-xs font-medium px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-orange-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              Bestseller
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-1.5">
          <button
            className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-md transition-all"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-gray-500 font-medium">{product.brand}</span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs sm:text-sm text-gray-500">({product.rating.toFixed(1)}, {product.reviewCount})</span>
          </div>
        </div>
        <h3
          className={`font-semibold text-gray-900 mb-2 group-hover:text-[#D1BF00] transition-colors ${
            viewMode === 'list' ? 'text-base sm:text-lg line-clamp-2' : 'text-sm sm:text-base line-clamp-2'
          }`}
        >
          <Link to={`/product/${product.slug}`} aria-label={`View product: ${product.name}`}>
            {product.name}
          </Link>
        </h3>
        {viewMode === 'list' && (
          <p className="text-xs sm:text-sm text-gray-800 mb-2 sm:mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="font-bold text-gray-900 text-sm sm:text-base">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-[#FFFF00] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-[#D1BF00] transition-all duration-200"
            aria-label={`Buy ${product.name}`}
          >
            Buy Now
            <ExternalLink className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </a>
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
            className="text-[#FFFF00] hover:text-primary-600 text-sm sm:text-base transition-colors"
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
      <div className="bg-gradient-to-r from-[#FFFF00] to-[#D1BF00] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center"
            role="region"
            aria-labelledby="category-title"
          >
            <h1
              id="category-title"
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2 sm:mb-3 md:mb-4"
            >
              {category.name}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#FFFFE0] mb-4 sm:mb-6 max-w-prose mx-auto">
              {category.description}
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-primary-100 text-xs sm:text-sm">
              <span>{category.productCount} Products</span>
              <span aria-hidden="true">•</span>
              <span>Expert Curated</span>
              <span aria-hidden="true">•</span>
              <span>Best Deals</span>
            </div>
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
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-6 sm:mb-8"
            role="region"
            aria-labelledby="subcategories-title"
          >
            <h2 id="subcategories-title" className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Shop by Category
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/category/${category.slug}/${subcategory.slug}`}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-gray-700 text-xs sm:text-sm hover:border-[#FFFF00] hover:text-[#D1BF00] transition-all duration-200"
                  aria-label={`View subcategory: ${subcategory.name}`}
                >
                  {subcategory.name}
                  <span className="ml-1 sm:ml-2 text-xs text-gray-500">({subcategory.productCount})</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`lg:w-64 space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden sm:block'} lg:sticky lg:top-4`}
            role="region"
            aria-labelledby="filters-title"
          >
            <h2 id="filters-title" className="sr-only">
              Product Filters
            </h2>
            {/* Search */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Search Products</h3>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFFF00]"
                  aria-label="Search products"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min || ''}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) || 0 }))}
                  className="flex-1 px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Minimum price"
                />
                <span className="text-gray-500" aria-hidden="true">
                  -
                </span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max || ''}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) || 1000 }))}
                  className="flex-1 px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Maximum price"
                />
              </div>
            </div>

            {/* Brands */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Brands</h3>
              <div className="space-y-1 sm:space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) =>
                        setSelectedBrands((prev) =>
                          e.target.checked ? [...prev, brand] : prev.filter((b) => b !== brand)
                        )
                      }
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      aria-label={`Filter by brand: ${brand}`}
                    />
                    <span className="text-xs sm:text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            {(searchTerm || priceRange.min !== 0 || priceRange.max !== 1000 || selectedBrands.length > 0) && (
              <button
                onClick={resetFilters}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-[#F4FFC1] hover:text-primary-600 transition-all duration-200"
                aria-label="Reset all filters"
              >
                Reset Filters
              </button>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="sm:hidden inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-gray-700 text-xs sm:text-sm hover:bg-primary-50 transition-all"
                  aria-label={showFilters ? 'Hide filters' : 'Show filters'}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1 sm:mr-2" />
                  Filters
                </button>
                <span className="text-xs sm:text-sm text-gray-600">
                  {filteredProducts.length} of {allProducts.length} products
                </span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 sm:p-2 ${
                      viewMode === 'grid' ? 'bg-[#FFFF00] text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 sm:p-2 ${
                      viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
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
                viewport={{ once: true, amount: 0.2 }}
                className="flex justify-center mt-8 sm:mt-12"
                role="navigation"
                aria-label="Pagination"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                        currentPage === page
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
                      }`}
                      aria-current={currentPage === page ? 'page' : undefined}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  ))}
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