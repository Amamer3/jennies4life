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
  CreditCard} from 'lucide-react';

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
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-[#D1BF00]' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-[#FFFF66]' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ];


  return (
    <footer className="bg-gray-900 text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-vibrant-purple to-vibrant-green2 rounded-xl flex items-center justify-center">
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
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#FFA500] flex-shrink-0" />
                <span className="text-sm sm:text-base">hello@jennies4life.org</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#FFFF00] flex-shrink-0" />
                <span className="text-sm sm:text-base">(+233) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary-500 flex-shrink-0" />
                <span className="text-sm sm:text-base">Accra-Ghana, GA-100-01</span>
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
                    className="text-sm sm:text-base text-gray-400 hover:text-[#FFB733] transition-colors duration-200"
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
              <span className="text-gray-400 text-xs sm:text-sm mr-1 sm:mr-2 hover:text-secondary-500">Follow us:</span>
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
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-[#D1BF00] rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">V</span>
                </div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div className="w-6 h-4 sm:w-8 sm:h-5 bg-[#FFFF00] rounded flex items-center justify-center">
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