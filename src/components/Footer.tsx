import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  Shield,
  Truck,
  CreditCard,
  ArrowRight,
  Star
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' }
    ],
    categories: [
      { name: 'Electronics', href: '/category/electronics' },
      { name: 'Fashion', href: '/category/fashion' },
      { name: 'Health & Wellness', href: '/category/health' },
      { name: 'Home & Garden', href: '/category/home' },
      { name: 'Books', href: '/category/books' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Track Order', href: '/track' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
      { name: 'DMCA', href: '/dmca' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% protected'
    },
    {
      icon: Heart,
      title: 'Expert Reviews',
      description: 'Trusted recommendations'
    },
    {
      icon: Star,
      title: 'Best Deals',
      description: 'Curated daily'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Bar */}
      {/* <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}

      {/* Newsletter Section */}
      {/* <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                Stay Updated with Latest Deals
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400">
                Get exclusive offers, product recommendations, and lifestyle tips delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center justify-center">
                Subscribe
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                  <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Jennies4Life
                </span>
              </div>
            </Link>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
              Your trusted source for lifestyle recommendations, product reviews, and expert guides. 
              We help you discover the best products and make informed decisions for a better life.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-primary-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">hello@jennies4life.org</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-primary-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Categories</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.categories.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">
              © {currentYear} Jennies4Life. All rights reserved. Made with{' '}
              <Heart className="inline h-3 w-3 sm:h-4 sm:w-4 text-red-500 mx-1" />
              for better living.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="text-gray-400 text-xs sm:text-sm mr-1 sm:mr-2">Follow us:</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.name}
                  >
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-gray-400 text-xs sm:text-sm mr-1 sm:mr-2">We accept:</span>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-700 rounded flex items-center justify-center">
                  <CreditCard className="h-2 w-2 sm:h-3 sm:w-3 text-gray-400" />
                </div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;