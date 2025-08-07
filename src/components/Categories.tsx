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
  backgroundImage?: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Health & Wellness',
      description: 'Supplements, fitness gear, and wellness products for a healthier lifestyle',
      icon: <Heart className="h-6 w-6 sm:h-8 sm:w-8" />,
      productCount: 245,
      color: 'text-[#FFDAB9]',
      gradient: 'bg-gradient-to-br from-[#FFE4C4] to-[#FFA07A]',
      path: '/category/health',
      backgroundImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    },
    {
      id: '2',
      name: 'Electronics',
      description: 'Latest gadgets, smart devices, and tech accessories',
      icon: <Smartphone className="h-6 w-6 sm:h-8 sm:w-8" />,
      productCount: 189,
      color: 'text-[#F0E68C]',
      gradient: 'bg-gradient-to-br from-[#FFFACD] to-[#FFDAB9]',
      path: '/category/electronics',
      backgroundImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    },
    {
      id: '3',
      name: 'Fashion & Style',
      description: 'Trending clothing, accessories, and style essentials',
      icon: <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />,
      productCount: 312,
      color: 'text-[#D1BF00]',
      gradient: 'bg-gradient-to-br from-[#FFFF00] to-[#FFA500]',
      path: '/category/fashion',
      backgroundImage: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    },
    {
      id: '4',
      name: 'Home & Garden',
      description: 'Home decor, kitchen essentials, and garden tools',
      icon: <Home className="h-6 w-6 sm:h-8 sm:w-8" />,
      productCount: 156,
      color: 'text-[#FFA07A]',
      gradient: 'bg-gradient-to-br from-[#FFE4C4] to-[#FFFACD]',
      path: '/category/home',
      backgroundImage: 'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
    },
    {
      id: '5',
      name: 'Sports & Fitness',
      description: 'Workout equipment, athletic wear, and fitness accessories',
      icon: <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8" />,
      productCount: 198,
      color: 'text-[#D1BF00]',
      gradient: 'bg-gradient-to-br from-[#FFFFE0] to-[#FFDAB9]',
      path: '/category/sports',
      backgroundImage: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg',
    },
    {
      id: '6',
      name: 'Beauty & Care',
      description: 'Skincare, makeup, and personal care products',
      icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8" />,
      productCount: 167,
      color: 'text-[#FFA07A]',
      gradient: 'bg-gradient-to-br from-[#FFFFE0] to-[#FFFACD]',
      path: '/category/beauty',
      backgroundImage: 'https://images.pexels.com/photos/301703/pexels-photo-301703.jpeg',
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-[#fbb53b] to-[#fa6742]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Trending Categories
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Discover high-quality, handpicked products across all categories. Find your perfect match with our trending selections.
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
                aria-label={`Navigate to ${category.name} category`}
                className="block bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Category Header */}
                <div className={`relative h-32 sm:h-40 lg:h-48 ${category.gradient} flex items-center justify-center overflow-hidden`}>
                  {/* Dynamic Background Image */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
                      style={{ backgroundImage: `url(${category.backgroundImage})` }}
                    />
                  </div>
                  {/* Icon */}
                  <div className={`relative ${category.color} transform group-hover:scale-105 transition-transform duration-300`}>
                    {React.isValidElement(category.icon)
                      ? React.cloneElement(category.icon as React.ReactElement<any>, {
                          className: `h-6 w-6 sm:h-8 sm:w-8 ${category.color}`,
                        })
                      : category.icon}
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-[#ff878700] transition-colors">
                      {category.name}
                    </h3>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-[#94f08c] transform group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">
                      {category.productCount} products
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-[#e02900] rounded-full"></div>
                      <span className="text-xs sm:text-sm text-[#FF8C00] font-medium">Active deals</span>
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
          className="mt-8 sm:mt-10 lg:mt-12"
        >
          <div className="relative bg-gradient-to-r from-[#F0E68C] to-[#DAA520] rounded-lg shadow-md overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
                style={{
                  backgroundImage: `url("https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg")`,
                }}
              />
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-white mb-2 sm:mb-3">
                Discover More Categories
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-[#FFFFF0] mb-4 sm:mb-6 max-w-xl mx-auto px-2">
                Shop our new arrivals, carefully selected for you. Find the perfect products across all categories with exclusive deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  to="/categories"
                  aria-label="Browse all product categories"
                  className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-2.5 bg-white text-[#F0E68C] text-sm sm:text-base font-semibold rounded-lg hover:bg-[#FFFFF0] transform hover:scale-105 transition-all duration-200 shadow-md"
                  title="Browse all categories"
                >
                  Browse All Categories
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  to="/deals"
                  aria-label="View today's deals"
                  className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-2.5 bg-transparent border-2 border-white text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white hover:text-[#F0E68C] transition-all duration-200"
                  title="View today's deals"
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