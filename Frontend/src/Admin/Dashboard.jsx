// src/Admin/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/logo.png';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-6 bg-white rounded-lg shadow-lg overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin panel! Manage your products, orders, and users here.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-white rounded-lg shadow-md">Products: 150</div>
          <div className="p-4 bg-white rounded-lg shadow-md">Orders: 45</div>
          <div className="p-4 bg-white rounded-lg shadow-md">Users: 200</div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
