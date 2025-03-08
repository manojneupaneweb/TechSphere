import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import Logo from "../assets/image/logo.png";
import userIcon from "../assets/image/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = (menu) => setIsDropdownOpen(isDropdownOpen === menu ? null : menu);
  const isActive = (link) => (activeLink === link ? "text-red-700 font-bold" : "hover:text-red-700");

  const fetchUserProfile = async () => {
    const AccessToken = localStorage.getItem('accessToken');
    if (!AccessToken) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const response = await axios.get("/api/v1/user/getprofile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${AccessToken}`
          }
        }
      );
      console.log("user data:", data);
      setData(response);

      setIsLoggedIn(true);
      if (response.data.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error fetching Profile data', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="w-32 h-12" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-5">
              <Link to="/" className={`${isActive("home")} text-gray-900 text-sm`} onClick={() => setActiveLink("home")}>
                Home
              </Link>

              {/* Dropdowns */}
              {[
                { label: "Smartphones", links: ["Apple", "Samsung", "Xiaomi", "OnePlus", "Google"], path: "smartphones" },
                { label: "Accessories", links: ["Cases", "Chargers", "Headphones", "Power Banks", "Screen Protectors"], path: "accessories" },
                { label: "Smartwatches", links: ["Apple", "Samsung", "Fitbit", "Garmin", "Huawei"], path: "smartwatches" },
                { label: "Laptops", links: ["Apple", "Dell", "HP", "Lenovo", "Asus"], path: "laptops" },
                { label: "Tablets", links: ["iPad", "Samsung Galaxy Tab", "Microsoft Surface", "Lenovo Tab", "Amazon Fire"], path: "tablets" }
              ].map((menu) => (
                <div key={menu.path} className="relative group">
                  <button className={`${isActive(menu.path)} text-gray-900 text-sm flex items-center`}>
                    {menu.label} 
                    {/* <FontAwesomeIcon icon={faChevronDown} className="ml-1" /> */}
                  </button>
                  <div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg w-48 mt-1 z-50">
                    {menu.links.map((item) => (
                      <Link
                        key={item}
                        to={`/${menu.path}/${item.toLowerCase()}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link to="/contact" className={`${isActive("contact")} text-gray-900 text-sm`} onClick={() => setActiveLink("contact")}>
                Contact Us
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">

              {/* Search Box (Hidden in mobile) */}
              <div className="relative hidden lg:block">
                <input
                  type="search"
                  placeholder="Search..."
                  className="border-2 border-gray-300 bg-white w-40 h-8 px-2 pr-10 rounded-lg text-sm focus:outline-none"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-2.5 text-gray-600" />
              </div>
              <a href="/cart"><FontAwesomeIcon icon={faShoppingCart} size="lg" className="cursor-pointer text-gray-600 hover:text-gray-800 hidden lg:block" /></a>
              {/* User Menu */}
              <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-1 rounded-full">
                  <img src={userIcon} className="w-8 h-8 border border-gray-950 p-1 rounded-full" alt="User" />
                </button>
                {isUserMenuOpen && (
                  isLoggedIn ? (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-50">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Admin
                        </Link>
                      )}
                      <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-50">
                      <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Signup
                      </Link>
                      <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Login
                      </Link>
                    </div>
                  )
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button onClick={toggleMobileMenu} className="lg:hidden">
                <FontAwesomeIcon icon={faBars} size="lg" className="text-gray-600 hover:text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40">
          <div className="p-4 space-y-4">
            <Link to="/" className="block text-gray-900 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>

            {/* Mobile Dropdowns */}
            {[
              { label: "Smartphones", links: ["Apple", "Samsung", "Xiaomi", "OnePlus", "Google"], path: "smartphones" },
              { label: "Accessories", links: ["Cases", "Chargers", "Headphones", "Power Banks", "Screen Protectors"], path: "accessories" },
              { label: "Smartwatches", links: ["Apple", "Samsung", "Fitbit", "Garmin", "Huawei"], path: "smartwatches" },
              { label: "Laptops", links: ["Apple", "Dell", "HP", "Lenovo", "Asus"], path: "laptops" },
              { label: "Tablets", links: ["iPad", "Samsung Galaxy Tab", "Microsoft Surface", "Lenovo Tab", "Amazon Fire"], path: "tablets" }
            ].map((menu) => (
              <div key={menu.path}>
                <button onClick={() => toggleDropdown(menu.path)} className="w-full text-left flex justify-between text-gray-900 text-sm py-2">
                  {menu.label} <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {isDropdownOpen === menu.path && (
                  <div className="pl-4">
                    {menu.links.map((item) => (
                      <Link key={item} to={`/${menu.path}/${item.toLowerCase()}`} className="block text-gray-700 py-1">
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
                
              </div>
            ))}

            <Link to="/contact" className="block text-gray-900 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </div>
        </div>
      )}

      <div className="h-20"></div>
    </>
  );
};

export default Header;