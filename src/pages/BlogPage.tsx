import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Grid,
  List,
  Sparkles,
  Filter,
  Eye,
  Share2,
  Heart,
  Flame,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogApi, type BlogPost } from '../services/blogApi';


const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await blogApi.getAllPosts();
        setBlogPosts(Array.isArray(posts) ? posts : []);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Helper function to calculate read time
  const calculateReadTime = (content: string) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const blogCategories = ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0); // Use actual views for popularity
        default:
          return 0;
      }
    });

  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Electronics: 'bg-blue-100 text-blue-800',
      'Baby & Kids': 'bg-pink-100 text-pink-800',
      Books: 'bg-purple-100 text-purple-800',
      Gaming: 'bg-green-100 text-green-800',
      Automotive: 'bg-orange-100 text-orange-800',
      Health: 'bg-emerald-100 text-emerald-800',
      Fashion: 'bg-rose-100 text-rose-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e72a00] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-[#e72a00] text-white rounded-md hover:bg-[#d12400] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-cyan-500 relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 blur-xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-5 -right-15 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-10 blur-xl"
        />
        
        {/* Floating Particles */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-8 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-12 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative mr-3"
              >
                <BookOpen className="h-8 w-8 text-white" />
                <motion.div
                  animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-4 w-4 text-cyan-200" />
                </motion.div>
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl font-semibold text-white"
              >
                Jennies4Life Blog
              </motion.span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 sm:mb-4"
            >
              <span className="relative">
                Insights, Reviews & Lifestyle Guides
                <motion.div
                  animate={{ width: [0, "100%", "100%", 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-300 to-white rounded-full opacity-60"
                />
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-cyan-100 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed"
            >
              Discover expert articles, product reviews, and lifestyle tips to help you make informed decisions and live your best life.
              <span className="text-white font-medium"> Stay informed, stay inspired.</span>
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-xl mx-auto relative mb-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search articles, reviews, and guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search blog articles"
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white text-gray-900 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm sm:text-base shadow-lg"
                />
              </div>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-3 bg-white text-green-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px]"
                aria-label="Explore trending blog articles"
                type="button"
              >
                <span className="relative flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" aria-hidden="true" />
                  Explore Trending
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 min-h-[44px]"
                aria-label="Browse blog articles by category"
                type="button"
              >
                <span className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
                  Browse Categories
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Featured Article */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12 relative group"
          >
          {/* Background Glow Effect */}
          <motion.div
            animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl blur-sm opacity-30"
          />
          
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl group-hover:shadow-3xl transition-all duration-500">
            {/* Floating Particles */}
            <motion.div
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40"
            />
            
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center mb-3 sm:mb-4"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-1.5 rounded-full shadow-lg">
                    ✨ Featured Article
                  </span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight hover:text-blue-600 transition-colors duration-300"
                >
                  <Link 
                    to={`/blog/${featuredPost.slug}`} 
                    aria-label={`Read featured article: ${featuredPost.title}`}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    {featuredPost.title}
                  </Link>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed"
                >
                  {featuredPost.excerpt}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6"
                >
                  <div className="flex items-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-blue-500" />
                    {featuredPost.author || 'Unknown Author'}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-blue-500" />
                    {formatDate(featuredPost.publishedAt || featuredPost.publishDate || featuredPost.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-blue-500" />
                    {featuredPost.readTime}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center space-x-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all duration-200 shadow-md"
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition-all duration-200 shadow-md"
                  >
                    <Share2 className="h-4 w-4 text-blue-500" />
                  </motion.button>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      aria-label={`Read full article: ${featuredPost.title}`}
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Image */}
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-auto overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: featuredPost.coverImage || featuredPost.featuredImage || featuredPost.image
                              ? `url(${featuredPost.coverImage || featuredPost.featuredImage || featuredPost.image})`
                      : 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                {/* Overlay Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="bg-white bg-opacity-90 rounded-full p-4"
                  >
                    <Eye className="h-8 w-8 text-blue-600" />
                  </motion.div>
                </motion.div>
                
                {/* Category Badge */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-4 left-4"
                >
                  <span className={`${getCategoryColor(featuredPost.category || 'General')} text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full shadow-lg`}>
                    {featuredPost.category}
                  </span>
                </motion.div>
                
                {/* Trending Badge */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg flex items-center">
                    <Flame className="h-3 w-3 mr-1" />
                    Trending
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        )}

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-6 sm:mb-8"
        >
          {/* Background Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-sm"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-sm"
          />
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
              {/* Category Filter */}
              <div className="w-full lg:w-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center mb-3"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mr-2"
                  >
                    <Filter className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </motion.div>
                  <span className="text-sm font-semibold text-gray-700">Filter by Category</span>
                </motion.div>
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((category, index) => (
                    <motion.button
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category || 'All')}
                      aria-label={`Filter by ${category} category`}
                      aria-pressed={selectedCategory === category}
                      type="button"
                      className={`relative px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[36px] ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {selectedCategory === category && (
                        <motion.div
                          layoutId="activeCategory"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort articles"
                    className="px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    aria-label="Switch to grid view"
                    aria-pressed={viewMode === 'grid'}
                    type="button"
                    className={`relative p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[36px] min-w-[36px] ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {viewMode === 'grid' && (
                      <motion.div
                        layoutId="activeView"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Grid className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    aria-label="Switch to list view"
                    aria-pressed={viewMode === 'list'}
                    type="button"
                    className={`relative p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[36px] min-w-[36px] ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {viewMode === 'list' && (
                      <motion.div
                        layoutId="activeView"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <List className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" aria-hidden="true" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 sm:py-12"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria.</p>
              </motion.div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
                    : 'space-y-4 sm:space-y-6'
                }
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    viewport={{ once: true }}
                    className={`group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                      viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                    }`}
                  >
                    {/* Background Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    {/* Article Image */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'h-32 sm:h-48 sm:w-48 lg:w-64 flex-shrink-0' : 'h-40 sm:h-48'
                      }`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden w-full h-full"
                      >
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: post.coverImage || post.featuredImage || post.image
                              ? `url(${post.coverImage || post.featuredImage || post.image})`
                              : 'linear-gradient(to bottom right, #e5e7eb, #d1d5db)',
                          }}
                        />
                        {/* Image Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                          whileHover={{ opacity: 1 }}
                        />
                      </motion.div>
                      
                      {/* Category Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        className="absolute top-2 sm:top-3 left-2 sm:left-3"
                      >
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`${getCategoryColor(post.category || 'General')} text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm shadow-lg`}
                        >
                          {post.category}
                        </motion.span>
                      </motion.div>
                      
                      {/* Trending Badge */}
                      {index < 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                          className="absolute top-2 sm:top-3 right-2 sm:right-3"
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-1.5 rounded-full shadow-lg"
                          >
                            <Flame className="h-3 w-3" aria-hidden="true" />
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Article Content */}
                    <div className="p-4 sm:p-6 flex-1 relative z-10">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                        className={`font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                          viewMode === 'list' ? 'text-lg sm:text-xl line-clamp-2' : 'text-base sm:text-lg line-clamp-2'
                        }`}
                      >
                        <Link 
                          to={`/blog/${post.slug}`} 
                          aria-label={`Read article: ${post.title}`}
                          className="hover:underline decoration-2 underline-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                        >
                          {post.title}
                        </Link>
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        className={`text-gray-600 mb-3 sm:mb-4 leading-relaxed ${
                          viewMode === 'list' ? 'line-clamp-3 text-sm sm:text-base' : 'line-clamp-3 text-sm'
                        }`}
                      >
                        {post.excerpt}
                      </motion.p>
                      
                      {/* Tags */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                        className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4"
                      >
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.1 + tagIndex * 0.05 + 0.4 }}
                            whileHover={{ scale: 1.05, y: -1 }}
                            className="inline-flex items-center text-xs text-gray-500 bg-gradient-to-r from-gray-100 to-gray-50 px-2 py-1 rounded-full hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                          >
                            <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
                            {tag}
                          </motion.span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </motion.div>
                      
                      {/* Article Meta */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                        className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center hover:text-blue-600 transition-colors duration-200"
                          >
                            <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {post.author || 'Unknown Author'}
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center hover:text-blue-600 transition-colors duration-200"
                          >
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {formatDate(post.publishedAt || post.publishDate || post.createdAt)}
                          </motion.div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center hover:text-blue-600 transition-colors duration-200"
                        >
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {post.readTime || calculateReadTime(post.content)}
                        </motion.div>
                      </motion.div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                          className="flex items-center space-x-3"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded min-h-[36px]"
                            aria-label={`Like this article (${Math.floor(Math.random() * 100) + 10} likes)`}
                            type="button"
                          >
                            <Heart className="h-4 w-4 mr-1" aria-hidden="true" />
                            <span className="text-xs">{Math.floor(Math.random() * 100) + 10}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded min-h-[36px]"
                            aria-label={`View count: ${Math.floor(Math.random() * 1000) + 100} views`}
                            type="button"
                          >
                            <Eye className="h-4 w-4 mr-1" aria-hidden="true" />
                            <span className="text-xs">{Math.floor(Math.random() * 1000) + 100}</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-500 hover:text-green-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded p-2 min-h-[36px] min-w-[36px]"
                            aria-label="Share this article"
                            type="button"
                          >
                            <Share2 className="h-4 w-4" aria-hidden="true" />
                          </motion.button>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                        >
                          <Link
                            to={`/blog/${post.slug}`}
                            aria-label={`Read more about ${post.title}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded min-h-[36px]"
                          >
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12 relative"
          >
            {/* Background Elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
            />
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
              aria-label="Load more articles"
              type="button"
            >
              {/* Button Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                whileHover={{ opacity: 1 }}
              />
              
              {/* Sparkle Effects */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="absolute -top-1 -left-1 w-3 h-3 bg-white/30 rounded-full"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2.5, repeat: Infinity }
                }}
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/40 rounded-full"
              />
              
              <span className="relative z-10 mr-3">Load More Articles</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            </motion.button>
            
            {/* Additional Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 text-sm text-gray-500"
            >
              Discover more insights and stories
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;