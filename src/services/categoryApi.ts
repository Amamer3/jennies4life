const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface CreateCategoryRequest {
  name: string;
  description: string;
  image?: string;
  color?: string;
  status: 'active' | 'inactive';
  featured?: boolean;
}

interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  image?: string;
  color?: string;
  status?: 'active' | 'inactive';
  featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  color?: string;
  status: 'active' | 'inactive';
  featured: boolean;
  productCount: number;
  createdAt: string;
  updatedAt?: string;
}

interface CategoryResponse {
  success: boolean;
  category?: Category;
  message?: string;
}

interface CategoriesListResponse {
  success: boolean;
  categories?: Category[];
  message?: string;
}

interface DeleteCategoryResponse {
  success: boolean;
  message?: string;
}

class CategoryAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    console.log('🔍 CategoryAPI getAuthHeaders - token from localStorage:', token ? `${token.substring(0, 20)}...` : 'null');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }



  async createCategory(categoryData: CreateCategoryRequest): Promise<CategoryResponse> {
    console.log('CategoryAPI: Starting createCategory request');
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/categories`);
      console.log('🔑 Auth headers:', this.getAuthHeaders());
      console.log('📤 Request data:', categoryData);
      
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(categoryData),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText);
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      console.log('📄 Response data:', data);
      
      return {
        success: true,
        category: data.category || {
          id: Date.now().toString(),
          ...categoryData,
          featured: categoryData.featured || false,
          productCount: 0,
          createdAt: new Date().toISOString().split('T')[0]
        },
        message: data.message || 'Category created successfully'
      };
    } catch (error) {
      console.error('🚨 Network error in createCategory:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred while creating category'
      };
    }
  }

  async getAllCategories(): Promise<CategoriesListResponse> {
    console.log('CategoryAPI: Starting getAllCategories request');
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/categories/admin/all`);
      console.log('🔑 Auth headers:', this.getAuthHeaders());
      
      const response = await fetch(`${API_BASE_URL}/api/categories/admin/all`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
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
          categories: data.data,
          message: data.message
        };
      }
      
      return data;
    } catch (error) {
      console.error('🚨 Network error in getAllCategories:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred while fetching categories'
      };
    }
  }

  async updateCategory(id: string, categoryData: UpdateCategoryRequest): Promise<CategoryResponse> {
    console.log('CategoryAPI: Starting updateCategory request for ID:', id);
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/categories/${id}`);
      console.log('🔑 Auth headers:', this.getAuthHeaders());
      console.log('📤 Request data:', categoryData);
      
      const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(categoryData),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText);
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      console.log('📄 Response data:', data);
      
      return data;
    } catch (error) {
      console.error('🚨 Network error in updateCategory:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred while updating category'
      };
    }
  }

  async deleteCategory(id: string): Promise<DeleteCategoryResponse> {
    console.log('CategoryAPI: Starting deleteCategory request for ID:', id);
    
    try {
      console.log('🌐 Making API request to:', `${API_BASE_URL}/api/categories/${id}`);
      console.log('🔑 Auth headers:', this.getAuthHeaders());
      
      const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText);
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      console.log('📄 Response data:', data);
      
      return data;
    } catch (error) {
      console.error('🚨 Network error in deleteCategory:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred while deleting category'
      };
    }
  }
}

export const categoryAPI = new CategoryAPI();
export type { 
  CreateCategoryRequest, 
  UpdateCategoryRequest, 
  Category, 
  CategoryResponse, 
  CategoriesListResponse, 
  DeleteCategoryResponse 
};