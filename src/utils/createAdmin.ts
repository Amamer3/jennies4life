/**
 * Admin User Creation Utility
 * 
 * This module provides utilities for creating admin users in the Jennies4Life platform.
 * It handles the mapping between different payload formats and provides validation
 * for admin user creation.
 * 
 * @module createAdmin
 * @author Jennies4Life Development Team
 * @since 1.0.0
 */

import { userApi, type CreateUserRequest } from '../services/userApi';

/**
 * Interface for the admin payload format
 * This represents the expected structure for creating admin users
 * 
 * @interface AdminPayload
 * @property {string} email - Valid email address for the admin user
 * @property {string} password - Secure password (minimum 8 characters recommended)
 * @property {string} displayName - Human-readable name for the admin user
 */
interface AdminPayload {
  email: string;
  password: string;
  displayName: string;
}

/**
 * Creates an admin user from the provided payload format
 * 
 * This function maps the AdminPayload format to the CreateUserRequest format
 * expected by the userApi and creates a new admin user in the system.
 * 
 * @async
 * @function createAdminFromPayload
 * @param {AdminPayload} payload - The admin user data in AdminPayload format
 * @returns {Promise<User>} Promise that resolves to the created admin user
 * @throws {Error} Throws error if user creation fails
 * 
 * @example
 * ```typescript
 * const adminData = {
 *   email: "admin@jennies4life.com",
 *   password: "securePassword123",
 *   displayName: "Admin User"
 * };
 * 
 * try {
 *   const newAdmin = await createAdminFromPayload(adminData);
 *   console.log('Admin created:', newAdmin);
 * } catch (error) {
 *   console.error('Failed to create admin:', error);
 * }
 * ```
 */
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

/**
 * Example admin payload for testing and reference
 * 
 * This constant provides a sample AdminPayload structure that can be used
 * for testing the admin creation functionality or as a reference for the
 * expected payload format.
 * 
 * @constant {AdminPayload} exampleAdminPayload
 * @example
 * ```typescript
 * import { exampleAdminPayload, createAdminFromPayload } from './createAdmin';
 * 
 * // Use the example payload for testing
 * const newAdmin = await createAdminFromPayload(exampleAdminPayload);
 * ```
 */
export const exampleAdminPayload: AdminPayload = {
  email: "newadmin@jennies4life.com",
  password: "securePassword123",
  displayName: "New Admin User"
};

/**
 * Validates an admin payload to ensure it meets minimum requirements
 * 
 * This function performs basic validation on the AdminPayload to ensure:
 * - All required fields are present and non-empty
 * - Email contains '@' symbol (basic email validation)
 * - Password is at least 8 characters long
 * 
 * @function validateAdminPayload
 * @param {AdminPayload} payload - The admin payload to validate
 * @returns {boolean} True if payload is valid, false otherwise
 * 
 * @example
 * ```typescript
 * const payload = {
 *   email: "admin@example.com",
 *   password: "password123",
 *   displayName: "Admin User"
 * };
 * 
 * if (validateAdminPayload(payload)) {
 *   await createAdminFromPayload(payload);
 * } else {
 *   console.error('Invalid admin payload');
 * }
 * ```
 */
export function validateAdminPayload(payload: AdminPayload): boolean {
  return !!(payload.email && payload.password && payload.displayName &&
           payload.email.includes('@') && payload.password.length >= 8);
}