import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight, Star, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrendingSection {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  productCount: number;
  rating: number;
  trending: boolean;
  link: string;
}

const TrendingSections: React.FC = () => {
  const trendingSections: TrendingSection[] = [
    {
      id: 'electronics-trending',
      title: 'Smart Electronics',
      description: 'Latest gadgets and smart devices for modern living',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Electronics',
      productCount: 156,
      rating: 4.8,
      trending: true,
      link: '/category/electronics',
    },
    {
      id: 'fashion-trending',
      title: 'Fashion Forward',
      description: 'Trending styles and must-have fashion accessories',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fashion',
      productCount: 234,
      rating: 4.7,
      trending: true,
      link: '/category/fashion',
    },
    {
      id: 'health-trending',
      title: 'Health & Wellness',
      description: 'Premium health products for a better lifestyle',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Health',
      productCount: 189,
      rating: 4.9,
      trending: true,
      link: '/category/health',
    },
    {
      id: 'beauty-trending',
      title: 'Beauty Essentials',
      description: 'Top-rated skincare and beauty products',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Beauty',
      productCount: 167,
      rating: 4.6,
      trending: true,
      link: '/category/beauty',
    },
    {
      id: 'home-trending',
      title: 'Home & Living',
      description: 'Transform your space with trending home decor',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Home',
      productCount: 198,
      rating: 4.5,
      trending: true,
      link: '/category/home',
    },
    {
      id: 'sports-trending',
      title: 'Sports & Fitness',
      description: 'High-quality gear for active lifestyles',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Sports',
      productCount: 143,
      rating: 4.7,
      trending: true,
      link: '/category/sports',
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 mr-2" />
            <span className="text-orange-600 font-semibold text-base sm:text-lg">Trending Sections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Highest Quality and Handpicked
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover our most popular categories featuring carefully curated products with exceptional quality and customer satisfaction.
          </p>
        </motion.div>

        {/* Trending Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {trendingSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Background Image */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={section.image}
                  alt={section.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Trending Badge */}
                {section.trending && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                    {section.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-white text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{section.productCount} products</span>
                      </div>
                      <div className="flex items-center text-white text-xs">
                        <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                        <span>{section.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-orange-300 text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      <span>Top Rated</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={section.link}
                    className="inline-flex items-center text-white hover:text-orange-300 text-sm font-medium transition-colors duration-200"
                    aria-label={`Explore ${section.title} products`}
                  >
                    Explore {section.category}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-400 rounded-lg transition-colors duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10 lg:mt-12"
        >
          <Link
            to="/categories"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label="View all categories"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSections;