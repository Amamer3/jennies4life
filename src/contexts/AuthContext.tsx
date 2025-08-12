import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authAPI } from '../services/authApi';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User | null>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('🔍 AuthContext - checking auth status on mount');
        
        const token = localStorage.getItem('authToken');
        console.log('🔍 AuthContext - stored token exists:', !!token);
        
        if (token) {
          console.log('🔍 AuthContext - token found, checking authentication');
          
          // First try to get user profile with existing token
          const profileResponse = await authAPI.getProfile();
          
          if (profileResponse.success && profileResponse.user) {
             console.log('✅ AuthContext - profile verification successful with existing token');
             setUser(profileResponse.user);
             setIsAuthenticated(true);
             setIsLoading(false);
             return;
           }
          
          console.log('⚠️ AuthContext - profile verification failed, attempting token refresh');
          
          // If profile fails, try to refresh the token
          const refreshSuccess = await refreshToken();
          
          if (refreshSuccess) {
            console.log('✅ AuthContext - token refresh successful, retrying profile');
            const retryProfileResponse = await authAPI.getProfile();
            
            if (retryProfileResponse.success && retryProfileResponse.user) {
               console.log('✅ AuthContext - profile verification successful after refresh');
               setUser(retryProfileResponse.user);
               setIsAuthenticated(true);
               setIsLoading(false);
               return;
             }
          }
          
          console.log('❌ AuthContext - authentication failed, clearing tokens');
           localStorage.removeItem('authToken');
           localStorage.removeItem('refreshToken');
           setIsAuthenticated(false);
         } else {
           // No token found - user must authenticate
           console.log('No auth token found - user must login');
           setIsAuthenticated(false);
         }
       } catch (error) {
         console.error('Error checking auth status:', error);
         console.log('❌ AuthContext - error occurred, clearing tokens');
         localStorage.removeItem('authToken');
         localStorage.removeItem('refreshToken');
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
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // authAPI.logout() already clears localStorage, but ensure it's cleared
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const getProfile = async (): Promise<User | null> => {
    try {
      const profileResponse = await authAPI.getProfile();
      
      if (profileResponse.success && profileResponse.user) {
        setUser(profileResponse.user);
        setIsAuthenticated(true);
        return profileResponse.user;
      } else {
        console.error('Failed to get profile:', profileResponse.message);
        return null;
      }
    } catch (error) {
      console.error('Get profile error:', error);
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