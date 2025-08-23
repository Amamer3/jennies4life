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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

/**
 * Initialize Firebase application
 * 
 * Creates and configures the main Firebase app instance using the
 * configuration object. This app instance is used by all Firebase services.
 * 
 * @constant {FirebaseApp} app - The initialized Firebase application instance
 */
const app = initializeApp(firebaseConfig);

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
export const auth = getAuth(app);

/**
 * Default export of the Firebase app instance
 * 
 * @default app
 */
export default app;