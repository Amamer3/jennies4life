const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface DashboardStats {
  totalRevenue: string;
  activeProducts: string;
  customerRating: string;
  revenueChange: string;
  productsChange: string;
  ratingChange: string;
}

interface DashboardStatsResponse {
  success: boolean;
  stats?: DashboardStats;
  message?: string;
}

interface DashboardProduct {
  id: string;
  name: string;
  sales: number;
  revenue: string;
}

interface DashboardProductsResponse {
  success: boolean;
  products?: DashboardProduct[];
  message?: string;
}

interface DashboardPost {
  id: string;
  title: string;
  views: number;
  likes: number;
  createdAt: string;
}

interface DashboardPostsResponse {
  success: boolean;
  posts?: DashboardPost[];
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

  private isDemoMode(): boolean {
    const authToken = localStorage.getItem('authToken');
    return authToken === 'demo-admin-token';
  }



  async getStats(): Promise<DashboardStatsResponse> {
    if (this.isDemoMode()) {
      return {
        success: true,
        stats: {
          totalRevenue: '$12,450.75',
          activeProducts: '156',
          customerRating: '4.8',
          revenueChange: '+12.5%',
          productsChange: '+5.1%',
          ratingChange: '+0.3%'
        }
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get dashboard stats API error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred while fetching dashboard stats'
      };
    }
  }

  async getProducts(): Promise<DashboardProductsResponse> {
    if (this.isDemoMode()) {
      return {
        success: true,
        products: [
          {
            id: '1',
            name: 'Premium Hair Oil',
            sales: 145,
            revenue: '$4,350.00'
          },
          {
            id: '2',
            name: 'Moisturizing Cream',
            sales: 98,
            revenue: '$2,450.00'
          },
          {
            id: '3',
            name: 'Vitamin C Serum',
            sales: 76,
            revenue: '$3,040.00'
          }
        ]
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/products`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get dashboard products API error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred while fetching dashboard products'
      };
    }
  }

  async getPosts(): Promise<DashboardPostsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/posts`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get dashboard posts API error:', error);
      return {
        success: false,
        message: 'Network error occurred while fetching dashboard posts'
      };
    }
  }


}

export const dashboardAPI = new DashboardAPI();
export type {
  DashboardStats,
  DashboardStatsResponse,
  DashboardProduct,
  DashboardProductsResponse,
  DashboardPost,
  DashboardPostsResponse
};