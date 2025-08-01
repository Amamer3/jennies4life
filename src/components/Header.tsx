import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, Heart } from 'lucide-react';

interface Category {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories: Category[] = [
    { name: 'Health & Wellness', path: '/category/health' },
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Fashion', path: '/category/fashion' },
    { name: 'Home & Garden', path: '/category/home' },
    { name: 'Sports & Fitness', path: '/category/sports' },
    { name: 'Beauty', path: '/category/beauty' },
  ];

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Top Bar */}
      {/* <div style={{background: 'linear-gradient(to right, #F2FF0D, #FFC71B)'}} className="text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <p className="truncate">🎉 Unlock the Best Deals – Your One-Stop Shop for Savings!</p>
            <div className="hidden sm:flex items-center gap-2 sm:gap-4">
              <span>Free Shipping on Orders $50+</span>
              <span>|</span>
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FFFACD] to-[#FFDAB9] rounded-xl flex items-center justify-center">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-gray-900">
              Jennies4Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#F0E68C] font-medium text-sm lg:text-base relative group transition-colors duration-200"
              aria-label="Home"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F0E68C] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-primary-600 font-medium text-sm lg:text-base flex items-center transition-colors duration-200"
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="categories-menu"
              >
                Categories
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id="categories-menu"
                className="absolute top-full left-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              >
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      aria-label={`Navigate to ${category.name}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary-600 font-medium text-sm lg:text-base relative group transition-colors duration-200"
              aria-label="Blog"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/deals"
              className="text-gray-700 hover:text-primary-600 font-medium text-sm lg:text-base relative group transition-colors duration-200"
              aria-label="Today's Deals"
            >
              Today's Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-[#D1BF00] font-medium text-sm lg:text-base relative group transition-colors duration-200"
              aria-label="About"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D1BF00] transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search products, articles..."
                className="w-40 sm:w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFFACD] focus:border-transparent text-sm"
                aria-label="Search products or articles"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search Icon for Mobile */}
              <button
                onClick={toggleSearch}
                className="sm:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Toggle search"
                aria-expanded={isSearchOpen}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
                aria-label="Wishlist with 3 items"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors relative"
                aria-label="Cart with 2 items"
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                  2
                </span>
              </Link> 
              

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="sm:hidden border-t border-gray-200 p-4 bg-gray-50 transition-all duration-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, articles..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              aria-label="Search products or articles"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-200 bg-white shadow-lg transition-all duration-200"
        >
          <div className="px-4 sm:px-6 py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            <Link
              to="/"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-[#FFFFF0] font-medium text-sm sm:text-base transition-all duration-200"
              onClick={toggleMenu}
              aria-label="Home"
            >
              Home
            </Link>
            <div className="space-y-1">
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-900 mb-2">Categories</p>
                <div className="space-y-1 ml-2 bg-gray-50 rounded-lg py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-white transition-all duration-200"
                      onClick={toggleMenu}
                      aria-label={`Navigate to ${category.name}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium text-sm sm:text-base transition-all duration-200"
              onClick={toggleMenu}
              aria-label="Blog"
            >
              Blog
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium text-sm sm:text-base transition-all duration-200"
              onClick={toggleMenu}
              aria-label="Today's Deals"
            >
              Today's Deals
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-[#F4FFC1] font-medium text-sm sm:text-base transition-all duration-200"
              onClick={toggleMenu}
              aria-label="About"
            >
              About
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-1">
              <Link
                to="/wishlist"
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 text-sm sm:text-base transition-all duration-200"
                onClick={toggleMenu}
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4 mr-3" />
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 text-sm sm:text-base transition-all duration-200"
                onClick={toggleMenu}
                aria-label="Cart"
              >
                <ShoppingBag className="h-4 w-4 mr-3" />
                Cart
              </Link>
              
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;