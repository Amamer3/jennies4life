import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  MoreHorizontal,
  Loader2
} from 'lucide-react';
import { productAPI } from '../../services/productApi';
import type { CreateProductRequest } from '../../services/productApi';
import { publicCategoryAPI } from '../../services/publicCategoryApi';


interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  affiliateLink: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
}

const ProductsAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(['all']);
  const formRef = useRef<HTMLFormElement>(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await publicCategoryAPI.getActiveCategories();
      if (response.success && response.data) {
        const categoryNames = ['all', ...response.data.map(cat => cat.name)];
        setCategories(categoryNames);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback to default categories if API fails
      setCategories(['all', 'Electronics', 'Beauty', 'Health', 'Fashion']);
    }
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching products from API...');
      const response = await productAPI.getProducts();
      
      console.log('📦 API Response:', response);
      
      if (response.success && response.products) {
        console.log('✅ Products fetched successfully:', response.products.length, 'products');
        setProducts(response.products);
      } else {
        const errorMessage = response.message || 'Failed to fetch products';
        console.error('❌ API returned error:', errorMessage);
        setError(errorMessage);
      }
    } catch (err) {
      console.error('🚨 Network error while fetching products:', err);
      setError('Network error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const statuses = ['all', 'published', 'draft', 'archived'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    
    const productData: CreateProductRequest = {
      name: formData.get('name') as string,
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      affiliateLink: formData.get('affiliateLink') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as 'published' | 'draft' | 'archived'
    };

    try {
      const result = await productAPI.createProduct(productData);
      if (result.success) {
        alert('Product created successfully!');
        onClose();
        // Refresh the products list
        await fetchProducts();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClose = () => {
    setSelectedProduct(null);
    setShowAddModal(false);
  };

  const ProductModal = ({ product, onClose }: { product: Product | null; onClose: () => void }) => {
    if (!product && !showAddModal) return null;

    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full w-full max-w-2xl p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {product ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 sm:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={product?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="Amazing Product"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={product?.category || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={product?.image || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  name="description"
                  defaultValue={product?.description || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:border-transparent"
                  placeholder="This is an amazing product that you'll love!"
                  required
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Affiliate Link</label>
                <input
                  type="url"
                  name="affiliateLink"
                  defaultValue={product?.affiliateLink || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:border-transparent"
                  placeholder="https://affiliate.com/product/123"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={product?.status || 'published'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00] focus:border-transparent"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#e72a00] rounded-md hover:bg-[#d12400] transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : (product ? 'Update Product' : 'Add Product')}
              </button>
            </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#e72a00]" />
          <p className="mt-2 text-gray-600">Loading products...</p>
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
              onClick={fetchProducts}
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
    <div className="space-y-6 w-full max-w-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: products.length.toString(), icon: Package, color: 'bg-blue-500' },
          { label: 'Published', value: products.filter(p => p.status === 'published').length.toString(), icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Draft', value: products.filter(p => p.status === 'draft').length.toString(), icon: Package, color: 'bg-yellow-500' },
          { label: 'Archived', value: products.filter(p => p.status === 'archived').length.toString(), icon: Package, color: 'bg-gray-500' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e72a00]"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.replace('_', ' ').toUpperCase()}
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

      {/* Products Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                  Affiliate Link
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No products found</p>
                      <p className="text-sm">
                        {products.length === 0 
                          ? "Get started by adding your first product." 
                          : "Try adjusting your search or filter criteria."}
                      </p>
                      {products.length === 0 && (
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="mt-4 inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Product
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 w-1/4">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="ml-3 min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                        <div className="text-xs text-gray-500 truncate">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 w-1/6">
                    <span className="truncate">{product.category}</span>
                  </td>
                  <td className="px-4 py-4 w-1/4">
                    <div className="text-sm text-gray-900 line-clamp-2">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-4 py-4 w-1/6">
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 text-sm truncate block"
                      title={product.affiliateLink}
                    >
                      {product.affiliateLink}
                    </a>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap w-1/12">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                      {product.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium w-1/12">
                    <div className="flex items-center space-x-1">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Cards - Mobile & Tablet */}
      <div className="lg:hidden space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No products found</p>
              <p className="text-sm">
                {products.length === 0 
                  ? "Get started by adding your first product." 
                  : "Try adjusting your search or filter criteria."}
              </p>
              {products.length === 0 && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-[#e72a00] text-white text-sm font-medium rounded-md hover:bg-[#d12400] transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </button>
              )}
            </div>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">ID: {product.id}</p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{product.category}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)} ml-2 flex-shrink-0`}>
                      {product.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="mt-3">
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 text-xs sm:text-sm truncate block"
                    >
                      {product.affiliateLink}
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-gray-700 text-center sm:text-left">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{products.length}</span> results
          </div>
          <div className="flex items-center justify-center space-x-1 sm:space-x-2">
            <button className="px-2 sm:px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>
            <button className="px-2 sm:px-3 py-1 text-sm bg-[#e72a00] text-white rounded-md">
              1
            </button>
            <button className="px-2 sm:px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-2 sm:px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {(selectedProduct || showAddModal) && (
        <ProductModal
          product={selectedProduct}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default ProductsAdmin;