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
  Filter,
  Grid,
  List
} from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts, categories } from '../data';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const blogCategories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
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

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Electronics': 'bg-blue-100 text-blue-800',
      'Baby & Kids': 'bg-pink-100 text-pink-800',
      'Books': 'bg-purple-100 text-purple-800',
      'Gaming': 'bg-green-100 text-green-800',
      'Automotive': 'bg-orange-100 text-orange-800',
      'Health': 'bg-emerald-100 text-emerald-800',
      'Fashion': 'bg-rose-100 text-rose-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 mr-3" />
              <span className="text-xl font-semibold">Jennies4Life Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Insights, Reviews & Lifestyle Guides
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover expert articles, product reviews, and lifestyle tips to help you make informed decisions and live your best life.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles, reviews, and guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    Featured Article
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                {/* Article Meta */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {featuredPost.author.name}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(featuredPost.publishDate)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </div>
                </div>
                
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-200"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-500 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                      <BookOpen className="h-12 w-12" />
                    </div>
                    <p className="text-lg font-semibold">{featuredPost.category}</p>
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
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-8"
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Article Image */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <BookOpen className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">{post.category}</p>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className={`absolute top-3 left-3 ${getCategoryColor(post.category)} text-xs font-medium px-3 py-1 rounded-full`}>
                      {post.category}
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 flex-1">
                    <h3 className={`font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors ${
                      viewMode === 'list' ? 'text-xl line-clamp-2' : 'text-lg line-clamp-2'
                    }`}>
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className={`text-gray-600 mb-4 leading-relaxed ${
                      viewMode === 'list' ? 'line-clamp-3' : 'line-clamp-3 text-sm'
                    }`}>
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
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
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.publishDate)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    {/* Read More Link */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
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
            className="text-center mt-12"
          >
            <button className="inline-flex items-center px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-200">
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;