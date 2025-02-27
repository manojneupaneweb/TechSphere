import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Bell, Moon, Search, User, LogOut, ShoppingCart, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center space-x-3">
          <button className="p-2 bg-gray-200 rounded-md">
            <Moon size={20} />
          </button>
          <input type="text" placeholder="Search..." className="border rounded-md px-3 py-1" />
        </div>
        <div className="flex items-center space-x-4">
          <Bell size={22} className="cursor-pointer" />
          <div className="relative">
            <User size={22} className="cursor-pointer" />
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
              <button className="block px-4 py-2 text-sm">Profile</button>
              <button className="block px-4 py-2 text-sm">Settings</button>
              <button className="block px-4 py-2 text-sm text-red-500">Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <Users size={30} className="text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-gray-500">12,345</p>
          </div>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <ShoppingCart size={30} className="text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-gray-500">8,240</p>
          </div>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
          <DollarSign size={30} className="text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-gray-500">$128,560</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Sales Growth</h3>
          {/* <Bar data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{ label: "Sales", data: [20, 45, 30, 60, 75], backgroundColor: "blue" }]
          }} /> */}
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Users Growth</h3>
          {/* <Line data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{ label: "Users", data: [200, 400, 600, 800, 1000], borderColor: "green" }]
          }} /> */}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <ul className="divide-y">
          <li className="py-2">🔹 John Doe placed an order</li>
          <li className="py-2">🔹 Admin updated product listings</li>
          <li className="py-2">🔹 New user registered: Jane Smith</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
