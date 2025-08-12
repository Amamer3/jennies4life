const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

import type { Product } from '../types';

// Response interfaces for public product endpoints
interface PublicProductsResponse {
  success: boolean;
  products?: Product[];
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

interface PublicProductResponse {
  success: boolean;
  product?: Product;
  message?: string;
}

// Query parameters for product listing
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

class PublicProductAPI {
  /**
   * GET /api/products - Retrieve all published products (public endpoint)
   * This endpoint returns only published products that are visible to the public
   */
  async getProducts(params: ProductQueryParams = {}): Promise<PublicProductsResponse> {
    console.log('PublicProductAPI: Starting getProducts request with params:', params);
    
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.category) queryParams.append('category', params.category);
      if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const url = `${API_BASE_URL}/api/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      console.log('🌐 Making API request to:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Products fetched successfully:', data);
      
      // Transform response to match expected interface
      // Backend returns { success, data: [...] } but frontend expects { success, products: [...] }
      if (data.success && data.data && Array.isArray(data.data)) {
        return {
          success: data.success,
          products: data.data,
          total: data.total,
          page: data.page,
          limit: data.limit,
          message: data.message
        };
      }
      
      return data;
    } catch (error) {
      console.error('🚨 Error fetching products:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch products'
      };
    }
  }

  /**
   * GET /api/products/{slug} - Retrieve a single published product by slug (public endpoint)
   * This endpoint returns a specific product by its slug if it's published
   */
  async getProductBySlug(slug: string): Promise<PublicProductResponse> {
    console.log('PublicProductAPI: Starting getProductBySlug request for slug:', slug);
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/products/${slug}`);
      
      const response = await fetch(`${API_BASE_URL}/api/products/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            message: 'Product not found'
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Product fetched successfully:', data);
      
      // Transform response to match expected interface
      // Backend returns { success, data: product } but frontend expects { success, product }
      if (data.success && data.data) {
        return {
          success: data.success,
          product: data.data,
          message: data.message
        };
      }
      
      return data;
    } catch (error) {
      console.error('🚨 Error fetching product:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch product'
      };
    }
  }

  /**
   * Helper method to get featured products
   */
  async getFeaturedProducts(limit?: number): Promise<PublicProductsResponse> {
    return this.getProducts({ featured: true, limit });
  }

  /**
   * Helper method to get products by category
   */
  async getProductsByCategory(category: string, params: Omit<ProductQueryParams, 'category'> = {}): Promise<PublicProductsResponse> {
    return this.getProducts({ ...params, category });
  }

  /**
   * Helper method to search products
   */
  async searchProducts(query: string, params: Omit<ProductQueryParams, 'search'> = {}): Promise<PublicProductsResponse> {
    return this.getProducts({ ...params, search: query });
  }
}

// Export singleton instance
export const publicProductAPI = new PublicProductAPI();
export default publicProductAPI;

// Export types for use in components
export type { PublicProductsResponse, PublicProductResponse };