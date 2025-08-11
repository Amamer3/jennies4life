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
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Verify token with backend
          const verifyResponse = await authAPI.verify();
          
          if (verifyResponse.success && verifyResponse.user) {
            setUser(verifyResponse.user);
          } else {
            // Token invalid, try to refresh
            const refreshResponse = await authAPI.refresh();
            
            if (refreshResponse.success) {
              // Retry verification with new token
              const retryVerifyResponse = await authAPI.verify();
              if (retryVerifyResponse.success && retryVerifyResponse.user) {
                setUser(retryVerifyResponse.user);
              } else {
                // Clear invalid tokens
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('adminUser');
                localStorage.removeItem('sessionExpiry');
              }
            } else {
              // Refresh failed, clear tokens
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('adminUser');
              localStorage.removeItem('sessionExpiry');
            }
          }
        } else {
          // Check for legacy session (fallback)
          const storedUser = localStorage.getItem('adminUser');
          const sessionExpiry = localStorage.getItem('sessionExpiry');
          
          if (storedUser && sessionExpiry) {
            const now = new Date().getTime();
            const expiry = parseInt(sessionExpiry);
            
            if (now < expiry) {
              setUser(JSON.parse(storedUser));
            } else {
              // Session expired, clear storage
              localStorage.removeItem('adminUser');
              localStorage.removeItem('sessionExpiry');
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('sessionExpiry');
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
      
      if (loginResponse.success && loginResponse.user) {
        setUser(loginResponse.user);
        
        // Also store user data for legacy compatibility
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('adminUser', JSON.stringify(loginResponse.user));
        localStorage.setItem('sessionExpiry', expiryTime.toString());
        
        return true;
      } else {
        console.error('Login failed:', loginResponse.message);
        
        // Fallback to demo mode if API fails and using demo credentials
        if ((username === 'admin' && password === 'admin123') || 
            (username === 'demo' && password === 'demo123')) {
          const demoUser = {
            id: '1',
            username: username,
            email: `${username}@jennies4life.com`,
            role: 'admin' as const
          };
          
          setUser(demoUser);
          
          const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
          localStorage.setItem('adminUser', JSON.stringify(demoUser));
          localStorage.setItem('sessionExpiry', expiryTime.toString());
          
          console.log('Using demo mode - API server not available');
          return true;
        }
        
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to demo mode if network error and using demo credentials
      if ((username === 'admin' && password === 'admin123') || 
          (username === 'demo' && password === 'demo123')) {
        const demoUser = {
          id: '1',
          username: username,
          email: `${username}@jennies4life.com`,
          role: 'admin' as const
        };
        
        setUser(demoUser);
        
        const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('adminUser', JSON.stringify(demoUser));
        localStorage.setItem('sessionExpiry', expiryTime.toString());
        
        console.log('Using demo mode - Network error occurred');
        return true;
      }
      
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
      // authAPI.logout() already clears localStorage, but ensure it's cleared
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('sessionExpiry');
    }
  };

  const getProfile = async (): Promise<User | null> => {
    try {
      const profileResponse = await authAPI.getProfile();
      
      if (profileResponse.success && profileResponse.user) {
        setUser(profileResponse.user);
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
    isAuthenticated: !!user,
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