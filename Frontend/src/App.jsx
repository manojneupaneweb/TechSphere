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


//Admin panel 
import AdminLayout from './Admin/AdminLayout';
import Dashboard from './Admin/Dashboard';
import Users from './Admin/Users';
import Products from './Admin/Products';
import Orders from './Admin/Orders';
import Settings from './Admin/Settings';

const App = () => {
  return (
    <Routes>
      {/* Public Routes with Header and Footer */}
      <Route path="/*" element={
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/smartphones" element={<Smartphones />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/smartwatches" element={<Smartwatches />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/carts" element={<Carts />} />
          </Routes>
          <Footer />
        </div>
      } />

      {/* Admin Routes without Header and Footer */}
      <Route path="/admin" element={<AdminLayout />} >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>



    </Routes>
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
