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
      image: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?q=80&w=300&auto=format&fit=crop',
      badge: 'Best Seller',
      affiliateLink: '#',
      description: 'Perfect for gym, workout, sport & sweat – quick drying for body, neck & face',
    },
    {
      id: '2',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=300&auto=format&fit=crop',
      badge: 'Limited Deal',
      affiliateLink: '#',
      description: 'Premium sound quality with active noise cancellation',
    },
    {
      id: '3',
      name: 'Organic Skincare Set',
      category: 'Beauty',
      price: 45.99,
      originalPrice: 65.99,
      rating: 4.9,
      reviews: 634,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=300&auto=format&fit=crop',
      badge: "Editor's Choice",
      affiliateLink: '#',
      description: 'Natural ingredients for healthy, glowing skin',
    },
    {
      id: '4',
      name: 'Smart Fitness Tracker',
      category: 'Health & Wellness',
      price: 89.99,
      originalPrice: 149.99,
      rating: 4.7,
      reviews: 1156,
      image: 'https://images.unsplash.com/photo-1570545889512-2cbb0c4228c0?q=80&w=300&auto=format&fit=crop',
      badge: 'Trending',
      affiliateLink: '#',
      description: 'Track your health metrics with advanced sensors',
    },
    {
      id: '5',
      name: 'Ergonomic Office Chair',
      category: 'Home & Office',
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.5,
      reviews: 423,
      image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=300&auto=format&fit=crop',
      badge: 'Flash Sale',
      affiliateLink: '#',
      description: 'Comfortable seating for long work sessions',
    },
    {
      id: '6',
      name: 'Premium Coffee Maker',
      category: 'Kitchen',
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.8,
      reviews: 756,
      image: 'https://images.pexels.com/photos/373888/pexels-photo-373888.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'New Arrival',
      affiliateLink: '#',
      description: 'Brew perfect coffee every morning with smart features',
    },
  ];

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-primary-600';
      case 'Limited Deal':
        return 'bg-secondary-600';
      case "Editor's Choice":
        return 'bg-purple-600';
      case 'Trending':
        return 'bg-secondary-500';
      case 'Flash Sale':
        return 'bg-red-600';
      case 'New Arrival':
        return 'bg-teal-600';
      default:
        return 'bg-gray-500';
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
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mr-2" />
            <span className="text-primary-600 font-semibold text-base sm:text-lg">Today's Favorites</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Sourced Directly from the Latest Trends
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore our handpicked selection of trending products across all categories. Each item is carefully reviewed and tested by our team.
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
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-40 sm:h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Badge */}
                {product.badge && (
                  <div
                    className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white text-xs font-semibold px-2 py-1 rounded-full`}
                  >
                    {product.badge}
                  </div>
                )}
                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  className="absolute top-2 right-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-5">
                {/* Category */}
                <p className="text-xs sm:text-sm text-primary-600 font-medium mb-1 sm:mb-2">{product.category}</p>
                {/* Product Name */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  <Link to={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
                    {product.name}
                  </Link>
                </h3>
                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
                {/* Rating */}
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      return (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            ratingValue <= Math.floor(product.rating)
                              ? 'fill-current'
                              : ratingValue <= product.rating
                              ? 'fill-current text-opacity-50'
                              : 'stroke-current fill-transparent'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews} reviews)
                  </span>
                </div>
                {/* Price */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex-1 bg-[#D1BF00] hover:bg-[#B3A000] text-white font-medium py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-all duration-200 text-center"
                    aria-label={`View details for ${product.name}`}
                  >
                    View Details
                  </Link>
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors duration-200"
                    aria-label={`Buy ${product.name} now`}
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
            className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-primary-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-primary-700 transition-all duration-200"
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