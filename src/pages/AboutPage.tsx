import React, { useMemo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Lazy load Lucide icons
const Heart = lazy(() => import('lucide-react').then((module) => ({ default: module.Heart })));
const ShoppingBag = lazy(() => import('lucide-react').then((module) => ({ default: module.ShoppingBag })));
const Star = lazy(() => import('lucide-react').then((module) => ({ default: module.Star })));
const ArrowRight = lazy(() => import('lucide-react').then((module) => ({ default: module.ArrowRight })));

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
        description: 'Hand-picked selections from trusted brands.',
        icon: <ShoppingBag />,
        color: 'text-[#FFFACD]',
        type: 'feature',
      },
      {
        id: 'f2',
        title: 'Expert Reviews',
        description: 'In-depth analysis and honest opinions.',
        icon: <Star />,
        color: 'text-[#A020F0]',
        type: 'feature',
      },
      {
        id: 'f3',
        title: 'Community Focus',
        description: 'Building a community of smart shoppers.',
        icon: <Heart />,
        color: 'text-[#FFDAB9]',
        type: 'feature',
      },
      {
        id: 'v1',
        title: 'Quality First',
        description: 'We only recommend products we truly believe in.',
        icon: <Star />,
        color: 'text-[#FFFFF0]',
        type: 'value',
      },
      {
        id: 'v2',
        title: 'Customer Centric',
        description: 'Your satisfaction is our top priority.',
        icon: <Heart />,
        color: 'text-[#FF4500]',
        type: 'value',
      },
      {
        id: 'v3',
        title: 'Best Deals',
        description: 'Helping you find the best value for your money.',
        icon: <ShoppingBag />,
        color: 'text-[#FFFF66]',
        type: 'value',
      },
    ],
    []
  );

  const features = content.filter((item) => item.type === 'feature');
  const values = content.filter((item) => item.type === 'value');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FFFACD] to-[#F0E68C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">
              About Jennies4Life
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#FFFFE0] mb-4 sm:mb-6 max-w-prose mx-auto">
              Your go-to destination for curated products, expert reviews, and lifestyle inspiration.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 sm:mb-12 lg:mb-16"
          role="region"
          aria-labelledby="our-story"
        >
          <h2 id="our-story" className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Our Story
          </h2>
          <p className="text-sm sm:text-base text-gray-800 mb-4 sm:mb-6 max-w-prose">
            Jennies4Life was founded with a simple mission: to help you discover amazing products that enhance your daily life. We curate the best deals, provide honest reviews, and share lifestyle tips to make your shopping experience enjoyable and informed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-4 sm:p-5 rounded-lg shadow-md border border-gray-100 group hover:shadow-lg hover:bg-[#FFFFF0] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFFACD]"
                role="article"
                aria-label={feature.title}
              >
                <Suspense fallback={<div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded-full mb-3 sm:mb-4" />}>
                  <div className={`${feature.color} mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-200`}>
                    {React.isValidElement(feature.icon)
                      ? React.cloneElement(feature.icon as React.ReactElement<any>, {
                          className: `h-6 w-6 sm:h-8 sm:w-8 ${feature.color}`,
                          'aria-hidden': true,
                        })
                      : feature.icon}
                  </div>
                </Suspense>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#F0E68C] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 sm:mb-12 lg:mb-16"
          role="region"
          aria-labelledby="our-values"
        >
          <h2 id="our-values" className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Our Values
          </h2>
          <ul className="space-y-3 sm:space-y-4">
            {values.map((value) => (
              <li
                key={value.id}
                className="flex items-start p-2 sm:p-3 rounded-lg group hover:bg-[#F4FFC1] hover:-translate-y-1 transition-all duration-200 focus-within:ring-2 focus-within:ring-[#FFFACD]"
                role="listitem"
                aria-label={value.title}
              >
                <Suspense fallback={<div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-200 rounded-full mr-3 sm:mr-4" />}>
                  <div className={`${value.color} mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                    {React.isValidElement(value.icon)
                      ? React.cloneElement(value.icon as React.ReactElement<any>, {
                          className: `h-5 w-5 sm:h-6 sm:w-6 ${value.color}`,
                          'aria-hidden': true,
                        })
                      : value.icon}
                  </div>
                </Suspense>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-800">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center py-8 sm:py-12"
          role="region"
          aria-labelledby="join-community"
        >
          <h2 id="join-community" className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Join Our Community
          </h2>
          <p className="text-sm sm:text-base text-gray-800 mb-4 sm:mb-6 max-w-prose mx-auto">
            Sign up for exclusive deals, product recommendations, and lifestyle tips from Jennies4Life.
          </p>
          <Suspense fallback={<div className="h-10 w-40 bg-gray-200 rounded-lg mx-auto" />}>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-[#FFFACD] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#F0E68C] focus:ring-2 focus:ring-[#FFFACD] transition-all duration-200"
              aria-label="Sign up for Jennies4Life"
            >
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Suspense>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;