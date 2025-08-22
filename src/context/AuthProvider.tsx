"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// 🔹 Tipagem para os dados extras do Firestore
export type FirestoreUserData = {
  displayName?: string;
  [key: string]: unknown; // caso tenha outros campos dinâmicos
};

// 🔹 Tipagem para o usuário final que vai para o contexto
export type AppUser = {
  uid: string;
  email: string | null;
} & FirestoreUserData;

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // pega token atualizado
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("userToken", token);

        // busca dados no Firestore
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        let userData: AppUser;

        if (snap.exists()) {
          userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...snap.data(),
          } as AppUser;
        } else {
          userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName ?? undefined,
          };
        }

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
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
