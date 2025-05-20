import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AdminAccess, UserAccess } from "./utils/AuthContext.jsx";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductShow/ProductDetails.jsx";
import Profile from "./pages/Profile";
import Signup from "./pages/AuthPage/Signup";
import Login from "./pages/AuthPage/Login";
import PageNotFound from "./pages/PageNotFound.jsx";
import Cart from "./pages/Cart.jsx";
import ProductShow from "./pages/ProductShow/ProductsShow.jsx";
import ProductbrandShow from "./pages/ProductShow/ProductbrandShow.jsx";

// Admin Pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
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
import Aboutus from "./pages/Aboutus.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ProductCatagoryShow from "./pages/ProductShow/ProductCategoryShow.jsx";
axios.defaults.baseURL = "http://localhost:3000";

//payment Sucess 
import PaymentSuccess from "./components/payment.jsx";
import Orders from "./pages/Admin/Orders/Ordres.jsx";
import UpdateProduct from "./pages/Admin/Product/UpdateProduct.jsx";
import CompleteOrders from "./pages/Admin/Orders/CompleteOrders.jsx";
import CancelOrder from "./pages/Admin/Orders/CancelOrder.jsx";
import ShippedOrder from "./pages/Admin/Orders/ShippedOrder.jsx";
import UserPermission from "./pages/Admin/Userpermission.jsx";
import Stocks from "./pages/Admin/Stocks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <Aboutus /> },
      { path: "/contact", element: <Contact /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/category/:category/:brandname", element: <ProductShow /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/brand/:brand", element: <ProductbrandShow /> },
      { path: "/category/:category", element: <ProductCatagoryShow /> },
      { path: "/paymentsuccess", element: <PaymentSuccess /> },
      { path: "settings", element: <Settings /> },



      {
        path: "/cart", element: (
          <UserAccess>
            <Cart />
          </UserAccess>
        )
      },
      {
        path: "/account",
        element: (
          <UserAccess>
            <Profile />
          </UserAccess>
        )
      },
      { path: "*", element: <PageNotFound /> },

    ],
  }, {
    path: "/auth",
    children: [
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
    ]
  },
  {
    path: "/admin",
    element: (
      <AdminAccess>
        <AdminLayout />
      </AdminAccess>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> }, 

      //  product releted route
      { path: "add-product", element: <AddProduct /> },
      { path: "all-product", element: <AllProduct /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "updateproduct/:id", element: <UpdateProduct /> },
      
      // order product releted route
      { path: "orders", element: <Orders /> },
      { path: "orders/complete", element: <CompleteOrders /> },
      { path: "orders/cancel", element: <CancelOrder /> },
      { path: "orders/shipped", element: <ShippedOrder /> },


      { path: "customers", element: <Customers /> },
      { path: "stocks", element: <Stocks /> },
      { path: "reports", element: <Reports /> },
      { path: "marketing", element: <Marketing /> },
      { path: "settings/general", element: <Settings /> },
      { path: "settings", element: <Settings /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "help", element: <HelpSupport /> },
      { path: "settings/userpermission", element: <UserPermission /> },
      { path: "*", element: <PageNotFound /> },

    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
