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

  async getAdminStats(): Promise<any> {
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


}

export const dashboardAPI = new DashboardAPI();
export type {
  DashboardProductsResponse,
  DashboardPostsResponse
};