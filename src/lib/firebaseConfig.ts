
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzxY9rh3kwK7LIBUKz_jnXl21uVlDhy14",
  authDomain: "omnibox-store.firebaseapp.com",
  projectId: "omnibox-store",
  storageBucket: "omnibox-store.firebasestorage.app",
  messagingSenderId: "683562682401",
  appId: "1:683562682401:web:c149a3f794eb045b57fb60",
  measurementId: "G-RF5TLC1YLS"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
