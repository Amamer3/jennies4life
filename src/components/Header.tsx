import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, Heart, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: 'Health & Wellness', path: '/category/health' },
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Fashion', path: '/category/fashion' },
    { name: 'Home & Garden', path: '/category/home' },
    { name: 'Sports & Fitness', path: '/category/sports' },
    { name: 'Beauty', path: '/category/beauty' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <p className="text-xs sm:text-sm truncate">🎉 Unlock the Best Deals – Your One-Stop Shop for Savings!</p>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-xs lg:text-sm">Free Shipping on Orders $50+</span>
              <span>|</span>
              <span className="text-xs lg:text-sm">24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
              <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-2xl font-heading font-bold text-gray-900">
              Jennies4Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group text-sm xl:text-base">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center text-sm xl:text-base">
                Categories
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/blog" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group text-sm xl:text-base">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group text-sm xl:text-base">
              Today's Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group text-sm xl:text-base">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products, articles..."
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Search Icon for Mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center text-[10px] sm:text-xs">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center text-[10px] sm:text-xs">
                  2
                </span>
              </Link>

              {/* User Account */}
              <Link
                to="/account"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="User Account"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t border-gray-200 p-4 bg-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-6 space-y-1 max-h-screen overflow-y-auto">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Categories */}
            <div className="space-y-1">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900 mb-2">Categories</p>
                <div className="space-y-1 ml-4 bg-gray-50 rounded-lg py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary-600 hover:bg-white transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            
            <Link
              to="/deals"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Today's Deals
            </Link>
            
            <Link
              to="/about"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {/* Mobile Action Links */}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-1">
              <Link
                to="/wishlist"
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4 mr-3" />
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-4 w-4 mr-3" />
                Cart
              </Link>
              <Link
                to="/account"
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-3" />
                Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;