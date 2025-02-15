import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For React Router Link
import Logo from '../assets/image/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home'); // Track active link state

  // Function to check if the link is active
  const isActive = (link) => activeLink === link ? 'text-red-700' : 'hover:text-red-700';

  return (
    <nav className="bg-gradient-to-r from-gray-100 to-gray-300 shadow-md">
      <div className="navbar px-6 lg:px-20">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            <ul tabIndex={0} className="menu dropdown-content bg-white rounded-lg shadow w-52 p-2 mt-3 z-50">
              <li><a onClick={() => setActiveLink('home')} className={isActive('home')}>Home</a></li>
              <li><a onClick={() => setActiveLink('smartphones')} className={isActive('smartphones')}>Smartphones</a></li>
              <li><a onClick={() => setActiveLink('accessories')} className={isActive('accessories')}>Accessories</a></li>
              <li><a onClick={() => setActiveLink('smartwatches')} className={isActive('smartwatches')}>Smartwatches</a></li>
              <li><a onClick={() => setActiveLink('contact')} className={isActive('contact')}>Contact Us</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img src={Logo} className='w-32 h-12' alt="Logo" />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">
            <li>
              <Link
                to="/"
                className={`${isActive('home')}`}
                onClick={() => setActiveLink('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/smartphones"
                className={`${isActive('smartphones')}`}
                onClick={() => setActiveLink('smartphones')}
              >
                Smartphones
              </Link>
            </li>
            <li>
              <Link
                to="/accessories"
                className={`${isActive('accessories')}`}
                onClick={() => setActiveLink('accessories')}
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                to="/smartwatches"
                className={`${isActive('smartwatches')}`}
                onClick={() => setActiveLink('smartwatches')}
              >
                Smartwatches
              </Link>
            </li>
            <li>
              <Link
                to="/laptops"
                className={`${isActive('laptops')}`}
                onClick={() => setActiveLink('laptops')}
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                to="/tablets"
                className={`${isActive('tablets')}`}
                onClick={() => setActiveLink('tablets')}
              >
                Tablets
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${isActive('contact')}`}
                onClick={() => setActiveLink('contact')}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-1">
          <Link
            to="/carts"
            className={`${isActive('carts')}`}
            onClick={() => setActiveLink('carts')}
          ><button className="btn btn-ghost"><FontAwesomeIcon icon={faShoppingCart} /></button> </Link>
          <div className="relative">
            <input className='w-36 h-8 pl-8 pr-2 rounded-full border border-gray-400 outline-none' type="search" placeholder="Search..." />
            {/* <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-2 text-gray-500" /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
