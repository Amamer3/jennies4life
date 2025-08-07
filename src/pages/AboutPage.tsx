import React, { useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Lazy load Lucide icons
const Heart = lazy(() => import('lucide-react').then((module) => ({ default: module.Heart })));
const Star = lazy(() => import('lucide-react').then((module) => ({ default: module.Star })));
const Sparkles = lazy(() => import('lucide-react').then((module) => ({ default: module.Sparkles })));
const Users = lazy(() => import('lucide-react').then((module) => ({ default: module.Users })));
const Award = lazy(() => import('lucide-react').then((module) => ({ default: module.Award })));
const Target = lazy(() => import('lucide-react').then((module) => ({ default: module.Target })));
const Shield = lazy(() => import('lucide-react').then((module) => ({ default: module.Shield })));
const TrendingUp = lazy(() => import('lucide-react').then((module) => ({ default: module.TrendingUp })));

// Unified interface for features and values
interface Item {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  type: 'feature' | 'value';
}

/**
 * AboutPage component displaying the mission, story, values, and CTA for Jennies4Life.
 */
const AboutPage: React.FC = () => {
  // Memoized content data
  const content = useMemo<Item[]>(
    () => [
      {
        id: 'f1',
        title: 'Curated Products',
        description: 'Hand-picked selections from trusted brands worldwide, ensuring quality and value.',
        icon: <Award />,
        color: 'text-orange-500',
        type: 'feature',
      },
      {
        id: 'f2',
        title: 'Expert Reviews',
        description: 'In-depth analysis and honest opinions from our team of product specialists.',
        icon: <Star />,
        color: 'text-yellow-500',
        type: 'feature',
      },
      {
        id: 'f3',
        title: 'Community Focus',
        description: 'Building a vibrant community of smart shoppers sharing experiences and tips.',
        icon: <Users />,
        color: 'text-blue-500',
        type: 'feature',
      },
      {
        id: 'v1',
        title: 'Quality First',
        description: 'We rigorously test and only recommend products we truly believe in.',
        icon: <Shield />,
        color: 'text-green-500',
        type: 'value',
      },
      {
        id: 'v2',
        title: 'Customer Centric',
        description: 'Your satisfaction and shopping experience is our top priority always.',
        icon: <Heart />,
        color: 'text-red-500',
        type: 'value',
      },
      {
        id: 'v3',
        title: 'Best Deals',
        description: 'Helping you discover the best value and savings for your money.',
        icon: <TrendingUp />,
        color: 'text-purple-500',
        type: 'value',
      },
    ],
    []
  );

  const features = content.filter((item) => item.type === 'feature');
  const values = content.filter((item) => item.type === 'value');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
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
            className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20"
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
            className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20"
          />
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
          />
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
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
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl mr-4"
                >
                  <Suspense fallback={<div className="h-10 w-10 bg-white/20 rounded-full" />}>
                    <Sparkles className="h-10 w-10 text-white" />
                  </Suspense>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Suspense fallback={<div className="h-4 w-4 bg-white rounded-full" />}>
                    <Heart className="h-4 w-4 text-white" />
                  </Suspense>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            >
              About Jennies4Life
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Your go-to destination for curated products, expert reviews, and lifestyle inspiration that transforms your shopping experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <span className="text-sm font-semibold">🏆 Trusted by 50K+ Customers</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <span className="text-sm font-semibold">⭐ 4.9/5 Rating</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <span className="text-sm font-semibold">🚀 Since 2020</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Enhanced Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 sm:mb-16 lg:mb-20"
          role="region"
          aria-labelledby="our-story"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 id="our-story" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
              Jennies4Life was founded with a simple yet powerful mission: to help you discover amazing products that enhance your daily life. We curate the best deals, provide honest reviews, and share lifestyle tips to make your shopping experience enjoyable, informed, and truly transformative.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
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
                  transition: { duration: 0.3 }
                }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 group relative overflow-hidden"
                role="article"
                aria-label={feature.title}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <Suspense fallback={<div className="h-12 w-12 bg-gray-200 rounded-2xl mb-4" />}>
                    <motion.div 
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br ${feature.color === 'text-orange-500' ? 'from-orange-400 to-orange-600' : feature.color === 'text-yellow-500' ? 'from-yellow-400 to-yellow-600' : 'from-blue-400 to-blue-600'}`}
                    >
                      {React.isValidElement(feature.icon)
                        ? React.cloneElement(feature.icon as React.ReactElement<any>, {
                            className: `h-8 w-8 text-white`,
                            'aria-hidden': true,
                          })
                        : feature.icon}
                    </motion.div>
                  </Suspense>
                  
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Decorative element */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className="h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 sm:mb-16 lg:mb-20"
          role="region"
          aria-labelledby="our-values"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 id="our-values" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              These core principles guide everything we do and shape our commitment to excellence.
            </p>
          </motion.div>
          
          <div className="space-y-6 sm:space-y-8">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.3
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 group relative overflow-hidden"
                role="article"
                aria-label={value.title}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <Suspense fallback={<div className="h-12 w-12 bg-gray-200 rounded-2xl flex-shrink-0" />}>
                      <motion.div 
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br ${value.color === 'text-green-500' ? 'from-green-400 to-green-600' : value.color === 'text-red-500' ? 'from-red-400 to-red-600' : 'from-purple-400 to-purple-600'}`}
                      >
                        {React.isValidElement(value.icon)
                          ? React.cloneElement(value.icon as React.ReactElement<any>, {
                              className: `h-8 w-8 text-white`,
                              'aria-hidden': true,
                            })
                          : value.icon}
                      </motion.div>
                    </Suspense>
                    
                    <div className="flex-1">
                      <motion.h3 
                        className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        {value.title}
                      </motion.h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {value.description}
                      </p>
                      
                      {/* Decorative element */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        className="h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center relative overflow-hidden py-8 sm:py-12"
          role="region"
          aria-labelledby="join-community"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 rounded-3xl"></div>
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-30"
          ></motion.div>
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-30"
          ></motion.div>
          
          <div className="relative z-10 p-8 sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6 sm:mb-8"
            >
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-lg"
              >
                <Suspense fallback={<div className="h-8 w-8 bg-white/20 rounded-full" />}>
                  <Target className="h-8 w-8 text-white" />
                </Suspense>
              </motion.div>
              
              <h2 id="join-community" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                Ready to Start Your Journey?
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who trust Jennies4Life for their shopping needs. Discover amazing deals, get expert recommendations, and transform your lifestyle today.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Suspense fallback={<div className="h-12 w-48 bg-gray-200 rounded-2xl" />}>
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 group"
                    aria-label="Sign up for Jennies4Life"
                  >
                    <span>Get Started Today</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      <TrendingUp className="h-5 w-5" />
                    </motion.div>
                  </Link>
                </Suspense>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Suspense fallback={<div className="h-12 w-40 bg-gray-200 rounded-2xl" />}>
                  <Link
                    to="/deals"
                    className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                    aria-label="Browse today's deals"
                  >
                    <span>Browse Deals</span>
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Link>
                </Suspense>
              </motion.div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600 mt-6"
            >
              ✨ No spam, just amazing deals and lifestyle tips
            </motion.p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;