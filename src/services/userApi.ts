import { API_BASE_URL } from '../data';

interface User {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
}

interface UpdateUserRequest {
  email?: string;
  name?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'inactive';
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalLogins: number;
}

class UserAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('🔍 UserAPI - getAllUsers response:', data);
      
      // Handle different response structures
      if (Array.isArray(data)) {
        return data;
      } else if (data.data && data.data.admins && Array.isArray(data.data.admins)) {
        return data.data.admins;
      } else if (data.data && data.data.users && Array.isArray(data.data.users)) {
        return data.data.users;
      } else if (data.data && Array.isArray(data.data)) {
        return data.data;
      } else if (data.users && Array.isArray(data.users)) {
        return data.users;
      } else if (data.admins && Array.isArray(data.admins)) {
        return data.admins;
      } else {
        console.warn('🔍 UserAPI - unexpected response structure, returning empty array');
        console.log('🔍 UserAPI - data structure:', JSON.stringify(data, null, 2));
        return [];
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return []; // Return empty array instead of throwing to prevent crashes
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create user: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserById(uid: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${uid}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async updateUser(uid: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${uid}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(uid: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/${uid}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard stats: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
}

export const userApi = new UserAPI();
export type { User, CreateUserRequest, UpdateUserRequest, DashboardStats };