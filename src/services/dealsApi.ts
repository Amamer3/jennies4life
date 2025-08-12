import { API_BASE_URL } from '../data';

interface Deal {
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

interface CreateDealRequest {
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
}

interface UpdateDealRequest {
  title?: string;
  description?: string;
  originalPrice?: number;
  discountedPrice?: number;
  affiliateLink?: string;
  imageUrl?: string;
  category?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

class DealsAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllDeals(): Promise<Deal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deals`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch deals: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle different response structures
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.data)) {
        return data.data;
      } else if (data && Array.isArray(data.deals)) {
        return data.deals;
      } else {
        console.warn('Unexpected API response structure:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  }

  async createDeal(dealData: CreateDealRequest): Promise<Deal> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deals`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(dealData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create deal: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  }

  async getDealById(id: string): Promise<Deal> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deals/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch deal: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching deal:', error);
      throw error;
    }
  }

  async updateDeal(id: string, dealData: UpdateDealRequest): Promise<Deal> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deals/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(dealData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update deal: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  }

  async deleteDeal(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/deals/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete deal: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw error;
    }
  }

  async activateDeal(id: string): Promise<Deal> {
    return this.updateDeal(id, { isActive: true });
  }

  async deactivateDeal(id: string): Promise<Deal> {
    return this.updateDeal(id, { isActive: false });
  }
}

export const dealsApi = new DealsAPI();
export type { Deal, CreateDealRequest, UpdateDealRequest };