import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AdminAccess, UserAccess } from "./utils/AuthContext.jsx";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Signup from "./pages/AuthPage/Signup";
import Login from "./pages/AuthPage/Login";
import PageNotFound from "./pages/PageNotFound.jsx";
import Cart from "./pages/Cart.jsx";
import ProductShow from "./pages/ProductShow.jsx";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/Ordres.jsx"; // Fixed filename typo
import Reports from "./pages/Admin/Reports.jsx";
import AddProduct from "./pages/Admin/Product/AddProduct.jsx";
import Customers from "./pages/Admin/Customers.jsx";
import Marketing from "./pages/Admin/Marketing.jsx";
import Settings from "./pages/Admin/Settings.jsx";
import UserManagement from "./pages/Admin/UserManagement.jsx";
import HelpSupport from "./pages/Admin/HelpSupport.jsx";
import AddCategory from "./pages/Admin/Product/AddCategory.jsx";
import AllProduct from "./pages/Admin/Product/AllProduct.jsx";

// Set up Axios globally
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contact", element: <Contact /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/category/:category/:brandname", element: <ProductShow /> }, // Fixed "catagory" typo
      {
        path: "/cart", element: (
          <UserAccess>
            <Cart />
          </UserAccess>
        )
      },
      {
        path: "/profile",
        element: (
          <UserAccess>
            <Profile />
          </UserAccess> 
        )
      },
      { path: "*", element: <PageNotFound /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminAccess>
        <AdminLayout />
      </AdminAccess>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> }, // Use lowercase paths
      { path: "add-product", element: <AddProduct /> },
      { path: "all-product", element: <AllProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "customers", element: <Customers /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "reports", element: <Reports /> },
      { path: "marketing", element: <Marketing /> },
      { path: "settings", element: <Settings /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "help", element: <HelpSupport /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
