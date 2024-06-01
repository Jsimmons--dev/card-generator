import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

import { initializeApp } from "firebase/app";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { getMessaging } from "firebase/messaging/sw";


// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
initializeApp({
  apiKey: "AIzaSyB20se1or3zx5FfELCpx6BG1lVZGzI8Mjs",
  authDomain: "cards-425002.firebaseapp.com",
  projectId: "cards-425002",
  storageBucket: "cards-425002.appspot.com",
  messagingSenderId: "881017580872",
  appId: "1:881017580872:web:7f3b2f1570c3a72a47d77d",
  measurementId: "G-9NHNQPXDH5"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = firebase.messaging();
const messaging = getMessaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});