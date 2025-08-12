// Utility function to create an admin user
// This can be imported and used in React components

import { userApi, type CreateUserRequest } from '../services/userApi';

// Interface for the admin payload format
interface AdminPayload {
  email: string;
  password: string;
  displayName: string;
}

// Function to create admin user from the provided payload format
export async function createAdminFromPayload(payload: AdminPayload) {
  // Map the payload to CreateUserRequest format
  const adminUserData: CreateUserRequest = {
    email: payload.email,
    name: payload.displayName, // displayName maps to name in our User interface
    password: payload.password,
    role: 'admin' // Set role as admin
  };

  try {
    console.log('Creating admin user:', { email: adminUserData.email, name: adminUserData.name, role: adminUserData.role });
    
    const newAdmin = await userApi.createUser(adminUserData);
    
    console.log('Admin user created successfully:', newAdmin);
    return newAdmin;
  } catch (error) {
    console.error('Failed to create admin user:', error);
    throw error;
  }
}

// Example usage with the provided payload
export const exampleAdminPayload: AdminPayload = {
  email: "newadmin@jennies4life.com",
  password: "securePassword123",
  displayName: "New Admin User"
};

// Helper function to validate admin payload
export function validateAdminPayload(payload: AdminPayload): boolean {
  return !!(payload.email && payload.password && payload.displayName &&
           payload.email.includes('@') && payload.password.length >= 8);
}