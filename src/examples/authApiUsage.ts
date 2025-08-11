// Example usage of the Auth API endpoints
// This file demonstrates how to use the authentication API

import { authAPI } from '../services/authApi';

// Example: Login
export const exampleLogin = async () => {
  try {
    const result = await authAPI.login({
      username: 'admin',
      password: 'admin123'
    });
    
    if (result.success) {
      console.log('Login successful:', result.user);
      return result.user;
    } else {
      console.error('Login failed:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// Example: Verify token
export const exampleVerify = async () => {
  try {
    const result = await authAPI.verify();
    
    if (result.success) {
      console.log('Token is valid:', result.user);
      return result.user;
    } else {
      console.error('Token verification failed:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Verify error:', error);
    return null;
  }
};

// Example: Refresh token
export const exampleRefresh = async () => {
  try {
    const result = await authAPI.refresh();
    
    if (result.success) {
      console.log('Token refreshed successfully');
      return true;
    } else {
      console.error('Token refresh failed:', result.message);
      return false;
    }
  } catch (error) {
    console.error('Refresh error:', error);
    return false;
  }
};

// Example: Get user profile
export const exampleGetProfile = async () => {
  try {
    const result = await authAPI.getProfile();
    
    if (result.success) {
      console.log('Profile retrieved:', result.user);
      return result.user;
    } else {
      console.error('Failed to get profile:', result.message);
      return null;
    }
  } catch (error) {
    console.error('Profile error:', error);
    return null;
  }
};

// Example: Logout
export const exampleLogout = async () => {
  try {
    const result = await authAPI.logout();
    
    if (result.success) {
      console.log('Logout successful');
      return true;
    } else {
      console.error('Logout failed:', result.message);
      return false;
    }
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

// Example: Complete authentication flow
export const exampleAuthFlow = async () => {
  console.log('=== Authentication Flow Example ===');
  
  // 1. Login
  console.log('1. Attempting login...');
  const user = await exampleLogin();
  
  if (!user) {
    console.log('Login failed, stopping flow');
    return;
  }
  
  // 2. Verify token
  console.log('2. Verifying token...');
  const verifiedUser = await exampleVerify();
  
  if (!verifiedUser) {
    console.log('Token verification failed');
  }
  
  // 3. Get profile
  console.log('3. Getting user profile...');
  const profile = await exampleGetProfile();
  
  if (!profile) {
    console.log('Failed to get profile');
  }
  
  // 4. Refresh token
  console.log('4. Refreshing token...');
  const refreshed = await exampleRefresh();
  
  if (!refreshed) {
    console.log('Token refresh failed');
  }
  
  // 5. Logout
  console.log('5. Logging out...');
  const loggedOut = await exampleLogout();
  
  if (loggedOut) {
    console.log('Authentication flow completed successfully');
  } else {
    console.log('Logout failed');
  }
};