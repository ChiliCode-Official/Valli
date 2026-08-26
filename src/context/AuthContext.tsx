"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { BRAND } from "@/config/brand";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check redirect result on mobile browsers (Safari / iOS)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Error with getRedirectResult:", error);
      });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = Boolean(
    user?.email &&
      (BRAND.contact.adminEmails as readonly string[]).some(
        (adminEmail) => adminEmail.toLowerCase().trim() === user.email?.toLowerCase().trim()
      )
  );

  const signInWithGoogle = async () => {
    // Detect mobile / iOS / Safari user agent to use redirect instead of popup
    const isMobileOrIOS =
      typeof window !== "undefined" &&
      (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document));

    try {
      if (isMobileOrIOS) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error: any) {
      // If popup is blocked by iOS / Safari, fallback automatically to redirect
      if (
        error.code === "auth/popup-blocked" ||
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        console.warn("Popup blocked or closed on iOS/mobile, falling back to signInWithRedirect...");
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
