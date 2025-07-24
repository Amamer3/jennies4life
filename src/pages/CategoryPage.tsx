import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingBag, 
  Search,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getCategoryBySlug, getProductsByCategory } from '../data';
// Inline type definition
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

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Get unique brands from products
  const brands = Array.from(new Set(allProducts.map(product => product.brand)));

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        default: // featured
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        viewMode === 'list' ? 'flex' : ''
      }`}
    >
      {/* Product Image */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
      }`}>
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">{product.brand}</p>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
          <button className="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">{product.brand}</span>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>
        
        <h3 className={`font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors ${
          viewMode === 'list' ? 'text-lg line-clamp-2' : 'text-sm line-clamp-2'
        }`}>
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        {viewMode === 'list' && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Buy Now
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-blue-100">
              <span>{category.productCount} Products</span>
              <span>•</span>
              <span>Expert Curated</span>
              <span>•</span>
              <span>Best Deals</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shop by Category</h2>
            <div className="flex flex-wrap gap-3">
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/category/${category.slug}/${subcategory.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-primary-500 hover:text-primary-600 transition-all duration-200"
                >
                  {subcategory.name}
                  <span className="ml-2 text-xs text-gray-500">({subcategory.productCount})</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:w-64 space-y-6 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Search Products</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands(prev => [...prev, brand]);
                        } else {
                          setSelectedBrands(prev => prev.filter(b => b !== brand));
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6"
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </button>
                <span className="text-gray-600">
                  {filteredProducts.length} of {allProducts.length} products
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                </select>

                {/* View Mode */}
                <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid/List */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
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
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center mt-12"
              >
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }`}
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