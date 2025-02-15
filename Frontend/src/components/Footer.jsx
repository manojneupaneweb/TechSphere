import React from 'react';
import Logo from '../assets/image/logo.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-gray-900 text-gray-300 p-10">
      <aside>
        <h2 className="text-2xl font-bold text-purple-500"><img src={Logo} className='w-32' alt="" /></h2>
        <p>Providing the latest gadgets and tech accessories.<br />Your trusted tech partner.</p>
        <div className="flex gap-4 mt-4">
          <a href="#" className="hover:text-purple-500"><FaFacebookF /></a>
          <a href="#" className="hover:text-purple-500"><FaTwitter /></a>
          <a href="#" className="hover:text-purple-500"><FaInstagram /></a>
          <a href="#" className="hover:text-purple-500"><FaLinkedin /></a>
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Categories</h6>
        <a className="link link-hover">Laptops</a>
        <a className="link link-hover">Smartphones</a>
        <a className="link link-hover">Accessories</a>
        <a className="link link-hover">Wearables</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Blog</a>
      </nav>
      <nav>
        <h6 className="footer-title">Support</h6>
        <a className="link link-hover">FAQs</a>
        <a className="link link-hover">Shipping</a>
        <a className="link link-hover">Returns</a>
        <a className="link link-hover">Terms & Policies</a>
      </nav>
    </footer>
  );
};

export default Footer;
