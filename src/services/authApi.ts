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

      const responseData = await response.json();
      
      // Handle successful login response
      if (response.ok && responseData.success) {
        // Extract data from nested structure if present
        const loginData = responseData.data || responseData;
        
        // Store tokens if provided (check both levels and common field names)
        const token = loginData.token || loginData.accessToken || loginData.customToken || responseData.token || responseData.accessToken || responseData.customToken;
        const refreshToken = loginData.refreshToken || loginData.refresh_token || responseData.refreshToken || responseData.refresh_token;
        
        console.log('🔍 AuthAPI login - extracted token:', token ? `${token.substring(0, 20)}...` : 'null');
        console.log('🔍 AuthAPI login - extracted refreshToken:', refreshToken ? `${refreshToken.substring(0, 20)}...` : 'null');
        
        if (token) {
          localStorage.setItem('authToken', token);
          console.log('✅ AuthAPI login - token stored in localStorage');
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
          console.log('✅ AuthAPI login - refreshToken stored in localStorage');
        }
        
        console.log('🔍 AuthAPI login - localStorage after storing:', Object.keys(localStorage));
        
        // Return normalized response structure
        return {
          success: responseData.success,
          user: loginData.user || loginData,
          token: token,
          refreshToken: refreshToken,
          message: responseData.message
        };
      }

      return responseData;
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
        method: 'GET',
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
      const token = localStorage.getItem('authToken');
      
      // Clear local storage first
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      
      // Only make API call if we have a token
      if (token) {
        const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        // Handle 401 errors gracefully (token already invalid)
        if (response.status === 401) {
          return {
            success: true,
            message: 'Logged out successfully (token was already invalid)'
          };
        }

        if (response.ok) {
          const data = await response.json();
          return data.success ? data : {
            success: true,
            message: 'Logged out successfully'
          };
        }
      }

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout API error:', error);
      // Ensure local storage is cleared on error
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      
      return {
        success: true,
        message: 'Logged out successfully (local cleanup completed)'
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