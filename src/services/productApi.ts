import { authAPI } from './authApi';

// Use relative URL in development to leverage Vite proxy, full URL in production
const API_BASE_URL = import.meta.env.DEV 
  ? '' // Use relative URL in development to go through Vite proxy
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000');

// Helper function to validate image URLs
function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

interface CreateProductRequest {
  name: string;
  image: string;
  description: string;
  affiliateLink: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
}

interface ProductResponse {
  success: boolean;
  product?: {
    id: string;
    name: string;
    image: string;
    description: string;
    affiliateLink: string;
    category: string;
    status: 'published' | 'draft' | 'archived';
    createdAt: string;
  };
  message?: string;
}

interface ProductsListResponse {
  success: boolean;
  products?: {
    id: string;
    name: string;
    image: string;
    description: string;
    affiliateLink: string;
    category: string;
    status: 'published' | 'draft' | 'archived';
    createdAt: string;
  }[];
  message?: string;
}

class ProductAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    console.log('🔍 ProductAPI getAuthHeaders - token status:', token ? 'present' : 'missing');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async refreshTokenIfNeeded(): Promise<boolean> {
    if (!localStorage.getItem('authToken')) {
      console.log('🔄 No token found, attempting to refresh...');
      try {
        const response = await authAPI.refresh();
        return response.success;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        return false;
      }
    }
    return true;
  }

  private async makeAuthenticatedRequest<T>(url: string, options: RequestInit): Promise<T> {
    await this.refreshTokenIfNeeded();
    
    const headers = this.getAuthHeaders();
    const response = await fetch(url, { ...options, headers });

    console.log('📡 Response status:', response.status, response.statusText);
    
    const rawText = await response.text();
    console.log('📦 Raw response:', rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('❌ Failed to parse response as JSON:', e);
      throw new Error('Invalid response format from server');
    }

    if (response.status === 401) {
      // Token might be expired, try to refresh and retry
      console.log('🔄 Token expired, attempting refresh...');
      const refreshed = await authAPI.refresh();
      if (refreshed.success) {
        console.log('✅ Token refreshed, retrying request...');
        const newHeaders = this.getAuthHeaders();
        return this.makeAuthenticatedRequest<T>(url, { ...options, headers: newHeaders });
      }
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  }

  async createProduct(productData: CreateProductRequest): Promise<ProductResponse> {
    try {
      // Validate image URL before sending
      if (!productData.image || !isValidImageUrl(productData.image)) {
        productData.image = 'https://via.placeholder.com/300x200?text=Product+Image';
      }

      const response = await this.makeAuthenticatedRequest<ProductResponse>(
        `${API_BASE_URL}/api/products`,
        {
          method: 'POST',
          body: JSON.stringify(productData)
        }
      );

      if (response.success) {
        return {
          success: true,
          product: response.product || {
            id: Date.now().toString(),
            ...productData,
            createdAt: new Date().toISOString().split('T')[0]
          },
          message: response.message || 'Product created successfully'
        };
      }

      return response;
    } catch (error) {
      console.error('Create product API error:', error);
      return {
        success: false,
        message: 'Network error occurred while creating product'
      };
    }
  }

  async getProducts(): Promise<ProductsListResponse> {
    console.log('ProductAPI: Starting getProducts request');
    
    try {
      const response = await this.makeAuthenticatedRequest<any>(`${API_BASE_URL}/api/products`, {
        method: 'GET'
      });

      console.log('📦 API Response:', response);

      if (response.success && Array.isArray(response.data)) {
        console.log('✅ Products fetched successfully:', response.data.length, 'products');
        return {
          success: true,
          products: response.data,
          message: 'Products fetched successfully'
        };
      }
      
      console.log('❌ API returned error:', response.message || 'Failed to fetch products');
      return {
        success: false,
        message: response.message || 'Failed to fetch products'
      };
    } catch (error) {
      console.error('🚨 Network error in getProducts:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred while fetching products'
      };
    }
  }

  async updateProduct(id: string, productData: Partial<CreateProductRequest>): Promise<ProductResponse> {
    try {
      // Validate image URL if it's being updated
      if (productData.image && !isValidImageUrl(productData.image)) {
        productData.image = 'https://via.placeholder.com/300x200?text=Product+Image';
      }

      return await this.makeAuthenticatedRequest<ProductResponse>(
        `${API_BASE_URL}/api/products/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(productData)
        }
      );
    } catch (error) {
      console.error('Update product API error:', error);
      return {
        success: false,
        message: 'Network error occurred while updating product'
      };
    }
  }

  async deleteProduct(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      return await this.makeAuthenticatedRequest(
        `${API_BASE_URL}/api/products/${id}`,
        { method: 'DELETE' }
      );
    } catch (error) {
      console.error('Delete product API error:', error);
      return {
        success: false,
        message: 'Network error occurred while deleting product'
      };
    }
  }
}

export const productAPI = new ProductAPI();
export type { CreateProductRequest, ProductResponse, ProductsListResponse };
