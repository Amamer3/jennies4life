import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock getActiveDeals function (replace with actual implementation)
interface Product {
  id: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
}

interface Deal {
  id: string;
  title: string;
  description: string;
  type: string;
  endDate: string;
  discountPercentage: number;
  product: Product;
}

const getActiveDeals = (): Deal[] => [
  {
    id: '1',
    title: 'Cooling Towels 3 Pack',
    description: 'Lightweight microfiber towels for gym and sports',
    type: 'flash',
    endDate: '2025-08-01',
    discountPercentage: 33,
    product: { id: 'p1', price: 19.99, originalPrice: 29.99, rating: 4.8, reviewCount: 1247 },
  },
  {
    id: '2',
    title: 'Wireless Bluetooth Headphones',
    description: 'Premium sound with noise cancellation',
    type: 'limited',
    endDate: '2025-07-30',
    discountPercentage: 38,
    product: { id: 'p2', price: 79.99, originalPrice: 129.99, rating: 4.6, reviewCount: 892 },
  },
  {
    id: '3',
    title: 'Organic Skincare Set',
    description: 'Natural ingredients for glowing skin',
    type: 'exclusive',
    endDate: '2025-08-05',
    discountPercentage: 30,
    product: { id: 'p3', price: 45.99, originalPrice: 65.99, rating: 4.9, reviewCount: 634 },
  },
];

const DealsPage: React.FC = () => {
  const activeDeals = useMemo(() => getActiveDeals(), []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4 md:mb-6">
              Exclusive Deals & Offers
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Discover limited-time deals on our curated selection of products. Don’t miss out!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {activeDeals.length === 0 ? (
          <div
            className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200"
            role="alert"
            aria-live="polite"
          >
            <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No Active Deals Right Now
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Check back soon for new offers!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
              aria-label="Browse all products"
            >
              Browse Products
              <ShoppingBag className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {activeDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full">
                      {deal.type.charAt(0).toUpperCase() + deal.type.slice(1)} Deal
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Ends {new Date(deal.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    <Link to={`/products/${deal.product.id}`} aria-label={`View deal: ${deal.title}`}>
                      {deal.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {deal.description}
                  </p>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        ${deal.product.price.toFixed(2)}
                      </span>
                      {deal.product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          ${deal.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs sm:text-sm text-red-600">
                        -{deal.discountPercentage}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => {
                        const ratingValue = i + 1;
                        return (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              ratingValue <= Math.floor(deal.product.rating)
                                ? 'text-yellow-400 fill-current'
                                : ratingValue <= deal.product.rating
                                ? 'text-yellow-400 fill-current text-opacity-50'
                                : 'text-gray-300'
                            }`}
                          />
                        );
                      })}
                      <span className="ml-1 text-xs sm:text-sm text-gray-500">
                        ({deal.product.rating.toFixed(1)}, {deal.product.reviewCount})
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/products/${deal.product.id}`}
                    className="w-full block text-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 group-hover:scale-105"
                    aria-label={`View deal: ${deal.title}`}
                  >
                    View Deal
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsPage;