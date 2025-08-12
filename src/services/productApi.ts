const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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
    console.log('🔍 ProductAPI getAuthHeaders - token from localStorage:', token ? `${token.substring(0, 20)}...` : 'null');
    console.log('🔍 ProductAPI getAuthHeaders - localStorage keys:', Object.keys(localStorage));
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private isDemoMode(): boolean {
    const authToken = localStorage.getItem('authToken');
    return authToken === 'demo-admin-token';
  }



  async createProduct(productData: CreateProductRequest): Promise<ProductResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          product: data.product || {
            id: Date.now().toString(),
            ...productData,
            createdAt: new Date().toISOString().split('T')[0]
          },
          message: data.message || 'Product created successfully'
        };
      }

      return {
        success: false,
        message: data.message || 'Failed to create product'
      };
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
    
    if (this.isDemoMode()) {
      return {
        success: true,
        products: [
          {
            id: '1',
            name: 'Premium Hair Oil',
            description: 'Nourishing hair oil for all hair types',
            affiliateLink: 'https://example.com/hair-oil',
            category: 'Hair Care',
            image: '/api/placeholder/300/300',
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0]
          },
          {
            id: '2',
            name: 'Moisturizing Cream',
            description: 'Deep moisturizing cream for dry skin',
            affiliateLink: 'https://example.com/moisturizer',
            category: 'Skin Care',
            image: '/api/placeholder/300/300',
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0]
          },
          {
            id: '3',
            name: 'Vitamin C Serum',
            description: 'Brightening vitamin C serum',
            affiliateLink: 'https://example.com/vitamin-c',
            category: 'Skin Care',
            image: '/api/placeholder/300/300',
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0]
          },
          {
            id: '4',
            name: 'Natural Shampoo',
            description: 'Organic shampoo for healthy hair',
            affiliateLink: 'https://example.com/shampoo',
            category: 'Hair Care',
            image: '/api/placeholder/300/300',
            status: 'published',
            createdAt: new Date().toISOString().split('T')[0]
          }
        ]
      };
    }
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/products`);
      console.log('🔑 Auth headers:', this.getAuthHeaders());
      
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText);
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      console.log('📄 Response data:', data);
      
      // Normalize server response to match expected interface
      if (data.success && data.data) {
        return {
          success: data.success,
          products: data.data,
          message: data.message
        };
      }
      
      return data;
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
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      return data;
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
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      return data;
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