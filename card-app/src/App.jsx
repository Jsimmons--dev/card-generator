import { useState } from 'react'
import { auth, provider } from './authProvider.js'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import CardViewer from './CardViewer';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import CardOpener from './CardOpener';

import './App.css'

import * as React from 'react'
import { Provider, useDispatch } from 'react-redux'
import Home from './Home';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/card-viewer/:cardId",
    element: <CardViewer />,
  },
  {
    path: "/card-opener/:cardId",
    element: <CardOpener />,
  },
]);


function App() {
  const dispatch = useDispatch()

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!user && !loading && <button onClick={() => signInWithGoogle()}>Sign in with Google</button>}
      {user && !loading &&
        <RouterProvider router={router} />
      }
    </>
  )
}

export default App
