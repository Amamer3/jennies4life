# Firebase Authentication Setup Guide

## Overview

This project has been updated to use Firebase Authentication with a custom token flow. The backend provides a custom token that is exchanged for a Firebase ID token, which is then used for authenticated API requests.

## Authentication Flow

1. **Login Request**: User submits credentials to backend
2. **Custom Token**: Backend returns a custom Firebase token
3. **Token Exchange**: Frontend exchanges custom token for Firebase ID token using Firebase SDK
4. **API Requests**: Use Firebase ID token for authenticated API calls

## Setup Instructions

### 1. Firebase Project Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication in your Firebase project
3. Get your Firebase configuration from Project Settings
4. Update the `.env` file with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_actual_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
VITE_FIREBASE_APP_ID=your_actual_app_id
```

### 2. Backend Requirements

Your backend must:
- Return a `customToken` field in the login response
- Generate valid Firebase custom tokens using the Firebase Admin SDK
- Handle token refresh if needed

## Files Modified

### New Files
- `src/config/firebase.ts` - Firebase configuration and initialization
- `.env.example` - Example environment variables
- `FIREBASE_AUTH_SETUP.md` - This documentation

### Modified Files
- `src/services/authApi.ts` - Updated to use Firebase authentication flow
- `src/services/userApi.ts` - Updated to use `authToken` instead of `token`
- `.env` - Added Firebase configuration variables

## Key Changes

### AuthAPI Updates

1. **Login Method**: Now exchanges custom token for Firebase ID token
2. **Refresh Method**: Uses Firebase's built-in token refresh when possible
3. **Logout Method**: Signs out from Firebase and clears local storage

### Token Storage

- Firebase ID tokens are stored as `authToken` in localStorage
- Refresh tokens (if provided by backend) stored as `refreshToken`

### Error Handling

- Improved error messages for missing custom tokens
- Graceful fallback for token refresh
- Better logging for debugging authentication issues

## Troubleshooting

### Common Issues

1. **"No custom token received"**: Backend is not returning `customToken` field
2. **Firebase configuration errors**: Check your `.env` file configuration
3. **401 Unauthorized**: Token might be expired or invalid

### Debug Logging

The authentication system includes comprehensive console logging:
- `🔐` Login process
- `🔄` Token refresh
- `🚪` Logout process
- `✅` Success messages
- `❌` Error messages

## Testing

1. Start the development server: `npm run dev`
2. Navigate to the admin login page
3. Check browser console for authentication logs
4. Verify that API requests include proper Authorization headers

## Security Notes

- Firebase configuration values are safe to expose in frontend code
- Never commit actual Firebase private keys or service account files
- ID tokens automatically expire and refresh as needed
- Always use HTTPS in production