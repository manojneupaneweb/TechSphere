import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const userResponse = await axios.get("/api/v1/user/getalluser", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(userResponse.data.message || []);

        const statsResponse = await axios.get("/api/v1/dashboard/stats", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setStats(statsResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <main className="p-6 bg-white rounded-lg shadow-lg overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p>Welcome to the admin panel! Manage your products, orders, and users here.</p>

          {/* Dashboard Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-red-600 rounded-lg shadow-md text-xl text-white text-center font-bold cursor-pointer">
              Add Product <br />
              <span className="text-sm font-semibold underline">
                <Link to="/admin/products">View all</Link>
              </span>
            </div>
            <div className="p-4 bg-blue-600 rounded-lg shadow-md text-xl text-white text-center font-bold cursor-pointer">
              Add Category <br />
              <span className="text-sm font-semibold underline">
                <Link to="/admin/products">View all</Link>
              </span>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-white rounded-lg shadow-md text-xl font-bold cursor-pointer">
              Products: {stats.products} <br />
              <span className="text-sm font-semibold text-blue-800 underline">
                <Link to="/admin/products">View all</Link>
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md text-xl font-bold cursor-pointer">
              Orders: {stats.orders} <br />
              <span className="text-sm font-semibold text-blue-800 underline">
                <Link to="/admin/orders">View all</Link>
              </span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md text-xl font-bold cursor-pointer">
              Users: {user.length} <br />
              <span className="text-sm font-semibold text-blue-800 underline">
                <Link to="/admin/users">View all</Link>
              </span>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
