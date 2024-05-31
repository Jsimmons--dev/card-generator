import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { getAnalytics } from "firebase/analytics";
import { app } from './firebaseConfig.js'

import { store } from './store'
import { Provider } from 'react-redux';

const analytics = getAnalytics(app)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
