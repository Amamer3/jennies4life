import { API_BASE_URL } from '../data';

interface Deal {
  discountType: 'percentage' | 'fixed';
  productName: string;
  productImage: string;
  featured: boolean;
  discountValue: number;
  salePrice: number;
  usageCount: number;
  maxUsage: number | null;
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  category: string;
  brand: string;
  image: string;
  status: 'active' | 'inactive' | 'expired';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  clicks: number;
  purchases: number;
}

interface CreateDealRequest {
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  brand: string;
  image: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
}

interface UpdateDealRequest {
  title?: string;
  description?: string;
  originalPrice?: number;
  discountedPrice?: number;
  category?: string;
  brand?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  status?: 'active' | 'inactive' | 'expired';
}

class DealsAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllDeals(): Promise<Deal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/deals`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch deals: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  }

  async createDeal(dealData: CreateDealRequest): Promise<Deal> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/deals`, {
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
      const response = await fetch(`${API_BASE_URL}/api/admin/deals/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/admin/deals/${id}`, {
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
      const response = await fetch(`${API_BASE_URL}/api/admin/deals/${id}`, {
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
    return this.updateDeal(id, { status: 'active' });
  }

  async deactivateDeal(id: string): Promise<Deal> {
    return this.updateDeal(id, { status: 'inactive' });
  }

  async expireDeal(id: string): Promise<Deal> {
    return this.updateDeal(id, { status: 'expired' });
  }
}

export const dealsApi = new DealsAPI();
export type { Deal, CreateDealRequest, UpdateDealRequest };