/**
 * Firebase Configuration and Initialization
 * 
 * This module configures and initializes Firebase services for the Jennies4Life application.
 * It sets up Firebase Authentication using environment variables for secure configuration.
 * 
 * Environment Variables Required:
 * - VITE_FIREBASE_API_KEY: Firebase project API key
 * - VITE_FIREBASE_AUTH_DOMAIN: Firebase authentication domain
 * - VITE_FIREBASE_PROJECT_ID: Firebase project identifier
 * - VITE_FIREBASE_STORAGE_BUCKET: Firebase storage bucket URL
 * - VITE_FIREBASE_MESSAGING_SENDER_ID: Firebase messaging sender ID
 * - VITE_FIREBASE_APP_ID: Firebase application ID
 * 
 * @module firebase
 * @author Jennies4Life Development Team
 * @since 1.0.0
 * 
 * @see {@link https://firebase.google.com/docs/web/setup} Firebase Web Setup Guide
 * @see {@link ../../../FIREBASE_AUTH_SETUP.md} Project-specific Firebase setup instructions
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';

/**
 * Firebase configuration object
 * 
 * This configuration is built from environment variables to ensure
 * sensitive Firebase credentials are not hardcoded in the source code.
 * All values are loaded from the .env file at build time.
 * 
 * @constant {object} firebaseConfig
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Check if all required Firebase config values are present
const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredConfigKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

if (missingKeys.length > 0) {
  console.warn('Missing Firebase configuration:', missingKeys);
  console.warn('Firebase authentication will not work properly. Please check your environment variables.');
}

/**
 * Initialize Firebase application
 * 
 * Creates and configures the main Firebase app instance using the
 * configuration object. This app instance is used by all Firebase services.
 * 
 * @constant {FirebaseApp} app - The initialized Firebase application instance
 */
let app: FirebaseApp;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Create a mock app for development/testing
  app = {} as FirebaseApp;
}

/**
 * Firebase Authentication service instance
 * 
 * Provides access to Firebase Authentication methods for user management,
 * sign-in, sign-out, and token handling. This is the main authentication
 * service used throughout the application.
 * 
 * @constant {Auth} auth - Firebase Authentication service instance
 * 
 * @example
 * ```typescript
 * import { auth } from './config/firebase';
 * import { signInWithCustomToken } from 'firebase/auth';
 * 
 * // Use the auth instance for authentication operations
 * const userCredential = await signInWithCustomToken(auth, customToken);
 * ```
 */
let auth: Auth;
try {
  auth = getAuth(app);
} catch (error) {
  console.error('Failed to initialize Firebase Auth:', error);
  // Create a mock auth for development/testing
  auth = {} as Auth;
}

/**
 * Default export of the Firebase app instance
 * 
 * @default app
 */
export { auth };
export default app;