import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Heart, Smartphone, Home, Dumbbell, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  productCount: number;
  color: string;
  gradient: string;
  path: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Health & Wellness',
      description: 'Supplements, fitness gear, and wellness products for a healthier lifestyle',
      icon: <Heart className="h-8 w-8" />,
      productCount: 245,
      color: 'text-green-600',
      gradient: 'from-green-400 to-emerald-500',
      path: '/category/health'
    },
    {
      id: '2',
      name: 'Electronics',
      description: 'Latest gadgets, smart devices, and tech accessories',
      icon: <Smartphone className="h-8 w-8" />,
      productCount: 189,
      color: 'text-blue-600',
      gradient: 'from-blue-400 to-cyan-500',
      path: '/category/electronics'
    },
    {
      id: '3',
      name: 'Fashion & Style',
      description: 'Trending clothing, accessories, and style essentials',
      icon: <Sparkles className="h-8 w-8" />,
      productCount: 312,
      color: 'text-pink-600',
      gradient: 'from-pink-400 to-rose-500',
      path: '/category/fashion'
    },
    {
      id: '4',
      name: 'Home & Garden',
      description: 'Home decor, kitchen essentials, and garden tools',
      icon: <Home className="h-8 w-8" />,
      productCount: 156,
      color: 'text-orange-600',
      gradient: 'from-orange-400 to-amber-500',
      path: '/category/home'
    },
    {
      id: '5',
      name: 'Sports & Fitness',
      description: 'Workout equipment, athletic wear, and fitness accessories',
      icon: <Dumbbell className="h-8 w-8" />,
      productCount: 198,
      color: 'text-purple-600',
      gradient: 'from-purple-400 to-violet-500',
      path: '/category/sports'
    },
    {
      id: '6',
      name: 'Beauty & Care',
      description: 'Skincare, makeup, and personal care products',
      icon: <Zap className="h-8 w-8" />,
      productCount: 167,
      color: 'text-indigo-600',
      gradient: 'from-indigo-400 to-purple-500',
      path: '/category/beauty'
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Trending Sections
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Highest quality and handpicked products across all categories. 
            Discover what's trending and find your perfect match.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link
                  to={category.path}
                  className="block bg-neutral-50 rounded-xl sm:rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                {/* Category Header */}
                <div className={`relative h-24 sm:h-32 bg-gradient-to-br ${category.gradient} flex items-center justify-center overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-20-18c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>
                  
                  {/* Icon */}
                  <div className="relative text-white transform group-hover:scale-110 transition-transform duration-300">
                    {React.isValidElement(category.icon) 
                      ? React.cloneElement(category.icon as React.ReactElement<any>, { className: "h-6 w-6 sm:h-8 sm:w-8" })
                      : category.icon
                    }
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-white bg-opacity-30 rounded-full animate-bounce-slow"></div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white bg-opacity-40 rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Category Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  
                  <p className="text-neutral-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-neutral-500">
                      {category.productCount} products
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-600 font-medium">Active deals</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Category Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 lg:mt-16"
        >
          <div className="relative bg-[#FACC15] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-white mb-2 sm:mb-3 lg:mb-4">
                Discover More Categories
              </h3>
              <p className="text-sm sm:text-base lg:text-xl text-blue-100 mb-6 sm:mb-7 lg:mb-8 max-w-2xl mx-auto px-2">
                Shop our new arrivals, carefully selected for you. Find the perfect products 
                across all categories with exclusive deals and expert recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/categories"
                  className="inline-flex items-center px-6 sm:px-7 lg:px-8 py-2.5 sm:py-3 bg-white text-primary-600 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Browse All Categories
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  to="/deals"
                  className="inline-flex items-center px-6 sm:px-7 lg:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-white text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  View Today's Deals
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;