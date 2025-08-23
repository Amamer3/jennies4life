/**
 * Application Configuration Constants
 * 
 * This module exports configuration constants used throughout the Jennies4Life application.
 * It centralizes environment-dependent settings and provides fallback values for production.
 * 
 * @module data/index
 * @author Jennies4Life Development Team
 * @since 1.0.0
 */

/**
 * API Base URL Configuration
 * 
 * The base URL for all API requests made by the application. This value is determined by:
 * 1. Environment variable VITE_API_BASE_URL (if set)
 * 2. Fallback to production server URL
 * 
 * Environment Setup:
 * - Development: Set VITE_API_BASE_URL=http://localhost:3000 in .env
 * - Production: Uses the default Render.com deployment URL
 * 
 * @constant {string} API_BASE_URL - The base URL for API requests
 * 
 * @example
 * ```typescript
 * import { API_BASE_URL } from '../data';
 * 
 * // Make API request
 * const response = await fetch(`${API_BASE_URL}/api/products`);
 * ```
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jennies4life-server.onrender.com';