import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src="/Jennie4lifelogo.png" 
            alt="Jennie4Life" 
            className="h-16 w-auto"
          />
        </div>
        
        {/* 404 Error */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-[#E72A00] tracking-tight">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-sm mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#E72A00] text-white text-base font-medium rounded-lg hover:bg-[#d12400] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 text-base font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </div>
          
          {/* Search Suggestion */}
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-3">
              Or try searching for what you need:
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-[#E72A00] hover:text-[#d12400] font-medium transition-colors duration-200"
            >
              <Search className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </div>
        </div>

        {/* Popular Links */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link
              to="/deals"
              className="text-gray-600 hover:text-[#E72A00] transition-colors duration-200"
            >
              Deals & Offers
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-[#E72A00] transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-[#E72A00] transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              to="/category/skincare"
              className="text-gray-600 hover:text-[#E72A00] transition-colors duration-200"
            >
              Skincare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;