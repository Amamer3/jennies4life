import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ExternalLink, Clock, Zap, ShoppingCart, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { publicDealsAPI, type PublicDeal } from '../services/publicDealsApi';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const DealOfDay: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 18, minutes: 53, seconds: 45 });
  const [dealOfDay, setDealOfDay] = useState<PublicDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDealOfDay = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch active deals from API and get the first one as deal of the day
        const response = await publicDealsAPI.getActiveDeals();
        
        if (response.success && response.data && response.data.length > 0) {
          // Get the first deal as the deal of the day
          setDealOfDay(response.data[0]);
        } else {
          setError(response.message || 'No deals available today');
        }
      } catch (err) {
        setError('An error occurred while fetching today\'s deal');
        console.error('Error fetching deal of the day:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDealOfDay();
  }, []);

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

  const calculateDiscount = (originalPrice?: number, discountedPrice?: number) => {
    if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  };

  const getProgressPercentage = (sold: number, available: number) => {
    const total = sold + available;
    return total > 0 ? (sold / total) * 100 : 0;
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Deal of the Day
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            <span className="ml-2 text-gray-600">Loading today's featured deal...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error || !dealOfDay) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Deal of the Day
            </h2>
          </div>
          <div className="flex justify-center items-center py-12">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-gray-600">{error || 'No deal available today'}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
            <span className="text-red-600 font-semibold text-base sm:text-lg">Deal of Day</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Today's Featured Deal
          </h2>
        </motion.div>

        {/* Deal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src={dealOfDay.imageUrl || 'https://via.placeholder.com/600x400'}
                alt={dealOfDay.title}
                loading="lazy"
                className="w-full h-64 sm:h-80 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                -{calculateDiscount(dealOfDay.originalPrice, dealOfDay.discountedPrice)}%
              </div>
              {/* Trending Badge */}
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center shadow-lg">
                <TrendingUp className="h-4 w-4 mr-1" />
                Hot Deal
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Category */}
              <p className="text-sm text-red-600 font-medium mb-2">{dealOfDay.category}</p>
              
              {/* Product Name */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {dealOfDay.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {dealOfDay.description}
              </p>

              {/* Features - Show some key features if available */}
              {dealOfDay.features && dealOfDay.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {dealOfDay.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rating - Show if available */}
              {dealOfDay.rating && dealOfDay.reviewCount && (
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
                          i < Math.floor(dealOfDay.rating || 0) ? 'fill-current' : 'stroke-current fill-transparent'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {dealOfDay.rating.toFixed(1)} ({dealOfDay.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-red-600">
                  ${(dealOfDay.discountedPrice || 0).toFixed(2)}
                </span>
                {dealOfDay.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${dealOfDay.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded">
                      Save ${(dealOfDay.originalPrice - (dealOfDay.discountedPrice || 0)).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Progress Bar - Show if usage data is available */}
              {dealOfDay.usageCount !== undefined && dealOfDay.maxUsage && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Already Used: {dealOfDay.usageCount}</span>
                    <span>Available: {dealOfDay.maxUsage - dealOfDay.usageCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(dealOfDay.usageCount, dealOfDay.maxUsage - dealOfDay.usageCount)}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm font-semibold text-red-600">
                      {Math.round(getProgressPercentage(dealOfDay.usageCount, dealOfDay.maxUsage - dealOfDay.usageCount))}% Used
                    </span>
                  </div>
                </div>
              )}

              {/* Countdown Timer */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Hurry Up! Offer ends soon.</span>
                </div>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="bg-white text-red-600 rounded-lg p-2 mb-1 font-bold text-xl min-w-[3rem]">
                      {timeLeft.days.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs">days</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white text-red-600 rounded-lg p-2 mb-1 font-bold text-xl min-w-[3rem]">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs">hours</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white text-red-600 rounded-lg p-2 mb-1 font-bold text-xl min-w-[3rem]">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs">minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white text-red-600 rounded-lg p-2 mb-1 font-bold text-xl min-w-[3rem]">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs">seconds</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/deals/${dealOfDay.id}`}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-center flex items-center justify-center"
                  aria-label={`View details for ${dealOfDay.title}`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  View Details
                </Link>
                <a
                  href={dealOfDay.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 text-center flex items-center justify-center"
                  aria-label={`Buy ${dealOfDay.title} now`}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Buy Now
                </a>
                <button
                  className="w-12 h-12 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  aria-label={`Add ${dealOfDay.title} to wishlist`}
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DealOfDay;