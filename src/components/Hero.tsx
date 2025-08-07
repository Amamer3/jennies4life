import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, ShoppingBag, Zap, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for feature data
interface Feature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

// Define types for carousel slide data
interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  category: string;
  originalPrice: string;
  salePrice: string;
  rating: number;
  reviews: number;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slides data
  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: 'Premium Wireless Headphones',
      subtitle: 'Noise-Cancelling Technology',
      discount: '45% OFF',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      category: 'Electronics',
      originalPrice: '$299.99',
      salePrice: '$164.99',
      rating: 4.8,
      reviews: 2847
    },
    {
      id: 2,
      title: 'Organic Skincare Set',
      subtitle: 'Natural Beauty Collection',
      discount: '35% OFF',
      image: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg',
      category: 'Beauty',
      originalPrice: '$89.99',
      salePrice: '$58.49',
      rating: 4.9,
      reviews: 1523
    },
    {
      id: 3,
      title: 'Smart Fitness Tracker',
      subtitle: 'Health & Wellness Monitor',
      discount: '50% OFF',
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
      category: 'Health',
      originalPrice: '$199.99',
      salePrice: '$99.99',
      rating: 4.7,
      reviews: 3621
    },
    {
      id: 4,
      title: 'Designer Handbag',
      subtitle: 'Luxury Fashion Accessory',
      discount: '40% OFF',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      category: 'Fashion',
      originalPrice: '$249.99',
      salePrice: '$149.99',
      rating: 4.6,
      reviews: 987
    }
  ];

  // Feature highlights
  const features: Feature[] = [
    {
      icon: Zap,
      title: 'Lightning Fast Deals',
      description: 'New deals updated every hour',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Users,
      title: '50K+ Happy Customers',
      description: 'Join our growing community',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: ShoppingBag,
      title: 'Curated Products',
      description: 'Hand-picked by our experts',
      color: 'from-green-400 to-teal-500'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
                New Deals Added Daily - Save Up to 70%!
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Unlock the{' '}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-pulse">
                  Best Deals
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
              <br />
              <span className="text-gray-800">Across All Products</span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Your ultimate destination for{' '}
              <span className="font-semibold text-purple-600">curated products</span>,{' '}
              <span className="font-semibold text-pink-600">expert reviews</span>, and{' '}
              <span className="font-semibold text-blue-600">exclusive deals</span>{' '}
              across health, wellness, electronics, fashion, and lifestyle essentials.
            </motion.p>

            {/* Enhanced Stats Cards */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            >
              {[
                { icon: Star, label: '50K+ Reviews', value: '4.9/5', color: 'from-yellow-400 to-orange-500' },
                { icon: TrendingUp, label: 'Products', value: '10K+', color: 'from-green-400 to-teal-500' },
                { icon: Gift, label: 'Daily Deals', value: '100+', color: 'from-purple-400 to-pink-500' }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-3 mx-auto lg:mx-0`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div> */}

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/deals"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Explore Today's Deals
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                to="/categories"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-800 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Categories
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Modern Carousel Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 relative"
          >
            {/* Carousel Container */}
            <div className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 overflow-hidden">
              {/* Carousel Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Featured Deals
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Today's Hot Picks</h3>
                <p className="text-gray-600">Handpicked deals just for you</p>
              </div>

              {/* Carousel Slides */}
              <div className="relative h-80 mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={slides[currentSlide].image}
                          alt={slides[currentSlide].title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {slides[currentSlide].discount}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                            {slides[currentSlide].category}
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="p-6 flex flex-col justify-center">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {slides[currentSlide].title}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {slides[currentSlide].subtitle}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-4">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(slides[currentSlide].rating)
                                    ? 'fill-current'
                                    : 'stroke-current'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {slides[currentSlide].rating} ({slides[currentSlide].reviews} reviews)
                          </span>
                        </div>

                        {/* Pricing */}
                        <div className="mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-purple-600">
                              {slides[currentSlide].salePrice}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              {slides[currentSlide].originalPrice}
                            </span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          Shop Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mb-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-purple-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Feature Highlights - Compact Version */}
              <div className="grid grid-cols-3 gap-2">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="text-center p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300"
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="text-xs font-semibold text-gray-900">{feature.title}</h4>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-4 h-4 bg-pink-400 rounded-full"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Bottom Wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <svg viewBox="0 0 1440 120" className="w-full h-16 sm:h-20 lg:h-24">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;