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
import Reports from "./pages/Admin/Reports.jsx";
import AddProduct from "./pages/Admin/AddProduct.jsx";
import Customers from "./pages/Admin/Customers.jsx";
import Marketing from "./pages/Admin/Marketing.jsx";
import Settings from "./pages/Admin/Settings.jsx";
import UserManagement from "./pages/Admin/UserManagement.jsx";
import HelpSupport from "./pages/Admin/HelpSupport.jsx";
import AddCategory from "./pages/Admin/AddCategory.jsx";



import PageNotFound from "./pages/PageNotFound.jsx";
import Cart from "./pages/Cart.jsx";


// Set up Axios globally
import axios from "axios";
import ProductShow from "./pages/ProductShow.jsx";
axios.defaults.baseURL = 'http://localhost:3000';


const App = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/signup", "/login", "/admin"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:title" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:catagory/:brandname" element={<ProductShow />} />
        <Route path="*" element={<PageNotFound />} />

        <Route element={<UserAccess />}>
          <Route path="/profile" element={<Profile />} />
        </Route>


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminAccess><AdminLayout /></AdminAccess>}>
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/marketing" element={<Marketing />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/help" element={<HelpSupport />} />
        </Route>
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};




export default App;
