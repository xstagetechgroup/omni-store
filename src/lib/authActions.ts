"use client";

import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

export async function logoutUser() {
    try {
        await signOut(auth); // encerra sessão no Firebase
        localStorage.removeItem("user");
        localStorage.removeItem("userToken");
        return true;
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
        return false;
    }
}