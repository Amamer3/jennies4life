import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, Eye, Heart, Share2, User, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogApi, type BlogPost } from '../services/blogApi';

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await blogApi.getAllPosts();
        setBlogPosts(Array.isArray(posts) ? posts.slice(0, 4) : []); // Limit to 4 posts for homepage
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DAA520] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no posts
  if (blogPosts.length === 0) {
    return null;
  }

  // Helper function to calculate read time
  const calculateReadTime = (content: string) => {
    if (!content) return '5 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Electronics': 'bg-vibrant-cyan text-vibrant-purple',
      'Baby': 'bg-vibrant-light text-vibrant-green2',
      'Books': 'bg-vibrant-purple text-vibrant-light',
      'Gaming': 'bg-vibrant-green1 text-vibrant-cyan',
      'Automotive': 'bg-vibrant-green2 text-vibrant-purple',
      'Health': 'bg-vibrant-light text-vibrant-green1',
      'Fashion': 'bg-vibrant-cyan text-vibrant-green2'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Get default image if none provided
  const getDefaultImage = () => {
    return 'https://images.pexels.com/photos/994197/pexels-photo-994197.jpeg';
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-vibrant-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 lg:mb-12 relative"
        >
          {/* Background Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-[#F0E68C] to-[#DAA520] rounded-full opacity-20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-20"
          />
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <BookOpen className="h-6 w-6 text-[#F0E68C] mr-2"/>
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-[#DAA520] animate-pulse" />
            </motion.div>
            <span className="text-primary-600 font-semibold text-lg bg-gradient-to-r from-[#F0E68C] to-[#DAA520] bg-clip-text text-transparent">
              Newest Blogs
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold bg-gradient-to-r from-gray-900 via-[#F0E68C] to-gray-900 bg-clip-text text-transparent mb-2 sm:mb-4"
          >
            Latest Insights & Guides
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-black max-w-3xl mx-auto px-4 leading-relaxed"
          >
            Stay informed with our expert articles, product reviews, and lifestyle guides. 
            <span className="text-[#DAA520] font-medium">Discover tips, trends, and recommendations</span> across all categories.
          </motion.p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 lg:mb-12 relative group"
        >
          {/* Background Glow Effect */}
          <motion.div
            animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-1 bg-gradient-to-r from-[#F0E68C] via-[#DAA520] to-[#F0E68C] rounded-xl sm:rounded-2xl lg:rounded-3xl blur-sm opacity-30"
          />
          
          <div className="relative bg-gradient-to-r from-vibrant-purple to-vibrant-green1 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group-hover:shadow-3xl transition-all duration-500">
            {/* Floating Particles */}
            <motion.div
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-4 w-2 h-2 bg-[#F0E68C] rounded-full opacity-60"
            />
            <motion.div
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-8 right-8 w-1.5 h-1.5 bg-[#DAA520] rounded-full opacity-40"
            />
            
            <div className="grid md:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-black relative">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center mb-3 sm:mb-4"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-[#F0E68C]" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-[#F0E68C] to-[#DAA520] text-black px-3 sm:px-4 py-1.5 rounded-full shadow-lg">
                    ✨ Featured Article
                  </span>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold mb-3 sm:mb-4 leading-tight hover:text-[#F0E68C] transition-colors duration-300"
                >
                  {blogPosts[0]?.title || 'No Title'}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm sm:text-base lg:text-lg text-black mb-4 sm:mb-6 leading-relaxed"
                >
                  {blogPosts[0]?.excerpt || blogPosts[0]?.content?.substring(0, 150) + '...' || 'No content available'}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-black">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#DAA520]" />
                      {formatDateForDisplay(blogPosts[0]?.publishedAt || blogPosts[0]?.createdAt || '')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#DAA520]" />
                      {calculateReadTime(blogPosts[0]?.content || '')}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#DAA520]" />
                      {blogPosts[0]?.author || 'Admin'}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
                    >
                      <Heart className="h-4 w-4 text-black" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
                    >
                      <Share2 className="h-4 w-4 text-black" />
                    </motion.button>
                    
                    <Link
                      to={`/blog/${blogPosts[0]?.slug || blogPosts[0]?._id}`}
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#F0E68C] to-[#DAA520] text-black text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:from-[#DAA520] hover:to-[#F0E68C] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              {/* Image */}
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-auto overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={blogPosts[0]?.coverImage || getDefaultImage()}
                  alt={blogPosts[0]?.title || 'Blog post'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFE0] to-[#FFDAB9] opacity-30 group-hover:opacity-20 transition-opacity duration-300"></div>
                
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
                    <Eye className="h-8 w-8 text-[#DAA520]" />
                  </motion.div>
                </motion.div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(blogPosts[0]?.category || 'General')} text-xs font-medium px-3 py-1.5 rounded-full shadow-lg`}>
                    {blogPosts[0]?.category || 'General'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              {/* <Zap className="h-5 w-5 text-[#F0E68C] mr-2" /> */}
              <span className="text-[#DAA520] font-semibold text-lg">More Articles</span>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post._id || post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 relative"
              >
                {/* Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute -inset-0.5 bg-gradient-to-r from-[#F0E68C] to-[#DAA520] rounded-xl sm:rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"
                />
                
                <div className="relative bg-white rounded-xl sm:rounded-2xl">
                  {/* Article Image */}
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={post.coverImage || getDefaultImage()}
                      alt={post.title || 'Blog post'}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300"
                    />
                    
                    {/* Category Badge */}
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${getCategoryColor(post.category || 'General')} text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow-lg`}
                    >
                      {post.category || 'General'}
                    </motion.div>
                    
                    {/* Hover Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 right-3 flex space-x-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                      >
                        <Heart className="h-4 w-4 text-[#DAA520]" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white bg-opacity-90 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
                      >
                        <Share2 className="h-4 w-4 text-[#DAA520]" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Article Content */}
                  <div className="p-4 sm:p-5 md:p-6 lg:p-7">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#DAA520] transition-colors duration-300"
                    >
                      <Link to={`/blog/${post.slug || post._id}`}>
                        {post.title || 'No Title'}
                      </Link>
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm leading-relaxed"
                    >
                      {post.excerpt || post.content?.substring(0, 100) + '...' || 'No content available'}
                    </motion.p>
                    
                    {/* Article Meta */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 space-y-2 sm:space-y-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-[#DAA520]" />
                          {formatDateForDisplay(post.publishedAt || post.createdAt || '')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-[#DAA520]" />
                          {calculateReadTime(post.content || '')}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1 text-[#DAA520]" />
                        <span className="text-[#DAA520] font-medium">{post.author || 'Admin'}</span>
                      </div>
                    </motion.div>
                    
                    {/* Read More Link */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex items-center justify-between"
                    >
                      <Link
                        to={`/blog/${post.slug || post._id}`}
                        className="inline-flex items-center text-[#DAA520] hover:text-[#F0E68C] font-medium text-sm group-hover:translate-x-2 transition-all duration-300"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                      
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center space-x-1 text-gray-400"
                      >
                        <Eye className="h-3 w-3" />
                        <span className="text-xs">{post.views || Math.floor(Math.random() * 500) + 100}</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 relative"
        >
          {/* Background Elements */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-[#F0E68C] to-[#DAA520] rounded-full opacity-20 blur-sm"
          />
          <motion.div
            animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-[#DAA520] to-[#F0E68C] rounded-full opacity-20 blur-sm"
          />
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block"
          >
            {/* Glow Effect */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1 bg-gradient-to-r from-[#F0E68C] via-[#DAA520] to-[#F0E68C] rounded-xl blur opacity-30"
            />
            
            <Link
              to="/blog"
              className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F0E68C] to-[#DAA520] text-black font-semibold rounded-xl hover:from-[#DAA520] hover:to-[#F0E68C] transition-all duration-300 shadow-lg hover:shadow-2xl group"
            >
              
              <span className="relative">
                View All Articles
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300"
                />
              </span>
              
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
              
              
            </Link>
          </motion.div>
          
          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-sm text-gray-600"
          >
            Discover more insights and expert guides in our blog section
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;