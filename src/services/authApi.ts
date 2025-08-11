const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
  };
  token?: string;
  refreshToken?: string;
  message?: string;
}

interface RefreshResponse {
  success: boolean;
  token?: string;
  message?: string;
}

interface VerifyResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
  };
  message?: string;
}

interface ProfileResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
  };
  message?: string;
}

class AuthAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Map username to email for API compatibility
      const apiCredentials = {
        email: credentials.username,
        password: credentials.password
      };
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiCredentials),
      });

      const data = await response.json();
      
      // Handle successful login response
      if (response.ok) {
        // Check if response indicates success (either data.success or successful message)
        const isSuccess = data.success || 
                         (data.message && data.message.toLowerCase().includes('successful')) ||
                         (typeof data === 'string' && data.toLowerCase().includes('successful'));
        
        if (isSuccess) {
          // Store tokens if provided
          if (data.token) {
            localStorage.setItem('authToken', data.token);
          }
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }
          
          // Create user object if not provided but login was successful
          if (!data.user && isSuccess) {
            const user = {
              id: '1',
              username: credentials.username,
              email: credentials.username,
              role: 'admin' as const
            };
            
            return {
              success: true,
              user: user,
              token: data.token,
              refreshToken: data.refreshToken,
              message: data.message || 'Login successful'
            };
          }
          
          return {
            ...data,
            success: true
          };
        }
      }

      return data;
    } catch (error) {
      console.error('Login API error:', error);
      return {
        success: false,
        message: 'Network error occurred during login'
      };
    }
  }

  async refresh(): Promise<RefreshResponse> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(refreshToken && { 'Authorization': `Bearer ${refreshToken}` })
        },
      });

      const data = await response.json();
      
      if (response.ok && data.success && data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('Refresh API error:', error);
      return {
        success: false,
        message: 'Network error occurred during token refresh'
      };
    }
  }

  async verify(): Promise<VerifyResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Verify API error:', error);
      return {
        success: false,
        message: 'Network error occurred during verification'
      };
    }
  }

  async logout(): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      
      // Clear local storage regardless of response
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('sessionExpiry');

      return data;
    } catch (error) {
      console.error('Logout API error:', error);
      // Still clear local storage on error
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('sessionExpiry');
      
      return {
        success: false,
        message: 'Network error occurred during logout'
      };
    }
  }

  async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Profile API error:', error);
      return {
        success: false,
        message: 'Network error occurred while fetching profile'
      };
    }
  }
}

export const authAPI = new AuthAPI();
export type { LoginRequest, LoginResponse, RefreshResponse, VerifyResponse, ProfileResponse };