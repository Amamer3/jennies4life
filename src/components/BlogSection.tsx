import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
  slug: string;
}

const BlogSection: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'What Are the Latest Trends in Virtual Reality Headsets?',
      excerpt: 'Embark on a journey into the future of VR headsets with cutting-edge technologies that are revolutionizing entertainment and productivity.',
      category: 'Electronics',
      author: 'Tech Expert',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      slug: 'latest-vr-headset-trends'
    },
    {
      id: '2',
      title: 'How Do I Establish a Bedtime Routine for My Baby?',
      excerpt: 'Optimize your baby\'s sleep routine with a consistent bedtime and soothing techniques that promote better rest for the whole family.',
      category: 'Baby',
      author: 'Parenting Specialist',
      publishDate: '2024-01-12',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/994197/pexels-photo-994197.jpeg',
      slug: 'baby-bedtime-routine-guide'
    },
    {
      id: '3',
      title: 'What Are the Best Books for Escaping Reality?',
      excerpt: 'Nestle into worlds of wonder and enchantment with the best books for escaping reality and finding your next literary adventure.',
      category: 'Books',
      author: 'Literary Critic',
      publishDate: '2024-01-10',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/994197/pexels-photo-994197.jpeg',
      slug: 'best-escapist-books'
    },
    {
      id: '4',
      title: 'How Can I Improve My Gaming Performance and Reflexes?',
      excerpt: 'Dive into techniques and gear upgrades to enhance your reflexes and gaming prowess, taking your skills to the next level.',
      category: 'Gaming',
      author: 'Gaming Pro',
      publishDate: '2024-01-08',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/994197/pexels-photo-994197.jpeg',
      slug: 'improve-gaming-performance'
    },
    {
      id: '5',
      title: 'How Do I Know When It\'s Time to Replace My Car\'s Tires?',
      excerpt: 'Only by recognizing key signs of tire wear can you ensure safety and optimal performance on the road.',
      category: 'Automotive',
      author: 'Auto Expert',
      publishDate: '2024-01-05',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/994197/pexels-photo-994197.jpeg',
      slug: 'when-to-replace-car-tires'
    },
    {
      id: '6',
      title: 'How Do I Choose the Perfect Book to Read Next?',
      excerpt: 'Journey into the ideal book selection based on your mood, setting the stage for an unforgettable reading experience.',
      category: 'Books',
      author: 'Book Curator',
      publishDate: '2024-01-03',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/994197/pexels-photo-994197.jpeg',
      slug: 'choose-perfect-book'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Electronics': 'bg-blue-100 text-blue-800',
      'Baby': 'bg-pink-100 text-pink-800',
      'Books': 'bg-purple-100 text-purple-800',
      'Gaming': 'bg-green-100 text-green-800',
      'Automotive': 'bg-orange-100 text-orange-800',
      'Health': 'bg-emerald-100 text-emerald-800',
      'Fashion': 'bg-rose-100 text-rose-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-[#e7e7e7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-primary-600 mr-2"/>
            <span className="text-primary-600 font-semibold text-lg">Newest Blogs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-2 sm:mb-4">
            Latest Insights & Guides
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-black max-w-3xl mx-auto px-4">
            Stay informed with our expert articles, product reviews, and lifestyle guides. 
            Discover tips, trends, and recommendations across all categories.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10 lg:mb-12"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Content */}
              <div className="p-4 sm:p-6 lg:p-8 xl:p-12 text-black">
                <div className="flex items-center mb-3 sm:mb-4">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-xs sm:text-sm font-medium bg-[#FACC15] bg-opacity-20 px-2 sm:px-3 py-1 rounded-full">
                    Deal of the Day
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold mb-3 sm:mb-4 leading-tight">
                  {blogPosts[0].title}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-black mb-4 sm:mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-black">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {formatDate(blogPosts[0].publishDate)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <Link
                    to={`/blog/${blogPosts[0].slug}`}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary-600 text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative h-48 sm:h-56 lg:h-auto">
                <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Article Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                {/* Category Badge */}
                <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${getCategoryColor(post.category)} text-xs font-medium px-2 sm:px-3 py-1 rounded-full`}>
                  {post.category}
                </div>
              </div>

              {/* Article Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Article Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-3 bg-[#FACC15] text-white font-semibold rounded-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <BookOpen className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;