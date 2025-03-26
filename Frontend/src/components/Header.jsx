import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/image/logo.png";
import userIcon from "../assets/image/user.png";
import { Search, ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Logout } from "../utils/AuthContext";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const { data } = await axios.get("/api/v1/user/getprofile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(data.message);
        setIsLoggedIn(true);
        setIsAdmin(data.message.role === "admin");
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await Logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const toggleDropdown = (menu) => setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  const isActive = (link) => (activeLink === link ? "text-red-700 font-bold" : "hover:text-red-700");

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="TechSphere" className="w-32 h-12" />
        </Link>
        <nav className="hidden lg:flex space-x-6">
          {["Smartphones", "Accessories", "Smartwatches", "Laptops", "Tablets"].map((category) => (
            <div key={category} className="relative group">
              <button className={`${isActive(category.toLowerCase())} flex items-center`}>
                {category}
              </button>
              <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg w-48 mt-1 z-50">
                {['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Google'].map((item) => (
                  <Link key={item} to={`/${category.toLowerCase()}/${item.toLowerCase()}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link to="/contact" className={isActive("contact")}>Contact Us</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <input type="search" placeholder="Search..." className="border-gray-300 bg-white w-40 h-8 px-2 pr-10 rounded-lg text-sm focus:outline-none" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
          <Link to="/cart">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </Link>
          <div className="relative">
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-1 rounded-full">
              <img src={userData ? userData.profilePicture : userIcon} className="w-8 h-8 border rounded-full" alt="User" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-50">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                    {isAdmin && <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Admin</Link>}
                    <button onClick={handleLogout} className="block px-4 py-2 text-red-700 hover:bg-gray-100 w-full text-left">Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
                )}
              </div>
            )}
          </div>
          <button className="md:hidden" onClick={() => setMobileNavOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center pt-20">
          <nav className="bg-white p-6 rounded-lg shadow-lg">
            {["Smartphones", "Accessories", "Smartwatches", "Laptops", "Tablets"].map((category) => (
              <Link key={category} to={`/${category.toLowerCase()}`} className="block py-2 text-gray-700 hover:text-red-700" onClick={() => setMobileNavOpen(false)}>
                {category}
              </Link>
            ))}
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-red-700" onClick={() => setMobileNavOpen(false)}>Contact Us</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
