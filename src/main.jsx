import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import App from './App.jsx'
import Home from "./components/Home/Home.jsx"
import SignIn from "./components/SignIn/SignIn.jsx"
import SignUp from "./components/SignUp/SignUp.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import MyBlogs from './components/Blog/MyBlogs/MyBlogs.jsx'
import AddBlog from "./components/Blog/AddBlog/AddBlog.jsx"
import OpenBlog from './components/Blog/OpenBlog/OpenBlog.jsx'
import EditBlog from './components/Blog/EditBlog/EditBlog.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='signin' element={<SignIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='user'>
        <Route path='account' element={<Dashboard />} />
        <Route path='myblogs' >
          <Route path='' element={<MyBlogs />} />
          <Route path='openblog/:id' element={<OpenBlog />} />
          <Route path='addblog' element={<AddBlog />} />
          <Route path='editblog/:id' element={<EditBlog />} />
        </Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
