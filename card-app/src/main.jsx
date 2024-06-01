import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { getAnalytics } from "firebase/analytics";
import { app } from './firebaseConfig.js'
import { getMessaging, getToken, onMessage } from "firebase/messaging";


import { store } from './store'
import { Provider } from 'react-redux';
import { onBackgroundMessage } from 'firebase/messaging/sw';

const analytics = getAnalytics(app)

const messaging = getMessaging();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(    
      import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
      { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
    )
    .then((registration) => {
      getToken(messaging, {
          vapidKey: 'BOn9hE0IqDaTwMj7mUFhP1K7cD4HJFudbBAAQSIz_MJOrawRmbgvobvsldTBoO21_ZCoHEMVcjkGCnwei3gi8Ow',
          serviceWorkerRegistration : registration 
      })
        .then((currentToken) => {
          // do something
          console.log(currentToken)
        });
     });
}
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
