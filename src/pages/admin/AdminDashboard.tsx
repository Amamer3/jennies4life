import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  FileText,
  Package,
  Loader2
} from 'lucide-react';
import { dashboardAPI, type DashboardStats, type DashboardProduct, type DashboardPost } from '../../services/dashboardApi';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<DashboardProduct[]>([]);
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [statsResponse, productsResponse, postsResponse] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getProducts(),
        dashboardAPI.getPosts()
      ]);
      
      setStats(statsResponse);
      setProducts(productsResponse.data || []);
      setPosts(postsResponse.data || []);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statsConfig = [
    {
      title: 'Total Products',
      value: stats?.totalProducts.toString() || '0',
      change: '+0%',
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Published Products',
      value: stats?.publishedProducts.toString() || '0',
      change: '+0%',
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Posts',
      value: stats?.totalPosts.toString() || '0',
      change: '+0%',
      icon: FileText,
      color: 'bg-purple-500',
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#e72a00]" />
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-[#e72a00] text-white rounded-md hover:bg-[#d12400] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsConfig.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6 lg:p-8 border border-gray-200"
          >
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Recent Posts</h3>
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent posts found</p>
                </div>
              ) : (
                posts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{post.title}</p>
                    <p className="text-sm text-gray-600">{new Date(post.createdAt._seconds * 1000).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm text-gray-600">{post.views || 0} views</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6 lg:p-8 border border-gray-200"
          >
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Top Products</h3>
            <div className="space-y-4">
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No top products found</p>
                </div>
              ) : (
                products.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-medium text-gray-900">{product.clickCount} clicks</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === 'published' ? 'bg-green-100 text-green-800' :
                      product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
    </div>
  );
};

export default AdminDashboard;