import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log Firebase config status
console.log('🔥 Firebase Config Status:');
console.log('   Project ID:', firebaseConfig.projectId ? '✅' : '❌');
console.log('   API Key:', firebaseConfig.apiKey ? '✅' : '❌');
console.log('   Messaging Sender ID:', firebaseConfig.messagingSenderId ? '✅' : '❌');
console.log('   VAPID Key:', process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ? '✅' : '❌');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
let messaging: any = null;

try {
  messaging = getMessaging(app);
  console.log('✅ Firebase Messaging initialized successfully!');
} catch (error) {
  console.warn('⚠️ Firebase Messaging not available:', error);
  console.warn('   This is normal for non-browser environments');
}

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, messaging, auth, googleProvider };
