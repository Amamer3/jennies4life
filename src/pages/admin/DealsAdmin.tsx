import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Tag,
  Calendar,
  Percent,
  TrendingUp,
  Clock,
  DollarSign,
  MoreHorizontal
} from 'lucide-react';


interface Deal {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  originalPrice?: number;
  salePrice?: number;
  productId: string;
  productName: string;
  productImage: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired' | 'scheduled';
  featured: boolean;
  usageCount: number;
  maxUsage?: number;
  createdAt: string;
}

const DealsAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Mock data
  const deals: Deal[] = [
    {
      id: '1',
      title: 'Smart Headphones Flash Sale',
      description: 'Limited time offer on premium wireless headphones',
      discountType: 'percentage',
      discountValue: 40,
      originalPrice: 129.99,
      salePrice: 77.99,
      productId: 'p1',
      productName: 'Smart Wireless Headphones',
      productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      startDate: '2024-01-15',
      endDate: '2024-01-25',
      status: 'active',
      featured: true,
      usageCount: 156,
      maxUsage: 500,
      createdAt: '2024-01-14'
    },
    {
      id: '2',
      title: 'Beauty Bundle Discount',
      description: 'Save on skincare essentials bundle',
      discountType: 'fixed',
      discountValue: 15,
      originalPrice: 65.99,
      salePrice: 50.99,
      productId: 'p2',
      productName: 'Organic Skincare Set',
      productImage: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg',
      startDate: '2024-01-10',
      endDate: '2024-01-30',
      status: 'active',
      featured: false,
      usageCount: 89,
      maxUsage: 200,
      createdAt: '2024-01-09'
    },
    {
      id: '3',
      title: 'Fitness Tracker Early Bird',
      description: 'Pre-order discount for new fitness tracker',
      discountType: 'percentage',
      discountValue: 25,
      originalPrice: 179.99,
      salePrice: 134.99,
      productId: 'p3',
      productName: 'Fitness Tracker Pro',
      productImage: 'https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg',
      startDate: '2024-01-20',
      endDate: '2024-02-15',
      status: 'scheduled',
      featured: true,
      usageCount: 0,
      maxUsage: 100,
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Holiday Fashion Sale',
      description: 'End of season fashion clearance',
      discountType: 'percentage',
      discountValue: 50,
      originalPrice: 199.99,
      salePrice: 99.99,
      productId: 'p4',
      productName: 'Designer Handbag',
      productImage: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg',
      startDate: '2023-12-20',
      endDate: '2024-01-05',
      status: 'expired',
      featured: false,
      usageCount: 234,
      maxUsage: 300,
      createdAt: '2023-12-19'
    }
  ];

  const statuses = ['all', 'active', 'inactive', 'expired', 'scheduled'];
  const types = ['all', 'percentage', 'fixed'];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || deal.status === selectedStatus;
    const matchesType = selectedType === 'all' || deal.discountType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const DealModal = ({ deal, onClose }: { deal: Deal | null; onClose: () => void }) => {
    if (!deal && !showAddModal) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {deal ? 'Edit Deal' : 'Create New Deal'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
                <input
                  type="text"
                  defaultValue={deal?.title || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Enter deal title"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  defaultValue={deal?.description || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Enter deal description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select
                  defaultValue={deal?.productId || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                >
                  <option value="">Select Product</option>
                  <option value="p1">Smart Wireless Headphones</option>
                  <option value="p2">Organic Skincare Set</option>
                  <option value="p3">Fitness Tracker Pro</option>
                  <option value="p4">Designer Handbag</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <select
                  defaultValue={deal?.discountType || 'percentage'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={deal?.discountValue || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Enter discount value"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={deal?.originalPrice || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Enter original price"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  defaultValue={deal?.startDate || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  defaultValue={deal?.endDate || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Usage (Optional)</label>
                <input
                  type="number"
                  defaultValue={deal?.maxUsage || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Leave empty for unlimited"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  defaultValue={deal?.status || 'active'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div className="md:col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  defaultChecked={deal?.featured || false}
                  className="h-4 w-4 text-[#e72a00] focus:ring-[#e72a00] border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Deal (Show prominently on homepage)
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#e72a00] rounded-md hover:bg-[#d12400] transition-colors">
                {deal ? 'Update Deal' : 'Create Deal'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals & Promotions</h1>
          <p className="text-gray-600 mt-1">Manage discounts and promotional offers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Deal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Deals', value: '12', icon: Tag, color: 'bg-green-500' },
          { label: 'Total Savings', value: '$12,450', icon: DollarSign, color: 'bg-blue-500' },
          { label: 'Deal Usage', value: '1,234', icon: TrendingUp, color: 'bg-purple-500' },
          { label: 'Expiring Soon', value: '3', icon: Clock, color: 'bg-orange-500' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDeals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={deal.productImage}
                    alt={deal.productName}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                    <p className="text-sm text-gray-600">{deal.productName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {deal.featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(deal.status)}`}>
                    {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{deal.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Percent className="h-4 w-4 text-[#e72a00]" />
                    <span className="text-sm font-medium text-gray-700">Discount</span>
                  </div>
                  <p className="text-lg font-bold text-[#e72a00] mt-1">
                    {deal.discountType === 'percentage' ? `${deal.discountValue}%` : `$${deal.discountValue}`}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Price</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-lg font-bold text-green-600">${deal.salePrice}</span>
                    {deal.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${deal.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Duration</span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}
                  </p>
                  {deal.status === 'active' && (
                    <p className="text-xs text-orange-600 mt-1">
                      {getDaysRemaining(deal.endDate)} days remaining
                    </p>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Usage</span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {deal.usageCount}{deal.maxUsage ? ` / ${deal.maxUsage}` : ''}
                  </p>
                  {deal.maxUsage && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#e72a00] h-2 rounded-full" 
                        style={{ width: `${(deal.usageCount / deal.maxUsage) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Created: {new Date(deal.createdAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedDeal(deal)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDeals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Tag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No deals found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new deal.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Deal
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Modals */}
      {(selectedDeal || showAddModal) && (
        <DealModal
          deal={selectedDeal}
          onClose={() => {
            setSelectedDeal(null);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default DealsAdmin;