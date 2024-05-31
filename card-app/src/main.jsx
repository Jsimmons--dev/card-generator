import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
