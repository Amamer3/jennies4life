import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../config/firebase';

// Use relative URL in development to leverage Vite proxy, full URL in production
export const API_BASE_URL = import.meta.env.DEV 
  ? '' // Use relative URL in development to go through Vite proxy
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000');

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
  customToken?: string;
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
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Debug method to check stored tokens
  debugTokens(): void {
    const idToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('🔍 Debug - ID Token:', idToken ? 'present' : 'missing');
    console.log('🔍 Debug - Refresh Token:', refreshToken ? 'present' : 'missing');
    console.log('🔍 Debug - Firebase User:', auth.currentUser ? 'authenticated' : 'not authenticated');
    if (auth.currentUser) {
      console.log('🔍 Debug - Firebase User ID:', auth.currentUser.uid);
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🔐 AuthAPI - attempting login with:', { username: credentials.username });
      
      // Map username to email for backend compatibility
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

      console.log('🔐 AuthAPI - login response status:', response.status);
      
      const data = await response.json();
      console.log('🔐 AuthAPI - backend login response:', data);
      console.log('🔍 AuthAPI - response data keys:', Object.keys(data));
      if (data.data) {
        console.log('🔍 AuthAPI - nested data keys:', Object.keys(data.data));
      }
      
      if (response.ok && data.success) {
        console.log('🔐 AuthAPI - backend login successful, extracting custom token');
        
        // Extract the custom token from backend response (prioritize correct path)
        const customToken = data.data?.customToken || data.data?.token || data.customToken || data.token;
        console.log('🔍 AuthAPI - extracted customToken:', customToken ? 'found' : 'not found');
        console.log('🔍 AuthAPI - customToken value:', customToken ? customToken.substring(0, 20) + '...' : 'null');
        
        if (!customToken) {
          console.error('🔐 AuthAPI - no custom token received from backend');
          return {
            success: false,
            message: 'No custom token received from backend'
          };
        }
        
        console.log('🔐 AuthAPI - exchanging custom token for Firebase ID token');
        
        // Exchange custom token for Firebase ID token
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();
        const firebaseRefreshToken = userCredential.user.refreshToken;
        
        console.log('🔐 AuthAPI - Firebase authentication successful');
        console.log('🔍 AuthAPI - Firebase refresh token:', firebaseRefreshToken ? 'available' : 'not available');
        
        // Store both Firebase ID token and refresh token
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('refreshToken', firebaseRefreshToken);
        
        console.log('✅ AuthAPI - Tokens stored successfully');
        
        return {
          success: true,
          user: data.data?.user || data.user,
          customToken: customToken
        };
      }

      return {
        success: false,
        message: data.message || 'Login failed'
      };
    } catch (error) {
      console.error('🔐 AuthAPI - login error:', error);
      
      // Handle CORS errors specifically
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('🚫 CORS Error detected - likely backend CORS configuration issue');
        return {
          success: false,
          message: 'Unable to connect to authentication server. This may be due to CORS configuration. Please contact support if the issue persists.'
        };
      }
      
      // Handle network errors
      if (error instanceof Error && (error.message.includes('NetworkError') || error.message.includes('CORS'))) {
        return {
          success: false,
          message: 'Network connection error. Please check your internet connection and try again.'
        };
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Authentication failed'
      };
    }
  }

  async refresh(): Promise<RefreshResponse> {
    try {
      console.log('🔄 AuthAPI - starting refresh process');
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.log('❌ AuthAPI - no refresh token available');
        return {
          success: false,
          message: 'No refresh token available'
        };
      }
      
      // Use Firebase SDK to refresh the token
      const user = auth.currentUser;
      if (user) {
        console.log('🔄 AuthAPI - refreshing Firebase ID token');
        const newIdToken = await user.getIdToken(true); // Force refresh
        localStorage.setItem('authToken', newIdToken);
        console.log('✅ AuthAPI - Firebase token refresh successful');
        return {
          success: true,
          token: newIdToken
        };
      }
      
      console.log('❌ AuthAPI - no authenticated user found');
      return {
        success: false,
        message: 'No authenticated user found'
      };
    } catch (error) {
      console.error('❌ AuthAPI - refresh error:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Authentication refresh failed'
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
      console.log('🚪 AuthAPI - logging out');
      
      // Sign out from Firebase
      if (auth.currentUser) {
        await auth.signOut();
        console.log('✅ AuthAPI - Firebase sign out successful');
      }
      
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
          console.log('✅ AuthAPI - logout completed');
          return {
            success: true,
            message: 'Logged out successfully (token was already invalid)'
          };
        }

        if (response.ok) {
          const data = await response.json();
          console.log('✅ AuthAPI - logout completed');
          return data.success ? data : {
            success: true,
            message: 'Logged out successfully'
          };
        }
      }

      console.log('✅ AuthAPI - logout completed');
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('❌ AuthAPI - logout error:', error);
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
      const headers = this.getAuthHeaders();
      console.log('👤 AuthAPI - getProfile request headers:', headers);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: headers,
      });

      console.log('👤 AuthAPI - getProfile response status:', response.status);
      
      const data = await response.json();
      console.log('👤 AuthAPI - getProfile response data:', data);
      
      if (!response.ok) {
        console.error('👤 AuthAPI - getProfile failed with status:', response.status, 'data:', data);
        return {
          success: false,
          message: data.message || `Profile request failed with status ${response.status}`
        };
      }
      
      return data;
    } catch (error) {
      console.error('👤 AuthAPI - Profile API error:', error);
      return {
        success: false,
        message: 'Network error occurred while fetching profile'
      };
    }
  }
}

export const authAPI = new AuthAPI();
export type { LoginRequest, LoginResponse, RefreshResponse, VerifyResponse, ProfileResponse };