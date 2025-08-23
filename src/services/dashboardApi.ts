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
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }


  async getStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    
    const result = await response.json();
    return result.data;
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
      // Return mock data if API fails
      return [
        { name: 'Mon', value: 4000 },
        { name: 'Tue', value: 3000 },
        { name: 'Wed', value: 5000 },
        { name: 'Thu', value: 4500 },
        { name: 'Fri', value: 6000 },
        { name: 'Sat', value: 5500 },
        { name: 'Sun', value: 4800 }
      ];
    }
    
    const result = await response.json();
    return result.data;
  }

  async getCategoryData(): Promise<CategoryData[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/categories`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      // Return mock data if API fails
      return [
        { name: 'Electronics', value: 35, color: '#3B82F6' },
        { name: 'Fashion', value: 25, color: '#EF4444' },
        { name: 'Beauty', value: 20, color: '#10B981' },
        { name: 'Sports', value: 12, color: '#F59E0B' },
        { name: 'Others', value: 8, color: '#8B5CF6' }
      ];
    }
    
    const result = await response.json();
    return result.data;
  }

  async getDeviceData(): Promise<DeviceData[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/devices`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      // Return mock data if API fails
      return [
        { name: 'Desktop', value: 45, color: '#3B82F6' },
        { name: 'Mobile', value: 40, color: '#EF4444' },
        { name: 'Tablet', value: 15, color: '#10B981' }
      ];
    }
    
    const result = await response.json();
    return result.data;
  }

  async getTopProducts(): Promise<TopProduct[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/top-products`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      // Return mock data if API fails
      return [
        {
          id: '1',
          name: 'Wireless Headphones',
          sales: 234,
          revenue: '$11,700',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
        },
        {
          id: '2',
          name: 'Smart Watch',
          sales: 189,
          revenue: '$9,450',
          image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'
        },
        {
          id: '3',
          name: 'Laptop Stand',
          sales: 156,
          revenue: '$7,800',
          image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg'
        },
        {
          id: '4',
          name: 'Phone Case',
          sales: 143,
          revenue: '$2,860',
          image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'
        },
        {
          id: '5',
          name: 'Bluetooth Speaker',
          sales: 128,
          revenue: '$6,400',
          image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'
        }
      ];
    }
    
    const result = await response.json();
    return result.data;
  }

  async getRecentActivity(): Promise<ActivityItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/activity`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      // Return mock data if API fails
      return [
        {
          id: '2',
          type: 'user',
          message: 'New user registration',
          time: '5 minutes ago',
          icon: 'Users',
          color: 'text-green-600'
        },
        {
          id: '3',
          type: 'product',
          message: 'Product "Smart Watch" low in stock',
          time: '10 minutes ago',
          icon: 'Activity',
          color: 'text-orange-600'
        },
        {
          id: '4',
          type: 'revenue',
          message: 'Daily revenue target achieved',
          time: '1 hour ago',
          icon: 'Target',
          color: 'text-purple-600'
        },
        {
          id: '5',
          type: 'review',
          message: 'New 5-star review received',
          time: '2 hours ago',
          icon: 'TrendingUp',
          color: 'text-pink-600'
        }
      ];
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