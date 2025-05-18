import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/image/logo.png";
import { Search, ShoppingCart, User, Heart, Menu, ChevronDown } from "lucide-react";
import { Logout } from "../utils/AuthContext";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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

    const fetchCartItems = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setCartCount(0);
        return;
      }

      try {
        const response = await axios.get("/api/v1/product/getcartitem", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(response.data.product.length);
      } catch (error) {
        console.error("Error getting cart items:", error);
      }
    };

    fetchUserProfile();
    fetchCartItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleLogout = async () => {
    await Logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsUserMenuOpen(false);
    setCartCount(0);
  };

  
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-20">
        {/* Top Bar */}
        <div className="flex items-center justify-between text-xs py-2 border-b">
          <div className="hidden md:flex space-x-4">
            <span>Free shipping on orders over $100</span>
            <span>|</span>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} className="w-28" alt="Company Logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full pr-10 border-2 p-2 rounded-md border-gray-300 focus:border-[#8a0106] focus:ring-[#8a0106]"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Account Dropdown */}
            <div className="hidden sm:flex items-center relative user-menu-container">
              {isLoggedIn ? (
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  {userData?.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="User"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-700" />
                    </div>
                  )}
                  <span className="ml-1 hidden lg:inline">
                    Hi, {userData?.fullName.split(' ')[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                       Settings
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/auth/login" className="flex items-center hover:text-[#8a0106]">
                    <User className="h-5 w-5 text-gray-700" />
                    <span className="ml-1 hidden lg:inline">Login</span>
                  </Link>
                  <span className="text-gray-400 hidden lg:inline">|</span>
                  <Link to="/auth/signup" className="hidden lg:inline hover:text-[#8a0106]">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="hidden sm:flex items-center hover:text-[#8a0106]">
              <Heart className="h-5 w-5 text-gray-700" />
              <span className="ml-1 hidden lg:inline">Wishlist</span>
            </Link>

            <Link to="/cart" className="flex items-center hover:text-[#8a0106]">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#8a0106] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="ml-1 hidden lg:inline">Cart</span>
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <DesktopNavigation />
      </div>

      <MobileNavigation
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        userData={userData}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Header;