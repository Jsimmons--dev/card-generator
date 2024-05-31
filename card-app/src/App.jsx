import { useState } from 'react'
import './App.css'

import * as React from 'react'
import { Provider } from 'react-redux'
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
]);

import { store } from './store'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App
