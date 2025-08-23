# API Documentation - Jennies4Life Platform

This document provides comprehensive documentation for all API services used in the Jennies4Life platform.

## Table of Contents

1. [Authentication API](#authentication-api)
2. [Public Product API](#public-product-api)
3. [Admin Product API](#admin-product-api)
4. [Category API](#category-api)
5. [Blog API](#blog-api)
6. [User Management API](#user-management-api)
7. [Dashboard Analytics API](#dashboard-analytics-api)
8. [Error Handling](#error-handling)
9. [Authentication Flow](#authentication-flow)

## Base Configuration

**Base URL**: Configured via environment variable `VITE_API_BASE_URL`
- Development: `http://localhost:3000`
- Production: `https://jennies4life-server.onrender.com`

**Authentication**: Bearer token in Authorization header
```
Authorization: Bearer <firebase_id_token>
```

## Authentication API

### Login
**Endpoint**: `POST /api/auth/login`

**Description**: Authenticates user and returns Firebase custom token

**Request Body**:
```json
{
  "username": "admin@jennies4life.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "customToken": "firebase_custom_token_here",
  "user": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@jennies4life.com",
    "role": "admin"
  }
}
```

### Refresh Token
**Endpoint**: `POST /api/auth/refresh`

**Description**: Refreshes the authentication token

**Headers**: `Authorization: Bearer <current_token>`

**Response**:
```json
{
  "success": true,
  "token": "new_firebase_token"
}
```

### Get Profile
**Endpoint**: `GET /api/auth/profile`

**Description**: Retrieves current user profile

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "admin",
    "email": "admin@jennies4life.com",
    "role": "admin"
  }
}
```

## Public Product API

### Get Products (Public)
**Endpoint**: `GET /api/products`

**Description**: Retrieves published products for public viewing

**Query Parameters**:
- `page` (number): Page number for pagination
- `limit` (number): Number of products per page
- `category` (string): Filter by category
- `featured` (boolean): Filter featured products
- `search` (string): Search query
- `sortBy` (string): Sort field (name, price, rating, newest)
- `sortOrder` (string): Sort direction (asc, desc)

**Example Request**:
```
GET /api/products?page=1&limit=12&category=electronics&featured=true
```

**Response**:
```json
{
  "success": true,
  "products": [
    {
      "id": "product_id",
      "name": "Product Name",
      "description": "Product description",
      "image": "https://example.com/image.jpg",
      "affiliateLink": "https://affiliate-link.com",
      "category": "electronics",
      "status": "published",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 12
}
```

### Get Single Product (Public)
**Endpoint**: `GET /api/products/:id`

**Description**: Retrieves a single published product by ID

**Response**:
```json
{
  "success": true,
  "product": {
    "id": "product_id",
    "name": "Product Name",
    "description": "Detailed product description",
    "image": "https://example.com/image.jpg",
    "affiliateLink": "https://affiliate-link.com",
    "category": "electronics",
    "status": "published",
    "clickCount": 150,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

## Admin Product API

### Create Product (Admin)
**Endpoint**: `POST /api/admin/products`

**Description**: Creates a new product (admin only)

**Headers**: `Authorization: Bearer <admin_token>`

**Request Body**:
```json
{
  "name": "New Product",
  "description": "Product description",
  "image": "https://example.com/image.jpg",
  "affiliateLink": "https://affiliate-link.com",
  "category": "electronics",
  "status": "published"
}
```

### Update Product (Admin)
**Endpoint**: `PUT /api/admin/products/:id`

**Description**: Updates an existing product (admin only)

**Headers**: `Authorization: Bearer <admin_token>`

### Delete Product (Admin)
**Endpoint**: `DELETE /api/admin/products/:id`

**Description**: Deletes a product (admin only)

**Headers**: `Authorization: Bearer <admin_token>`

## Category API

### Get Categories (Public)
**Endpoint**: `GET /api/categories`

**Description**: Retrieves active categories for public viewing

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "category_id",
      "name": "Electronics",
      "description": "Electronic devices and gadgets",
      "image": "https://example.com/category.jpg",
      "color": "#3B82F6",
      "productCount": 25,
      "featured": true
    }
  ]
}
```

### Admin Category Operations
**Endpoints**:
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `GET /api/admin/categories` - Get all categories (including inactive)

## Blog API

### Get Blog Posts (Public)
**Endpoint**: `GET /api/posts`

**Description**: Retrieves published blog posts

**Query Parameters**:
- `page`, `limit`, `category`, `search`, `sortBy`, `sortOrder`

### Create Blog Post (Admin)
**Endpoint**: `POST /api/posts`

**Description**: Creates a new blog post (admin only)

**Request Body**:
```json
{
  "title": "How to Choose the Best Products",
  "content": "<p>Blog post content in HTML</p>",
  "coverImage": "https://example.com/cover.jpg",
  "tags": ["guide", "products", "tips"],
  "status": "published"
}
```

### Update Blog Post (Admin)
**Endpoint**: `PUT /api/posts/:id`

### Delete Blog Post (Admin)
**Endpoint**: `DELETE /api/posts/:id`

## User Management API

### Create User (Admin)
**Endpoint**: `POST /api/admin/users`

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "password": "securePassword123",
  "role": "admin"
}
```

### Get Users (Admin)
**Endpoint**: `GET /api/admin/users`

### Update User (Admin)
**Endpoint**: `PUT /api/admin/users/:id`

### Delete User (Admin)
**Endpoint**: `DELETE /api/admin/users/:id`

## Dashboard Analytics API

### Get Dashboard Stats
**Endpoint**: `GET /api/admin/dashboard/stats`

**Description**: Retrieves dashboard statistics for admin panel

**Response**:
```json
{
  "success": true,
  "data": {
    "totalProducts": 150,
    "publishedProducts": 120,
    "draftProducts": 30,
    "totalPosts": 45,
    "publishedPosts": 40,
    "draftPosts": 5,
    "recentProducts": [...],
    "recentPosts": [...]
  }
}
```

### Get Analytics Data
**Endpoints**:
- `GET /api/admin/analytics/revenue` - Revenue analytics
- `GET /api/admin/analytics/categories` - Category performance
- `GET /api/admin/analytics/devices` - Device usage stats
- `GET /api/admin/analytics/top-products` - Top performing products
- `GET /api/admin/analytics/activity` - Recent activity feed

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Authentication Flow

### Firebase Integration

1. **Login Process**:
   ```
   Client -> Backend: POST /api/auth/login {username, password}
   Backend -> Client: {customToken, user}
   Client -> Firebase: signInWithCustomToken(customToken)
   Firebase -> Client: {idToken, refreshToken}
   Client: Store idToken as authToken
   ```

2. **API Requests**:
   ```
   Client -> API: Authorization: Bearer <idToken>
   API: Verify token with Firebase
   API -> Client: Response
   ```

3. **Token Refresh**:
   ```
   Client: Check token expiry
   Client -> Firebase: Refresh token automatically
   Client: Update stored authToken
   ```

### Token Storage
- `authToken`: Firebase ID token (stored in localStorage)
- `refreshToken`: Firebase refresh token (stored in localStorage)

### Security Notes
- All admin endpoints require valid Firebase ID token
- Tokens automatically expire and refresh
- HTTPS required in production
- Input validation on all endpoints
- Rate limiting implemented

## Usage Examples

### JavaScript/TypeScript
```typescript
// Using the publicProductAPI service
import { publicProductAPI } from './services/publicProductApi';

// Get featured products
const featuredProducts = await publicProductAPI.getFeaturedProducts(6);

// Search products
const searchResults = await publicProductAPI.searchProducts('electronics');

// Get products by category
const categoryProducts = await publicProductAPI.getProductsByCategory('fashion');
```

### Authentication Example
```typescript
// Using the authAPI service
import { authAPI } from './services/authApi';

// Login
const loginResult = await authAPI.login({
  username: 'admin@jennies4life.com',
  password: 'password123'
});

if (loginResult.success) {
  console.log('Logged in:', loginResult.user);
}

// Get profile
const profile = await authAPI.getProfile();
```

---

**Note**: This documentation reflects the current API implementation. For the most up-to-date information, refer to the backend API documentation and the service files in the `src/services/` directory.