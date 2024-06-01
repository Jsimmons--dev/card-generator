import { useState } from 'react'
import { auth, provider } from './authProvider.js'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import CardViewer from './CardViewer';
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';
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

  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!user && !loading && <button onClick={() => signInWithGoogle()}>Sign in with Google</button>}
      {user && !loading &&
      <>
        <RouterProvider router={router} />
      {<button style={{position:'absolute', top:0, left:0, margin:'15px'}} onClick={() => signOut()}>Sign out</button>}
        </>
      }
    </>
  )
}

export default App
