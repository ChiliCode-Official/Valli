import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCXQUdj1kczgcBb7WPREQ5hZy40SX5vUE4",
  authDomain: "valli-3c403.firebaseapp.com",
  projectId: "valli-3c403",
  storageBucket: "valli-3c403.firebasestorage.app",
  messagingSenderId: "1051817100391",
  appId: "1:1051817100391:web:b0a394b32736de4742c0c2",
  measurementId: "G-0BCYDTBX6Q"
};

// Initialize Firebase (singleton pattern for Next.js SSR / Fast Refresh)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics conditionally for client-side
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, googleProvider, analytics };
