import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShoppingBag, Star, Flame, Zap, Gift, TrendingUp, Sparkles, Timer, Tag } from 'lucide-react';
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
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"
        ></motion.div>
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl"
        ></motion.div>
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            x: [-5, 5, -5]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-lg"
        ></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-center"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="h-10 w-10 text-white" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-white to-cyan-300 bg-clip-text text-transparent"
            >
              🔥 Hot Deals & Offers
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Discover incredible limited-time deals on our handpicked selection of premium products. 
              <span className="text-yellow-300 font-semibold">Don't miss out on these amazing savings!</span>
            </motion.p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-sm text-blue-200">Active Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">70%</div>
                <div className="text-sm text-blue-200">Max Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-300">24h</div>
                <div className="text-sm text-blue-200">Flash Sales</div>
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                <Zap className="h-5 w-5" />
                Shop Flash Deals
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Gift className="h-5 w-5" />
                View All Offers
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
            Featured Deals
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited-time offers on premium products. Grab them before they're gone!
          </p>
        </motion.div>

        {activeDeals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200 relative overflow-hidden"
            role="alert"
            aria-live="polite"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl mx-auto mb-6 shadow-lg"
              >
                <ShoppingBag className="h-12 w-12 text-white" />
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                No Active Deals Right Now
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Check back soon for new amazing offers and exclusive deals!
              </p>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label="Browse all products"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Browse Products
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeDeals.map((deal, index) => {
              const getDealTypeIcon = (type: string) => {
                switch (type) {
                  case 'flash': return <Zap className="h-4 w-4" />;
                  case 'limited': return <Timer className="h-4 w-4" />;
                  case 'exclusive': return <Sparkles className="h-4 w-4" />;
                  default: return <Tag className="h-4 w-4" />;
                }
              };
              
              const getDealTypeColor = (type: string) => {
                switch (type) {
                  case 'flash': return 'from-red-500 to-orange-500';
                  case 'limited': return 'from-purple-500 to-pink-500';
                  case 'exclusive': return 'from-blue-500 to-cyan-500';
                  default: return 'from-gray-500 to-gray-600';
                }
              };
              
              return (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.3
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden group relative"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${getDealTypeColor(deal.type)} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-white font-bold text-sm">-{deal.discountPercentage}%</span>
                    </motion.div>
                  </div>
                  
                  <div className="p-6 sm:p-8 relative z-10">
                    {/* Deal Type Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getDealTypeColor(deal.type)} text-white text-sm font-bold rounded-full shadow-lg`}
                      >
                        {getDealTypeIcon(deal.type)}
                        {deal.type.charAt(0).toUpperCase() + deal.type.slice(1)} Deal
                      </motion.div>
                    </div>
                    
                    {/* Timer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-gray-500 mb-4 bg-gray-50 rounded-xl px-4 py-2"
                    >
                      <Clock className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">
                        Ends {new Date(deal.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </motion.div>
                    
                    {/* Product Title */}
                    <motion.h3 
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Link to={`/products/${deal.product.id}`} aria-label={`View deal: ${deal.title}`}>
                        {deal.title}
                      </Link>
                    </motion.h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {deal.description}
                    </p>
                    
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                          ${deal.product.price.toFixed(2)}
                        </span>
                        {deal.product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${deal.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold"
                      >
                        Save ${(deal.product.originalPrice! - deal.product.price).toFixed(2)}
                      </motion.div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => {
                          const ratingValue = i + 1;
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                              viewport={{ once: true }}
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  ratingValue <= Math.floor(deal.product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : ratingValue <= deal.product.rating
                                    ? 'text-yellow-400 fill-current text-opacity-50'
                                    : 'text-gray-300'
                                }`}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                      <span className="text-gray-600 font-medium">
                        {deal.product.rating.toFixed(1)} ({deal.product.reviewCount} reviews)
                      </span>
                    </div>
                    
                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/products/${deal.product.id}`}
                        className="w-full text-center px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105 flex items-center justify-center gap-2"
                        aria-label={`View deal: ${deal.title}`}
                      >
                        <TrendingUp className="h-5 w-5" />
                        Grab This Deal
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsPage;