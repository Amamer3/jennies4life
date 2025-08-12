const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Public deal interface (only active deals)
export interface PublicDeal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  affiliateLink: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
  // Product-like properties for compatibility
  rating?: number;
  reviewCount?: number;
  features?: string[];
  // Legacy fields for backward compatibility
  discountType?: 'percentage' | 'fixed';
  productName?: string;
  productImage?: string;
  featured?: boolean;
  discountValue?: number;
  salePrice?: number;
  usageCount?: number;
  maxUsage?: number | null;
  discountPercentage?: number;
  brand?: string;
  image?: string;
  status?: 'active' | 'inactive' | 'expired';
  views?: number;
  clicks?: number;
  purchases?: number;
}

export interface PublicDealsResponse {
  success: boolean;
  data: PublicDeal[];
  message?: string;
}

class PublicDealsAPI {
  private baseUrl = API_BASE_URL;

  /**
   * Get all active deals for public display
   */
  async getActiveDeals(): Promise<PublicDealsResponse> {
    try {
      console.log('🔄 Fetching active deals for public display...');
      
      const response = await fetch(`${this.baseUrl}/api/deals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Active deals fetched successfully:', data.data?.length || 0, 'deals');
      
      return {
        success: true,
        data: data.data || [],
        message: data.message
      };
    } catch (error) {
      console.error('🚨 Error fetching active deals:', error);
      
      return {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : 'Failed to fetch deals'
      };
    }
  }

  /**
   * Get featured deals
   */
  async getFeaturedDeals(): Promise<PublicDealsResponse> {
    try {
      console.log('🔄 Fetching featured deals...');
      
      const response = await fetch(`${this.baseUrl}/api/deals?featured=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Featured deals fetched successfully:', data.data?.length || 0, 'deals');
      
      return {
        success: true,
        data: data.data || [],
        message: data.message
      };
    } catch (error) {
      console.error('🚨 Error fetching featured deals:', error);
      
      return {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : 'Failed to fetch featured deals'
      };
    }
  }
}

// Export singleton instance
export const publicDealsAPI = new PublicDealsAPI();
export default publicDealsAPI;