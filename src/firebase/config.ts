import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDOUHzD3RuoJCyRHeUAAveo6fwTy_bXL0o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "abdndashboard.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "abdndashboard",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "abdndashboard.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "827418799318",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:827418799318:web:36bd5ee71922463323ed77",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YFGCBVEDXJ"
};

// Initialize Firebase (guard against duplicate initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore, Storage, and Auth
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Analytics (safely initialize only in supported browser environments)
let analytics: any = null;
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { app, analytics, db, storage, auth, googleProvider };