import React from 'react';
import Logo from '../assets/image/logo.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import esewa from '../assets/image/esewa.png';
import khalti from '../assets/image/khalti.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Social Media */}
          <div className="space-y-4">
            <img src={Logo} className="w-32" alt="Company Logo" />
            <p className="text-sm">
              Providing the latest gadgets and tech accessories.<br />
              Your trusted tech partner.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-300      transition duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-300      transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-300      transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-300     transition duration-300">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h6 className="text-lg font-semibold text-purple-200">Categories</h6>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Laptops</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Smartphones</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Accessories</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Wearables</a>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h6 className="text-lg font-semibold text-purple-200">Company</h6>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">About Us</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Contact</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Careers</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Blog</a>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h6 className="text-lg font-semibold text-purple-200">Support</h6>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">FAQs</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Shipping</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Returns</a>
            <a href="#" className="block text-sm hover:text-purple-300     transition duration-300">Terms & Policies</a>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h6 className="text-lg font-semibold text-purple-200">Payment Methods</h6>
            <div className="flex space-x-4">
              <img src={esewa} className="w-24 h-9 bg-white p-1 rounded" alt="eSewa" />
              <img src={khalti} className="w-20 bg-white p-1 rounded" alt="Khalti" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-gray-800 py-4 text-center">
          <p className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;