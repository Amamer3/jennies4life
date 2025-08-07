import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ExternalLink, Clock, Zap, Flame, TrendingUp, ShoppingCart, Gift, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  discount: number;
  affiliateLink: string;
  description: string;
  sold: number;
  available: number;
  endTime: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TodaysSpecials: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 18, minutes: 53, seconds: 45 });

  const todaysSpecials: Product[] = [
    {
      id: 'special-1',
      name: 'Under Armour Hustle Sport Backpack',
      category: 'Sports & Fitness',
      price: 33.75,
      originalPrice: 45.00,
      rating: 4.8,
      reviews: 324,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 25,
      affiliateLink: '#',
      description: 'Durable and spacious backpack perfect for sports and daily use',
      sold: 12,
      available: 16,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    },
    {
      id: 'special-2',
      name: 'Wireless Bluetooth Earbuds Pro',
      category: 'Electronics',
      price: 59.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 567,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 40,
      affiliateLink: '#',
      description: 'Premium sound quality with active noise cancellation',
      sold: 28,
      available: 22,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      id: 'special-3',
      name: 'Smart Fitness Watch',
      category: 'Health & Wellness',
      price: 149.99,
      originalPrice: 249.99,
      rating: 4.9,
      reviews: 892,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 40,
      affiliateLink: '#',
      description: 'Advanced health monitoring with GPS and heart rate tracking',
      sold: 45,
      available: 35,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      id: 'special-4',
      name: 'Premium Skincare Set',
      category: 'Beauty',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 234,
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 38,
      affiliateLink: '#',
      description: 'Complete skincare routine with natural ingredients',
      sold: 18,
      available: 32,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getProgressPercentage = (sold: number, available: number) => {
    const total = sold + available;
    return (sold / total) * 100;
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-red-200 to-orange-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-yellow-200 to-red-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full opacity-20"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-4 sm:mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mr-4"
              >
                <Flame className="h-8 w-8 text-white" />
              </motion.div>
             
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-bold text-lg sm:text-xl">HOT DEALS</span>
                <TrendingUp className="h-5 w-5 text-red-600 animate-bounce" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Limited Time Only</span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6"
          >
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Today's Explosive
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 via-red-800 to-orange-800 bg-clip-text text-transparent">
              Mega Deals
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-4 leading-relaxed"
          >
            <span className="font-semibold text-red-600">Flash Sales</span> with up to <span className="font-bold text-orange-600">70% OFF</span> • 
            <span className="font-semibold text-yellow-600">Free Shipping</span> on all orders • 
            <span className="font-semibold text-red-600">Limited Stock</span> - Act Fast!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-6 mt-6"
          >
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-600">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Gift className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">Gift Wrapping</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 text-center overflow-hidden shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 2 + i * 0.1, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${(i * 7) % 100}%`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm"
              >
                <Clock className="h-6 w-6 text-white" />
              </motion.div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-bold mb-1"> FLASH SALE ENDING SOON!</div>
                <div className="text-sm sm:text-base opacity-90">Don't miss these incredible savings</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-3 sm:space-x-6"
            >
              {[
                { value: timeLeft.days, label: 'Days', color: 'from-red-400 to-red-600' },
                { value: timeLeft.hours, label: 'Hours', color: 'from-orange-400 to-orange-600' },
                { value: timeLeft.minutes, label: 'Minutes', color: 'from-yellow-400 to-yellow-600' },
                { value: timeLeft.seconds, label: 'Seconds', color: 'from-red-400 to-pink-600' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <motion.div
                    animate={{ scale: item.label === 'Seconds' ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-3 sm:p-4 mb-2 font-bold text-2xl sm:text-3xl lg:text-4xl shadow-lg backdrop-blur-sm border border-white/20 min-w-[60px] sm:min-w-[80px]`}
                  >
                    {item.value.toString().padStart(2, '0')}
                  </motion.div>
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-90">
                    {item.label}
                  </div>
                  {index < 3 && (
                    <div className="absolute top-1/2 -right-2 sm:-right-3 transform -translate-y-1/2 text-2xl sm:text-3xl font-bold opacity-60">
                      :
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap justify-center gap-4"
            >
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-sm font-semibold"> Free Gift with Purchase</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-sm font-semibold"> Same Day Delivery</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-sm font-semibold"> Money Back Guarantee</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {todaysSpecials.map((product, index) => (
            <motion.div
              key={product.id}
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
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group relative transform-gpu perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl transform scale-110"></div>
              
              <div className="relative z-10 bg-white rounded-2xl overflow-hidden">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Discount Badge */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg"
                  >
                    <span className="flex items-center">
                       <Flame className="h-3 w-3 mr-1" />
                       -{product.discount}%
                     </span>
                  </motion.div>
                  
                  {/* Wishlist Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:scale-110"
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </motion.button>
                  
                  {/* Trending Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    HOT
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5">
                  {/* Category */}
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    viewport={{ once: true }}
                    className="text-xs sm:text-sm text-red-600 font-medium mb-1 sm:mb-2"
                  >
                    {product.category}
                  </motion.p>
                  
                  {/* Product Name */}
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                    viewport={{ once: true }}
                    className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link to={`/products/${product.id}`} aria-label={`View details for ${product.name}`}>
                      {product.name}
                    </Link>
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                    viewport={{ once: true }}
                    className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2"
                  >
                    {product.description}
                  </motion.p>
                  
                  {/* Price */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  </motion.div>

                  {/* Rating */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 1.0 }}
                    viewport={{ once: true }}
                    className="flex items-center mb-3"
                  >
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 1.1 + i * 0.05 }}
                        >
                          <Star
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-transparent'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      {product.rating.toFixed(1)} ({product.reviews})
                    </span>
                    <div className="ml-auto flex items-center text-xs text-gray-500">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Premium
                    </div>
                  </motion.div>

                  {/* Progress Bar */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                    viewport={{ once: true }}
                    className="mb-3"
                  >
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                      <span className="flex items-center">
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Sold: <span className="font-semibold ml-1">{product.sold}</span>
                      </span>
                      <span className="flex items-center">
                        <Gift className="h-3 w-3 mr-1" />
                        Left: <span className="font-semibold ml-1">{product.available}</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${getProgressPercentage(product.sold, product.available)}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 1.3, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 h-3 rounded-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {Math.round(getProgressPercentage(product.sold, product.available))}% claimed
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.4 }}
                      viewport={{ once: true }}
                      className="flex-1"
                    >
                      <Link
                        to={`/products/${product.id}`}
                        className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-2 px-3 rounded-xl text-xs sm:text-sm transition-all duration-300 text-center shadow-lg relative overflow-hidden group"
                        aria-label={`View details for ${product.name}`}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          View Details
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </Link>
                    </motion.div>
                    <motion.a
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 1.5 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-8 sm:h-10 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-600 rounded-xl transition-all duration-200 shadow-md"
                      aria-label={`Buy ${product.name} now`}
                      title="Buy Now"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodaysSpecials;