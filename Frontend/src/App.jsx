import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Smartphone from './pages/Smartphones';
import Laptops from './pages/Laptops';
import Accessories from './pages/Accessories';
import Smartwatches from './pages/Smartwatches';
import Tablets from './pages/Tablets';
import Smartphones from './pages/Smartphones';
import Carts from './pages/Carts';

// Auth Routes
import Signup from './pages/AuthPage/Signup';
import Login from './pages/AuthPage/Login';


{/* API Calls */ }
import axios from 'axios';


// Admin Panel
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import AddProduct from './pages/Admin/AddProduct';
import Orders from './pages/Admin/Ordres';
import Customers from './pages/Admin/Customers';
import HelpSupport from './pages/Admin/Help-support';
import UserManagement from './pages/Admin/User-management';
import { Settings } from 'lucide-react';
import Analytics from './pages/Admin/Analytics';
import Marketing from './pages/Admin/Marketing';
import Reports from './pages/Admin/Reports';
import ProductDetails from './pages/ProductDetails';
import ProductShow from './pages/ProductShow';

axios.defaults.baseURL = 'http://localhost:3000';


const App = () => {
  return (
    <Routes>
      {/* Public Routes with Header and Footer */}
      <Route path="/*" element={
        <div>
          <Header />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="smartphones" element={<Smartphones />} />
            <Route path="laptops" element={<Laptops />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="smartwatches" element={<Smartwatches />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path="carts" element={<Carts />} />
            <Route path="/product/product.title" element={<ProductDetails />} />
            <Route path="/productshow" element={<ProductShow />} />
            
          </Routes>
          <Footer />
        </div>
      } />

      {/* Admin Routes without Header and Footer */}
      <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="help-&-support" element={<HelpSupport />} />
          {/* Add more nested routes here */}
        </Route>


{/* Auth Routes without Header and Footer */ }
< Route path="/auth" >
  <Route path="signup" element={<Signup />} />
  <Route path="login" element={<Login />} />
</Route >




    </Routes >
  );
};





export default App;

// import Shop from './pages/Shop';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import About from './pages/About';

// const App = () => {
//   return (
//     <div>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />   
//         <Route path="/contact" element={<Contact />} />   
//         {/* <Route path="/shop" element={<Shop />} />             
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />           
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/about" element={<About />} />          */}
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default App;
