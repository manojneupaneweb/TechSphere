import { Routes, Route,useLocation  } from "react-router-dom";
import React from "react";
import { AdminAccess, UserAccess } from "./utils/AuthContext.jsx";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";

// Auth Pages
import Signup from "./pages/AuthPage/Signup";
import Login from "./pages/AuthPage/Login";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";


import axios from "axios";
// Set up Axios globally
axios.defaults.baseURL = 'http://localhost:3000';





const App = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/signup", "/login", "/admin"];

  return (
    <>
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:title" element={<ProductDetails />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <AdminAccess>
              <AdminLayout />
            </AdminAccess>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route element={<UserAccess />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};



export default App;
