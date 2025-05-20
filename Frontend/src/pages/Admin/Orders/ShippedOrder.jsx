import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheck, FiX } from "react-icons/fi";

const statusConfig = {
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
    }
};

const ShippedOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");

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

    const showConfirmation = (orderId, status) => {
        console.log("Setting currentOrder:", orderId);
        setCurrentOrder(orderId);
        setNewStatus(status);
        setShowConfirmModal(true);
    };

    const closeConfirmation = () => {
        setShowConfirmModal(false);
        setCurrentOrder(null);
        setNewStatus("");
    };

    const updateOrderStatus = async () => {

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken || !currentOrder) {
            console.log("Missing accessToken or currentOrder", { accessToken, currentOrder });
            return;
        }
console.log("currentOrder: ", currentOrder);

        try {
            console.log("Making API call...");
            const response = await axios.post("/api/v1/order/changestatus", {
                orderId: currentOrder,
                status: newStatus
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            console.log("API response:", response.data);

            setOrders(orders.map(order =>
                order.id === currentOrder ? { ...order, order_status: newStatus } : order
            ));

            closeConfirmation();
        } catch (error) {
            console.error("Failed to update order status:", error);
            console.error("Error details:", error.response?.data || error.message);
            closeConfirmation();
        }
    };

    const filteredOrders = orders.filter((order) => order.order_status === "shipping");

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
                            Are you sure you want to change this order status to <span className="font-semibold capitalize">{newStatus}</span>?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeConfirmation}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateOrderStatus}
                                className={`px-4 py-2 rounded-md text-white ${newStatus === "completed"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                Confirm
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
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Shipped Orders</h1>
                        <p className="text-gray-600 mt-1">View and manage shipped orders</p>
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
                                                <p className="text-lg font-medium">No shipped orders found</p>
                                                <p className="text-sm mt-1">
                                                    Shipped orders will appear here
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
                                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[order.order_status]?.color || "bg-gray-100 text-gray-800"
                                                            }`}
                                                    >
                                                        {statusConfig[order.order_status]?.icon}
                                                        {order.order_status || "N/A"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => showConfirmation(order.id, "completed")}
                                                        className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200 transition-colors flex items-center"
                                                    >
                                                        <FiCheck className="mr-1" /> Complete
                                                    </button>
                                                    <button
                                                        onClick={() => showConfirmation(order.id, "cancel")}
                                                        className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded hover:bg-red-200 transition-colors flex items-center"
                                                    >
                                                        <FiX className="mr-1" /> Cancel
                                                    </button>
                                                </div>
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
                            <span className="font-medium">{orders.length}</span> orders (shipped only)
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ShippedOrder;