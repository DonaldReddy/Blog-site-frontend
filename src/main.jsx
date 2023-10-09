import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import App from './App.jsx'
import Home from "./components/Home/Home.jsx"
import SignIn from "./components/SignIn/SignIn.jsx"
import SignUp from "./components/SignUp/SignUp.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />}> </Route>
      <Route path='signin' element={<SignIn />} ></Route>
      <Route path='signup' element={<SignUp />} >
        <Route path='' element={<Home />}> </Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
