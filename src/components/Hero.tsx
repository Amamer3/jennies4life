import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g fill="none" fillRule="evenodd">
            <g fill="#000000" fillOpacity="0.1">
              <circle cx="30" cy="30" r="2"/>
            </g>
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full text-sm font-medium text-primary-800 mb-6"
            >
              <Gift className="h-4 w-4 mr-2" />
              New Deals Added Daily
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
            >
              Unlock the{' '}
              <span className="gradient-text">Best Deals</span>{' '}
              <span className="block sm:inline">Across All Products</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Your one-stop shop for savings! Discover curated products, expert reviews, and exclusive deals across health, wellness, electronics, fashion, and more.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-8"
            >
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">10K+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">500+ Products Reviewed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Daily New Deals</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/deals"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Explore Today's Deals
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-sm sm:text-base"
              >
                Browse Categories
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Visual Container */}
            <div className="relative">
              {/* Background Gradient Circle */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              
              {/* Product Cards Mockup */}
              <div className="relative grid grid-cols-2 gap-2 sm:gap-4 p-4 sm:p-8">
                {/* Card 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 cursor-pointer"
                >
                  <div className="w-full h-20 sm:h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-2 sm:mb-4 flex items-center justify-center">
                    <div className="text-blue-600 font-bold text-sm sm:text-lg">Electronics</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Smart Gadgets</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-bold text-xs sm:text-sm">Up to 40% OFF</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2 w-2 sm:h-3 sm:w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 cursor-pointer mt-4 sm:mt-8"
                >
                  <div className="w-full h-20 sm:h-32 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg mb-2 sm:mb-4 flex items-center justify-center">
                    <div className="text-pink-600 font-bold text-sm sm:text-lg">Beauty</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Skincare</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-bold text-xs sm:text-sm">25% OFF</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2 w-2 sm:h-3 sm:w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 cursor-pointer -mt-2 sm:-mt-4"
                >
                  <div className="w-full h-20 sm:h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-2 sm:mb-4 flex items-center justify-center">
                    <div className="text-green-600 font-bold text-sm sm:text-lg">Health</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Wellness</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-bold text-xs sm:text-sm">30% OFF</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2 w-2 sm:h-3 sm:w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 cursor-pointer"
                >
                  <div className="w-full h-20 sm:h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-2 sm:mb-4 flex items-center justify-center">
                    <div className="text-purple-600 font-bold text-sm sm:text-lg">Fashion</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Trending</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-bold text-xs sm:text-sm">50% OFF</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2 w-2 sm:h-3 sm:w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg viewBox="0 0 1440 120" className="w-full h-12 sm:h-20 lg:h-24 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;