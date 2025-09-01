const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  recentProducts: DashboardProduct[];
  recentPosts: DashboardPost[];
}



export interface DashboardProduct {
  id: string;
  name: string;
  affiliateLink: string;
  description: string;
  image: string;
  slug: string;
  category: string;
  status: 'published' | 'draft';
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  clickCount: number;
  lastClickedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

interface DashboardProductsResponse {
  success: boolean;
  data: DashboardProduct[];
  message?: string;
}

export interface DashboardPost {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  slug: string;
  status: 'published' | 'draft';
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  views?: number;
}

interface DashboardPostsResponse {
  success: boolean;
  data: DashboardPost[];
  message?: string;
}

interface AdminStatsResponse {
  success: boolean;
  data?: Record<string, unknown>;
  message?: string;
  newUsersToday?: number;
  totalUsers?: number;
  activeUsers?: number;
}

export interface RevenueData {
  name: string;
  value: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface DeviceData {
  name: string;
  value: number;
  color: string;
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: string;
  image: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  time: string;
  icon: string;
  color: string;
}

class DashboardAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    console.log('🔐 Dashboard API - Auth token:', token ? 'present' : 'missing');
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }


  async getStats(): Promise<DashboardStats> {
    try {
      console.log('📊 Dashboard API - Fetching stats...');
      
      const headers = this.getAuthHeaders();
      console.log('📝 Request headers:', headers);
      
      const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
        headers: headers
      });

      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Failed to fetch dashboard stats: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Dashboard stats fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Dashboard API Error:', error);
      throw error;
    }
  }

  async getAdminStats(): Promise<AdminStatsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch admin stats');
    }
    
    const result = await response.json();
    return result;
  }

  async getProducts(): Promise<DashboardProductsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/products`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard products');
    }
    
    const result = await response.json();
    return result;
  }

  async getPosts(): Promise<DashboardPostsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/posts`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard posts');
    }
    
    const result = await response.json();
    return result;
  }

  async getRevenueData(period: string = '7d'): Promise<RevenueData[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/revenue?period=${period}`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch revenue data: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  }

  async getCategoryData(): Promise<CategoryData[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/categories`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category data: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  }

  async getDeviceData(): Promise<DeviceData[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/devices`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch device data: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  }

  async getTopProducts(): Promise<TopProduct[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/top-products`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch top products: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  }

  async getRecentActivity(): Promise<ActivityItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/activity`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch recent activity: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  }

}

export const dashboardAPI = new DashboardAPI();
export type {
  DashboardProductsResponse,
  DashboardPostsResponse
};