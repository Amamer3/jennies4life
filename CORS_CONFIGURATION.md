# CORS Configuration Guide

## Issue Description

The frontend application hosted at `https://www.royal-lounge.org` is experiencing CORS (Cross-Origin Resource Sharing) errors when attempting to communicate with the backend API at `https://jennies4life-server.onrender.com`.

**Error Message:**
```
Access to fetch at 'https://jennies4life-server.onrender.com/api/auth/login' from origin 'https://www.royal-lounge.org' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Root Cause

The backend server does not have proper CORS headers configured to allow requests from the frontend domain `https://www.royal-lounge.org`.

## Solutions Implemented

### 1. Development Environment Fix

**Vite Proxy Configuration** (`vite.config.ts`):
- Added proxy configuration to route `/api/*` requests through the Vite development server
- This bypasses CORS restrictions during development
- Proxy target: `https://jennies4life-server.onrender.com`

**API Configuration** (`src/services/authApi.ts`):
- Modified `API_BASE_URL` to use relative URLs in development
- Uses full URL only in production builds

### 2. Enhanced Error Handling

**CORS Error Detection** (`src/services/authApi.ts`):
- Added specific error handling for CORS-related failures
- Provides user-friendly error messages
- Logs detailed error information for debugging

## Backend CORS Configuration Requirements

### Required Headers

The backend server must include the following CORS headers in responses:

```javascript
// Express.js example
app.use(cors({
  origin: [
    'https://www.royal-lounge.org',
    'http://localhost:5173', // Development
    'http://localhost:5174', // Development (alternative port)
    'http://localhost:4173'  // Preview mode
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
}));
```

### Preflight Request Handling

Ensure the server properly handles OPTIONS requests for preflight checks:

```javascript
// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});
```

## Testing CORS Configuration

### Development Testing
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5174/admin/login`
3. Attempt to log in - should work through proxy

### Production Testing
1. Build the application: `npm run build`
2. Start preview server: `npm run preview`
3. Navigate to `http://localhost:4173/admin/login`
4. Attempt to log in - will fail until backend CORS is configured

## Deployment Checklist

- [ ] Backend server configured with proper CORS headers
- [ ] Frontend domain `https://www.royal-lounge.org` added to allowed origins
- [ ] Preflight request handling implemented
- [ ] CORS configuration tested with production build
- [ ] Error handling provides meaningful feedback to users

## Alternative Solutions

### 1. Backend Proxy
Implement a backend endpoint that proxies requests to avoid CORS entirely.

### 2. JSONP (Not Recommended)
Use JSONP for simple GET requests (limited functionality).

### 3. Server-Side Rendering
Move authentication logic to server-side to avoid client-side CORS issues.

## Contact Information

For backend CORS configuration assistance, contact the backend development team with:
- Frontend domain: `https://www.royal-lounge.org`
- Required endpoints: `/api/auth/*`, `/api/*`
- This configuration guide