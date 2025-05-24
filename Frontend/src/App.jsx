import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from "react-router"
import { CartProvider } from './context/CartContext.jsx'


function App() {
   
  return (
    <>
    <CartProvider>
    <Header /> 
    <Outlet />
    <Footer />
    </CartProvider>
    </>
  )
}

export default App
