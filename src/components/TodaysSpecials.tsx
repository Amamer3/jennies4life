import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Clock, Flame, TrendingUp, Gift, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { publicDealsAPI, type PublicDeal } from '../services/publicDealsApi';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TodaysSpecials: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 18, minutes: 53, seconds: 45 });
  const [todaysSpecials, setTodaysSpecials] = useState<PublicDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate time left until the earliest deal expires
  const calculateTimeLeft = (deals: PublicDeal[]): TimeLeft => {
    if (deals.length === 0) {
      return { days: 0, hours: 18, minutes: 53, seconds: 45 }; // Default fallback
    }

    // Find the earliest end date among all deals
    const earliestEndDate = deals.reduce((earliest, deal) => {
      const dealEndDate = new Date(deal.endDate);
      return dealEndDate < earliest ? dealEndDate : earliest;
    }, new Date(deals[0].endDate));

    const now = new Date();
    const timeDiff = earliestEndDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const fetchTodaysSpecials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch active deals from API
        const response = await publicDealsAPI.getActiveDeals();
        
        if (response.success && response.data) {
          // Limit to first 4 deals for today's specials
          const deals = response.data.slice(0, 4);
          setTodaysSpecials(deals);
          
          // Calculate initial countdown based on deals
          const initialTimeLeft = calculateTimeLeft(deals);
          setTimeLeft(initialTimeLeft);
        } else {
          setError(response.message || 'Failed to fetch today\'s specials');
        }
      } catch (err) {
        setError('An error occurred while fetching today\'s specials');
        console.error('Error fetching today\'s specials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysSpecials();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (todaysSpecials.length > 0) {
        const newTimeLeft = calculateTimeLeft(todaysSpecials);
        setTimeLeft(newTimeLeft);
      } else {
        // Fallback to decrementing logic if no deals are available
        setTimeLeft(prevTime => {
          if (prevTime.seconds > 0) {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          } else if (prevTime.minutes > 0) {
            return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
          } else if (prevTime.hours > 0) {
            return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
          } else if (prevTime.days > 0) {
            return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
          } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [todaysSpecials]);

  const calculateDiscount = (originalPrice?: number, discountedPrice?: number) => {
    if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Today's Specials
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            <span className="ml-2 text-gray-600">Loading today's specials...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Today's Specials
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
                <Sparkles className="h-5 w-5 text-orange-500" />
                <span className="text-orange-600 font-bold text-lg">Limited Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="text-red-600 font-semibold text-sm">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')} remaining
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4 sm:mb-6"
          >
            <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Today's Hot Deals
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Don't miss out on these incredible deals! Limited quantities available - grab yours before they're gone!
          </motion.p>
        </motion.div>

        {/* Deals Grid */}
        {todaysSpecials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No special deals available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {todaysSpecials.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 relative"
              >
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                  >
                    {calculateDiscount(deal.originalPrice, deal.discountedPrice)}% OFF
                  </motion.div>
                </div>

                {/* Wishlist Button */}
                <button
                  className="absolute top-3 right-3 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:scale-110"
                  aria-label={`Add ${deal.title} to wishlist`}
                >
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>

                {/* Product Image */}
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={deal.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt={deal.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  {/* Category */}
                  <p className="text-xs sm:text-sm text-orange-600 font-semibold mb-2 uppercase tracking-wide">
                    {deal.category}
                  </p>
                  
                  {/* Product Name */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    <Link to={`/deals/${deal.id}`} aria-label={`View details for ${deal.title}`}>
                      {deal.title}
                    </Link>
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
                    {deal.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${(deal.discountedPrice || 0).toFixed(2)}
                      </span>
                      {deal.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/deals/${deal.id}`}
                      className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-200 text-center hover:from-red-600 hover:to-orange-600 transform hover:scale-105"
                      aria-label={`View details for ${deal.title}`}
                    >
                      View Deal
                    </Link>
                    <a
                      href={deal.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-all duration-200 hover:scale-110"
                      aria-label={`Buy ${deal.title} now`}
                      title="Buy Now"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Deals Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link
            to="/deals"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white text-base font-semibold rounded-xl hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="View all deals"
          >
            <Gift className="mr-2 h-5 w-5" />
            View All Deals
            <TrendingUp className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TodaysSpecials;