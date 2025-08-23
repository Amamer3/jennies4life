import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ExternalLink, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { publicProductAPI } from '../services/publicProductApi';
import type { Product } from '../types';

const FeaturedProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch featured products from API
        const response = await publicProductAPI.getProducts({
          featured: true,
          limit: 6
        });
        
        if (response.success && response.products) {
          setFeaturedProducts(response.products);
        } else {
          setError(response.message || 'Failed to fetch featured products');
        }
      } catch (err) {
        setError('An error occurred while fetching featured products');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const getBadgeColor = (featured?: boolean) => {
    return featured ? 'bg-primary-600' : 'bg-gray-500';
  };

  const calculateDiscount = (original?: number, current?: number) => {
    if (!original || !current || original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Loading featured products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-gray-600">{error}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mr-2" />
            <span className="text-primary-600 font-semibold text-base sm:text-lg">Today's Favorites</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore our handpicked selection of trending products across all categories. Each item is carefully reviewed and tested by our team.
          </p>
        </motion.div>

        {/* Products Grid */}
        {featuredProducts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 text-base">No featured products available at the moment.</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for our latest featured items!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || product.images?.[0] || 'https://via.placeholder.com/300x200'}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-40 sm:h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Featured Badge */}
                  {product.featured && (
                    <div className={`absolute top-2 left-2 ${getBadgeColor(product.featured)} text-white text-xs font-semibold px-2 py-1 rounded-full`}>
                      Featured
                    </div>
                  )}
                  {/* Discount Badge */}
                  {product.originalPrice && product.price && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      -{calculateDiscount(product.originalPrice, product.price)}%
                    </div>
                  )}
                  {/* Wishlist Button */}
                  <button
                    className="absolute top-2 right-10 p-2 min-w-[40px] min-h-[40px] bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 sm:opacity-100 transition-all duration-200 hover:bg-pink-50 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    <Heart className="h-4 w-4 text-gray-600 hover:text-pink-600" aria-hidden="true" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Category */}
                  <p className="text-xs sm:text-sm text-primary-600 font-medium mb-1 sm:mb-2">{product.category}</p>
                  {/* Product Name */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
                    <Link to={`/products/${product.slug || product.id}`} aria-label={`View details for ${product.name}`}>
                      {product.name}
                    </Link>
                  </h3>
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        const rating = product.rating || 0;
                        return (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              ratingValue <= Math.floor(rating)
                                ? 'fill-current'
                                : ratingValue <= rating
                                ? 'fill-current text-opacity-50'
                                : 'stroke-current fill-transparent'
                            }`}
                            aria-hidden="true"
                          />
                        );
                      })}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {(product.rating || 0).toFixed(1)} ({product.reviews || 0} reviews)
                    </span>
                  </div>
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">${(product.price || 0).toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/products/${product.slug || product.id}`}
                      className="flex-1 bg-[#e72a00] text-white font-medium py-3 px-4 rounded-lg text-sm transition-all duration-200 text-center hover:bg-[#d12400] focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:ring-offset-2"
                      aria-label={`View details for ${product.name}`}
                    >
                      View Details
                    </Link>
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center min-w-[48px] min-h-[48px] bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:scale-105"
                      aria-label={`Buy ${product.name} now`}
                      title="Buy Now"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10 lg:mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-[#E72A00] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#E72A00] transition-all duration-200"
            aria-label="View all products"
          >
            View All Products
            <ShoppingCart className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;