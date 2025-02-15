import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Users, Box, ShoppingCart, Settings } from 'lucide-react';
import Logo from '../assets/image/logo.png';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF7F5]">
      
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg p-4 text-gray-800 min-h-screen transition-all ${isSidebarOpen ? 'w-64 text-black' : 'w-16 text-black'} overflow-hidden`}>
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <img src={Logo} alt="Admin Logo" className={`transition-all ${isSidebarOpen ? 'w-32 text-black' : 'w-10 text-black'}`} />
          </Link>
        </div>
        <nav className="space-y-2">
          <Link to="/admin/dashboard" className="flex items-center justify-start px-4 py-2 rounded text-blue-600 font-medium hover:bg-gray-200">
            <Home size={20} /> {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link to="/admin/users" className="flex items-center justify-start px-4 py-2 rounded text-gray-700 hover:text-blue-600 hover:bg-gray-200">
            <Users size={20} /> {isSidebarOpen && <span>Users</span>}
          </Link>
          <Link to="/admin/products" className="flex items-center justify-start px-4 py-2 rounded text-gray-700 hover:text-blue-600 hover:bg-gray-200">
            <Box size={20} /> {isSidebarOpen && <span>Products</span>}
          </Link>
          <Link to="/admin/orders" className="flex items-center justify-start px-4 py-2 rounded text-gray-700 hover:text-blue-600 hover:bg-gray-200">
            <ShoppingCart size={20} /> {isSidebarOpen && <span>Orders</span>}
          </Link>
          <Link to="/admin/settings" className="flex items-center justify-start px-4 py-2 rounded text-gray-700 hover:text-blue-600 hover:bg-gray-200">
            <Settings size={20} /> {isSidebarOpen && <span>Settings</span>}
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 bg-white rounded-lg shadow-lg overflow-auto">
        <nav className='w-full h-14 bg-slate-200 mb-3 flex items-center px-4 shadow-md'>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`text-gray-800 p-2 ${isSidebarOpen ? 'text-black' : 'text-gray-800'}`}
          >
            <Menu size={24} />
          </button>
        </nav>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
