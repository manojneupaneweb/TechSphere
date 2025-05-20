import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiPackage,
  FiTrendingUp,
  FiRefreshCw,
  FiEye,
  FiPlus,
  FiLayers,
  FiTag,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/v1/user/getalluser", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const orderResponse = await axios.get("/api/v1/order/getallorder", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const ordersData = Array.isArray(orderResponse.data.orders)
          ? orderResponse.data.orders
          : [];

        const productResponse = await axios.get(
          "/api/v1/product/getallproducts",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        setUsers(userResponse.data.message);
        setOrders(ordersData);
        setProducts(productResponse.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate stats
  const adminUsers = users.filter((u) => u.role === "admin").length;
  const consumerUsers = users.filter((u) => u.role === "user").length;
  const newUsers = users.filter((u) => {
    if (u.role !== "user") return false;
    const created = new Date(u.createdAt);
    const now = new Date();
    const diff = (now - created) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  }).length;

  const pendingOrders = orders.filter((o) => o.order_status === "pending").length;
  const refundRequests = orders.filter((o) => o.status === "refund").length;
  const revenue = orders
    .filter((o) => o.order_status === "complete")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const stats = [
    {
      title: "Admin Users",
      value: adminUsers,
      icon: <FiUsers size={24} />,
      color: "bg-emerald-500",
    },
    {
      title: "Orders",
      value: orders.length,
      icon: <FiShoppingCart size={24} />,
      color: "bg-blue-500",
    },
    {
      title: "Customers",
      value: consumerUsers,
      icon: <FiUsers size={24} />,
      color: "bg-amber-500",
    },
    {
      title: "New Users (30d)",
      value: newUsers,
      icon: <FiTrendingUp size={24} />,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `$${revenue.toLocaleString()}`,
      icon: <FiDollarSign size={24} />,
      color: "bg-orange-500",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <FiPackage size={24} />,
      color: "bg-teal-500",
    },
    {
      title: "Refund Requests",
      value: refundRequests,
      icon: <FiRefreshCw size={24} />,
      color: "bg-rose-500",
    },
    {
      title: "Products",
      value: products.length,
      icon: <FiEye size={24} />,
      color: "bg-pink-500",
    },
  ];

  const quickActions = [
    {
      title: "All Products",
      path: "/admin/all-product",
      icon: <FiPackage size={18} />,
      color: "bg-rose-100 text-rose-600",
    },
    {
      title: "Add Products",
      path: "/admin/add-product",
      icon: <FiPlus size={18} />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Add Categories",
      path: "/admin/add-category",
      icon: <FiLayers size={18} />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Add Brands",
      path: "/admin/add-brand",
      icon: <FiTag size={18} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Customers",
      path: "/admin/customers",
      icon: <FiUsers size={18} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  // Prepare chart data (example: monthly revenue and sales)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthlyRevenue = Array(12).fill(0);
  const monthlySales = Array(12).fill(0);

  orders.forEach((order) => {
    if (!order.createdAt) return;
    const date = new Date(order.createdAt);
    const month = date.getMonth();
    monthlyRevenue[month] += order.totalPrice || 0;
    monthlySales[month] += 1;
  });

  // Sort for recent items
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10"
      >
        {quickActions.map((action, index) => (
          <motion.a
            key={index}
            whileHover={{ y: -5 }}
            href={action.path}
            className={`${action.color} p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center`}
          >
            <div className="mb-2">{action.icon}</div>
            <span className="text-sm font-medium text-center">
              {action.title}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className={`${stat.color} rounded-xl shadow-md overflow-hidden text-white`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium opacity-80">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Overview
          </h3>
          <div className="h-80">
            <Line
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Revenue",
                    data: monthlyRevenue,
                    borderColor: "rgba(16, 185, 129, 1)",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    tension: 0.3,
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Sales
          </h3>
          <div className="h-80">
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Sales",
                    data: monthlySales,
                    backgroundColor: "rgba(59, 130, 246, 0.7)",
                    borderRadius: 4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h3>
          <div className="space-y-4">
            {recentOrders.map((order, idx) => (
              <div
                key={order._id || idx}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <FiShoppingCart className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Order #{order._id?.slice(-6) || idx}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.user?.name || "Customer"} placed an order
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    Status: {order.order_status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Products */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Products
          </h3>
          <div className="space-y-4">
            {recentProducts.map((product, idx) => (
              <div
                key={product._id || idx}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <FiPackage className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {product.name || "Product"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ${product.price}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Users
          </h3>
          <div className="space-y-4">
            {recentUsers.map((user, idx) => (
              <div
                key={user._id || idx}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="bg-purple-100 p-2 rounded-lg mr-4">
                  <FiUsers className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {user.fullName || "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Role: {user.role}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;