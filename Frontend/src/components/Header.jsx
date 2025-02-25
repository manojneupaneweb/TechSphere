import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import user from '../assets/image/user.png';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (link) => (activeLink === link ? 'text-red-700 font-bold' : 'hover:text-red-700');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md z-50 fixed w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img src={Logo} className="w-32 h-12" alt="Logo" />
              </Link>
            </div>
            <div className="hidden lg:flex lg:ml-10 lg:space-x-8">
              <Link to="/" className={`${isActive('home')} text-gray-900 text-sm font-medium`} onClick={() => setActiveLink('home')}>
                Home
              </Link>
              <div className="relative group">
                <button className={`${isActive('smartphones')} text-gray-900 text-sm font-medium flex items-center`}>
                  Smartphones <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg w-48 mt-2 z-50">
                  <Link to="/smartphones/apple" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Apple</Link>
                  <Link to="/smartphones/samsung" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Samsung</Link>
                  <Link to="/smartphones/xiaomi" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Xiaomi</Link>
                  <Link to="/smartphones/oneplus" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">OnePlus</Link>
                  <Link to="/smartphones/google" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Google</Link>
                </div>
              </div>
              <div className="relative group">
                <button className={`${isActive('accessories')} text-gray-900 text-sm font-medium flex items-center`}>
                  Accessories <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg w-48 mt-2 z-50">
                  <Link to="/accessories/cases" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cases</Link>
                  <Link to="/accessories/chargers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Chargers</Link>
                  <Link to="/accessories/headphones" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Headphones</Link>
                  <Link to="/accessories/powerbanks" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Power Banks</Link>
                  <Link to="/accessories/screen-protectors" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Screen Protectors</Link>
                </div>
              </div>
              <div className="relative group">
                <button className={`${isActive('smartwatches')} text-gray-900 text-sm font-medium flex items-center`}>
                  Smartwatches <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg w-48 mt-2 z-50">
                  <Link to="/smartwatches/apple" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Apple</Link>
                  <Link to="/smartwatches/samsung" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Samsung</Link>
                  <Link to="/smartwatches/fitbit" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Fitbit</Link>
                  <Link to="/smartwatches/garmin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Garmin</Link>
                  <Link to="/smartwatches/huawei" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Huawei</Link>
                </div>
              </div>
              <Link to="/contact" className={`${isActive('contact')} text-gray-900 text-sm font-medium`} onClick={() => setActiveLink('contact')}>
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Side: Search, Cart, User */}
          <div className="flex items-center">
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <button className="text-gray-600 hover:text-gray-800">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              </button>
              <div className="relative">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-4 pr-10 rounded-lg text-sm focus:outline-none"
                  type="search"
                  placeholder="Search..."
                />
                <button className="absolute right-3 top-2.5 text-gray-600">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="relative">
                <div
                  className="p-1 cursor-pointer bg-white rounded-full"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img src={user} className="w-8 h-8 rounded-full" alt="User" />
                </div>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-50">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/auth/signup"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Signup
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/auth/login"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <FontAwesomeIcon icon={faBars} size="lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className={`${isActive('home')} block px-3 py-2 text-base font-medium`} onClick={() => setActiveLink('home')}>
              Home
            </Link>
            <div className="relative">
              <button className={`${isActive('smartphones')} block px-3 py-2 text-base font-medium w-full text-left`}>
                Smartphones <FontAwesomeIcon icon={faChevronDown} className="float-right mt-1" />
              </button>
              <div className="pl-4">
                <Link to="/smartphones/apple" className="block px-3 py-2 text-base font-medium">Apple</Link>
                <Link to="/smartphones/samsung" className="block px-3 py-2 text-base font-medium">Samsung</Link>
                <Link to="/smartphones/xiaomi" className="block px-3 py-2 text-base font-medium">Xiaomi</Link>
                <Link to="/smartphones/oneplus" className="block px-3 py-2 text-base font-medium">OnePlus</Link>
                <Link to="/smartphones/google" className="block px-3 py-2 text-base font-medium">Google</Link>
              </div>
            </div>
            <div className="relative">
              <button className={`${isActive('accessories')} block px-3 py-2 text-base font-medium w-full text-left`}>
                Accessories <FontAwesomeIcon icon={faChevronDown} className="float-right mt-1" />
              </button>
              <div className="pl-4">
                <Link to="/accessories/cases" className="block px-3 py-2 text-base font-medium">Cases</Link>
                <Link to="/accessories/chargers" className="block px-3 py-2 text-base font-medium">Chargers</Link>
                <Link to="/accessories/headphones" className="block px-3 py-2 text-base font-medium">Headphones</Link>
                <Link to="/accessories/powerbanks" className="block px-3 py-2 text-base font-medium">Power Banks</Link>
                <Link to="/accessories/screen-protectors" className="block px-3 py-2 text-base font-medium">Screen Protectors</Link>
              </div>
            </div>
            <div className="relative">
              <button className={`${isActive('smartwatches')} block px-3 py-2 text-base font-medium w-full text-left`}>
                Smartwatches <FontAwesomeIcon icon={faChevronDown} className="float-right mt-1" />
              </button>
              <div className="pl-4">
                <Link to="/smartwatches/apple" className="block px-3 py-2 text-base font-medium">Apple</Link>
                <Link to="/smartwatches/samsung" className="block px-3 py-2 text-base font-medium">Samsung</Link>
                <Link to="/smartwatches/fitbit" className="block px-3 py-2 text-base font-medium">Fitbit</Link>
                <Link to="/smartwatches/garmin" className="block px-3 py-2 text-base font-medium">Garmin</Link>
                <Link to="/smartwatches/huawei" className="block px-3 py-2 text-base font-medium">Huawei</Link>
              </div>
            </div>
            <Link to="/contact" className={`${isActive('contact')} block px-3 py-2 text-base font-medium`} onClick={() => setActiveLink('contact')}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;