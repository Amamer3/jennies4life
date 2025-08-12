
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


  /**
   * GET /api/sidebar/counts - Retrieve counts for sidebar items
   * Currently returns demo data since backend endpoint doesn't exist yet
   */
  async getCounts(): Promise<SidebarCountsResponse> {
    console.log('SidebarAPI: Getting sidebar counts (using demo data - no backend endpoint yet)');
    
    // Return demo data since backend endpoint doesn't exist yet
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

    // TODO: Implement when backend endpoint is available
    // try {
    //   const response = await fetch(`${API_BASE_URL}/api/sidebar/counts`, {
    //     method: 'GET',
    //     headers: this.getAuthHeaders(),
    //   });
    //   
    //   if (!response.ok) {
    //     throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    //   }
    //   
    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.error('Get sidebar counts API error:', error);
    //   return { success: false, message: error.message };
    // }
  }
}

export const sidebarAPI = new SidebarAPI();
export type {
  SidebarCounts,
  SidebarCountsResponse
};