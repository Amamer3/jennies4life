import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  Calendar,
  Download,
  Filter,
  BarChart3,
  Activity,
  Target,
  Clock,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { dashboardAPI, type DashboardProduct, type DashboardPost, type RevenueData, type CategoryData, type DeviceData, type TopProduct, type ActivityItem } from '../../services/dashboardApi';


interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface DashboardStatsData {
  totalProducts?: number;
  publishedProducts?: number;
  draftProducts?: number;
  totalPosts?: number;
  publishedPosts?: number;
  draftPosts?: number;
  recentProducts?: DashboardProduct[];
  recentPosts?: DashboardPost[];
  [key: string]: unknown;
}

interface AdminStatsData {
  success?: boolean;
  data?: Record<string, unknown>;
  message?: string;
  newUsersToday?: number;
  totalUsers?: number;
  [key: string]: unknown;
}

const AnalyticsAdmin: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsData | null>(null);
  const [adminStats, setAdminStats] = useState<AdminStatsData | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [
        dashStats,
        admStats,
        revenue,
        categories,
        devices,
        products,
        activity
      ] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getAdminStats(),
        dashboardAPI.getRevenueData(selectedPeriod),
        dashboardAPI.getCategoryData(),
        dashboardAPI.getDeviceData(),
        dashboardAPI.getTopProducts(),
        dashboardAPI.getRecentActivity()
      ]);
      setDashboardStats(dashStats as DashboardStatsData);
      setAdminStats(admStats as AdminStatsData);
      setRevenueData(revenue);
      setCategoryData(categories);
      setDeviceData(devices);
      setTopProducts(products);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const periods = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const getMetrics = (): MetricCard[] => {
    if (!dashboardStats || !adminStats) {
      return [
        {
          title: 'Total Products',
          value: '0',
          change: '0%',
          changeType: 'increase',
          icon: DollarSign,
          color: 'bg-green-500'
        },
        {
          title: 'Total Users',
          value: '0',
          change: '0%',
          changeType: 'increase',
          icon: Users,
          color: 'bg-purple-500'
        },
        {
          title: 'Published Posts',
          value: '0',
          change: '0%',
          changeType: 'increase',
          icon: Eye,
          color: 'bg-orange-500'
        },
        {
          title: 'Active Users',
          value: '0',
          change: '0%',
          changeType: 'increase',
          icon: Target,
          color: 'bg-pink-500'
        }
      ];
    }

    return [
      {
        title: 'Total Products',
        value: dashboardStats.totalProducts?.toString() || '0',
        change: '+' + (dashboardStats.publishedProducts && dashboardStats.totalProducts ? ((dashboardStats.publishedProducts / dashboardStats.totalProducts) * 100).toFixed(1) : '0') + '%',
        changeType: 'increase',
        icon: DollarSign,
        color: 'bg-green-500'
      },
      {
        title: 'Total Users',
        value: adminStats.totalUsers?.toString() || '0',
        change: '+' + (adminStats.newUsersToday && adminStats.totalUsers ? ((adminStats.newUsersToday / adminStats.totalUsers) * 100).toFixed(1) : '0') + '%',
        changeType: 'increase',
        icon: Users,
        color: 'bg-purple-500'
      },
      {
        title: 'Published Posts',
        value: dashboardStats.publishedPosts?.toString() || '0',
        change: '+' + (dashboardStats.publishedPosts && dashboardStats.totalPosts ? ((dashboardStats.publishedPosts / dashboardStats.totalPosts) * 100).toFixed(1) : '0') + '%',
        changeType: 'increase',
        icon: Eye,
        color: 'bg-orange-500'
      },
      {
        title: 'Active Users',
        value: adminStats.activeUsers?.toString() || '0',
        change: '+' + (((adminStats.newUsersToday || 0) / (adminStats.totalUsers || 1)) * 100).toFixed(1) + '%',
        changeType: 'increase',
        icon: Target,
        color: 'bg-pink-500'
      }
    ];
  };

  // Helper function to get icon component from string
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ElementType> = {
      Users,
      Activity,
      Target,
      TrendingUp,
      TrendingDown,
      DollarSign,
      Eye,
      Calendar,
      Download,
      Filter,
      BarChart3,
      Clock,
      Smartphone,
      Monitor,
      Tablet
    };
    return iconMap[iconName] || Activity;
  };

  const SimpleBarChart = ({ data }: { data: ChartData[] }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="flex items-end justify-between h-64 px-4" role="img" aria-label="Revenue bar chart showing daily revenue data">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-600">${(item.value / 1000).toFixed(1)}k</div>
            <div
              className="bg-[#e72a00] rounded-t-md transition-all duration-500 ease-out"
              style={{
                height: `${(item.value / maxValue) * 200}px`,
                width: '32px'
              }}
            />
            <div className="text-xs text-gray-600 font-medium">{item.name}</div>
          </div>
        ))}
      </div>
    );
  };

  const SimplePieChart = ({ data, title }: { data: ChartData[]; title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="space-y-4" role="img" aria-label={`${title} pie chart showing category distribution`}>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / total) * 100}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your business performance and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <label htmlFor="period-select" className="sr-only">Select time period</label>
          <select
            id="period-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:border-transparent text-sm"
            aria-describedby="period-help"
          >
            <div id="period-help" className="sr-only">Select the time period for analytics data</div>
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <button 
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-h-[44px]"
            type="button"
            aria-label="Open filters menu"
          >
            <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
            Filters
          </button>
          <button 
            className="inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:ring-offset-2 min-h-[44px]"
            type="button"
            aria-label="Export analytics data"
          >
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-4 text-center py-8">
            <div className="text-gray-500">Loading analytics data...</div>
          </div>
        ) : (
          getMetrics().map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" aria-hidden="true" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" aria-hidden="true" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last period</span>
                </div>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`} aria-hidden="true">
                <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
          ))
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-600">Daily revenue for the past week</p>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <label htmlFor="metric-select" className="sr-only">Select metric type</label>
              <select
                id="metric-select"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:border-transparent"
                aria-describedby="metric-help"
              >
                <div id="metric-help" className="sr-only">Select the type of metric to display in the chart</div>
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
              </select>
            </div>
          </div>
          <SimpleBarChart data={revenueData} />
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <SimplePieChart data={categoryData} title="Sales by Category" />
        </motion.div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.sales} sales • {product.revenue}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Device Usage</h3>
            <Monitor className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <div className="space-y-4">
            {deviceData.map((device, index) => {
              const IconComponent = device.name === 'Desktop' ? Monitor : 
                                 device.name === 'Mobile' ? Smartphone : Tablet;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="text-sm text-gray-700">{device.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{device.value}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${device.value}%`,
                          backgroundColor: device.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const IconComponent = getIconComponent(activity.icon);
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 p-1 rounded-full bg-gray-100`}>
                    <IconComponent className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-3 w-3 text-gray-400 mr-1" />
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Performance Summary</h3>
            <p className="text-sm text-gray-600">Key performance indicators for {selectedPeriod}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {periods.find(p => p.value === selectedPeriod)?.label}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-sm text-gray-600 mt-1">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2.3s</div>
            <div className="text-sm text-gray-600 mt-1">Avg Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4.8/5</div>
            <div className="text-sm text-gray-600 mt-1">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">89%</div>
            <div className="text-sm text-gray-600 mt-1">Customer Satisfaction</div>
          </div>
        </div>
      </motion.div>

      {/* Goals and Targets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Goals & Targets</h3>
          <Target className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="space-y-6">
          {[
            { label: 'Monthly Revenue', current: 45231, target: 50000, unit: '$' },
            { label: 'New Customers', current: 456, target: 500, unit: '' },
            { label: 'Conversion Rate', current: 3.24, target: 4.0, unit: '%' },
            { label: 'Customer Retention', current: 87, target: 90, unit: '%' }
          ].map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            const isOnTrack = progress >= 80;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{goal.label}</span>
                  <span className="text-sm text-gray-600">
                    {goal.unit}{goal.current.toLocaleString()} / {goal.unit}{goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      isOnTrack ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${
                    isOnTrack ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {progress.toFixed(1)}% complete
                  </span>
                  <span className="text-gray-500">
                    {isOnTrack ? 'On track' : 'Needs attention'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsAdmin;