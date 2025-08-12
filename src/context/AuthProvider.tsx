"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

type AuthContextType = {
  user: any | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // pega token atualizado
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("userToken", token);

        // busca dados no Firestore
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...snap.data() });
          localStorage.setItem("user", JSON.stringify({ uid: firebaseUser.uid, email: firebaseUser.email, ...snap.data() }));
        } else {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName });
          localStorage.setItem("user", JSON.stringify({ uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName }));
        }
      } else {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
