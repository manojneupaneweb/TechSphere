import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiPackage, FiCheckCircle } from "react-icons/fi";

const STATUS_CONFIG = {
    Completed: {
        color: "bg-emerald-100 text-emerald-800",
        icon: <FiCheckCircle className="mr-1" />,
    },
};

const getOrderStatus = (order) => {
    // Normalize status for display and badge
    if (order.status) return order.status;
    if (order.order_status?.toLowerCase() === "complete") return "Completed";
    return "Completed";
};

const CompleteOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await axios.get("/api/v1/order/getallorder", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(Array.isArray(data.orders) ? data.orders : []);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    const completedOrders = useMemo(
        () => orders.filter((order) => order.order_status?.toLowerCase() === "complete"),
        [orders]
    );

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
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Completed Orders</h1>
                        <p className="text-gray-600 mt-1">View all completed customer orders</p>
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {completedOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <FiPackage className="h-12 w-12 mb-4 opacity-30" />
                                                <p className="text-lg font-medium">No completed orders found</p>
                                                <p className="text-sm mt-1">Completed orders will appear here</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    completedOrders.map((order, index) => {
                                        const status = getOrderStatus(order);
                                        const statusProps = STATUS_CONFIG[status] || STATUS_CONFIG.Completed;
                                        return (
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
                                                            ? `रु.  ${(order.product.price * (order.quantity || 1)).toLocaleString()}`
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
                                                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusProps.color}`}
                                                        >
                                                            {statusProps.icon}
                                                            {status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {completedOrders.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 flex justify-between items-center text-sm text-gray-600"
                    >
                        <div>
                            Showing <span className="font-medium">{completedOrders.length}</span> of{" "}
                            <span className="font-medium">{orders.length}</span> completed orders
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CompleteOrders;
