import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShoppingCart,
  Star,
  DollarSign,
  Package
} from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    icon: DollarSign,
    color: 'bg-green-500',
    trend: 'up'
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'bg-blue-500',
    trend: 'up'
  },
  {
    title: 'Active Products',
    value: '156',
    change: '+3.1%',
    icon: Package,
    color: 'bg-purple-500',
    trend: 'up'
  },
  {
    title: 'Customer Rating',
    value: '4.8',
    change: '+0.3',
    icon: Star,
    color: 'bg-yellow-500',
    trend: 'up'
  },
];

const AdminDashboard: React.FC = () => {
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
          {stats.map((stat, index) => (
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
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {[
                { id: '#1234', customer: 'John Doe', amount: '$89.99', status: 'Completed' },
                { id: '#1235', customer: 'Jane Smith', amount: '$156.50', status: 'Processing' },
                { id: '#1236', customer: 'Mike Johnson', amount: '$45.00', status: 'Shipped' },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600 truncate">{order.customer}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
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
              {[
                { name: 'Smart Gadgets', sales: 234, revenue: '$12,450' },
                { name: 'Skincare Set', sales: 189, revenue: '$8,920' },
                { name: 'Wellness Kit', sales: 156, revenue: '$7,800' },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <p className="font-medium text-gray-900 flex-shrink-0 ml-4">{product.revenue}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
    </div>
  );
};

export default AdminDashboard;