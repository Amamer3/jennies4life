import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { publicProductAPI } from '../services/publicProductApi';
import { publicCategoryAPI } from '../services/publicCategoryApi';
import type { Product } from '../types';
import type { ProductQueryParams as APIProductQueryParams } from '../services/publicProductApi';

const ProductsListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'newest'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<string[]>([]);
  
  const productsPerPage = 12;

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await publicCategoryAPI.getActiveCategories();
      if (response.success && response.data) {
        const categoryNames = response.data.map(cat => cat.name);
        setCategories(categoryNames);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback to default categories if API fails
      setCategories(['Electronics', 'Beauty', 'Health & Fitness', 'Books', 'Sports']);
    }
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: APIProductQueryParams = {
        page: currentPage,
        limit: productsPerPage,
        sortBy,
        sortOrder
      };
      
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }
      
      if (selectedCategory) {
        params.category = selectedCategory.toLowerCase().replace(/\s+/g, '-');
      }
      
      const response = await publicProductAPI.getProducts(params);
      
      if (response.success && response.products) {
        setProducts(response.products);
        setTotalProducts(response.total || 0);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Network error occurred while fetching products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch categories and products when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Effect to fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortBy, sortOrder, selectedCategory]);

  // Effect to handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            New
          </div>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            wishlist.has(product.id)
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className="h-4 w-4" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-sm text-red-500 font-medium">Out of Stock</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors text-center text-sm font-medium"
          >
            View Details
          </Link>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );

  const ProductListItem: React.FC<{ product: Product }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="flex">
        <div className="relative w-48 h-32">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                {!product.inStock && (
                  <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 ml-4">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full transition-colors ${
                  wishlist.has(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className="h-4 w-4" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
              </button>
              
              <Link
                to={`/product/${product.slug}`}
                className="bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors text-center text-sm font-medium"
              >
                View Details
              </Link>
              
              <a
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our curated collection of affiliate products</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {products.length} of {totalProducts} products
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Products</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
              }>
                {products.map(product => 
                  viewMode === 'grid' 
                    ? <ProductCard key={product.id} product={product} />
                    : <ProductListItem key={product.id} product={product} />
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-primary-500 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsListPage;