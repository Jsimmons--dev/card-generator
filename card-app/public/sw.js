import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)

import { initializeApp } from "firebase/app";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { getMessaging } from "firebase/messaging/sw";
import { onMessage } from 'firebase/messaging';

console.log('initializing firebase app');

initializeApp({
  apiKey: "AIzaSyB20se1or3zx5FfELCpx6BG1lVZGzI8Mjs",
  authDomain: "cards-425002.firebaseapp.com",
  projectId: "cards-425002",
  storageBucket: "cards-425002.appspot.com",
  messagingSenderId: "881017580872",
  appId: "1:881017580872:web:7f3b2f1570c3a72a47d77d",
  measurementId: "G-9NHNQPXDH5"
});

const messaging = getMessaging();


const notificationTitle = 'Background Message Title';
const notificationOptions = {
  body: 'Background Message body.',
  icon: '/vite.svg'
};

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )

  payload.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  )
})

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

