import { initializeApp } from "firebase/app";
import { getMessaging,getToken } from "firebase/messaging";
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
export const messaging = getMessaging(app);
getToken(messaging, {vapidKey: "BOn9hE0IqDaTwMj7mUFhP1K7cD4HJFudbBAAQSIz_MJOrawRmbgvobvsldTBoO21_ZCoHEMVcjkGCnwei3gi8Ow"}).then((currentToken) => {
  if (currentToken) {
    console.log(currentToken)
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
