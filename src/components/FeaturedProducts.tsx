import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ExternalLink, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  affiliateLink: string;
  description: string;
}

const FeaturedProducts: React.FC = () => {
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Cooling Towels 3 Pack – Lightweight Microfiber',
      category: 'Sports & Fitness',
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.8,
      reviews: 1247,
      image: '/api/placeholder/300/300',
      badge: 'Best Seller',
      affiliateLink: '#',
      description: 'Perfect for gym, workout, sport & sweat – quick drying for body, neck & face'
    },
    {
      id: '2',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 892,
      image: '/api/placeholder/300/300',
      badge: 'Limited Deal',
      affiliateLink: '#',
      description: 'Premium sound quality with active noise cancellation'
    },
    {
      id: '3',
      name: 'Organic Skincare Set',
      category: 'Beauty',
      price: 45.99,
      originalPrice: 65.99,
      rating: 4.9,
      reviews: 634,
      image: '/api/placeholder/300/300',
      badge: 'Editor\'s Choice',
      affiliateLink: '#',
      description: 'Natural ingredients for healthy, glowing skin'
    },
    {
      id: '4',
      name: 'Smart Fitness Tracker',
      category: 'Health & Wellness',
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.7,
      reviews: 1156,
      image: '/api/placeholder/300/300',
      badge: 'Trending',
      affiliateLink: '#',
      description: 'Track your health metrics with advanced sensors'
    },
    {
      id: '5',
      name: 'Ergonomic Office Chair',
      category: 'Home & Office',
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.5,
      reviews: 423,
      image: '/api/placeholder/300/300',
      badge: 'Flash Sale',
      affiliateLink: '#',
      description: 'Comfortable seating for long work sessions'
    },
    {
      id: '6',
      name: 'Premium Coffee Maker',
      category: 'Kitchen',
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.8,
      reviews: 756,
      image: '/api/placeholder/300/300',
      badge: 'New Arrival',
      affiliateLink: '#',
      description: 'Brew perfect coffee every morning with smart features'
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller': return 'bg-green-500';
      case 'Limited Deal': return 'bg-red-500';
      case 'Editor\'s Choice': return 'bg-purple-500';
      case 'Trending': return 'bg-blue-500';
      case 'Flash Sale': return 'bg-orange-500';
      case 'New Arrival': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-primary-600 mr-2" />
            <span className="text-primary-600 font-semibold text-lg">Today's Favorites</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Sourced Directly from the Latest Trends
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Explore our handpicked selection of trending products across all categories. 
            Each item is carefully reviewed and tested by our team.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${getBadgeColor(product.badge)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                    {product.badge}
                  </div>
                )}
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </div>
                )}
                
                {/* Wishlist Button */}
                <button className="absolute top-3 right-12 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5 lg:p-6">
                {/* Category */}
                <p className="text-xs sm:text-sm text-primary-600 font-medium mb-1 sm:mb-2">{product.category}</p>
                
                {/* Product Name */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">({product.rating})</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm sm:text-base lg:text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2 sm:space-x-3">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-sm sm:text-base transition-colors duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 sm:w-12 h-8 sm:h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors duration-200"
                    title="Buy Now"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-primary-700 transition-colors"
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