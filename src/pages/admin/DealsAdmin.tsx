import React, { useEffect, useState } from 'react';
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
import { dealsApi, type Deal } from '../../services/dealsApi';




const DealsAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch deals from API
  const fetchDeals = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');
      console.log('🔐 Auth Token:', authToken ? 'Present' : 'Missing');
      
      console.log('🔄 Fetching deals...');
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'https://jennies4life-server.onrender.com'}/api/deals`;
      console.log('🌐 API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('📡 Response status:', response.status);
      console.log('📝 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);

      // Handle different response structures
      let fetchedDeals = [];
      if (Array.isArray(data)) {
        console.log('📦 Response is direct array');
        fetchedDeals = data;
      } else if (data && Array.isArray(data.data)) {
        console.log('📦 Response has data array property');
        fetchedDeals = data.data;
      } else if (data && Array.isArray(data.deals)) {
        console.log('📦 Response has deals array property');
        fetchedDeals = data.deals;
      } else {
        console.warn('⚠️ Unexpected response structure:', data);
      }

      console.log(`✨ Processed ${fetchedDeals.length} deals:`, fetchedDeals);
      setDeals(fetchedDeals);
    } catch (error) {
      console.error('Failed to fetch deals:', error);
      setDeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeal = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealsApi.deleteDeal(id);
        setDeals(deals.filter(deal => deal.id !== id));
      } catch (error) {
        console.error('Failed to delete deal:', error);
        alert('Failed to delete deal. Please try again.');
      }
    }
  };



  useEffect(() => {
    fetchDeals();
  }, []);

  const statuses = ['all', 'active', 'inactive'];
  const types = ['all', 'percentage', 'fixed'];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && deal.isActive) ||
                         (selectedStatus === 'inactive' && !deal.isActive);
    const matchesType = selectedType === 'all' || deal.discountType === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive';
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
         <div className="flex items-end justify-center min-h-screen px-2 sm:px-4 pt-4 pb-4 sm:pb-20 text-center sm:block sm:p-0">
           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
           
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 50 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 50 }}
             onClick={(e) => e.stopPropagation()}
             className="inline-block w-full max-w-4xl p-4 sm:p-6 my-4 sm:my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-lg sm:rounded-lg relative"
           >
             <div className="flex items-center justify-between mb-4 sm:mb-6">
               <h3 className="text-lg sm:text-xl font-medium text-gray-900">
                 {deal ? 'Edit Deal' : 'Create New Deal'}
               </h3>
               <button
                 onClick={onClose}
                 className="text-gray-400 hover:text-gray-600 transition-colors p-1"
               >
                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
             </div>

             <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
                 <input
                   type="text"
                   defaultValue={deal?.title || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                   placeholder="Enter deal title"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                 <input
                   type="text"
                   defaultValue={deal?.category || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                   placeholder="Enter product category"
                 />
               </div>

               <div className="sm:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                 <textarea
                   rows={3}
                   defaultValue={deal?.description || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm resize-none"
                   placeholder="Enter deal description"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                 <select
                   defaultValue={deal?.discountType || 'percentage'}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                 >
                   <option value="percentage">Percentage (%)</option>
                   <option value="fixed">Fixed Amount ($)</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
                 <input
                   type="number"
                   step="0.01"
                   defaultValue={deal?.discountedPrice || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                   placeholder="Enter discounted price"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                 <input
                   type="number"
                   step="0.01"
                   defaultValue={deal?.originalPrice || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                   placeholder="Enter original price"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                 <input
                   type="date"
                   defaultValue={deal?.startDate || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                 <input
                   type="date"
                   defaultValue={deal?.endDate || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Max Usage (Optional)</label>
                 <input
                   type="number"
                   defaultValue={deal?.maxUsage || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                   placeholder="Leave empty for unlimited"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                 <input
                   type="url"
                   defaultValue={deal?.imageUrl || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                   placeholder="Enter image URL"
                 />
               </div>

               <div className="sm:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Affiliate Link</label>
                 <input
                   type="url"
                   defaultValue={deal?.affiliateLink || ''}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
                   placeholder="Enter affiliate link"
                 />
               </div>

               <div className="flex items-center">
                 <input
                   type="checkbox"
                   id="isActive"
                   defaultChecked={deal?.isActive ?? true}
                   className="h-4 w-4 text-[#e72a00] focus:ring-[#e72a00] border-gray-300 border rounded"
                 />
                 <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                   Active Deal
                 </label>
               </div>

               <div className="flex items-center">
                 <input
                   type="checkbox"
                   id="featured"
                   defaultChecked={deal?.featured || false}
                   className="h-4 w-4 text-[#e72a00] focus:ring-[#e72a00] border-gray-300 border rounded"
                 />
                 <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                   Featured Deal (Show prominently on homepage)
                 </label>
               </div>

               <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6 pt-4 border-t border-gray-200">
                 <button
                   type="button"
                   onClick={onClose}
                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors order-2 sm:order-1"
                 >
                   Cancel
                 </button>
                 <button
                   type="submit"
                   className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#e72a00] rounded-md hover:bg-[#d12400] transition-colors order-1 sm:order-2"
                 >
                   {deal ? 'Update Deal' : 'Create Deal'}
                 </button>
               </div>
             </form>
           </motion.div>
         </div>
       </div>
     );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Deals & Promotions</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage discounts and promotional offers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Deal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
            className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-2 rounded-lg flex-shrink-0`}>
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
              title="Search for deals by name, description, or category"
              aria-label="Search deals"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
            aria-label="Filter by status"
            title="Filter deals by status"
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] text-sm"
            aria-label="Filter by deal type"
            title="Filter deals by type"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          
          <button className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">More Filters</span>
            <span className="sm:hidden">Filters</span>
          </button>
        </div>
      </div>

      {/* Deals Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e72a00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading deals...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {filteredDeals.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={deal.imageUrl || deal.image || '/placeholder-image.jpg'}
                    alt={deal.title}
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{deal.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{deal.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                  {deal.featured && (
                    <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <span className="hidden sm:inline">Featured</span>
                      <span className="sm:hidden">★</span>
                    </span>
                  )}
                  <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${getStatusColor(deal.isActive)}`}>
                    {getStatusText(deal.isActive)}
                  </span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{deal.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Percent className="h-4 w-4 text-[#e72a00]" />
                    <span className="text-sm font-medium text-gray-700">Discount</span>
                  </div>
                  <p className="text-lg font-bold text-[#e72a00] mt-1">
                    {deal.discountType === 'percentage' 
                      ? `${Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100)}%`
                      : `$${deal.originalPrice - deal.discountedPrice}`}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Price</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-lg font-bold text-green-600">${deal.discountedPrice}</span>
                    {deal.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">${deal.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Duration</span>
                  </div>
                  <p className="text-sm text-gray-900">
                    {deal.startDate ? new Date(deal.startDate).toLocaleDateString() : 'N/A'} - {deal.endDate ? new Date(deal.endDate).toLocaleDateString() : 'N/A'}
                  </p>
                  {deal.isActive && (
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
                    {deal.usageCount || 0}{deal.maxUsage ? ` / ${deal.maxUsage}` : ''}
                  </p>
                  {deal.maxUsage && deal.maxUsage > 0 && deal.usageCount !== undefined && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#e72a00] h-2 rounded-full" 
                        style={{ width: `${Math.min(((deal.usageCount || 0) / deal.maxUsage) * 100, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Created: {deal.createdAt ? new Date(deal.createdAt).toLocaleDateString() : 'N/A'}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="View deal details"
                    aria-label="View deal details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedDeal(deal)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit deal"
                    aria-label="Edit deal"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800 transition-colors"
                    onClick={() => handleDeleteDeal(deal.id)}
                    title="Delete deal"
                    aria-label="Delete deal"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="More options"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

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