/**
 * Authentication Context Provider
 * 
 * This module provides the main authentication context for the Jennies4Life application.
 * It manages user authentication state, handles login/logout operations, and provides
 * authentication-related utilities throughout the application.
 * 
 * Features:
 * - Automatic token validation and refresh on app startup
 * - Persistent authentication state management
 * - Firebase integration for secure token handling
 * - Comprehensive error handling and logging
 * - Profile management and user data synchronization
 * 
 * @module AuthContext
 * @author Jennies4Life Development Team
 * @since 1.0.0
 * 
 * @example
 * ```typescript
 * // Wrap your app with AuthProvider
 * import { AuthProvider } from './contexts/AuthContext';
 * 
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <YourAppComponents />
 *     </AuthProvider>
 *   );
 * }
 * 
 * // Use authentication in components
 * import { useAuth } from './contexts/AuthContext';
 * 
 * function LoginComponent() {
 *   const { login, isAuthenticated, user } = useAuth();
 *   // ... component logic
 * }
 * ```
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { authAPI } from '../services/authApi';
import type { User, AuthProviderProps, AuthContextType } from '../types/auth';

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthProvider Component
 * 
 * The main authentication provider component that wraps the application
 * and provides authentication context to all child components.
 * 
 * State Management:
 * - user: Current authenticated user data or null
 * - isAuthenticated: Boolean indicating if user is currently authenticated
 * - isLoading: Boolean indicating if authentication check is in progress
 * 
 * @component
 * @param {AuthProviderProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with auth context
 * @returns {JSX.Element} AuthContext.Provider with authentication state and methods
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('🔍 AuthContext - checking auth status on mount');
      
      try {
        // Check if we have stored tokens first
        const token = localStorage.getItem('authToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!token || !refreshToken) {
          console.log('🔍 AuthContext - no stored tokens found');
          setIsAuthenticated(false);
          return;
        }

        // Try to validate existing token first
        try {
          const profileResponse = await authAPI.getProfile();
          
          if (profileResponse.success && profileResponse.user) {
            console.log('✅ AuthContext - existing token is valid');
            setUser(profileResponse.user);
            setIsAuthenticated(true);
            return;
          }
        } catch (error) {
          console.log('⚠️ AuthContext - existing token invalid, attempting refresh');
        }

        // If existing token fails, try refresh
        const refreshResponse = await authAPI.refresh();
        
        if (refreshResponse.success && refreshResponse.token) {
          console.log('✅ AuthContext - token refresh successful');
          
          // Retry getting profile with new token
          const retryProfileResponse = await authAPI.getProfile();
          
          if (retryProfileResponse.success && retryProfileResponse.user) {
            console.log('✅ AuthContext - profile verification successful after refresh');
            setUser(retryProfileResponse.user);
            setIsAuthenticated(true);
            return;
          }
        }

        // If all fails, clear tokens and set unauthenticated
        console.log('❌ AuthContext - authentication failed, clearing tokens');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
      } catch (error) {
        console.error('❌ AuthContext - authentication error:', error);
        // Clean up on any auth failure
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const loginResponse = await authAPI.login({ username, password });
      
      console.log('Login response:', loginResponse); // Debug log
      
      // Check if login was successful - either success flag is true OR message indicates success
      const isLoginSuccessful = loginResponse.success || 
        (loginResponse.message && loginResponse.message.toLowerCase().includes('successful'));
      
      if (isLoginSuccessful && loginResponse.user) {
        setUser(loginResponse.user);
        setIsAuthenticated(true);
        return true;
      } else if (isLoginSuccessful && !loginResponse.user) {
        // Success but no user data - try to get profile
        const profile = await getProfile();
        if (profile) {
          setIsAuthenticated(true);
          return true;
        }
      }
      
      console.error('Login failed:', loginResponse.message);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await authAPI.logout();
      if (!response.success) {
        throw new Error(response.message || 'Failed to logout properly');
      }
    } catch (error) {
      console.error('🚫 Logout error:', error);
      throw error; // Re-throw to handle in UI
    } finally {
      // Clear auth state regardless of API success
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      // Clear any other auth-related localStorage items
      Object.keys(localStorage)
        .filter(key => key.toLowerCase().includes('auth') || key.toLowerCase().includes('token'))
        .forEach(key => localStorage.removeItem(key));
    }
  };

  const getProfile = async (): Promise<User | null> => {
    try {
      const profileResponse = await authAPI.getProfile();
      
      // Log the entire response for debugging
      console.log('👤 AuthContext - getProfile response:', profileResponse);
      
      if (profileResponse.success && profileResponse.user) {
        console.log('👤 AuthContext - valid user profile received:', profileResponse.user);
        setUser(profileResponse.user);
        setIsAuthenticated(true);
        return profileResponse.user;
      } else {
        console.error('❌ AuthContext - Failed to get profile:', {
          success: profileResponse.success,
          message: profileResponse.message,
          user: profileResponse.user
        });
        return null;
      }
    } catch (error) {
      console.error('❌ AuthContext - Get profile error:', error);
      return null;
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshResponse = await authAPI.refresh();
      
      if (refreshResponse.success) {
        return true;
      } else {
        console.error('Token refresh failed:', refreshResponse.message);
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    getProfile,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;