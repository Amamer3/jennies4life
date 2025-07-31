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
    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#F0E68C] text-white p-2 sm:p-3 rounded-full z-10 hover:bg-[#DAA520] transition-all duration-300 shadow-md hover:shadow-lg"
    onClick={onClick}
    aria-label="Next slide"
  >
    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
  </button>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-2 sm:p-3 rounded-full z-10 hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transform rotate-180" />
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
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots custom-dots',
  };

  // Product data for carousel
  const products: Product[] = [
    {
      category: 'Electronics',
      title: 'Smart Gadgets',
      discount: 'Up to 40% OFF',
      image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg',
      delay: 0.6,
      rotate: 3,
    },
    {
      category: 'Beauty',
      title: 'Skincare',
      discount: '25% OFF',
      image: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg',
      delay: 0.7,
      rotate: -3,
    },
    {
      category: 'Health',
      title: 'Wellness',
      discount: '30% OFF',
      image: 'https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg',
      delay: 0.8,
      rotate: 2,
    },
    {
      category: 'Fashion',
      title: 'Trending',
      discount: '50% OFF',
      image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg',
      delay: 0.9,
      rotate: -1,
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#F2FF0D] to-[#FFC71B] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g fill="none" fillRule="evenodd">
            <g fill="#ffffff" fillOpacity="0.15">
              <circle cx="30" cy="30" r="2" />
            </g>
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#FFFFF0] rounded-full text-sm sm:text-base font-semibold text-[#DAA520] mb-6 sm:mb-8 shadow-sm"
            >
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              New Deals Added Daily
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-extrabold text-gray-900 mb-3 sm:mb-4 lg:mb-6 leading-tight"
            >
              Unlock the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F0E68C] to-[#FFDAB9]">Best Deals</span>{' '}
              <span className="block sm:inline">Across All Products</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Your one-stop shop for savings! Discover curated products, expert reviews, and exclusive deals across health, wellness, electronics, fashion, and more.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-8"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">10K+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFDAB9]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">500+ Products Reviewed</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFFACD]" />
                <span className="text-xs sm:text-sm font-semibold text-gray-800">Daily New Deals</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/deals"
                aria-label="Explore today's deals"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Today's Deals
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/categories"
                aria-label="Browse product categories"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#F0E68C] text-sm sm:text-base font-semibold rounded-lg border-2 border-[#FFFFE0] hover:border-[#FFFFCC] hover:bg-[#FFFFF0] transition-all duration-300 shadow-md hover:shadow-lg"
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
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative px-4 sm:px-6 lg:px-8">
              <Slider {...settings}>
                {products.map((product, index) => (
                  <div key={index} className="px-2 sm:px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20, rotate: product.rotate }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      whileHover={{ scale: 1.05, rotate: 0 }}
                      transition={{ duration: 0.6, delay: product.delay }}
                      className="bg-white rounded-lg shadow-md p-4 sm:p-6 cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={product.image}
                        alt={`${product.title} - ${product.category}`}
                        loading="lazy"
                        className="w-full h-40 sm:h-48 lg:h-64 object-cover rounded-lg mb-3 sm:mb-4 transition-transform duration-300 hover:scale-105"
                      />
                      <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2">{product.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-bold text-sm sm:text-base">{product.discount}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm mt-2">{product.category}</p>
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
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <svg viewBox="0 0 1440 100" className="w-full h-12 sm:h-16 lg:h-20 fill-white">
          <path d="M0,48L48,53.3C96,59,192,69,288,64C384,59,480,43,576,38.7C672,35,768,43,864,48C960,53,1056,53,1152,48C1248,43,1344,32,1392,26.7L1440,21L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </motion.div>

      {/* Custom Dots Styling */}
      <style>{`
        .custom-dots {
          bottom: -32px;
          display: flex !important;
          justify-content: center;
          gap: 8px;
        }
        .custom-dots li {
          width: 10px;
          height: 10px;
        }
        .custom-dots li button {
          width: 10px;
          height: 10px;
          padding: 0;
        }
        .custom-dots li button:before {
          content: '';
          width: 10px;
          height: 10px;
          background-color: #d1d5db;
          border-radius: 50%;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .custom-dots li.slick-active button:before {
          background-color: #1f2937;
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Hero;