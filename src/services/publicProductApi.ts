const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

import type { Product } from '../types';
import { products, getProductBySlug } from '../data';

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
  private isDemoMode(): boolean {
    return !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_DEMO_MODE === 'true';
  }

  /**
   * GET /api/products - Retrieve all published products (public endpoint)
   * This endpoint returns only published products that are visible to the public
   */
  async getProducts(params: ProductQueryParams = {}): Promise<PublicProductsResponse> {
    console.log('PublicProductAPI: Starting getProducts request with params:', params);
    
    if (this.isDemoMode()) {
      // Filter only published products from demo data
      let filteredProducts = products.filter(_product => {
        // Only return products that would be considered "published" in a real system
        // For demo purposes, we'll return all products as they're all meant to be public
        return true;
      });

      // Apply search filter
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      // Apply category filter
      if (params.category) {
        filteredProducts = filteredProducts.filter(product =>
          product.category.toLowerCase().replace(/\s+/g, '-') === params.category?.toLowerCase()
        );
      }

      // Apply featured filter
      if (params.featured !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.isFeatured === params.featured);
      }

      // Apply sorting
      if (params.sortBy) {
        filteredProducts.sort((a, b) => {
          let comparison = 0;
          switch (params.sortBy) {
            case 'name':
              comparison = a.name.localeCompare(b.name);
              break;
            case 'price':
              comparison = a.price - b.price;
              break;
            case 'rating':
              comparison = a.rating - b.rating;
              break;
            case 'newest':
              // For demo, we'll use the isNew flag
              comparison = (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
              break;
            default:
              comparison = 0;
          }
          return params.sortOrder === 'desc' ? -comparison : comparison;
        });
      }

      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 20;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        success: true,
        products: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit
      };
    }
    
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
    
    if (this.isDemoMode()) {
      const product = getProductBySlug(slug);
      
      if (!product) {
        return {
          success: false,
          message: 'Product not found'
        };
      }

      return {
        success: true,
        product
      };
    }
    
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