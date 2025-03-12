import { Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import { AdminAccess, UserAccess } from "./utils/AuthContext.jsx";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";

// Auth Pages
import Signup from "./pages/AuthPage/Signup";
import Login from "./pages/AuthPage/Login";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/Ordres.jsx";


import axios from "axios";
import AddProduct from "./pages/Admin/AddProduct.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Cart from "./pages/Cart.jsx";
// Set up Axios globally
axios.defaults.baseURL = 'http://localhost:3000';


const App = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/signup", "/login", "/admin"];

  // Check if the current route is in the noHeaderFooterRoutes array
  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:title" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />

        <Route element={<UserAccess />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminAccess><AdminLayout /></AdminAccess>}>
          <Route index path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};




export default App;
