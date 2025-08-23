import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { publicCategoryAPI } from '../services/publicCategoryApi';

interface HeaderCategory {
  id: string;
  name: string;
  path: string;
  slug?: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<HeaderCategory[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await publicCategoryAPI.getActiveCategories();
        if (response.success && response.data) {
          const categoryData = response.data.slice(0, 6).map(cat => ({
            id: cat.id,
            name: cat.name,
            path: `/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`,
            slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')
          }));
          setCategories(categoryData);
        }
      } catch (err) {
        console.error('Error fetching categories for header:', err);
        // Fallback to default categories if API fails
        setCategories([
          { id: 'health', name: 'Health & Wellness', path: '/category/health', slug: 'health' },
          { id: 'electronics', name: 'Electronics', path: '/category/electronics', slug: 'electronics' },
          { id: 'fashion', name: 'Fashion', path: '/category/fashion', slug: 'fashion' },
          { id: 'home', name: 'Home & Garden', path: '/category/home', slug: 'home' },
          { id: 'sports', name: 'Sports & Fitness', path: '/category/sports', slug: 'sports' },
          { id: 'beauty', name: 'Beauty', path: '/category/beauty', slug: 'beauty' },
        ]);
      }
    };

    fetchCategories();
  }, []);

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
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <img src="/Jennie4lifelogo.png" alt="Jennies4Life Logo" className="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-18 rounded object-contain" />
            {/* <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#FFFACD] to-[#FFDAB9] rounded-xl flex items-center justify-center">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-gray-900">
              Jennies4Life
            </span> */}
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
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search products, articles..."
                className="w-32 sm:w-40 md:w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFFACD] focus:border-transparent text-sm transition-all duration-200"
                aria-label="Search products or articles"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Search Icon for Mobile */}
              <button
                onClick={toggleSearch}
                className="sm:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Toggle search"
                aria-expanded={isSearchOpen}
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-200 relative"
                aria-label="Wishlist with 3 items"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-medium" aria-hidden="true">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-200 relative"
                aria-label="Cart with 2 items"
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[10px] font-medium" aria-hidden="true">
                  2
                </span>
              </Link> 
              

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="sm:hidden border-t border-gray-200 px-4 py-4 bg-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, articles..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFFACD] focus:border-transparent text-base bg-white shadow-sm"
              aria-label="Search products or articles"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-200 bg-white shadow-lg"
        >
          <div className="px-4 py-6 space-y-6">
             {/* Navigation Links */}
             <div className="space-y-1">
               <Link
                 to="/"
                 className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[48px] flex items-center"
                 onClick={() => setIsMenuOpen(false)}
               >
                 Home
               </Link>
               <Link
                 to="/blog"
                 className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[48px] flex items-center"
                 onClick={() => setIsMenuOpen(false)}
               >
                 Blog
               </Link>
               <Link
                 to="/deals"
                 className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[48px] flex items-center"
                 onClick={() => setIsMenuOpen(false)}
               >
                 Deals
               </Link>
               <Link
                 to="/about"
                 className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[48px] flex items-center"
                 onClick={() => setIsMenuOpen(false)}
               >
                 About
               </Link>
             </div>

             {/* Categories */}
             <div className="border-t border-gray-200 pt-6">
               <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                 Categories
               </h3>
               <div className="space-y-1 max-h-48 overflow-y-auto">
                 {categories.map((category) => (
                   <Link
                     key={category.id}
                     to={`/category/${category.slug || category.id}`}
                     className="block px-4 py-3 text-base text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[48px] flex items-center"
                     onClick={() => setIsMenuOpen(false)}
                   >
                     {category.name}
                   </Link>
                 ))}
               </div>
             </div>
            {/* Action Links */}
             <div className="border-t border-gray-200 pt-6">
               <div className="grid grid-cols-2 gap-3">
                 <Link
                   to="/wishlist"
                   className="flex flex-col items-center gap-2 p-4 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[72px] justify-center"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   <Heart className="h-6 w-6" aria-hidden="true" />
                   <span className="text-sm font-medium">Wishlist</span>
                 </Link>
                 <Link
                   to="/cart"
                   className="flex flex-col items-center gap-2 p-4 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 relative min-h-[72px] justify-center"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                   <span className="text-sm font-medium">Cart</span>
                   <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" aria-hidden="true">
                     2
                   </span>
                 </Link>
               </div>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;