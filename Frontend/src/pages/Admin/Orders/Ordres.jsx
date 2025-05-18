import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";

const statusConfig = {
  Pending: {
    color: "bg-amber-100 text-amber-800",
    icon: <FiClock className="mr-1" />,
  },
  Shipped: {
    color: "bg-blue-100 text-blue-800",
    icon: <FiTruck className="mr-1" />,
  },
  Completed: {
    color: "bg-emerald-100 text-emerald-800",
    icon: <FiCheckCircle className="mr-1" />,
  },
  Cancelled: {
    color: "bg-rose-100 text-rose-800",
    icon: <FiXCircle className="mr-1" />,
  },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("/api/v1/order/getallorder", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = Array.isArray(response.data.orders) ? response.data.orders : [];
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    const originalStatus = orders[index].status;
    const updatedOrders = [...orders];
    const orderId = updatedOrders[index]._id || updatedOrders[index].id;
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `/api/v1/order/updatestatus/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Revert on error
      updatedOrders[index].status = originalStatus;
      setOrders(updatedOrders);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.user?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "All" || 
      order.status?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-lg font-medium text-gray-700">Loading your orders...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-600 mt-1">View and manage customer orders</p>
          </div>
          {/* <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <FiPackage className="h-12 w-12 mb-4 opacity-30" />
                        <p className="text-lg font-medium">No orders found</p>
                        <p className="text-sm mt-1">
                          {searchTerm || statusFilter !== "All"
                            ? "Try adjusting your search or filter"
                            : "Your orders will appear here"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order._id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order._id?.substring(0, 8) || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order._id || order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.user?.fullname || "Guest"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.user?.email || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                            {order.product?.image ? (
                              <img
                                className="h-full w-full object-cover"
                                src={order.product.image}
                                alt={order.product.name}
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <FiPackage />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.product?.name || "Unknown Product"}
                            </div>
                            <div className="text-sm text-gray-500">
                              Qty: {order.quantity || 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.product?.price
                            ? `₦${(order.product.price * order.quantity).toLocaleString()}`
                            : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "-"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString()
                            : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              statusConfig[order.status]?.color || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {statusConfig[order.status]?.icon}
                            {order.status || "Pending"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) => handleStatusChange(index, e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                        >
                          {Object.keys(statusConfig).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {filteredOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex justify-between items-center text-sm text-gray-600"
          >
            <div>
              Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> orders
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;