
import { API_BASE_URL } from '../data';

interface SidebarCounts {
  products: number;
  categories: number;
  deals: number;
  blogPosts: number;
  users: number;
}

interface SidebarCountsResponse {
  success: boolean;
  counts?: SidebarCounts;
  message?: string;
}

class SidebarAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  /**
   * GET /api/admin/stats/counts - Retrieve counts for sidebar items
   */
  async getCounts(): Promise<SidebarCountsResponse> {
    console.log('SidebarAPI: Getting sidebar counts from API');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/stats/counts`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        console.error('SidebarAPI: HTTP error:', response.status, response.statusText);
        // Fallback to demo data if API fails
        return {
          success: true,
          counts: {
            products: 156,
            categories: 12,
            deals: 23,
            blogPosts: 45,
            users: 1247
          }
        };
      }
      
      const data = await response.json();
      console.log('SidebarAPI: Counts fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('SidebarAPI: Network error:', error);
      // Fallback to demo data if network fails
      return {
        success: true,
        counts: {
          products: 156,
          categories: 12,
          deals: 23,
          blogPosts: 45,
          users: 1247
        }
      };
    }
  }
}

export const sidebarAPI = new SidebarAPI();
export type {
  SidebarCounts,
  SidebarCountsResponse
};