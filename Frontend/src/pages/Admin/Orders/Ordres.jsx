import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheck, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: <FiPackage className="mr-1" />,
  },
  shipping: {
    color: "bg-blue-100 text-blue-800",
    icon: <FiTruck className="mr-1" />,
  },
  completed: {
    color: "bg-green-100 text-green-800",
    icon: <FiCheck className="mr-1" />,
  },
  cancelled: {
    color: "bg-red-100 text-red-800",
    icon: <FiX className="mr-1" />,
  },
};

const actionOptions = [
  {
    status: "shipping",
    label: "Mark as Shipping",
    color: "bg-blue-100 text-blue-800",
    icon: <FiTruck className="mr-1" />,
  },
  {
    status: "completed",
    label: "Mark as Completed",
    color: "bg-green-100 text-green-800",
    icon: <FiCheck className="mr-1" />,
  },
  {
    status: "cancelled",
    label: "Cancel Order",
    color: "bg-red-100 text-red-800",
    icon: <FiX className="mr-1" />,
  },
];

const Ordres = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [processing, setProcessing] = useState(false);

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
        toast.error("Failed to load orders. Please try again.");
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const showConfirmation = (orderId, status) => {
    setCurrentOrder(orderId);
    setNewStatus(status);
    setShowConfirmModal(true);
  };

  const closeConfirmation = () => {
    setShowConfirmModal(false);
    setCurrentOrder(null);
    setNewStatus("");
    setProcessing(false);
  };

  const updateOrderStatus = async () => {
    setProcessing(true);
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken || !currentOrder) {
      toast.error("Authentication error. Please login again.");
      closeConfirmation();
      return;
    }

    try {
      await axios.post(
        "/api/v1/order/changestatus",
        {
          orderId: currentOrder,
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setOrders(orders.map(order =>
        order.id === currentOrder ? { ...order, order_status: newStatus } : order
      ));

      toast.success(`Order status updated to ${newStatus} successfully!`);
      closeConfirmation();
    } catch (error) {
      console.error("Failed to update order status:", error);
      const errorMessage = error.response?.data?.message || "Failed to update order status";
      toast.error(errorMessage);
      closeConfirmation();
    }
  };

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
  const filteredOrders = orders.filter((order) => order.order_status === "pending");

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Status Change
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to change this order status to{" "}
              <span className="font-semibold capitalize">{newStatus}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeConfirmation}
                disabled={processing}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={updateOrderStatus}
                disabled={processing}
                className={`px-4 py-2 rounded-md text-white ${newStatus === "completed"
                  ? "bg-green-600 hover:bg-green-700"
                  : newStatus === "cancelled"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                  } disabled:opacity-50`}
              >
                {processing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-600 mt-1">View and manage all orders</p>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                          Orders will appear here when available
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id?.substring(0, 8) || "N/A"}
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
                            ? `रु. ${(order.product.price * order.quantity).toLocaleString()}`
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
                        <div className=" items-center">
                          <span
                            className={`px-3 py-1  text-xs leading-5 font-semibold rounded-full ${statusConfig[order.order_status]?.color || "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {statusConfig[order.order_status]?.icon}
                            {order.order_status || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {order.order_status === "pending" ? (
                            actionOptions.map((action) => (
                              <button
                                key={action.status}
                                onClick={() => showConfirmation(order.id, action.status)}
                                className={`px-3 py-1 ${action.color} text-xs rounded hover:opacity-80 transition-opacity flex items-center`}
                              >
                                {action.icon}
                                {action.label}
                              </button>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500">No actions available</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex justify-between items-center text-sm text-gray-600"
          >
            <div>
              Showing <span className="font-medium">{filteredOrders.length}</span> orders
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Ordres;