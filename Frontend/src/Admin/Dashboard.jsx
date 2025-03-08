import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/image/logo.png';
import Loading from '../components/Loading';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState({ products: 0, orders: 0, users: 0 });

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
    HandleFetch();
  }, []);

  const HandleFetch = async () => {
    try {
      const response = await axios.get('/api/v1/admin/getalluser');
      // Assuming the response includes the stats for products, orders, and users
      setStats({
        products: response.data.products,
        orders: response.data.orders,
        users: response.data.users,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <main className="p-6 bg-white rounded-lg shadow-lg overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p>Welcome to the admin panel! Manage your products, orders, and users here.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-white rounded-lg shadow-md">
              Products: {stats.products}
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              Orders: {stats.orders}
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              Users: {stats.users}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
