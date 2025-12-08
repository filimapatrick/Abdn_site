import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOUHzD3RuoJCyRHeUAAveo6fwTy_bXL0o",
  authDomain: "abdndashboard.firebaseapp.com",
  projectId: "abdndashboard",
  storageBucket: "abdndashboard.firebasestorage.app",
  messagingSenderId: "827418799318",
  appId: "1:827418799318:web:36bd5ee71922463323ed77",
  measurementId: "G-YFGCBVEDXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage }; 