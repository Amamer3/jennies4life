import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define types for product data
interface Product {
  category: string;
  title: string;
  discount: string;
  image: string;
  delay: number;
  rotate: number;
}

// Define types for arrow props
interface ArrowProps {
  onClick?: () => void;
}

// Custom Arrow Components for Slider
const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-3 rounded-full z-10 hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
    onClick={onClick}
  >
    <ArrowRight className="h-6 w-6" />
  </button>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-3 rounded-full z-10 hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
    onClick={onClick}
  >
    <ArrowRight className="h-6 w-6 transform rotate-180" />
  </button>
);

const Hero: React.FC = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true, // Use fade transition for smoother single-slide display
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots custom-dots", // Custom class for styling dots
  };

  // Product data for carousel
  const products: Product[] = [
    {
      category: 'Electronics',
      title: 'Smart Gadgets',
      discount: 'Up to 40% OFF',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      delay: 0.6,
      rotate: 3,
    },
    {
      category: 'Beauty',
      title: 'Skincare',
      discount: '25% OFF',
      image: 'https://images.pexels.com/photos/1379735/pexels-photo-1379735.jpeg',
      delay: 0.7,
      rotate: -3,
    },
    {
      category: 'Health',
      title: 'Wellness',
      discount: '30% OFF',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      delay: 0.8,
      rotate: 2,
    },
    {
      category: 'Fashion',
      title: 'Trending',
      discount: '50% OFF',
      image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
      delay: 0.9,
      rotate: -1,
    },
  ];

  return (
    <section className="relative bg-[#FACC15] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g fill="none" fillRule="evenodd">
            <g fill="#000000" fillOpacity="0.15">
              <circle cx="30" cy="30" r="2" />
            </g>
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full text-base font-semibold text-primary-900 mb-8 shadow-sm"
            >
              <Gift className="h-5 w-5 mr-2" />
              New Deals Added Daily
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight"
            >
              Unlock the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">Best Deals</span>{' '}
              <span className="block sm:inline">Across All Products</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl text-gray-700 mb-8 sm:mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            >
              Your one-stop shop for savings! Discover curated products, expert reviews, and exclusive deals across health, wellness, electronics, fashion, and more.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mb-8 sm:mb-10"
            >
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current" />
                <span className="text-sm sm:text-base font-semibold text-gray-800">10K+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                <span className="text-sm sm:text-base font-semibold text-gray-800">500+ Products Reviewed</span>
              </div>
              <div className="flex items-center space-x-3">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
                <span className="text-sm sm:text-base font-semibold text-gray-800">Daily New Deals</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
            >
              <Link
                to="/deals"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-primary-600 to-primary-800 text-white font-semibold rounded-2xl hover:from-primary-700 hover:to-primary-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                Explore Today's Deals
                <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-white text-primary-600 font-semibold rounded-2xl border-2 border-primary-300 hover:border-primary-400 hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md text-base sm:text-lg"
              >
                Browse Categories
              </Link>
            </motion.div>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Background Gradient Circle */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full opacity-20 blur-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            ></motion.div>

            {/* Slider */}
            <div className="relative px-6 sm:px-10">
              <Slider {...settings}>
                {products.map((product, index) => (
                  <div key={index} className="px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20, rotate: product.rotate }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      whileHover={{ scale: 1.05, rotate: 0 }}
                      transition={{ duration: 0.6, delay: product.delay }}
                      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 cursor-pointer overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-64 sm:h-80 object-cover rounded-xl mb-4 transition-transform duration-300 hover:scale-110"
                      />
                      <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mb-2">{product.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-bold text-base sm:text-lg">{product.discount}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base mt-2">{product.category}</p>
                    </motion.div>
                  </div>
                ))}
              </Slider>
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
        <svg viewBox="0 0 1440 120" className="w-full h-16 sm:h-24 lg:h-32 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </motion.div>

      {/* Custom Dots Styling */}
      <style>{`
        .custom-dots li button:before {
          font-size: 12px;
          color: #d1d5db;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .custom-dots li.slick-active button:before {
          color: #1f2937;
          opacity: 1;
          scale: 1.2;
        }
        .custom-dots {
          bottom: -40px;
        }
      `}</style>
    </section>
  );
};

export default Hero;