import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Grid3X3,
  Package,
  TrendingUp,
  MoreHorizontal,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { categoryAPI, type Category, type CreateCategoryRequest, type UpdateCategoryRequest } from '../../services/categoryApi';

const CategoriesAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Form refs for modal
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const featuredRef = useRef<HTMLInputElement>(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching categories from API...');
      const response = await categoryAPI.getAllCategories();
      
      console.log('📦 API Response:', response);
      
      if (response.success && response.categories) {
        console.log('✅ Categories fetched successfully:', response.categories.length, 'categories');
        setCategories(response.categories);
      } else {
        const errorMessage = response.message || 'Failed to fetch categories';
        console.error('❌ API returned error:', errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error('🚨 Error fetching categories:', error);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const statuses = ['all', 'active', 'inactive'];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || category.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle category creation
  const handleCreateCategory = async () => {
    if (!nameRef.current || !descriptionRef.current || !imageRef.current || 
        !colorRef.current || !statusRef.current || !featuredRef.current) {
      return;
    }

    const categoryData: CreateCategoryRequest = {
      name: nameRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      image: imageRef.current.value.trim(),
      color: colorRef.current.value,
      status: statusRef.current.value as 'active' | 'inactive',
      featured: featuredRef.current.checked
    };

    if (!categoryData.name || !categoryData.description) {
      setError('Name and description are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      console.log('🔄 Creating category:', categoryData);
      
      const response = await categoryAPI.createCategory(categoryData);
      
      if (response.success) {
        console.log('✅ Category created successfully');
        await fetchCategories(); // Refresh the list
        setShowAddModal(false);
        // Reset form
        if (nameRef.current) nameRef.current.value = '';
        if (descriptionRef.current) descriptionRef.current.value = '';
        if (imageRef.current) imageRef.current.value = '';
        if (colorRef.current) colorRef.current.value = '#3B82F6';
        if (statusRef.current) statusRef.current.value = 'active';
        if (featuredRef.current) featuredRef.current.checked = false;
      } else {
        setError(response.message || 'Failed to create category');
      }
    } catch (error) {
      console.error('🚨 Error creating category:', error);
      setError('Failed to create category. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle category update
  const handleUpdateCategory = async () => {
    if (!selectedCategory || !nameRef.current || !descriptionRef.current || 
        !imageRef.current || !colorRef.current || !statusRef.current || !featuredRef.current) {
      return;
    }

    const categoryData: UpdateCategoryRequest = {
      name: nameRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      image: imageRef.current.value.trim(),
      color: colorRef.current.value,
      status: statusRef.current.value as 'active' | 'inactive',
      featured: featuredRef.current.checked
    };

    if (!categoryData.name || !categoryData.description) {
      setError('Name and description are required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      console.log('🔄 Updating category:', selectedCategory.id, categoryData);
      
      const response = await categoryAPI.updateCategory(selectedCategory.id, categoryData);
      
      if (response.success) {
        console.log('✅ Category updated successfully');
        await fetchCategories(); // Refresh the list
        setSelectedCategory(null);
      } else {
        setError(response.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('🚨 Error updating category:', error);
      setError('Failed to update category. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete the category "${categoryName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setError(null);
      console.log('🔄 Deleting category:', categoryId);
      
      const response = await categoryAPI.deleteCategory(categoryId);
      
      if (response.success) {
        console.log('✅ Category deleted successfully');
        await fetchCategories(); // Refresh the list
      } else {
        setError(response.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('🚨 Error deleting category:', error);
      setError('Failed to delete category. Please try again.');
    }
  };

  // Calculate stats
  const totalCategories = categories.length;
  const activeCategories = categories.filter(cat => cat.status === 'active').length;
  const featuredCategories = categories.filter(cat => cat.featured).length;
  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);

  const CategoryModal = ({ category, onClose }: { category: Category | null; onClose: () => void }) => {
    // Set initial values when modal opens
    React.useEffect(() => {
      if (category) {
        if (nameRef.current) nameRef.current.value = category.name;
        if (descriptionRef.current) descriptionRef.current.value = category.description;
        if (imageRef.current) imageRef.current.value = category.image || '';
        if (colorRef.current) colorRef.current.value = category.color || '#3B82F6';
        if (statusRef.current) statusRef.current.value = category.status;
        if (featuredRef.current) featuredRef.current.checked = category.featured;
      } else {
        // Reset form for new category
        if (nameRef.current) nameRef.current.value = '';
        if (descriptionRef.current) descriptionRef.current.value = '';
        if (imageRef.current) imageRef.current.value = '';
        if (colorRef.current) colorRef.current.value = '#3B82F6';
        if (statusRef.current) statusRef.current.value = 'active';
        if (featuredRef.current) featuredRef.current.checked = false;
      }
    }, [category]);

    if (!category && !showAddModal) return null;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (category) {
        await handleUpdateCategory();
      } else {
        await handleCreateCategory();
      }
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {category ? 'Edit Category' : 'Add New Category'}
            </h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Enter category name"
                  required
                  disabled={submitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  ref={descriptionRef}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Enter category description"
                  required
                  disabled={submitting}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Image URL</label>
                <input
                  ref={imageRef}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="https://example.com/image.jpg"
                  disabled={submitting}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Color</label>
                  <input
                    ref={colorRef}
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                    disabled={submitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    ref={statusRef}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                    disabled={submitting}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  ref={featuredRef}
                  type="checkbox"
                  id="featured"
                  className="h-4 w-4 text-[#e72a00] focus:ring-[#e72a00] border-gray-300 rounded"
                  disabled={submitting}
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Category (Show on homepage)
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#e72a00] rounded-md hover:bg-[#d12400] transition-colors disabled:opacity-50 flex items-center"
                  disabled={submitting}
                >
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {category ? 'Update Category' : 'Add Category'}
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories and organization</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Categories', value: totalCategories.toString(), icon: Grid3X3, color: 'bg-blue-500' },
          { label: 'Active Categories', value: activeCategories.toString(), icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Featured Categories', value: featuredCategories.toString(), icon: Grid3X3, color: 'bg-purple-500' },
          { label: 'Total Products', value: totalProducts.toString(), icon: Package, color: 'bg-orange-500' },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <label htmlFor="category-search" className="sr-only">Search categories</label>
            <input
              type="text"
              id="category-search"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:border-transparent"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">Search categories by name</div>
          </div>
          
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:border-transparent"
            aria-describedby="status-help"
          >
            <div id="status-help" className="sr-only">Filter categories by their status</div>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          
          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredCategories.length} of {categories.length} categories
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#e72a00]" />
          <span className="ml-2 text-gray-600">Loading categories...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Categories Grid */}
      {!loading && !error && filteredCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                {category.featured && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(category.status)}`}>
                  {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                </span>
              </div>
              <div 
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: category.color }}
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <div className="flex items-center space-x-1">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{category.productCount}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded p-1 min-h-[36px] min-w-[36px]"
                    aria-label={`View ${category.name} category details`}
                    type="button"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button 
                     onClick={() => {
                       setSelectedCategory(category);
                       setShowAddModal(false);
                     }}
                     className="text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1 min-h-[36px] min-w-[36px]"
                     aria-label={`Edit ${category.name} category`}
                     type="button"
                   >
                     <Edit className="h-4 w-4" aria-hidden="true" />
                   </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                    className="text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1 min-h-[36px] min-w-[36px]"
                    aria-label={`Delete ${category.name} category`}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded p-1 min-h-[36px] min-w-[36px]"
                    aria-label={`More options for ${category.name} category`}
                    type="button"
                  >
                    <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Grid3X3 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {categories.length === 0 ? 'No categories yet' : 'No categories match your filters'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {categories.length === 0 
              ? 'Get started by creating your first category.' 
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {categories.length === 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:ring-offset-2 min-h-[44px]"
                type="button"
                aria-label="Add new category"
              >
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Add Category
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Categories Table View (Alternative) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Categories Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Categories overview table">
            <thead className="bg-gray-50">
              <tr role="row">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="h-8 w-8 rounded-lg flex items-center justify-center mr-3"
                        style={{ backgroundColor: category.color }}
                      >
                        <Grid3X3 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{category.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.productCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(category.status)}`}>
                      {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded p-1 min-h-[36px] min-w-[36px]"
                        aria-label={`View ${category.name} category details`}
                        type="button"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button 
                         onClick={() => {
                           setSelectedCategory(category);
                           setShowAddModal(false);
                         }}
                         className="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1 min-h-[36px] min-w-[36px]"
                         aria-label={`Edit ${category.name} category`}
                         type="button"
                       >
                         <Edit className="h-4 w-4" aria-hidden="true" />
                       </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                        className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1 min-h-[36px] min-w-[36px]"
                        aria-label={`Delete ${category.name} category`}
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {(selectedCategory || showAddModal) && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => {
            setSelectedCategory(null);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default CategoriesAdmin;