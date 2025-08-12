import { API_BASE_URL } from './authApi';

// Public category interface (only active categories)
export interface PublicCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  productCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicCategoriesResponse {
  success: boolean;
  data: PublicCategory[];
  message?: string;
}

class PublicCategoryAPI {
  private baseUrl = API_BASE_URL;

  /**
   * Get all active categories for public display
   */
  async getActiveCategories(): Promise<PublicCategoriesResponse> {
    try {
      console.log('🔄 Fetching active categories for public display...');
      
      const response = await fetch(`${this.baseUrl}/api/categories/public`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Active categories fetched successfully:', data.data?.length || 0, 'categories');
      
      return {
        success: true,
        data: data.data || [],
        message: data.message
      };
    } catch (error) {
      console.error('🚨 Error fetching active categories:', error);
      
      return {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : 'Failed to fetch categories'
      };
    }
  }

  /**
   * Get featured categories for homepage display
   */
  async getFeaturedCategories(): Promise<PublicCategoriesResponse> {
    try {
      const response = await this.getActiveCategories();
      
      if (response.success) {
        const featuredCategories = response.data.filter(category => category.featured);
        return {
          success: true,
          data: featuredCategories,
          message: 'Featured categories fetched successfully'
        };
      }
      
      return response;
    } catch (error) {
      console.error('🚨 Error fetching featured categories:', error);
      return {
        success: false,
        data: [],
        message: 'Failed to fetch featured categories'
      };
    }
  }


}

export const publicCategoryAPI = new PublicCategoryAPI();
export default publicCategoryAPI;