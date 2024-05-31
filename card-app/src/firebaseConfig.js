import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB20se1or3zx5FfELCpx6BG1lVZGzI8Mjs",
  authDomain: "cards-425002.firebaseapp.com",
  projectId: "cards-425002",
  storageBucket: "cards-425002.appspot.com",
  messagingSenderId: "881017580872",
  appId: "1:881017580872:web:7f3b2f1570c3a72a47d77d",
  measurementId: "G-9NHNQPXDH5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);