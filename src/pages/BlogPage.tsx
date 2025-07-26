import React, { useState } from 'react';
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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  slug: string;
  featured?: boolean;
  author: { name: string };
  image?: string;
}

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const blogCategories = ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'oldest':
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case 'popular':
          return b.title.length - a.title.length; // Placeholder for popularity
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-white" />
              <span className="text-lg sm:text-xl font-semibold text-white">Jennies4Life Blog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 sm:mb-4">
              Insights, Reviews & Lifestyle Guides
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-cyan-100 max-w-3xl mx-auto mb-6 sm:mb-8">
              Discover expert articles, product reviews, and lifestyle tips to help you make informed decisions and live your best life.
            </p>
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, reviews, and guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search blog articles"
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white text-gray-900 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm sm:text-base"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                  <span className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                    Featured Article
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2 sm:mb-3 leading-tight hover:text-blue-600 transition-colors">
                  <Link to={`/blog/${featuredPost.slug}`} aria-label={`Read ${featuredPost.title}`}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {featuredPost.author.name}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {formatDate(featuredPost.publishDate)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  aria-label={`Read full article: ${featuredPost.title}`}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              {/* Image */}
              <div className="relative h-48 sm:h-64 md:h-auto">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: featuredPost.image
                      ? `url(${featuredPost.image})`
                      : 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <div className="text-white text-center">
                    <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-4" />
                    <p className="text-sm sm:text-lg font-semibold">{featuredPost.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-label={`Filter by ${category} category`}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort articles"
              className="px-3 sm:px-4 py-1 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>
            <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Switch to grid view"
                className={`p-1 sm:p-2 ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="Switch to list view"
                className={`p-1 sm:p-2 ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                  }`}
                >
                  {/* Article Image */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'h-32 sm:h-48 sm:w-48 lg:w-64 flex-shrink-0' : 'h-40 sm:h-48'
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: post.image
                          ? `url(${post.image})`
                          : 'linear-gradient(to bottom right, #e5e7eb, #d1d5db)',
                      }}
                    />
                    <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${getCategoryColor(post.category)} text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full`}>
                      {post.category}
                    </div>
                  </div>
                  {/* Article Content */}
                  <div className="p-4 sm:p-6 flex-1">
                    <h3
                      className={`font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors ${
                        viewMode === 'list' ? 'text-lg sm:text-xl line-clamp-2' : 'text-base sm:text-lg line-clamp-2'
                      }`}
                    >
                      <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p
                      className={`text-gray-600 mb-3 sm:mb-4 leading-relaxed ${
                        viewMode === 'list' ? 'line-clamp-3 text-sm sm:text-base' : 'line-clamp-3 text-sm'
                      }`}
                    >
                      {post.excerpt}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Article Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {formatDate(post.publishDate)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      aria-label={`Read more about ${post.title}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-200"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <button
              aria-label="Load more articles"
              className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-white border-2 border-blue-600 text-blue-600 text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;