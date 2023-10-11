import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import UserContextProvider from "./context/UserContextProvider.jsx"

function App() {

  return (
    <UserContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserContextProvider>
  )
}

export default App
